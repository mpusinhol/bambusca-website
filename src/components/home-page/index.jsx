import React, { Component } from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { getUsers } from '../../actions/example-actions';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isRoundTrip: 'Ida',
      origin: '',
      destiny: '',
      month: '',
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
    // Call action example:
    // this.props.actions.getUsers();

    // Use users from redux example:
    // console.log(this.props.user);
  }

  handleClick(){
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
                  defaultChecked={this.state.isRoundTrip ==="Ida"}
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
                  defaultChecked={this.state.isRoundTrip ==="Ida e Volta"}
                />
                <label className="form-check-label check" for="inlineRadio2">Ida e Volta</label>
              </div>

              <div className="form-row origin-destiny">
                <div className="col">
                  <input
                    type="text"
                    className="form-control" 
                    placeholder="Origem"
                    name="origin"
                    onChange={this.handleChange}
                    value={this.state.origin}
                  />
                </div>
                <div className="col">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Destino"
                    name="destiny"
                    onChange={this.handleChange}
                    value={this.state.destiny}
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

                    <option value="" disabled selected hidden>Selecione o mês de partida</option>
                    <option value="Janeiro">Janeiro</option>
                    <option value="Fevereiro">Fevereiro</option>
                    <option value="Março">Março</option>
                    <option value="Abril">Abril</option>
                    <option value="Maio">Maio</option>
                    <option value="Junho">Junho</option>
                    <option value="Julho">Julho</option>
                    <option value="Agosto">Agosto</option>
                    <option value="Setembro">Setembro</option>
                    <option value="Outubro">Outubro</option>
                    <option value="Novembro">Novembro</option>
                    <option value="Dezembro">Dezembro</option>
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


              <div className="form-row justify-content-center">
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
    users: state.Example
  };
};

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Object.assign({}, { getUsers }), dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);