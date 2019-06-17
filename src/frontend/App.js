/**
 * ************************************
 *
 * @module App.js
 * @author Esther and Bruce
 * @date 6/14/2019
 * @description provides redux store to app
 *
 * ************************************
 */

import React from 'react';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Login from './components/users/Login';
import configureSocket from './components/socket';
import AppContainer from './components/AppContainer';
import rootReducer from './rootReducer';

const middleware = [logger, thunk];

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(...middleware)));
export const socket = configureSocket(store.dispatch);

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <h1> Hello Habit Rabbit!</h1>
        <Route path="/" exact component={Login} />
        <Route path="/habits/" exact component={AppContainer} />
      </Router>
    </Provider>
  );
};

export default App;
