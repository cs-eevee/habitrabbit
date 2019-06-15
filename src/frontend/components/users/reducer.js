import LOGIN_USER from './actions';

// set up initial state
const initialState = {
  currentUser: 'jun',
};

// set up function to return new state to the store

export default function(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case LOGIN_USER:
      return {
        ...state,
      };
    default:
      return state;
  }
}
