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

import { emitMessage } from '../socket';

export const ADD_HABIT = 'ADD_HABIT';
export const TOGGLE_HABIT = 'TOGGLE_HABIT';
export const SEND_MESSAGE = 'SEND_MESSAGE';
export const NEW_MESSAGE = 'NEW_MESSAGE';
export const SET_HABITS = 'SET_HABITS';
export const GET_HABITS = 'GET_HABITS';

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
 * @param {string} name - name of the habit
 * @param {string} startDate - date string of the habit start date
 * @param {string} endDate - date string of the habit end date
 * @param {string} participants - array of people to invite to your habit (not yet implemented!)
 * @param {string} currentUserId -
 * @return {object} action object of type ADD_HABIT with payload start date and end date of
 * habit, participants (empty array, not yet implemented), and id of current user
 *
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
        console.log(newHabit);
        const { habit_title, start_date, end_date, _id, user_id } = newHabit;
        return dispatch({
          type: ADD_HABIT,
          payload: {
            name: habit_title,
            startDate: start_date,
            endDate: end_date,
            participants,
            userId: user_id,
            habitId: _id,
          },
        });
      });
  };
}

/**
 * Toggle a habit checked/unchecked via each habit's log property
 *
 * @param {number} habitIndex - index position of habit in habits array
 * @param {number} logIndex - index position of log in log array of each habit
 * @param {object} endDate - an individual habit object
 * @return {object} action object of type TOGGLE_HABIT with payload of index of habit in
 * habit logs, index of habit in each habit's logs, and the habit object
 *
 */
export function toggleHabit(habitIndex, logIndex, habit) {
  return {
    type: TOGGLE_HABIT,
    payload: { habitIndex, logIndex, habit },
  };
}

export function sendMessage(message, username, habitIndex, habitId, userId) {
  const data = {
    text: message,
    userId,
  };
  fetch(`/api/habits/chat/${habitId}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then(response => response.json())
    .then(chatMessage => {
      console.log(chatMessage);
      emitMessage(chatMessage);
    });
}

export function getMessages(habitId) {
  return function(dispatch) {
    fetch(`/api/habits/chat/${habitId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(chatMessage => {
        console.log(chatMessage);
        return dispatch({
          type: NEW_MESSAGE,
          payload: chatMessage,
        });
      });
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
