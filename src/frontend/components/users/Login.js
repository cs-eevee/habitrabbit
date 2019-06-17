import React, { useState } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Redirect } from 'react-router-dom';

import { loginUser } from './actions';

const LoginContainer = styled.form`
  display: grid;
  justify-items: center;
  align-items: center;
`;

const Login = props => {
  const { loginUser, loggedIn } = props;
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

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
    <LoginContainer onSubmit={handleLoginSubmit}>
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
      <input type="submit" className="login-button" value="Login" />
    </LoginContainer>
  );
};

const mapStateToProps = state => ({
  currentUserId: state.users.currentUserId,
  loggedIn: state.users.loggedIn,
});
const mapDispatchToProps = dispatch => bindActionCreators({ loginUser }, dispatch);
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
