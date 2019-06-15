import { ADD_HABIT } from './actions';

const initialState = {
  habits: [],
};

export default function(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case ADD_HABIT:
      //   console.log(payload);
      return { habits: payload };
    default:
      return state;
  }
}
