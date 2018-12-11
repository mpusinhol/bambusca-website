import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Autocomplete from '../autocomplete/index';

import { getBestPriceTrip } from '../../actions/viajanetActions';

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isRoundTrip: true,
      origin: {},
      destination: {},
      month: '5',
      year: '',
      adults: '',
      children: '',
      babies: '',
      minDays: '',
      maxDays: ''
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
                  onChange={this.handleChange}
                  value="Ida"
                  defaultChecked={this.state.isRoundTrip === false}
                />
                <label className="form-check-label check" for="inlineRadio1">Só Ida</label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  name="inlineRadioOptions"
                  id="inlineRadio2"
                  value="Ida e Volta"
                  defaultChecked={this.state.isRoundTrip}
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
                <div className="form-group col-md-3 font">
                  <select
                    className="custom-select font"
                    name="month"
                    onChange={this.handleChange}
                    value={this.state.month}>

                    <option value="0" disabled selected hidden>Selecione o mês de partida</option>
                    <option value="1">Janeiro</option>
                    <option value="2">Fevereiro</option>
                    <option value="3">Março</option>
                    <option value="4">Abril</option>
                    <option value="5">Maio</option>
                    <option value="6">Junho</option>
                    <option value="7">Julho</option>
                    <option value="8">Agosto</option>
                    <option value="9">Setembro</option>
                    <option value="10">Outubro</option>
                    <option value="11">Novembro</option>
                    <option value="12">Dezembro</option>
                  </select>
                </div>

                <div className="form-group col-md-3">
                  <select
                    className="custom-select"
                    name="year"
                    onChange={this.handleChange}
                    value={this.state.year} >
                    <option value="" disabled selected hidden>Selecione o ano da partida</option>
                    <option value="2018">2018</option>
                    <option value="2019">2019</option>
                    <option value="2020">2020</option>
                  </select>
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


              <div className="form-row justify-content-center" style={{marginTop: "15px"}}>
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