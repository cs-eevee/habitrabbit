/**
 * ************************************
 *
 * @module HabitContainer.js
 * @author Esther and Bruce
 * @date 6/14/2019
 * @description container component for habit
 *
 * ************************************
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import styled from 'styled-components';
import HabitDetails from './HabitDetails';
import HabitLog from './HabitLog';
import { toggleHabit, sendMessage } from './actions';
import Chat from './Chat';

class HabitContainer extends Component {
  constructor() {
    super();
    // this.state = {};
  }

  render() {
    const { toggleHabit, habit, habitIndex, username, userId } = this.props;
    const { name, startDate, endDate, habitId } = this.props.habit;
    return (
      <div>
        <HabitDetails name={name} startDate={startDate} endDate={endDate} />
        <HabitLog habitIndex={habitIndex} toggleHabit={toggleHabit} habit={habit} />
        <Chat
          messages={habit.chat}
          username={username}
          userId={userId}
          sendMessage={sendMessage}
          habitIndex={habitIndex}
          habitId={habitId}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  startDate: state.habits.startDate,
  endDate: state.habits.endDate,
  participants: state.habits.participants,
  log: state.habits.log,
});

const mapDispatchToProps = dispatch => bindActionCreators({ toggleHabit, sendMessage }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HabitContainer);
