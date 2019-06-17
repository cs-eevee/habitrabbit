import io from 'socket.io-client';
import { SEND_MESSAGE, NEW_MESSAGE } from './habits/actions';

const socket = io('http://localhost:8000');

const configureSocket = dispatch => {
  socket.on('connect', () => {
    console.log('🥕 CONNECTED');
  });
  socket.on(NEW_MESSAGE, state => {
    dispatch({ type: NEW_MESSAGE, payload: state });
  });
  return socket;
};

export const emitMessage = message => {
  socket.emit(SEND_MESSAGE, message);
  console.log('Emitted', message);
};

export default configureSocket;
