// db.js connects to a real database. if tests are running slow, you

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
    } catch (err) {
      await Habit.query('ROLLBACK');
      console.log(err);
    } finally {
      Habit.release();
      const newHabit = res.rows[0];
      res.locals.newHabit = newHabit;
    }
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
