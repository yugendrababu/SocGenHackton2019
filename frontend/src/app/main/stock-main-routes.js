import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';

import App from '../stock-app-component';
import config from '../../config/stock-config';
import NoMatch from './stock-no-match-component';

const { basePath } = config.path;

const Main = () =>
  <Router>
    <Switch>
      <Route exact={true} path={`${basePath}/home`} component={App} />
      <Route component={NoMatch} />
    </Switch>
  </Router>;

export default Main;
