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

/* === BEGIN DUMMY DATA INITIALIZATION  === */
import { ADD_HABIT, TOGGLE_HABIT, GET_HABITS, SET_HABITS } from './actions';

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
  { date: 'Sun, Jun 9th, 2019', checked: true },
  { date: 'Sun, Jun 9th, 2019', checked: true },
  { date: 'Sun, Jun 9th, 2019', checked: false },
  { date: 'Sun, Jun 9th, 2019', checked: false },
  { date: 'Sun, Jun 9th, 2019', checked: false },
  { date: 'Sun, Jun 9th, 2019', checked: false },
  { date: 'Sun, Jun 9th, 2019', checked: false },
];

const dummyHabit = {
  user: bruce,
  name: 'code',
  startDate: '2019-05-15T04:00:01.665Z',
  endDate: '2019-06-15T04:00:01.665Z',
  participants: [],
  // log: logs,
};

const dummyHabits = [];

for (let i = 0; i < 2; i += 1) {
  dummyHabits.push(dummyHabit);
}

const initialState = {
  habits: [],
};
/* === END DUMMY DATA INITIALIZATION  === */

export default function(state = initialState, action) {
  const { type, payload } = action;
  const { habits } = state;
  const habitsCopy = [...habits];
  switch (type) {
    case SET_HABITS:
      return {
        ...state,
        habits: payload,
      };
    case GET_HABITS:
      return {
        ...state,
        habits: payload,
      };
    case ADD_HABIT:
      const { name, startDate, endDate, participants, currentUser } = payload;
      const user = {
        name: currentUser,
      };
      const newLogs = generateLogs(startDate, endDate);
      const habitObj = {
        user,
        name,
        startDate,
        endDate,
        participants,
        logs: newLogs,
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

/**
 * Generates date in the correct format (e.g., Mon, 6/17)
 *
 * @param {string} date - A string param
 * @return {string} - string
 *
 * @example
 * formateDate(date)
 */

function formatDate(date) {
  const day = ['Sun', 'Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat'];
  return `${day[date.getDay()]}, ${date.getMonth()}/${date.getDate()}`;
}

/**
 * Generates an array of object of dates between startDate and endDate
 *
 * @param {string} startDate, endDate - A string param
 * @return [object] - Array of object
 *
 * @example
 * generateLogs(startDate, endDate)
 */

function generateLogs(startDate, endDate) {
  const dates = [];
  const endingDate = new Date(endDate);
  const currentDate = new Date(startDate);
  dates.push({ date: formatDate(new Date(startDate)), checked: false });
  while (currentDate.toDateString() !== endingDate.toDateString()) {
    const newCurrentDate = currentDate.setDate(currentDate.getDate() + 1);
    dates.push({ date: formatDate(new Date(newCurrentDate)), checked: false });
  }
  return dates;
}
