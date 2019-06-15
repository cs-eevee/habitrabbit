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

import HabitContainer from './habits/HabitContainer';
import AddHabit from './habits/AddHabit';

class AppContainer extends Component {
  constructor() {
    super();
    // this.state = {};
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
    const { habits } = this.props;
    return habits.map((habit, index) => {
      return <HabitContainer key={index} habitIndex={index} habit={habit} />;
    });
  };

  render() {
    return (
      <div>
        <button>Add Habit</button>
        {/* <AddHabit /> */}
        {this.renderHabitContainers()}
      </div>
    );
  }
}

const mapStateToProps = state => ({ habits: state.habits.habits });

export default connect(mapStateToProps)(AppContainer);
