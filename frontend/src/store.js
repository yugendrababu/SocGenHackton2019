import { applyMiddleware, createStore, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import createSagaMiddleware from 'redux-saga';
import sagas from './sagas';

import app from 'app';

const reducers = combineReducers({
  dataSource: app.AppReducer,

});

export default function configureStore() {
  const sagaMiddleware = createSagaMiddleware();
  const middleware = composeWithDevTools(applyMiddleware(sagaMiddleware));
  const store = createStore(reducers, middleware);

  sagaMiddleware.run(sagas);

  return store;
}
