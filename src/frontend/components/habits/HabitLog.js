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
    margin: 20px;
    background: mistyrose;
    border-radius: 10px;
    padding: 10px;

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
    flex-direction: row;
    justify-content: center;
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
          <p className="fancy">{date}</p>
        </LogContainer>
      );
    });
  };
  const { participants, log } = props.habit;
  console.log('props in habitlog:', participants);

  return (
    <div>
      <div>HabitLog</div>
      <HabitParticipants participants={participants} />
      <LogsContainer>{log && renderHabitLogs()}</LogsContainer>
    </div>
  );
};

export default HabitLog;
