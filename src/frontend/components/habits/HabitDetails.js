/**
 * ************************************
 *
 * @module HabitDetails.js
 * @author Esther and Bruce
 * @date 6/14/2019
 * @description component that holds participate and date information
 *
 * ************************************
 */

import React from 'react';

const HabitDetails = props => {
  const RenderHabitDetails = () => {
    const { name, startDate, endDate } = props;
    console.log('name', name);
    return (
      <div>
        <p>Name:{name}</p>
        <p>Start Date: {startDate}</p>
        <p>End Date: {endDate}</p>
      </div>
    );
  };
  return (
    <div>
      <div>Habit Details</div>
      {RenderHabitDetails()}
    </div>
  );
};

export default HabitDetails;
