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
import styled from 'styled-components';

const DetailsContainer = styled.div`
  display: flex;
  justify-content: spaced-between;
`;
const Name = styled.div``;
const Date = styled.div`
  display: flex;
  flex-direction: row;
`;

const HabitDetails = props => {
  const RenderHabitDetails = () => {
    const { name, startDate, endDate } = props;
    return (
      <DetailsContainer>
        <Name>Task: {name}</Name>
        <Date>
          <div>Start Date: {startDate}</div>
          <div>End Date: {endDate}</div>
        </Date>
      </DetailsContainer>
    );
  };
  return <div>{RenderHabitDetails()}</div>;
};

export default HabitDetails;
