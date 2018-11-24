import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Autocomplete from '../autocomplete/index';

import { getUsers } from '../../actions/example-actions';

const autcompleteStyles = {
    width: "300px"
};

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
        <div className="form" style={{margin: "10px 200px 0 0"}}>
          <Autocomplete styles={autcompleteStyles}/>
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