/**
 * ************************************
 *
 * @module rootReducer.js
 * @author Esther and Bruce
 * @date 6/14/2019
 * @description simply a place to combine reducers
 *
 * ************************************
 */

import { combineReducers } from 'redux';

import habits from './components/habits/reducer';

const rootReducer = combineReducers({
  habits,
});

export default rootReducer;
