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

  componentDidMount() {
    const { getHabits } = this.props;
    getHabits();
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

  toggleAddHabitVisibility = () => {
    this.setState({
      addHabitVisible: true,
    });
  };

  render() {
    return (
      <div>
        <Toggle>
          {({ on, toggle }) => (
            <React.Fragment>
              <Button onClick={toggle}>+ Add Habit</Button>
              <AddHabit on={on} toggle={toggle} />
            </React.Fragment>
          )}
        </Toggle>
        {this.renderHabitContainers()}
      </div>
    );
  }
}

const mapStateToProps = state => ({ habits: state.habits.habits });
const mapDispatchToProps = dispatch => bindActionCreators({ getHabits }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppContainer);
