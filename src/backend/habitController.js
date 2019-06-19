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
    console.log('getParticipants start');
    const { participants } = req.body;
    console.log(participants, 'participants');
    res.locals.participantsIds = [];
    for (let participant of participants) {
      let participantId = await db.query(`SELECT id from users WHERE username = '${participant}' `);
      participantId = participantId.rows[0].id;
      res.locals.participantsIds.push(participantId);
    }
    console.log('getParticipants end');
    next();
  },
  // function that creates habit
  async createHabit(req, res, next) {
    const { userId, habitName, habitDescription, startDate, endDate } = req.body;
    // query string used to insert habit table from database
    let habitId = await db.query(
      `INSERT INTO habits(habit_name, habit_description, start_date, end_date) VALUES 
    ('${habitName}', '${habitDescription}', '${startDate}', '${endDate}' ) returning id;`
    );
    habitId = habitId.rows[0].id;
    await buildLogs(userId, habitId, startDate, endDate);
    for (let participantId of res.locals.participantsIds) {
      await buildLogs(participantId, habitId, startDate, endDate);
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
  loginUser(req, res, next) {
    const { username, password } = req.body;
    db.query(
      `SELECT username, password, id FROM users WHERE username = '${username}'`,
      (err, result) => {
        if (err) {
          console.log(err);
          return next(err);
        }
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
};

// function that creates log with day, userid, habitid, and checked boolean
const buildLogs = async (userId, habitId, startDate, endDate) => {
  const endingDate = new Date(endDate);
  let currentDate = new Date(startDate);
  do {
    console.log(userId, habitId, 'userId, HabitId in buildLogs');
    // console.log("currentDate", (new Date(currentDate.setDate(currentDate.getDate() + 1))));
    await db.query(`INSERT INTO logs(date, user_id, habit_id) VALUES 
    ('${currentDate.toDateString()}', '${userId}', '${habitId}')`);
    currentDate = new Date(currentDate.setDate(currentDate.getDate() + 1));
  } while (currentDate.toDateString() !== endingDate.toDateString());
  await db.query(`INSERT INTO logs(date, user_id, habit_id) VALUES 
  ('${endingDate.toDateString()}', '${userId}', '${habitId}')`);
};

module.exports = habitController;
