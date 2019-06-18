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

import users from './users.json';

export const LOGIN_USER = 'LOGIN_USER';
export const LOGOUT_USER = 'LOGOUT_USER';

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
