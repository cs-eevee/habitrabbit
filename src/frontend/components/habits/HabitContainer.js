/* eslint-disable no-unused-vars */
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
<<<<<<< HEAD
import { toggleHabit, sendMessage } from './actions';
import Chat from './Chat.js';
=======
import { toggleHabit, sendMessage, getHabits } from './actions';
import Chat from './Chat';
>>>>>>> 23d37feae9a672a4263def1f857a8f2238386db7

class HabitContainer extends Component {
  constructor() {
    super();
  }

  render() {
    const {
      toggleHabit,
      habit,
      habitIndex,
      habitDescription,
      habitId,
      endDate,
      startDate,
      logs,
    } = this.props;
    // const { name, startDate, endDate, habitId } = this.props.habit;
    return (
      <div>
        <HabitDetails name={habit} startDate={startDate} endDate={endDate} />
        <HabitLog
          logs={logs}
          toggleHabit={toggleHabit}
          habit={habit}
          habitIndex={habitIndex}
          habitId={habitId}
        />
        {/* <Chat
          messages={habit.chat}
          username={username}
          userId={userId}
          sendMessage={sendMessage}
          habitIndex={habitIndex}
          habitId={habitId}
        /> */}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  // startDate: state.habits.startDate,
  // endDate: state.habits.endDate,
  // participants: state.habits.participants,
  // log: state.habits.log,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ toggleHabit, sendMessage, getHabits }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HabitContainer);
