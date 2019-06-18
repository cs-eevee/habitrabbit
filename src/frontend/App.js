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
import AppContainer from './components/AppContainer';
import rootReducer from './rootReducer';
import styled from 'styled-components';

const middleware = [logger, thunk];

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(...middleware)));

const Header = styled.div`
  font-family: American Typewriter;
  font-size: 28px;
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
