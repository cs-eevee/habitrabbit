// db.js connects to a real database. if tests are running slow, you

const Habit = require('./db');

const habitController = {
  createHabit(req, res, next) {
    const { habitTitle, userId } = req.body;
    Habit.query(
      `INSERT INTO habit(habit_title, user_id) VALUES ('${habitTitle}', '${userId}') returning *;`,
      (err, result) => {
        if (err) throw err;
        const newHabit = result.rows[0];
        console.log('newHabit', newHabit);
        res.locals.newHabit = newHabit;
        return next();
      }
    );
  },
  createUser(req, res, next) {
    const { username } = req.body;
    const { password } = req.body;
    Habit.query(
      `INSERT INTO app_user(username, password) VALUES ('${username}', '${password}');`,
      err => {
        if (err) throw err;
        return next();
      }
    );
  },
  createLog(req, res, next) {
    const { day } = req.body;
    const { userId } = req.body;
    const { habitId } = req.body;
    const { checked } = req.body;
    Habit.query(
      `INSERT INTO log(day, checked, user_id, habit_id) VALUES ('${day}','${checked}','${userId}', '${habitId}');`,
      (err, result) => {
        if (err) throw err;
        res.locals.day = result;
        return next();
      }
    );
  },
};

module.exports = habitController;
