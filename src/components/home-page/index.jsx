import React, { Component } from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { getUsers } from '../../actions/example-actions';

class App extends Component {
  componentDidMount() {
    // Call action example:
    // this.props.actions.getUsers();

    // Use users from redux example:
    // console.log(this.props.user);
  }

  render() {
    return (
      <div id="home-page" >
        <h1>
          <div className="row">
            <p className="buscador">Buscador</p>
            &nbsp;
            <p className="flexivel">Flexível</p>
          </div>
        </h1>
        <form className="form-bambusca">
          <div className="form-group form-field">
            <div class="form-check form-check-inline check-radio">
              <input class="form-check-input " type="radio" name="inlineRadioOptions" id="inlineRadio1" value="option1" />
              <label class="form-check-label" for="inlineRadio1">Só Ida</label>
            </div>
            <div class="form-check form-check-inline check-radio">
              <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="option2" />
              <label class="form-check-label" for="inlineRadio2">Ida e Volta</label>
            </div>

            <div className="align-origin-destiny">
              <div class="form-group field">
                <input type="text" class="form-control" id="origin" placeholder="Origem" />
              </div>
              <div class="form-group field">
                <input type="text" class="form-control" id="destiny" placeholder="Destino" />
              </div>
            </div>

            <div className="align">
              <div className="month">
                <select class="custom-select">
                  <option selected>Selecione o mês de partida</option>
                  <option value="1">Janeiro</option>
                  <option value="2">Fevereiro</option>
                  <option value="3">Março</option>
                </select>
              </div>

              <div className="adults-children-babies">
                <div class="form-group size">
                  <input type="number" class="form-control" id="number-of-adults" placeholder="Adultos" />
                </div>
                <div class="form-group size">
                  <input type="number" class="form-control" id="number-of-children" placeholder="Crianças" />
                </div>
                <div class="form-group size">
                  <input type="number" class="form-control" id="number-of-babies" placeholder="Bebês" />
                </div>
              </div>
            </div>

            <p>
              Por quantos dias deseja viajar?
            </p>

            <div className="travel-days" >

              <p>
                De
            </p>
              <div class="form-group size">
                <input type="number" class="form-control" id="initial-day" placeholder="15" />
              </div>
              <p>
                Á
              </p>
              <div class="form-group size">
                <input type="number" class="form-control" id="end-day" placeholder="18" />
              </div>
              <p>
                Dias
              </p>
            </div>
            <div className="button.align">
              <button type="button">Bambuscar</button>
            </div>

          </div>
        </form>
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