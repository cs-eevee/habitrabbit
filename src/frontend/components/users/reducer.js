/**
 * ************************************
 *
 * @module reducer.js
 * @author Bruce
 * @date 6/16/2019
 * @description reducer to update users state
 *
 * ************************************
 */

import { LOGIN_USER } from './actions';

// set up initial state
const initialState = {
  currentUsername: '',
  currentUserId: '',
  loggedIn: true,
};

// set up function to return new state to the store

export default function(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case LOGIN_USER:
      return {
        ...state,
        currentUserId: payload.userId,
        currentUsername: payload.username,
        loggedIn: true,
      };
    default:
      return state;
  }
}
