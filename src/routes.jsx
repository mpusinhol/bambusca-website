import React from 'react';
// eslint-disable-next-line
import { Switch, Route, Redirect } from 'react-router-dom';
// import { withRouter } from 'react-router';

import Home from './components/home-page/index';

export default (
  <Switch>
    <Route path="/" component={Home}   />
  </Switch>
);