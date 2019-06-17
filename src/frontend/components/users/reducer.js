import { LOGIN_USER } from './actions';

// set up initial state
const initialState = {
  currentUserId: '',
  loggedIn: false,
};

// set up function to return new state to the store

export default function(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case LOGIN_USER:
      return {
        ...state,
        currentUserId: payload,
        loggedIn: true,
      };
    default:
      return state;
  }
}
