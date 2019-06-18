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
import styled from 'styled-components';
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

  const LogContainer = styled.div`
    display: flex;
    flex-direction: column;
    border-width: 1px 0.5px 1px 0.5px;
    border-style: solid;
    padding: 10px;
    border-color: grey;
    .fancy {
      font-style: italic;
      font-weight: 700;
      color: tangerine;
    }
  `;
  const LogsContainer = styled.div`
    display: flex;
    flex-direction: row;
  `;

  const CheckboxContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    font-size: 12px;
  `;

  // const Button = styled.button`
  //   background: ${props => props.backgroundColor};
  //   border: none;
  // `;

  const renderHabitLogs = () => {
    const { habit, habitIndex, toggleHabit } = props;
    return habit.log.map(({ date, checked }, logIndex) => {
      return (
        <LogContainer key={logIndex}>
          <CheckboxContainer>
            <p className="fancy">{date}</p>
            <input
              type="checkbox"
              checked={checked}
              onClick={() => toggleHabit(habitIndex, logIndex, habit)}
            />
          </CheckboxContainer>
          {/* <Button
            backgroundColor="dodgerblue"
            onClick={() => toggleHabit(habitIndex, logIndex, habit)}
          >
            toggleHabit
          </Button> */}
        </LogContainer>
      );
    });
  };
  const { participants, log } = props.habit;

  return (
    <div>
      <div>HabitLog</div>
      <HabitParticipants participants={participants} />
      <LogsContainer>{log && renderHabitLogs()}</LogsContainer>
    </div>
  );
};

export default HabitLog;
