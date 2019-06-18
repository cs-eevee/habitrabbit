/**
 * ************************************
 *
 * @module habitContainer.js
 * @author Rachel
 * @date 6/14/2019
 * @description contains middleware
 *
 * ************************************
 */

const Habit = require('./db.js');

const habitController = {
  // function that retrieves the habit
  getHabits(req, res, next) {
    // using query to set up database
    Habit.query(`SELECT * from habit;`, (err, result) => {
      if (err) console.log(err);
      // rows from result
      res.locals.habits = result.rows;
      return next();
    });
  },

  // function that creates habit
  createHabit(req, res, next) {
    const { habitTitle, userId, startDate, endDate } = req.body;
    // query string used to insert habit table from database
    Habit.query(
      `INSERT INTO habit(habit_title, user_id, start_date, end_date) VALUES ('${habitTitle}', '${userId}', '${startDate}', '${endDate}' ) returning *;`,
      (err, result) => {
        if (err) throw err;
        const newHabit = result.rows[0];
        res.locals.newHabit = newHabit;
        return next();
      }
    );
  },
  // function that creates user
  createUser(req, res, next) {
    const { username } = req.body;
    const { password } = req.body;
    // query string to insert app_user table
    Habit.query(
      `INSERT INTO app_user(username, password) VALUES ('${username}', '${password}');`,
      err => {
        if (err) throw err;
        return next();
      }
    );
  },
  // function that creates log with day, userid, habitid, and checked boolean
  createLog(req, res, next) {
    const { day, userId, habitId, checked } = req.body;
    // query string to insert log table
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
