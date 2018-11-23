import React, { Component } from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { getUsers } from '../../actions/example-actions';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedMonth: new Date().getM
    }
  }
  componentDidMount() {
    // Call action example:
    // this.props.actions.getUsers();

    // Use users from redux example:
    // console.log(this.props.user);
  }

  render() {
    return (
      <div id="home-page">
        <div class="title">
          <h1>Aperte o cinto, sua passagem ideal está na próxima tela.</h1>
          <h1>Bambusque!</h1>
        </div>
        <div class="row justify-content-center">
          <div class="col-10">
            <form class="form">

              <div class="form-check form-check-inline radio-margin">
                <input class="form-check-input" type="radio" id="inlineRadio1" value="Ida" />
                <label class="form-check-label check" for="inlineRadio1">Só Ida</label>
              </div>
              <div class="form-check form-check-inline">
                <input class="form-check-input" type="radio" id="inlineRadio2" value="Ida e Volta" />
                <label class="form-check-label check" for="inlineRadio2">Ida e Volta</label>
              </div>

              <div class="form-row origin-destiny">
                <div class="col">
                  <input type="text" class="form-control" placeholder="Origem" />
                </div>
                <div class="col">
                  <input type="text" class="form-control" placeholder="Destino" />
                </div>
              </div>

              <div class="form-row">
                <div class="form-group col-md-3">
                  <select class="custom-select">
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

                <div class="form-group col-md-3">
                  <select class="custom-select">
                    <option value="" disabled selected hidden>Selecione o ano da partida</option>
                    <option value="2018">2018</option>
                    <option value="2019">2019</option>
                    <option value="2020">2020</option>
                  </select>
                </div>

                <div class="form-group col-md-2">
                  <input type="number" class="form-control" placeholder="Adultos" />
                </div>
                <div class="form-group col-md-2">
                  <input type="number" class="form-control" placeholder="Crianças" />
                </div>
                <div class="form-group col-md-2">
                  <input type="number" class="form-control" placeholder="Bebês" />
                </div>
              </div>

              <p class="how-long">Por quantos dias deseja viajar?</p>


              <div class="form-row justify-content-center">
                <div class="align-text-amount">
                  <p>DE</p>
                </div>

                <div class="form-group col-md-1">
                  <input type="number" class="form-control" />
                </div>
                <div class="align-text-amount">
                  <p>À</p>
                </div>

                <div class="form-group col-md-1">
                  <input type="number" class="form-control" />
                </div>

                <div class="align-text-amount">
                  <p>DIAS</p>
                </div>

              </div>
              <div class="align-button">
                <button type="submit" class="btn btn-success text">BAMBUSCAR!</button>
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