/**
 * ************************************
 *
 * @module Login.js
 * @author Bruce
 * @date 6/16/2019
 * @description container component for login
 *
 * ************************************
 */

import React, { useState } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Redirect } from 'react-router-dom';
import googleLogo from '../../assets/google-alt.png';
import { loginUser, googleLogin, createUser } from './actions';

const LoginContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: space-evenly;
  width: 30%;
`;

const LoginButton = styled.input`
  height: 20px;
  width: 70px;
  text: black;
  background-color: #b2ca97;
  border-radius: 4px;
  border-color: #404c32;
`;

const Login = props => {
  const { loginUser, createUser, loggedIn, googleLogin } = props;
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleAuthClick = event => {
    // event.preventDefault();
    //window.location = 'http://localhost:3000/api/auth/google';
    googleLogin();
  };

  const handleSignUpSubmit = event => {
    event.preventDefault();
    createUser(username, password);
  };

  const handleLoginSubmit = event => {
    event.preventDefault();
    loginUser(username, password);
  };
  const handleUsernameChange = event => {
    setUsername(event.target.value);
  };
  const handlePasswordChange = event => {
    setPassword(event.target.value);
  };

  if (loggedIn === true) {
    return <Redirect to="/habits/" />;
  }

  return (
    <LoginContainer>
      <div id="oAuthDiv">
        <button type="button" onClick={handleAuthClick}>
          <img src={googleLogo} alt="Google Sign In" />
        </button>
      </div>
      <div id="localLoginDiv">
        <form id="localLoginForm" onSubmit={handleLoginSubmit}>
          <input
            type="text"
            className="username-input"
            placeholder="Enter username"
            onChange={handleUsernameChange}
          />
          <input
            type="password"
            className="password-input"
            placeholder="Enter password"
            onChange={handlePasswordChange}
          />
          <LoginButton type="submit" className="login-button" value="Login" />
        </form>
      </div>
      <div id="localSignUpDiv">
        <form id="localSignUpForm" onSubmit={handleSignUpSubmit}>
          <input
            type="text"
            className="username-input"
            placeholder="Enter username"
            onChange={handleUsernameChange}
          />
          <input
            type="password"
            className="password-input"
            placeholder="Enter password"
            onChange={handlePasswordChange}
          />
          <LoginButton type="submit" className="login-button" value="SignUp" />
        </form>
      </div>
    </LoginContainer>
  );
};

const mapStateToProps = state => ({
  currentUserId: state.users.currentUserId,
  loggedIn: state.users.loggedIn,
});
const mapDispatchToProps = dispatch =>
  bindActionCreators({ loginUser, googleLogin, createUser }, dispatch);
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
