import { combineReducers } from 'redux';

import habits from './components/habits/reducer';

const rootReducer = combineReducers({
  habits,
});

export default rootReducer;
