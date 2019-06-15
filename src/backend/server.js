const express = require('express');
const bodyParser = require('body-parser');

const app = express();
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

app.post('/api/habits/createHabit', habitController.createHabit, (req, res) => {
  res.status(200).json(res.locals.habitname);
});

// 2. Check habit and toggle
app.post('/api/habits/checkHabit/:id', habitController.checkHabit, (req, res) => {
  res.status(200).json('habit checked');
});

// 3. Add error handler to server
app.use(function(req, res) {
  res.status(400).send('Something broke!');
});

app.listen(3000);
