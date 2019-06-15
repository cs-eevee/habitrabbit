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

const HabitLog = props => {
  /**
   * Maps over a list of habit logs and renders habit's logs
   * with checked/unchecked
   *
   * @return {array} list of user's habits rendered in JSX
   *
   * @example
   * renderHabitLogs()
   */

  const renderHabitLogs = () => {
    const { habit, habitIndex, toggleHabit } = props;
    return habit.log.map(({ date, checked }, logIndex) => {
      return (
        <div>
          <p>{date}</p>
          <p>{checked ? 'checked' : 'not checked'}</p>
          <button onClick={() => toggleHabit(habitIndex, logIndex, habit)}>toggleHabit</button>
        </div>
      );
    });
  };

  return (
    <div>
      <div>HabitLog</div>
      {renderHabitLogs()}
    </div>
  );
};

export default HabitLog;
