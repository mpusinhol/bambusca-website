import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import moment from 'moment';
import MonthPickerInput from 'react-month-picker-input';

import Autocomplete from '../autocomplete/index';

import { getBestPriceTrip } from '../../actions/viajanetActions';

import {DEFAULT_I18N} from './i18n.ts';

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isRoundTrip: true,
      origin: {},
      destination: {},
      month: moment().month(),
      year: moment().year(),
      adults: undefined,
      children: undefined,
      babies: undefined,
      minDays: undefined,
      maxDays: undefined
    }

    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.props.actions.getBestPriceTrip({
      originIATA: "SAO",
      destinationIATA: "MIA",
      isRoundTrip: false,
      departureDate: "2018-12-20"
    });
  }

  handleChange(evt) {
    this.setState({ [evt.target.name]: evt.target.value });
  }

  render() {
    return (
      <div id="home-page">
        <div className="title">
          <h1>Aperte o cinto, sua passagem ideal está na próxima tela.</h1>
          <h1 className="bambusque">Bambusque!</h1>
        </div>
        <div className="row justify-content-center">
        <div className="col-8">
            <form className="form">
              <div className="form-check form-check-inline radio-margin">
                <input
                  className="form-check-input"
                  type="radio" 
                  name="inlineRadioOptions"
                  id="inlineRadio1"
                  checked={!this.state.isRoundTrip}
                  onClick={() => this.setState({isRoundTrip: false})}
                />
                <label className="form-check-label check" for="inlineRadio1">Só Ida</label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  name="inlineRadioOptions"
                  id="inlineRadio2"
                  checked={this.state.isRoundTrip}
                  onClick={() => this.setState({isRoundTrip: true})}
                />
                <label className="form-check-label check" for="inlineRadio2">Ida e Volta</label>
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
                  i18n={DEFAULT_I18N}
                  closeOnSelect
                  onChange={(maskedValue, selectedYear, selectedMonth) =>
                    this.setState({month: selectedMonth, year: selectedYear})
                  }
                />
                </div>
                <div className="form-group col-md-2">
                  <input
                    type="number"
                    className="form-control"
                    placeholder="Adultos"
                    name="adults"
                    onChange={this.handleChange}
                    value={this.state.adults}  
                  />
                </div>
                <div className="form-group col-md-2">
                  <input
                    type="number"
                    className="form-control"
                    placeholder="Crianças"
                    name="children"
                    onChange={this.handleChange}
                    value={this.state.children}
                    />
                </div>
                <div className="form-group col-md-2">
                  <input
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
                  <input
                    type="number"
                    className="form-control"
                    name="minDays"
                    onChange={this.handleChange}
                    value={this.state.minDays}
                  />
                </div>
                <div className="align-text-amount">
                  <p>À</p>
                </div>

                <div className="form-group col-md-1">
                  <input
                    type="number" 
                    className="form-control"
                    name="maxDays"
                    onChange={this.handleChange}
                    value={this.state.maxDays}
                  />
                </div>

                <div className="align-text-amount">
                  <p>DIAS</p>
                </div>

              </div>
              <div className="align-button">
                <button type="submit" className="btn btn-success text"
                  onClick={() => this.handleClick()}>BAMBUSCAR!</button>
              </div>
            </form>
            </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    users: state.Example,
    viajanet: state.Viajanet,
  };
};

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Object.assign({}, { getBestPriceTrip }), dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);