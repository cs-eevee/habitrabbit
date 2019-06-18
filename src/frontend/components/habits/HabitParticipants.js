/**
 * ************************************
 *
 * @module HabitParticipants.js
 * @author Esther and Bruce
 * @date 6/14/2019
 * @description component to hold participants
 *
 * ************************************
 */

import React from 'react';
import styled from 'styled-components';

const ParticipantsContainer = styled.div`
  display: flex;
`;
const Participant = styled.div`
  display: flex;
  border-radius: 10% 30% 50% 70%;
  border: 1px solid grey;
  padding: 5px;
  margin: 10px;
`;
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
      return <Participant>{participant.name}</Participant>;
    });
  };

  return <ParticipantsContainer>{renderParticipants()}</ParticipantsContainer>;
};

export default HabitParticipants;
