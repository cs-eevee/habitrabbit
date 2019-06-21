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
      logs: [],
      habits: [],
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

  componentDidMount() {
    const data = {
      userId: 2,
    };
    fetch('/api/getHabits', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(res => res.json())
      .then(res => {
        // console.log('data', data.Logs);
        this.setState({
          logs: res.Logs,
          habits: res.Habits,
        });
        return res;
      })
      // .then(something => console.log('something', something))
      .catch(err => console.log(err));
  }

  renderHabitContainers = () => {
    console.log('this state', this.state);
    return this.state.habits.map((habit, index) => {
      return (
        <HabitContainer
          key={index}
          habitIndex={index}
          habit={habit.habit_name}
          habitDescription={habit.habit_description}
          startDate={habit.start_date}
          endDate={habit.end_date}
          habitId={habit.id}
          logs={this.state.logs}
          // username={currentUsername}
          // userId={currentUserId}
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
  // habits: state.habits.habits,
  // currentUsername: state.users.currentUsername,
  // currentUserId: state.users.currentUserId,
});

export default connect(mapStateToProps)(AppContainer);
