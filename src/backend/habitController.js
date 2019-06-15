// db.js connects to a real database. if tests are running slow, you

const Habit = require('./db');

const habitController = {
  createHabit(req, res, next) {
    const { habitTitle } = req.body;
    const { userId } = req.body;
    const habitNAME = 'coding for 30 days';
    const userID = '94023942';
    Habit.query(
      `INSERT INTO habit(habit_title, user_id) VALUES ('${habitNAME}', '${userID}');`,
      (err, result) => {
        if (err) throw err;
      }
    );
    return next();
  },
  createUser(req, res, next) {
    const { username } = req.body;
    const { password } = req.body;
    const username = 'jun';
    const password = '1234';
    Habit.query(
      `INSERT INTO app_user(username, password) VALUES ('${username}', '${password}');`,
      err => {
        if (err) throw err;
      }
    );
    return next();
  },
  createLog(req, res, next) {
    const { day } = req.body;
    const { userId } = req.body;
    const { habitId } = req.body;
    const { checked } = req.body;
    const dayLOG = '1/8/1999';
    const checkedLOG = true;
    const userLOG = '423048309';
    const habitLOG = '43';
    Habit.query(
      `INSERT INTO log(day, checked, user_id, habit_id) VALUES ('${dayLOG}','${checkedLOG}','${userLOG}', '${habitLOG}');`,
      (err, result) => {
        if (err) throw err;
        res.locals.day = result;
      }
    );
    return next();
  },
};

module.exports = habitController;
