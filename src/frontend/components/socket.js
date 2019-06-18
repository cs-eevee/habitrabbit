/**
 * ************************************
 *
 * @module socket.js
 * @author Bruce
 * @date 6/16/2019
 * @description Socket.io client side connection for real-time chat
 *
 * ************************************
 */

import io from 'socket.io-client';

const socket = io('http://localhost:8000');

const configureSocket = dispatch => {
  socket.on('connect', () => {
    console.log('connected');
  });
  return socket;
};

export const sendMessage = state => {
  socket.emit('message', state);
  console.log('emmited message');
};

export default configureSocket;
