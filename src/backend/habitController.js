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
  async getParticipants(req, res, next) {
    const { participants } = req.body;
    res.locals.participantsIds = []
    for(let participant of participants){
      let participantId = ( await db.query(`SELECT id from users WHERE username = '${participant}' `))
      participantId = participantId.rows[0].id;
      res.locals.participantsIds.push(participantId)
    }
    next();
  },
  // function that creates habit
  async createHabit(req, res, next) {    
    const { userId, habitName, habitDescription, startDate, endDate } = req.body;
    // query string used to insert habit table from database
    let habitId = await db.query(
    `INSERT INTO habits(habit_name, habit_description, start_date, end_date) VALUES 
    ('${habitName}', '${habitDescription}', '${startDate}', '${endDate}' ) returning id;`);
    habitId = habitId.rows[0].id;
    await buildLogs(userId, habitId, startDate, endDate);
    for(let participantId of res.locals.participantsIds){
      await buildLogs(participantId, habitId, startDate, endDate)
    }
    next(); 
  },

  // function that creates user
  createUser(req, res, next) {
    const { username } = req.body;
    const { password } = req.body;
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

const buildLogs = async (userId, habitId, startDate, endDate) => {
  const endingDate = new Date(endDate);
  let currentDate = new Date(startDate);
  do {
    console.log(userId, habitId, "userId, HabitId in buildLogs");
    // console.log("currentDate", (new Date(currentDate.setDate(currentDate.getDate() + 1))));
    await db.query(`INSERT INTO logs(date, user_id, habit_id) VALUES 
    ('${currentDate.toDateString()}', '${userId}', '${habitId}')`);
    currentDate = new Date(currentDate.setDate(currentDate.getDate() + 1));
  } while (currentDate.toDateString() !== endingDate.toDateString());
  await db.query(`INSERT INTO logs(date, user_id, habit_id) VALUES 
  ('${endingDate.toDateString()}', '${userId}', '${habitId}')`);
}

module.exports = habitController;
