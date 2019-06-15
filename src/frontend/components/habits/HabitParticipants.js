/**
 * ************************************
 *
 * @module HabitParticipants.js
 * @author Esther and Bruce
 * @date 6/14/2019
 * @description component to hold partipants
 *
 * ************************************
 */

import React from 'react';

const HabitParticipants = props => {
  const { participants } = props;

  /**
   * Maps over a list of participants and renders participants (aka: user)
   *
   * @return {array} list of user rendered in JSX
   *
   * @example
   * renderParticipants()
   */
  const renderParticipants = () => {
    return participants.map(participant => {
      return <div>user:{participant.name}</div>;
    });
  };

  return <div>{renderParticipants()}</div>;
};

export default HabitParticipants;
