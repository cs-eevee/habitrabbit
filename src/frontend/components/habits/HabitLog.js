/**
 * ************************************
 *
 * @module HabitLog.js
 * @author Esther and Bruce
 * @date 6/14/2019
 * @description component to holds habit log
 *
 * ************************************
 */

import React from 'react';
import HabitParticipants from './HabitParticipants';

const HabitLog = props => {
  /**
   * Maps over a list of habit logs and renders habit's logs
   * with checked/unchecked.
   *
   * @return {array} renders habit name and dates in JSX
   *
   * @example
   * renderHabitLogs()
   */

  const renderHabitLogs = () => {
    const { habit, habitIndex, toggleHabit } = props;
    return habit.log.map(({ date, checked }, logIndex) => {
      return (
        <div key={logIndex}>
          <p>{date}</p>
          <p>{checked ? 'checked' : 'not checked'}</p>
          <button onClick={() => toggleHabit(habitIndex, logIndex, habit)}>toggleHabit</button>
        </div>
      );
    });
  };
  const { participants, log } = props.habit;
  console.log('props in habitlog:', participants);

  return (
    <div>
      <div>HabitLog</div>
      <HabitParticipants participants={participants} />
      {log && renderHabitLogs()}
    </div>
  );
};

export default HabitLog;
