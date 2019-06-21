const db = require('./db.js');

const habitController = {
  // function that retrieves the habit
  async getHabits(req, res, next) {
    const { userId } = req.body;
    const logs = await db.query(
      `SELECT logs.date, logs.checked, logs.habit_id
        FROM logs
        JOIN habits ON habits.id = logs.habit_id
        WHERE logs.user_id = ${userId}`
    );
    const logsArr = logs.rows;
    // console.log('logArr', logsArr);
    const habits = await db.query(
      `SELECT DISTINCT habits.id, habits.habit_name, habits.habit_description, habits.start_date, habits.end_date
        FROM habits
        INNER JOIN logs ON logs.habit_id = habits.id 
        WHERE logs.user_id = ${userId}`
    );
    const habitsArr = habits.rows;
    // console.log('habitArr', habitsArr);
    res.locals.databaseInfo = {
      Logs: logsArr,
      Habits: habitsArr,
    };
    // console.log('info:', res.locals.databaseInfo);
    return next();
  },
  async addParticipant(req, res, next) {
    console.log('getParticipants start');
    const { participant, habitId } = req.body;
    let participantId = await db.query(`SELECT id from users WHERE username = '${participant}' `);
    participantId = participantId.rows[0].id;
    console.log(participantId);
    db.query(`INSERT INTO invites (habit_id, user_id) VALUES ('${habitId}', '${participantId}')`);
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
    buildLogs(userId, habitId, startDate, endDate);
    next();
  },

  async addHabit(req, res, next) {
    const { userId, habitId } = req.body;
    let dbInfo = await db.query(`SELECT start_date, end_date FROM habits WHERE id = '${habitId}'`);
    console.log(dbInfo.rows);
    buildLogs(userId, habitId, dbInfo.rows[0].start_date, dbInfo.rows[0].end_date);
    next();
  },
<<<<<<< HEAD

  // function that creates log with day, userid, habitid, and checked boolean
  createLog(req, res, next) {
    const { day, userId, habitId, checked } = req.body;
    // query string to insert log table
    Habit.query(
      `INSERT INTO log(day, checked, user_id, habit_id) VALUES ('${day}','${checked}','${userId}', '${habitId}');`,
      (err, result) => {
        if (err) next(err);
        res.locals.day = result;
=======
  // function that creates user
  createUser(req, res, next) {
    const { username } = req.body;
    const { password } = req.body;
    // query string to insert app_user table
    db.query(
      `INSERT INTO app_user(username, password) VALUES ('${username}', '${password}');`,
      err => {
        if (err) throw err;
>>>>>>> 23d37feae9a672a4263def1f857a8f2238386db7
        return next();
      }
    );
  },
<<<<<<< HEAD

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
=======
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
>>>>>>> 23d37feae9a672a4263def1f857a8f2238386db7
};

module.exports = habitController;
