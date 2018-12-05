import React from 'react';
// eslint-disable-next-line
import { Switch, Route, Redirect } from 'react-router-dom';
// import { withRouter } from 'react-router';

import Home from './components/home-page/index';
import Calendar from './components/calendar/index';

export default (
  <Switch>
    <Route path="/" component={Calendar}   />
  </Switch>
);