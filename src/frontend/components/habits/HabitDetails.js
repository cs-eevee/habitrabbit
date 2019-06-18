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
const Name = styled.div`
  font-family: monospace;
`;
const DateDetails = styled.div`
  display: flex;
  flex-direction: row;
`;
const StartDate = styled.div`
  font-family: monospace;
`;
const EndDate = styled.div`
  font-family: monospace;
`;

const HabitDetails = props => {
  const RenderHabitDetails = () => {
    const { name, startDate, endDate } = props;
    return (
      <DetailsContainer>
        <Name>
          Task:
          {name}
        </Name>
        <DateDetails>
          <StartDate>
            Start Date:
            {startDate}
          </StartDate>
          <EndDate>
            End Date:
            {endDate}
          </EndDate>
        </DateDetails>
      </DetailsContainer>
    );
  };
  return <div>{RenderHabitDetails()}</div>;
};

export default HabitDetails;
