import React, { Component, Fragment } from 'react';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';

import configureStore from './config/configureStore';
import createHistory from 'history/createBrowserHistory';

import Header from './components/common/Header';
import routes from './routes';
import Footer from './components/common/Footer';

import 'bootstrap/dist/css/bootstrap.css';
import './styles/css/styles.css';

const store = configureStore();
const history = createHistory();

class App extends Component {
  render() {
    return (
      <div id="main-app">
        <Provider store={store}>
          <Fragment>
            <Header />
            <div id="body">
              <Router history={history}>
                {routes}
              </Router>
            </div>
            <Footer />
          </Fragment>
        </Provider>
      </div>
    )
  }
}

export default App
