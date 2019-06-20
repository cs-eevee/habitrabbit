const User = require('./db.js');

const authController = {};

authController.findUser = profile => {
  return new Promise((resolve, reject) => {
    const profileId = profile.id;
    User.query(`SELECT * FROM users WHERE profile_id = '${profileId}';`, (err, result) => {
      if (err) reject(err);
      else {
        console.log('find user result', result.rows[0]);
        const user = result.rows[0];
        resolve(user);
      }
    });
  });
};

authController.createUser = profile => {
  return new Promise((resolve, reject) => {
    console.log(profile);
    const target = 'Insert INTO users("username", "profile_id") VALUES($1, $2) RETURNING *;';
    const values = [profile.displayName, profile.id];
    User.query(target, values, (err, result) => {
      if (err) reject(err);
      else {
        console.log('create user result', result.rows[0]);
        const user = result.rows[0];
        resolve(user);
      }
    });
  });
};

authController.setCookie = (req, res, next) => {
  console.log('cookie controller');
  if (req.user.id) {
    res.locals.cookie = 'COOOOKIES'; //  req.user.id;
    res.cookie('ssid', res.locals.cookie, { httpOnly: true });
  }
  return next();
};

// // function that creates user
// createUser(profile) {
//   const username = profile.displayName;
//   const profileId = profile.id;
//   // query string to insert app_user table
//   User.query(
//     `INSERT INTO app_user(username, profile_id) VALUES ('${username}', '${profileId}') RETURNING *`,
//     (err, result) => {
//       if (err) {
//         console.log(err);
//         return err;
//       }
//       const user = result.rows[0];
//       return result(user);
//     }
//   );
// },

module.exports = authController;
