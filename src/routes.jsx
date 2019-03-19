import React from 'react';
// eslint-disable-next-line
import { Switch, Route } from 'react-router-dom';

import Home from './components/home-page/index';
import Calendar from './components/calendar/index';
import AboutUs from './components/footer-pages/AboutUs';
import PolicyPrivacy from './components/footer-pages/PolicyPrivacy';

export default (
  <Switch>
    <Route path="/" exact component={Home}   />
    <Route path="/calendar" exact component={Calendar}   />
    <Route path="/aboutus" exact component={AboutUs} />
    <Route path="/policy" exact component={PolicyPrivacy} />
  </Switch>
);