import 'babel-polyfill';
import { polyfill }                               from 'es6-promise';
import Immutable                                  from 'immutable';
import React                                      from 'react';
import { render }                                 from 'react-dom';
import {
  Router,
  Route,
  IndexRoute,
  hashHistory
}                                                 from 'react-router';
import { Provider }                               from 'react-redux';
import { compose, createStore, applyMiddleware }  from 'redux';
import createSagaMiddleware                       from 'redux-saga';
import { routerMiddleware, syncHistoryWithStore } from 'react-router-redux';

/**
 * PAGES
 */

import App        from 'containers/app/app';
import Home       from 'containers/home/home';
import SamplePage from 'containers/sample/sample';

/**
 * GLOBAL CONFIG FILES
 */

import reducers                                   from './reducers';
import RootSaga                                   from './sagas';


// Polyfilling promises
polyfill();

const sagaMiddleware = createSagaMiddleware();

// MIDDLEWARE
const middlewares = [
  sagaMiddleware,
  routerMiddleware(hashHistory)
];

const enhancers = [
  applyMiddleware(...middlewares)
  // Devtools could go here
];

const initialState = Immutable.Map();

const store = createStore(
  reducers,
  initialState,
  compose(...enhancers)
);

const history = syncHistoryWithStore(hashHistory, store, {
  selectLocationState (state) {
    return state.get('routing').toObject();
  }
});

// Create hook for async sagas
store.runSaga = sagaMiddleware.run;
store.asyncSagas = {};

// Run sagas
sagaMiddleware.run(RootSaga);

window.store = store;

render(
  <Provider store={ store }>
    <Router history={ history }>
      <Route path="/" component={ App }>
        <IndexRoute component={ Home } />
        <Route path="sample" component={ SamplePage } />
    </Router>
  </Provider>, document.getElementById('container'));
