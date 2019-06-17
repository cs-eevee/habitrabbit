/**
 * ************************************
 *
 * @module actions.js
 * @author Esther and Bruce
 * @date 6/14/2019
 * @description action creators for habits
 *
 * ************************************
 */

import { sendMessage } from '../socket';

export const ADD_HABIT = 'ADD_HABIT';
export const TOGGLE_HABIT = 'TOGGLE_HABIT';

/**
 * Add habit to state
 *
 * @param {string} n - A string param
 * @return {string} A good string
 *
 * @example
 * addHabit('something')
 */

export function addHabit(name, startDate, endDate, participants, currentUserId) {
  const log = generateLogs(startDate, endDate);
  const data = {
    habitTitle: name,
    userId: currentUserId,
    startDate,
    endDate,
    log,
  };
  return function(dispatch) {
    fetch('/api/habits/createHabit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(response => response.json())
      .then(newHabit => {
        const { habit_title, start_date, end_date } = newHabit;
        return dispatch({
          type: ADD_HABIT,
          payload: {
            name: habit_title,
            startDate: start_date,
            endDate: end_date,
            participants,
            currentUserId,
          },
        });
      });
  };
}

export function toggleHabit(habitIndex, logIndex, habit) {
  return {
    type: TOGGLE_HABIT,
    payload: { habitIndex, logIndex, habit },
  };
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
