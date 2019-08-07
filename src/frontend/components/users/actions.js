export const LOGIN_USER = 'LOGIN_USER';
export const LOGOUT_USER = 'LOGOUT_USER';
export const GOOGLE_LOGIN = 'GOOGLE_LOGIN';
export const CREATE_USER = 'CREATE_USER';

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
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(response => {
        return response.json();
      })
      .then(user => {
        return dispatch({
          type: LOGIN_USER,
          payload: { username: user.username, userId: user.id },
        });
      })
      .catch(err => {
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
    fetch('/api/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(response => {
        return response.json();
      })
      .then(user => {
        console.log(user);
        return dispatch({
          type: LOGIN_USER,
          payload: { username: user.username, userId: user.password },
        });
      })
      .catch(err => {
        alert('🐰 did not find user with that password');
      });
  };
}

export function googleLogin() {
  return function(dispatch) {
    fetch('/api/auth/google', {
      method: 'GET',
    })
      .then(response => {
        return response.json();
      })
      .then(user => {
        console.log(user);
        return dispatch({
          type: LOGIN_USER,
          payload: { username: user.username, userId: user.id },
        });
      })
      .catch(err => {
        console.log(err);
        alert('🐰 did not find user with that password');
      });
  };
}
