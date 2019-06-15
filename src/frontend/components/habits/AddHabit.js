import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { addHabit } from './actions';

class AddHabit extends Component {
  render() {
    return (
      <div>
        <button onClick={() => addHabit()}>Click me</button>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  habits: state.habits.habits,
});

const mapDispatchToProps = { addHabit };
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddHabit);
