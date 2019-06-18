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
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import styled from 'styled-components';
import { addHabit } from './actions';

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: grid;
  justify-items: center;
  fdsfsfsdfsdfscolor: #fff;
  background: rgba(0, 0, 0, 0.8);
`;

const HabitForm = styled.form`
  display: flex;
  flex-direction: column;
  margin: auto 20px;
  padding: 30px;
  border: 1px solid black;
  background-color: white;
`;

const HabitName = styled.label`
  font-family: monospace;
  color: black;
`;

const StartLabel = styled.label`
  font-family: monospace;
  color: black;
`;

const EndLabel = styled.label`
  font-family: monospace;
  color: black;
`;

const ParticipantLabel = styled.label`
  font-family: monospace;
  color: black;
`;

const HabitInput = styled.input`
  width: 70px;
  margin: 8px 10px;
  border: none;
  padding: 10px -10px;
  border-bottom: 2px solid #5353e8;
`;

const StartInput = styled.input`
  width: 120px;
  margin: 8px 10px;
  border: none;
  padding: 10px -10px;
  border-bottom: 2px solid #5353e8;
`;

const EndInput = styled.input`
  width: 128px;
  margin: 8px 10px;
  border: none;
  padding: 10px -10px;
  border-bottom: 2px solid #5353e8;
`;

const ParticipantInput = styled.input`
  width: 70px;
  margin: 8px 10px;
  border: none;
  padding: 10px -10px;
  border-bottom: 2px solid #5353e8;
`;

const CreateHabit = styled.input`
  border: 1px solid #562cff;
  height: 30px;
  width: 90px;
  background-color: #bdbdff;
  border-radius: 6px;
`;

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
    const { on, toggle } = this.props;

    return (
      <div>
        {on && (
          <Container>
            <HabitForm onSubmit={e => this.handleSubmit(e)}>
              <button onClick={toggle}>close</button>
              <HabitName htmlFor="habit-name" className="habit-name-label">
                Habit Name:
                <HabitInput
                  type="text"
                  className="habit-name-input"
                  value={name}
                  onChange={e => this.onTextInputChange(e, 'name')}
                />
              </HabitName>
              <StartLabel htmlFor="start-date-picker" className="start-date-picker">
                Start Date:
                <StartInput
                  type="date"
                  className="smart-date-picker"
                  value={startDate}
                  onChange={e => this.onTextInputChange(e, 'startDate')}
                />
              </StartLabel>
              <EndLabel
                htmlFor="end-date-picker"
                className="end-date-picker"
                value={endDate}
                onChange={e => this.onTextInputChange(e, 'endDate')}
              >
                End Date: <EndInput type="date" className="end-date-picker" />
              </EndLabel>
              {/* // TODO: Make this work */}
              <ParticipantLabel htmlFor="participants-input" className="participants-input-label">
                Participants: <ParticipantInput type="text" className="participants-input" />
              </ParticipantLabel>
              <CreateHabit type="submit" className="add-habit-button" value="+ Create Habit" />
            </HabitForm>
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
