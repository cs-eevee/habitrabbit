/**
 * ************************************
 *
 * @module AddHabit.js
 * @author Esther and Bruce
 * @date 6/15/2019
 * @description Add habit component for creating habits
 *
 * ************************************
 */
import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import styled from 'styled-components';
import { addHabit } from './actions';

const Container = styled.div``;

class AddHabit extends Component {
  // user is current user
  // add in habit name
  // add in start date and end date
  // invite participants

  constructor() {
    super();
    this.state = {
      name: '',
      startDate: '',
      endDate: '',
      participants: [],
    };
  }

  onTextInputChange = (event, state) => {
    this.setState({
      [state]: event.target.value,
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    const { name, startDate, endDate, participants } = this.state;
    const { addHabit, currentUserId } = this.props;
    addHabit(name, startDate, endDate, participants, currentUserId);
    this.props.toggle();
  };

  render() {
    const { name, startDate, endDate, participants } = this.state;
    const { visible } = this.props;

    return (
      <div>
        {visible && (
          <Container>
            <form onSubmit={e => this.handleSubmit(e)}>
              <label htmlFor="habit-name" className="habit-name-label">
                Habit Name:
                <input
                  type="text"
                  className="habit-name-input"
                  value={name}
                  onChange={e => this.onTextInputChange(e, 'name')}
                />
              </label>
              <label htmlFor="start-date-picker" className="start-date-picker">
                Start Date:
                <input
                  type="date"
                  className="smart-date-picker"
                  value={startDate}
                  onChange={e => this.onTextInputChange(e, 'startDate')}
                />
              </label>
              <label
                htmlFor="end-date-picker"
                className="end-date-picker"
                value={endDate}
                onChange={e => this.onTextInputChange(e, 'endDate')}
              >
                End Date: <input type="date" className="end-date-picker" />
              </label>
              {/* // TODO: Make this work */}
              <label htmlFor="participants-input" className="participants-input-label">
                Participants: <input type="text" className="participants-input" />
              </label>
              <input type="submit" className="add-habit-button" value="Create Habit" />
            </form>
          </Container>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  habits: state.habits.habits,
  currentUserId: state.users.currentUserId,
});

const mapDispatchToProps = dispatch => bindActionCreators({ addHabit }, dispatch);
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddHabit);
