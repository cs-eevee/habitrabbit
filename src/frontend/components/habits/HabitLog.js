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
  const { toggleHabit } = props;
  return (
    <div>
      <div>HabitLog</div>
      <button onClick={toggleHabit}>toggleHabit</button>
    </div>
  );
};

export default HabitLog;
