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
const cookieParser = require('cookie-parser');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
require('dotenv').config();
const cors = require('cors');

const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const habitController = require('./habitController.js');
const authController = require('./authController.js');

app.use(cors({ origin: 'http://localhost:8080' }));
// app.use(function(req, res, next) {
//   res.header('Access-Control-Allow-Origin', '*');
//   res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
//   next();
// });
app.use(cookieParser());
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: '/api/auth/google/callback',
    },
    (accessToken, refreshToken, profile, done) => {
      authController
        .findUserGoogle(profile)
        .then(user => {
          if (!user) {
            authController.createUserGoogle(profile);
          }
          return user;
        })
        .then(user => {
          console.log('Back to passport', user);
          return done(null, user);
        })
        .catch(err => done(err, null));
    }
  )
);

app.get(
  '/api/auth/google',
  passport.authenticate('google', {
    scope: ['profile', 'email'],
  })
);

app.get(
  '/api/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  authController.setCookie,
  (req, res) => {
    // Successful authentication, redirect home.
    // res.status(200).send(res.locals.user);
    res.render('../frontend/AppContainer');
  }
);

app.post('/api/login', authController.verifyUser, (req, res) => {
  return res.status(200).json(res.locals.user);
})

app.post('/api/signup', authController.createUser, (req, res) => {
  return res.send('Posted to Database');
})

app.post('/habits/createHabit', habitController.createHabit, (req, res) => {
  return res.status(200).send(res.locals.newHabit);
}
);

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
app.use(function(req, res, next) {
  const err = new Error();
  err.message = 'Something Broke!';
  return next(err);
});

app.use((err, req, res, next) => {
  res.status(400).json(err.message);
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
