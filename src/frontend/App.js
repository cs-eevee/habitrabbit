/**
 * ************************************
 *
 * @module App.js
 * @author Esther and Bruce
 * @date 6/14/2019
 * @description provides redux store and router to app
 *
 * ************************************
 */

import React from 'react';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import styled from 'styled-components';
import Login from './components/users/Login';
import configureSocket from './components/socket';
import AppContainer from './components/AppContainer';
import rootReducer from './rootReducer';

// create Redux store with dev tools and thunk middleware
const middleware = [logger, thunk];
const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(...middleware)));
export const socket = configureSocket(store.dispatch);

const Header = styled.div`
  font-family: American Typewriter;
  font-size: 28px;
  justify-content: center;
`;

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Header>habitTracker</Header>
        <Route path="/" exact component={Login} />
        <Route path="/habits/" exact component={AppContainer} />
      </Router>
    </Provider>
  );
};

export default App;
