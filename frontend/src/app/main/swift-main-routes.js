import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';

import App from '../swift-app-component';
import config from '../../config/swift-config';
import NoMatch from './swift-no-match-component';

const { basePath } = config.path;

const Main = () =>
  <Router>
    <Switch>
      <Route exact={true} path={`${basePath}/home`} component={App} />
      <Route component={NoMatch} />
    </Switch>
  </Router>;

export default Main;
