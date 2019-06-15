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

const dummyHabit = {
  user: bruce,
  name: 'code',
  startDate: '2019-05-15T04:00:01.665Z',
  endDate: '2019-06-15T04:00:01.665Z',
  participants: [esther, jun, rachel],
  log: logs,
};

const dummyHabits = [];

for (let i = 0; i < 5; i += 1) {
  dummyHabits.push(dummyHabit);
}

const initialState = {
  habits: dummyHabits,
};

export default function(state = initialState, action) {
  const { type, payload } = action;
  const { habits } = state;
  const habitsCopy = [...habits];
  switch (type) {
    case ADD_HABIT:
      const { name, startDate, endDate, participants, currentUser } = payload;
      const user = {
        name: currentUser,
      };
      const habitObj = {
        user,
        name,
        startDate,
        endDate,
        participants,
        logs: [],
      };
      habitsCopy.push(habitObj);
      return { ...state, habits: habitsCopy };
    case TOGGLE_HABIT:
      const { habitIndex, logIndex, habit } = payload;
      const habitCopy = Object.assign({}, habit);
      habitCopy.log[logIndex].checked = !habitCopy.log[logIndex].checked;
      habitsCopy[habitIndex] = habitCopy;
      return { ...state, habits: habitsCopy };
    default:
      return state;
  }
}
