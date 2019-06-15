/**
 * ************************************
 *
 * @module index.js
 * @author Esther and Bruce
 * @date 6/14/2019
 * @description entry point for app.
 *
 * ************************************
 */

import React from 'react';
import { render } from 'react-dom';
import App from './App';

render(<App />, document.getElementById('app'));

if (module.hot) {
  module.hot.accept();
}
