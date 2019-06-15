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
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import rootReducer from './rootReducer';

import AppContainer from './components/AppContainer';

const middleware = [logger, thunk];

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(...middleware)));

const App = () => (
  <Provider store={store}>
    <h1>Hello Habit Rabbit!</h1>
    <AppContainer />
  </Provider>
);

export default App;
