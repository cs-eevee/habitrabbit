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
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
require('dotenv').config();

const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const habitController = require('./habitController.js');
const authController = require('./authController.js');

app.use(passport.initialize());
app.use(passport.session());

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: '/auth/google/callback',
    },
    (accessToken, refreshToken, profile, done) => {
      authController
        .findUser(profile)
        .then(user => {
          if (!user) {
            authController.createUser(profile);
          }
          return user;
        })
        .then(user => {
          console.log(user);
          done(null, user);
        })
        .catch(err => console.log('Error', err));
    }
  )
);

app.use(bodyParser.json());

// app.get('/', (req, res) => {
//   return res.status(200).send('Server Working');
// });

app.get(
  '/auth/google',
  passport.authenticate('google', {
    scope: ['profile', 'email'],
  })
);

app.get(
  '/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  authController.setCookie,
  (req, res) => {
    // Successful authentication, redirect home.
    console.log(req.user);
    res.status(200).json(req.user.id);
  }
);

app.post('/habits/createHabit', habitController.createHabit, (req, res) => {
  return res.status(200).send(res.locals.newHabit);
});

app.post('/habits/chat/:habitId', habitController.sendMessage, (req, res) => {
  return res.status(200).json(res.locals.message);
});

app.get('/habits/chat/:habitId', habitController.getMessages, (req, res) => {
  return res.status(200).json(res.locals.messages);
});

// Create a *POST* route for url /api/habits/createLog/:id
// middleware for creating log
app.post('/habits/createLog/:id', habitController.createLog, (req, res) => {
  res.status(200).json('habit checked');
});

// global error handler
app.use(function(req, res, next) {
  const err = new Error('Something broke!');
  return next(err);
});

app.use((err, req, res, next) => {
  res.status(400).json({ msg: err });
});

// web socket for chat function
io.on('connection', socket => {
  // below we listen if our pot is updated
  // then emit an event to all connected sockets about the update
  socket.on('SEND_MESSAGE', state => {
    console.log('Received from client', state);
    socket.emit('NEW_MESSAGE', state);
  });
});

server.listen(8000, () => console.log('Web socket connection on port 8000!'));

app.listen(3000);
