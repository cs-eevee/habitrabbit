/**
 * ************************************
 *
 * @module actions.js
 * @author Esther and Bruce
 * @date 6/14/2019
 * @description action creators for users
 *
 * ************************************
 */

import users from './users.json'; // For dummy users, not necessary now that we pull users from db

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
    const user = users.find(user => {
      return user.username === username && user.password === password;
    });
    if (user) {
      return dispatch({
        type: LOGIN_USER,
        payload: user.userId,
      });
    }
    alert('🐰 did not find user with that password');
  };
}
