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

import { ADD_HABIT, TOGGLE_HABIT, NEW_MESSAGE } from './actions';

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
  { date: '2019-06-12T04:00:01.665Z', checked: false },
  { date: '2019-06-12T04:00:01.665Z', checked: false },
  { date: '2019-06-12T04:00:01.665Z', checked: false },
  { date: '2019-06-12T04:00:01.665Z', checked: false },
];

const chat = [
  {
    author: 'bruce',
    text: 'Hey whats up guys',
  },
  {
    author: 'rachel',
    text: 'Lets code for a long time!',
  },
  {
    author: 'jun',
    text: 'ok ^___^',
  },
  {
    author: 'esther',
    text: 'notion...lotion!',
  },
];

const dummyHabit = {
  user: bruce,
  name: 'code',
  startDate: '2019-05-15T04:00:01.665Z',
  endDate: '2019-06-15T04:00:01.665Z',
  participants: [esther, jun, rachel],
  log: logs,
  chat,
  habitId: 23834,
};

const dummyHabits = [];

for (let i = 0; i < 2; i += 1) {
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
      const { name, startDate, endDate, participants, habitId, userId } = payload;
      const newLogs = generateLogs(startDate, endDate);
      const habitObj = {
        userId,
        name,
        startDate,
        endDate,
        participants,
        logs: newLogs,
        chat: [],
        habitId,
      };
      habitsCopy.push(habitObj);
      return { ...state, habits: habitsCopy };
    case TOGGLE_HABIT:
      const { habitIndex, logIndex, habit } = payload;
      const habitCopy = Object.assign({}, habit);
      habitCopy.log[logIndex].checked = !habitCopy.log[logIndex].checked;
      habitsCopy[habitIndex] = habitCopy;
      return { ...state, habits: habitsCopy };
    case NEW_MESSAGE:
      console.log(NEW_MESSAGE, payload);
      const newMessage = {
        author: payload.username,
        text: payload.message,
      };
      habitsCopy[payload.habitIndex].chat.push(newMessage);
      return {
        ...state,
        habits: habitsCopy,
      };
    default:
      return state;
  }
}

function generateLogs(startDate, endDate) {
  const dates = [];
  const endingDate = new Date(endDate);
  const currentDate = new Date(startDate);
  dates.push({ date: new Date(startDate), checked: false });
  while (currentDate.toDateString() !== endingDate.toDateString()) {
    const newCurrentDate = currentDate.setDate(currentDate.getDate() + 1);
    dates.push({ date: new Date(newCurrentDate), checked: false });
  }
  return dates;
}
