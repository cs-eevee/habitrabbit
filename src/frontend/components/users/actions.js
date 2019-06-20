export const LOGIN_USER = 'LOGIN_USER';
export const LOGOUT_USER = 'LOGOUT_USER';

/**
 * Login a user by checking credentials in db
 *
 * @param {string} username - username entered by user
 * @param {string} password - password entered by user
 * @return {object} action object of type LOGIN_USER and payload of the user's user id if found in db
 *
 */
export function loginUser(username, password) {
  return function(dispatch) {
    const data = {
      username,
      password,
    };
    fetch('/api/login', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(response => response.json())
      .then(user => {
        console.log(user);
        return dispatch({
          type: LOGIN_USER,
          payload: { username: user.username, userId: user._id },
        });
      })
      .catch(err => {
        console.log(err);
        alert('🐰 did not find user with that password');
      });
  };
}

export function createUser(username, password) {
  return function(dispatch) {
    const data = {
      username,
      password,
    };
    fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(response => response.json())
      .then(user => {
        console.log(user);
        return dispatch({
          type: LOGIN_USER,
          payload: { username: user.username, userId: user._id },
        });
      })
      .catch(err => {
        console.log(err);
        alert('🐰 did not find user with that password');
      });
  };
}

export function googleLogin(username, password) {
  return function(dispatch) {
    const data = {
      username,
      password,
    };
    fetch('/api/auth/google', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(response => response.json())
      .then(user => {
        console.log(user);
        return dispatch({
          type: LOGIN_USER,
          payload: { username: user.username, userId: user._id },
        });
      })
      .catch(err => {
        console.log(err);
        alert('🐰 did not find user with that password');
      });
  };
}




