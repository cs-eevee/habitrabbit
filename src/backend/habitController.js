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
  async createHabit(req, res, next) {
    const { habitTitle, userId, startDate, endDate, log } = req.body;
    console.log('body', req.body);
    try {
      await Habit.query('BEGIN');
      const { rows } = await Habit.query(
        `INSERT INTO habit(habit_title, user_id, start_date, end_date) VALUES ('${habitTitle}', '${userId}', '${startDate}', '${endDate}' ) returning *;`
      );
      console.log('ROWS', rows);
      // const userIdFromDb = await Habit.query(`SELECT _id FROM app_user JOIN app_user._id =  `);
      for (const entry of log) {
        await Habit.query(
          `INSERT INTO log(habit_id, user_id, day, checked) VALUES ('${rows[0]._id}', '${
            rows[0].user_id
          }', '${entry.date}', '${false}') returning *;`
        );
      }
      await Habit.query('COMMIT');
      const newHabit = rows[0];
      res.locals.newHabit = newHabit;
      return next();
    } catch (err) {
      await Habit.query('ROLLBACK');
      console.log(err);
    }
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

  loginUser(req, res, next) {
    const { username, password } = req.body;
    Habit.query(
      `SELECT username, password, _id FROM app_user WHERE username = '${username}'`,
      (err, result) => {
        if (err) console.log(err);
        const user = result.rows[0];
        const usernameFromDb = user.username;
        const passwordFromDb = user.password;
        if (password === passwordFromDb) {
          res.locals.user = user;
          return next();
        }
      }
    );
  },

  sendMessage(req, res, next) {
    const { text, username, habitIndex, userId } = req.body;
    const { habitId } = req.params;
    console.log(req.params);
    Habit.query(
      `INSERT INTO chat(habit_id, user_id, text) VALUES ('${habitId}', '${userId}', '${text}') returning *;`,
      (err, result) => {
        // res.locals.message = result.rows[0];
        if (err) console.log(err);
        console.log(result);
        return next();
      }
    );
  },

  getMessages(req, res, next) {
    const { habitId } = req.params;
    Habit.query(`SELECT * FROM chat WHERE habit_id = '${habitId}';`, (err, result) => {
      console.log(result);
    });
  },
};

module.exports = habitController;
