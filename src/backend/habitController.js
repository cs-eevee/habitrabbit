// db.js connects to a real database. if tests are running slow, you

const Habit = require('./db.js');

const habitController = {
  createHabit(req, res, next) {
    const { habitTitle } = req.body;
    const { userId } = req.body;

    Habit.query(''),
      (err, result) => {
        if (err) throw err;
      };
    return next();
  },
  createUserId(req, res, next) {
    const { username } = req.body;
    const { password } = req.body;
    Habit.query(''),
      err => {
        if (err) throw err;
      };
    return next();
  },
  checkHabit(req, res, next) {
    const { day } = req.body;
    const { userId } = req.body;
    const { habitId } = req.body;
    const { checked } = req.body;

    Habit.query('', (err, result) => {
      if (err) throw err;
      res.locals.day = result;
    });
    return next();
  },
};

module.exports = habitController;
