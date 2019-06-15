// db.js connects to a real database. if tests are running slow, you

const Habit = require('./db');

const habitController = {
  createHabit(req, res, next) {
    const habitTitle = req.body.habitTitle;
    const userId = req.body.userId;
    Habit.query(''),
      (err, result) => {
        if (err) throw err;
      };
    return next();
  },
  createUserId(req, res, next) {
    const username = req.body.username;
    const password = req.body.password;
    Habit.query(''),
      err => {
        if (err) throw err;
      };
    return next();
  },
  checkHabit(req, res, next) {
    const day = req.body.day;
    const userId = req.body.userId;
    const habitId = req.body.habitId;
    const checked = req.body.checked;

    Habit.query('',
      (err, result) => {
        if (err) throw err;
      }
      res.locals.day = result;
    return next();
  },
};

module.exports = habitController;
