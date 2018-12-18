import React from 'react';
// eslint-disable-next-line
import { Switch, Route } from 'react-router-dom';

import Home from './components/home-page/index';
import Calendar from './components/calendar/index';

export default (
  <Switch>
    <Route path="/" exact component={Home}   />
    <Route path="/calendar" exact component={Calendar}   />
  </Switch>
);