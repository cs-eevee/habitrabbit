/**
 * ************************************
 *
 * @module Toggle.js
 * @author Bruce
 * @date 6/16/2019
 * @description Universal toggle parent component using
 * React's render props
 *
 * ************************************
 */

import { Component } from 'react';

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
