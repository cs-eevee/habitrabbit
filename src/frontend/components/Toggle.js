import { Component } from 'react';
import PropTypes from 'prop-types';

export default class Toggle extends Component {
  constructor() {
    super();
    this.state = {
      on: false,
    };
  }

  toggle = () => {
    this.setState({
      on: !this.state.on,
    });
  };

  render() {
    const { children } = this.props;
    return children({
      on: this.state.on,
      toggle: this.toggle,
    });
  }
}

Toggle.propTypes = {
  children: PropTypes.func,
};

Toggle.defaultProps = {
  children: '',
};
