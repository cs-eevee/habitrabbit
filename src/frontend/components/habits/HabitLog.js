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
import moment from 'moment';

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

  function formatDate(date) {
    const day = ['Sun', 'Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat'];
    return `${day[date.getDay()]}, ${date.getMonth() + 1}/${date.getDate()}`;
  }
  const { logs, toggleHabit, habit, habitIndex, habitId } = props;

  const filteredLogs = logs.filter(log => log.habit_id === habitId);

  function startOfWeek(date) {
    const diff = date.getDate() - date.getDay() + (date.getDay() === 0 ? -6 : 1);
    return new Date(date.setDate(diff));
  }

  function endOfWeek(date) {
    const lastday = date.getDate() - (date.getDay() - 1) + 6;
    return new Date(date.setDate(lastday));
  }

  function buildWeek() {
    const currentWeek = [];
    const currentDate = new Date();
    let currentStartDate = moment(startOfWeek(currentDate));
    const currentEndDate = endOfWeek(currentDate);
    let count = 0;
    let test = 0;
    // console.log(currentStartDate, 'current Start Date');
    // console.log(filteredLogs, 'filteredLogs');
    while (moment(filteredLogs[count].date).isBefore(currentStartDate)) count++;
    // console.log('slice', filteredLogs.slice(count));
    // console.log(new Date(filteredLogs[count].date).getDate());
    while (moment(currentStartDate).isBefore(moment(filteredLogs[count].date))) {
      console.log(currentStartDate, 'currentStart');
      currentWeek.push(
        <LogContainer key={filteredLogs[count].date}>
          <p className="fancy">{formatDate(new Date(currentStartDate.format()))}</p>
        </LogContainer>
      );
      currentStartDate = currentStartDate.add(1, 'days');
    }
    console.log(filteredLogs[count].date, 'log date');
    while (filteredLogs[count]) {
      console.log('test');

      if (moment(filteredLogs[count].date).isBefore(moment(currentEndDate))) {
        currentWeek.push(
          <LogContainer key={new Date(filteredLogs[count].date).getDay()}>
            <CheckboxContainer>
              <p className="fancy">{formatDate(new Date(filteredLogs[count].date))}</p>
              <input
                type="checkbox"
                checked={filteredLogs[count].checked}
                onClick={() => toggleHabit(habitIndex, logIndex, habit)}
              />
            </CheckboxContainer>
          </LogContainer>
        );
        count++;
      } else break;
    }
    console.log(currentWeek.length, 'length of currentWeek');
    if (7 - currentWeek.length !== 0) {
      const outDate = moment(filteredLogs[filteredLogs.length - 1].date);
      for (let i = 0; i < 9 - currentWeek.length; i++) {
        outDate.add(1, 'days');
        currentWeek.push(
          <LogContainer key={i}>
            <p className="fancy">{formatDate(new Date(outDate.format()))}</p>
          </LogContainer>
        );
      }
    }
    // console.log(currentWeek, 'Current Week');
    return currentWeek;
  }

  // const renderHabitLogs = () => {
  // const { logs, toggleHabit, habit, habitIndex } = props;
  // return logs.map(({ date, checked }, logIndex) => {
  //   return (
  //     <LogContainer key={logIndex}>
  //       <CheckboxContainer>
  //         <p className="fancy">{formatDate(new Date(date))}</p>
  //         <input
  //           type="checkbox"
  //           checked={checked}
  //           onClick={() => toggleHabit(habitIndex, logIndex, habit)}
  //         />
  //       </CheckboxContainer>
  //     </LogContainer>
  //   );
  // });
  // return filteredLogs.map(({ date, checked }, logIndex) => {
  //   return (
  //     <LogContainer key={logIndex}>
  //       <CheckboxContainer>
  //         <p className="fancy">{formatDate(new Date(date))}</p>
  //         <input
  //           type="checkbox"
  //           checked={checked}
  //           onClick={() => toggleHabit(habitIndex, logIndex, habit)}
  //         />
  //       </CheckboxContainer>
  //     </LogContainer>
  //   );
  // });
  // };
  // const { participants, log } = props.habit;

  return (
    <div>
      <div>HabitLog</div>
      {/* 🐞 BUG! Cannot map HabitParticipants because participants for each habit has not been implemented */}
      {/* <HabitParticipants participants={participants} /> */}
      <LogsContainer>{buildWeek()}</LogsContainer>
    </div>
  );
};

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
export default HabitLog;
