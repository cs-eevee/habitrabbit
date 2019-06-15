/**
 * ************************************
 *
 * @module reducer.js
 * @author Esther and Bruce
 * @date 6/14/2019
 * @description reducer to update habit state
 *
 * ************************************
 */

import { ADD_HABIT, TOGGLE_HABIT } from './actions';

const bruce = {
  name: 'bruce',
};

const esther = {
  name: 'esther',
};

const jun = {
  name: 'jun',
};

const rachel = {
  name: 'rachel',
};

const logs = [
  { date: '2019-06-10T04:00:01.665Z', checked: true },
  { date: '2019-06-11T04:00:01.665Z', checked: true },
  { date: '2019-06-12T04:00:01.665Z', checked: false },
];

const habit = {
  user: bruce,
  name: 'code',
  startDate: '2019-05-15T04:00:01.665Z',
  endDate: '2019-06-15T04:00:01.665Z',
  participants: [esther, jun, rachel],
  log: logs,
};

const dummyHabits = [];

for (let i = 0; i < 5; i += 1) {
  dummyHabits.push(habit);
}

const initialState = {
  habits: dummyHabits,
};

export default function(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case ADD_HABIT:
      return { ...state, habits: payload };
    case TOGGLE_HABIT:
      const { habitIndex, logIndex } = payload;
      const { habits } = state;
      const habitsCopy = [...habits];
      const habitCopy = habitsCopy[habitIndex];
      const logCopy = Object.assign({}, habitCopy.log[logIndex]);
      logCopy.checked = !logCopy.checked;
      habitCopy.log[logIndex] = logCopy;
      console.log(habitsCopy);
      return { habits: habitsCopy, ...state };
    default:
      return state;
  }
}
