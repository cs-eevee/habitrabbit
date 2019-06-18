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
export const GET_HABITS = 'GET_HABITS';
export const SET_HABITS = 'SET_HABITS';

/**
 * Get habits from database
 *
 * @return
 *
 * @example
 * getHabits()
 */

export function getHabits() {
  return function(dispatch) {
    fetch('/api/getHabits', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(habits => {
        return dispatch({ type: SET_HABITS, payload: habits });
      });
  };
}
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
  const data = {
    habitTitle: name,
    userId: currentUserId,
    startDate,
    endDate,
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
        const getDates = () =>
          function(start_date, end_date) {
            const dates = [];
            let currentDate = startDate;
            const addDays = function(days) {
              const date = new Date(this.valueOf());
              date.setDate(date.getDate() + days);
              return date;
            };
            while (currentDate <= endDate) {
              dates.push(currentDate);
              currentDate = addDays.call(currentDate, 1);
            }
            return dates;
          };
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
