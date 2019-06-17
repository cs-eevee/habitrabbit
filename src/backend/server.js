const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

const fs = require('fs');
const path = require('path');
const pg = require('pg');
const habitController = require('./habitController.js');

app.use(bodyParser.json());

// hello
// 1. Create habit
// app.post(function(req, res) {
//   // EXPRESS WAY: don't need to set content-type
//   const habit = new habit();
//   habit.name = req.body.name;
//   habit.save(function (err) {
//     if (err) res.send(err);
//     res.json({ habit: "Coding for 30 days"});
//   });
//   res.status(200).sendFile(____);
// });

// api means that it's from server
app.post('/api/habits/createHabit', habitController.createHabit, (req, res) => {
  console.log('res.locals.newHabit from server', res.locals.newHabit);
  return res.status(200).send(res.locals.newHabit);
});

app.post('/api/login', habitController.loginUser, (req, res) => {
  return res.status(200).json(res.locals.user);
});

app.post('/api/habits/createUser', habitController.createUser, (req, res) => {
  res.status(200).json('Created user');
});

// 2. Check habit and toggle
app.post('/api/habits/createLog/:id', habitController.createLog, (req, res) => {
  res.status(200).json('habit checked');
});

// 3. Add error handler to server
app.use(function(req, res) {
  res.status(400).send('Something broke!');
});

io.on('connection', socket => {
  // below we listen if our pot is updated
  // then emit an event to all connected sockets about the update
  socket.on('message', state => {
    console.log(state);
    socket.broadcast.emit('UPDATED_POT', state);
  });
});

server.listen(8000, () => console.log('Web socket connection on port 8000!'));

app.listen(3000);
