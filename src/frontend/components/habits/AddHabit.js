import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { addHabit } from './actions';

class AddHabit extends Component {
  render() {
    console.log(addHabit);

    return (
      <div>
        <button onClick={() => this.props.addHabit()}>Click me</button>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  habits: state.habits.habits,
});

const mapDispatchToProps = dispatch => bindActionCreators({ addHabit }, dispatch);
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddHabit);
