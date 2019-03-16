import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import Main from 'app/main/stock-main-routes';
import configureStore from './store';

import 'app/stock-app.scss';

const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <Main/>
  </Provider>,
  document.querySelector('.stock-container')
);
