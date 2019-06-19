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

const db = require('./db.js');

const habitController = {
  // function that retrieves the habit
  getHabits(req, res, next) {
    // using query to set up database
    db.query(`SELECT * from habits;`, (err, result) => {
      if (err) console.log(err);
      // rows from result
      res.locals.habits = result.rows;
      return next();
    });
  },
  // function that creates habit
  createHabit(req, res, next) {
    let habitId;
    const { userId, habitName, habitDescription, startDate, endDate } = req.body;
    // query string used to insert habit table from database
    console.log(userId);
    db.query(
      `INSERT INTO habits(habit_name, habit_description, start_date, end_date) VALUES ('${habitName}', '${habitDescription}', '${startDate}', '${endDate}' ) returning id;`,
      (err, result) => {
        if (err) throw err;
        console.log("result", result)
        habitId = result.rows[0];
      }
    );
    const endingDate = new Date(endDate);
    let currentDate = new Date(startDate);
    console.log("currentDate". currentDate)
    while (currentDate.toDateString() !== endingDate.toDateString()) {
      db.query(`INSERT INTO logs(Date, UserID, HabitID) VALUES ('${currentDate}', '${userId}', '${habitId}')`)
      currentDate = currentDate.setDate(currentDate.getDate() + 1);
    }
  },
  // function that creates user
  createUser(req, res, next) {
    const { username } = req.body;
    const { password } = req.body;ß
    // query string to insert app_user table
    db.query(
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
    db.query(
      `INSERT INTO logs(day, checked, user_id, habit_id) VALUES ('${day}','${checked}','${userId}', '${habitId}');`,
      (err, result) => {
        if (err) throw err;
        res.locals.day = result;
        return next();
      }
    );
  },

};

module.exports = habitController;
