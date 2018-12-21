import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import moment from 'moment';
import { Input, Button, Form, Label } from 'reactstrap';
import { ToastContainer, toast } from 'react-toastify';
import MonthPickerInput from 'react-month-picker-input';

import Autocomplete from '../autocomplete/index';
import Loader from '../common/loader';

import ViajanetApi from '../../api/viajanetApi';

import {
  getBestPriceTrip,
  onGetBestPriceSuccess,
  onGetBestPriceFailure,
  onGetAllBestPrices,
  resetProcessingFlag
} from '../../actions/viajanetActions';

import 'react-toastify/dist/ReactToastify.css';

const REQUEST_DATE_MASK = "YYYY-MM-DD";

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isRoundTrip: false,
      origin: undefined,
      destination: undefined,
      month: moment().month(),
      year: moment().year(),
      adults: undefined,
      children: undefined,
      babies: undefined,
      minDays: undefined,
      maxDays: undefined,
      formHasErrors: false,
      errors: {
        origin: undefined,
        destination: undefined,
        redundantTrip: undefined,
        tripDate: undefined,
        fromTripDays: undefined,
        toTripDays: undefined,
        tripDays: undefined
      },
      isProcessing: false,
    }

    this.handleChange = this.handleChange.bind(this);
    this.validateFields = this.validateFields.bind(this);
    this.renderAlertErrors = this.renderAlertErrors.bind(this);
    this.onBambuscarClicked = this.onBambuscarClicked.bind(this);
    this.fetchBestPrices = this.fetchBestPrices.bind(this);
    this.getViajanetBestPriceSync = this.getViajanetBestPriceSync.bind(this);
  }

  componentWillReceiveProps = nextProps => {
    if (nextProps.viajanet && nextProps.viajanet.hasFinishedProcessing) {
      this.props.actions.resetProcessingFlag();
      this.setState({isProcessing: false});

      if (nextProps.viajanet.numberOfResultsFound > 0){
        toast.success("", {
          position: toast.POSITION.TOP_RIGHT,
        });
        //REDIRECT
      } else {
        toast.error("Não conseguimos encontrar viagens no momento. Por gentileza, escolha outro destino ou tente mais tarde.", {
          position: toast.POSITION.TOP_RIGHT
        });
      }
    }
  }

  getViajanetBestPriceSync = async (data) => {
    var PRE_DEFINED_BEST_PRICES_BODY = {
      LoadLocations: false,
      LoadAirCompanies: false,
      OnlyBestAirCompany: false,
      ResultsAmount: 1
    };

    PRE_DEFINED_BEST_PRICES_BODY.Origin = data.originIATA;
    PRE_DEFINED_BEST_PRICES_BODY.Destination = data.destinationIATA;
    PRE_DEFINED_BEST_PRICES_BODY.StartDeparture = data.departureDate;
    PRE_DEFINED_BEST_PRICES_BODY.IsRoundTrip = data.isRoundTrip;

    if (data.isRoundTrip) {
      PRE_DEFINED_BEST_PRICES_BODY.TripDays = data.tripDays;
    }

    const promise = await ViajanetApi.getBestPriceTrip(PRE_DEFINED_BEST_PRICES_BODY);

    return promise;
  }

  fetchBestPrices() {
    const currentDate = moment();
    let startDate;
    let promiseArray = [];

    if (this.state.month === currentDate.month() && this.state.year === currentDate.year()) {
      startDate = moment();
    } else {
      startDate = moment(`${this.state.year}-${this.state.month+1}-01`, REQUEST_DATE_MASK);
    }

    let requestBody = {
      originIATA: this.state.origin.value.IATA,
      destinationIATA: this.state.destination.value.IATA,
      isRoundTrip: this.state.isRoundTrip
    }

    while(startDate.month() === this.state.month) {
      requestBody.departureDate = startDate.format(REQUEST_DATE_MASK);

      if (this.state.isRoundTrip) {
        requestBody.tripDays = [this.state.minDays, this.state.maxDays];
      }

      const promise = this.getViajanetBestPriceSync(requestBody);
      promiseArray.push(promise);

      startDate = startDate.add(1, 'day');
    }

    Promise.all(promiseArray).then(result => {
      this.props.actions.onGetAllBestPrices(result);
    });
  };

  validateFields() {
    const { origin, destination, month, year, minDays, maxDays } = this.state;

    let errors = {
      origin: undefined,
      destination: undefined,
      tripDate: undefined,
      fromTripDays: undefined,
      toTripDays: undefined,
      tripDays: undefined
    };

    let formHasErrors = false;

    if (!origin) {
      errors.origin = "É preciso selecionar a origem!";
      formHasErrors = true;
    }
    
    if (!destination) {
      errors.destination = "É preciso selecionar o destino!";
      formHasErrors = true;
    }

    if (origin && destination && origin.value.Id === destination.value.Id) {
      errors.redundantTrip = "O destino precisa ser diferente da origem!";
      formHasErrors = true;
    }

    const currentDate = moment();

    if (month < currentDate.month() && year <= currentDate.year()) {
      errors.tripDate = "O mês da viagem não pode ser um mês passado!";
      formHasErrors = true;
    }

    if (this.state.isRoundTrip) {
      if (!minDays) {
        errors.fromTripDays = "É necessário inserir a quantidade mínima de dias de viagem!";
        formHasErrors = true;
      }
  
      if (!maxDays) {
        errors.toTripDays = "É necessário inserir a quantidade máxima de dias de viagem!";
        formHasErrors = true;
      }
  
      if (minDays > maxDays) {
        errors.tripDays = "A quantidade mínima de dias de viagem não pode ser maior do que a máxima!";
        formHasErrors = true;
      }

      if (minDays && maxDays) {
        const parsedMinDays = parseInt(minDays);
        const parsedMaxDays = parseInt(maxDays);

        if (parsedMinDays > parsedMaxDays) {
          errors.tripDays = "A quantidade mínima de dias de viagem não pode ser maior do que a máxima!";
          formHasErrors = true;
        }
      }
    }

    this.setState({formHasErrors, errors});

    if (formHasErrors) {
      return errors;
    } else {
      return undefined;
    }
  }

  renderAlertErrors(errors) {
    let errorArray = [];

    for (let key in errors) {
      if (errors[key]) {
        errorArray.push(
          <span style={{fontSize: "18px"}}>
            {errors[key]}
            <br/>
          </span>
        );
      }
    }

    return (
    <div>
      {errorArray}
    </div>
    );
  }

  onBambuscarClicked() {
    const errors = this.validateFields();

    if(errors === undefined) {
      this.setState({isProcessing: true});
      this.fetchBestPrices();
    } else {
      toast.error(this.renderAlertErrors(errors), {
        position: toast.POSITION.TOP_RIGHT
      });
    }
  }

  handleChange(evt) {
    this.setState({ [evt.target.name]: evt.target.value });
  };

  render() {
    return (
      <div id="home-page">
        { this.state.isProcessing ? <Loader/> : null }
        <ToastContainer autoClose={8000} style={{width: "40%"}}/>
        <div className="title">
          <h1>Aperte o cinto, sua passagem ideal está na próxima tela.</h1>
          <h1 className="bambusque">Bambusque!</h1>
        </div>
        <div className="row justify-content-center">
        <div className="col-8">
            <Form className="form">
              <div className="form-check form-check-inline radio-margin">
                <Input
                  className="form-check-input"
                  type="radio" 
                  name="inlineRadioOptions"
                  id="inlineRadio1"
                  checked={!this.state.isRoundTrip}
                  onClick={() => this.setState({isRoundTrip: false})}
                />
                <Label className="form-check-label check" for="inlineRadio1">Só Ida</Label>
              </div>
              <div className="form-check form-check-inline">
                <Input
                  className="form-check-input"
                  type="radio"
                  name="inlineRadioOptions"
                  id="inlineRadio2"
                  checked={this.state.isRoundTrip}
                  onClick={() => this.setState({isRoundTrip: true})}
                />
                <Label className="form-check-label check" for="inlineRadio2">Ida e Volta</Label>
              </div>

              <div className="form-row origin-destiny">
                <div className="col">
                  <Autocomplete
                    placeholder="Origem"
                    onSelectCallback={option => this.setState({origin: option})}
                  />
                </div>
                <div className="col">
                  <Autocomplete
                    placeholder="Destino"
                    onSelectCallback={option => this.setState({destination: option})}
                  />
                </div>
              </div>

              <div className="form-row font">
                <div className="form-group col-md-6 month-picker">
                <MonthPickerInput
                  ref="picker"
                  year={this.state.year}
                  month={this.state.month}
                  closeOnSelect
                  onChange={(maskedValue, selectedYear, selectedMonth) =>
                    this.setState({month: selectedMonth, year: selectedYear})
                  }
                />
                </div>
                <div className="form-group col-md-2">
                  <Input
                    type="number"
                    className="form-control"
                    placeholder="Adultos"
                    name="adults"
                    onChange={this.handleChange}
                    value={this.state.adults}  
                  />
                </div>
                <div className="form-group col-md-2">
                  <Input
                    type="number"
                    className="form-control"
                    placeholder="Crianças"
                    name="children"
                    onChange={this.handleChange}
                    value={this.state.children}
                    />
                </div>
                <div className="form-group col-md-2">
                  <Input
                    type="number"
                    className="form-control"
                    placeholder="Bebês"
                    name="babies"
                    onChange={this.handleChange}
                    value={this.state.babies}
                  />
                </div>
              </div>

              <p className="how-long">Por quantos dias deseja viajar?</p>


              <div className="form-row justify-content-center" style={{marginTop: "15px", marginLeft: "15px"}}>
                <div className="align-text-amount">
                  <p>DE</p>
                </div>

                <div className="form-group col-md-1">
                  <Input
                    type="number"
                    className="form-control"
                    name="minDays"
                    onChange={this.handleChange}
                    value={this.state.minDays}
                    disabled={!this.state.isRoundTrip}
                  />
                </div>
                <div className="align-text-amount">
                  <p>À</p>
                </div>

                <div className="form-group col-md-1">
                  <Input
                    type="number" 
                    className="form-control"
                    name="maxDays"
                    onChange={this.handleChange}
                    value={this.state.maxDays}
                    disabled={!this.state.isRoundTrip}
                  />
                </div>

                <div className="align-text-amount">
                  <p>DIAS</p>
                </div>

              </div>
              <div className="align-button">
                <Button className="btn btn-success text" onClick={this.onBambuscarClicked}>
                  BAMBUSCAR!
                </Button>
              </div>
              </Form>
            </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    viajanet: state.Viajanet,
  };
};

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Object.assign({}, {
      getBestPriceTrip,
      onGetBestPriceSuccess,
      onGetBestPriceFailure,
      onGetAllBestPrices,
      resetProcessingFlag,
    }), dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);