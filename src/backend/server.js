/**
 * ************************************
 *
 * @module server.js
 * @author Rachel and Jun
 * @date 06/14/2019
 * @description: define routes and their functionalities
 *
 * ************************************
 */

const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const habitController = require('./habitController.js');

app.use(bodyParser.json());

// api means that it's from server

// Create a *POST* route for url /api/habits/createHabit
// send data for new habit
app.post('/api/createHabit', habitController.createHabit, (req, res) => {
  return res.status(200).send({ data: true });
});

app.post('/api/addParticipant', habitController.addParticipant, (req, res) => {
  //send back confirmation
  return res.status(200).json({ data: 'we made it through' });
});

app.post('/api/joinHabit', habitController.addHabit, (req, res) => {
  return res.status(200).json({ data: 'we made it through' });
});

// Create a *GET* route for url /api/getHabits
// middleware for retrieving the habit
app.post('/api/getHabits', habitController.getHabits, (req, res) => {
  return res.status(200).send(res.locals.databaseInfo);
});

// // Create a *POST* route for url /api/habits/createUser
// // middleware for creating user
// app.post('/api/habits/createUser', habitController.createUser, (req, res) => {
//   res.status(200).json('Created user');
// });
app.post('/api/login', habitController.loginUser, (req, res) => {
  return res.status(200).json(res.locals.user);
});

// global error handler
app.use(function(req, res) {
  res.status(400).send('Something broke!');
});

// web socket for chat function
io.on('connection', socket => {
  // below we listen if our pot is updated
  // then emit an event to all connected sockets about the update
  socket.on('message', state => {
    console.log(state);
    socket.broadcast.emit('NEW_MESSAGE', state);
  });
});

server.listen(8000, () => console.log('Web socket connection on port 8000!'));

app.listen(3000);
