/**
 * ************************************
 *
 * @module AppContainer.js
 * @author Esther and Bruce
 * @date 6/14/2019
 * @description container component for overall app
 *
 * ************************************
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import styled from 'styled-components';

import HabitContainer from './habits/HabitContainer';
import AddHabit from './habits/AddHabit';
import Toggle from './Toggle';
import { getHabits } from './habits/actions';

const Button = styled.button`
  height: 30px;
  background-color: #b2ca97;
  border-radius: 8px;
  border-color: #404c32;
`;

class AppContainer extends Component {
  constructor() {
    super();
    this.state = {
      addHabitVisible: false,
    };
  }

  /**
   * Maps over a list of habit containers and renders user's habits
   *
   * @return {array} list of user's habits rendered in JSX
   *
   * @example
   * renderHabitContainers()
   */

  renderHabitContainers = () => {
    const { habits, currentUsername, currentUserId } = this.props;
    return habits.map((habit, index) => {
      return (
        <HabitContainer
          key={index}
          habitIndex={index}
          habit={habit}
          username={currentUsername}
          userId={currentUserId}
        />
      );
    });
  };

  toggleAddHabitVisibility = () => {
    this.setState({
      addHabitVisible: true,
    });
  };

  toggleAddHabitVisibility = () => {
    this.setState({
      addHabitVisible: true,
    });
  };

  render() {
    const { addHabitVisible } = this.state;
    return (
      <div>
        <button onClick={this.toggleAddHabitVisibility}>Add Habit</button>
        <AddHabit visible={addHabitVisible} />
        {this.renderHabitContainers()}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  habits: state.habits.habits,
  currentUsername: state.users.currentUsername,
  currentUserId: state.users.currentUserId,
});

export default connect(mapStateToProps)(AppContainer);
