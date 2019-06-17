import { LOGIN_USER } from './actions';

// set up initial state
const initialState = {
  currentUsername: '',
  currentUserId: '',
  loggedIn: false,
};

// set up function to return new state to the store

export default function(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case LOGIN_USER:
      const { username, userId } = payload;
      return {
        ...state,
        currentUsername: username,
        currentUserId: userId,
        loggedIn: true,
      };
    default:
      return state;
  }
}
