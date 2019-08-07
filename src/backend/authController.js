const User = require('./db.js');

const authController = {};

authController.findUserGoogle = profile => {
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

authController.createUserGoogle = profile => {
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
    res.locals.user = req.body.user;
    res.locals.cookie = `COOOOKIES + ${req.user.id}`;
    res.cookie('ssid', res.locals.cookie, { httpOnly: true });
  }
  return next();
};

authController.verifyUser = (req, res, next) => {
  findUser(req.body)
    .then(user => validatePassword(req.body.password, user))
    .then(user => res.locals.user= user)
    .catch((error) => {
      next(error);
    })
    .finally(() => {
      next();
    })
};

authController.createUser = (req, res, next) => {
  verifyFields(req.body)
    .then(user => createHash(user))
    .then(user => createUser(user))
    .then(user => res.locals.user = user)
    .catch((error) => {
      next(error);
    })
    .finally(() => {
      next();
    })
};

function verifyFields (body) {
  return new Promise((resolve, reject) => {
    if (typeof body.username !== 'string' || body.username.match(/^\s*$/) 
    || typeof body.password !== 'string' || body.password.match(/^\s*$/)){
      reject('Invalid Username or Password');
    }
    const user = {
      username: body.username,
      password: body.password
    }
    resolve(user)
  })
};

function createHash (user) {
  return new Promise((resolve, reject) => {
    //let password = "";
    bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
      if(err) reject(err);
      bcrypt.hash(user.password, salt, (err, hash) => {
        if(err) reject(err);
        user.password = hash;
        console.log(user.password);
        resolve(user);
      })
    })
  })
}

function createUser (user) {
  return new Promise((resolve, reject) =>{
    const target = 'Insert INTO users("username", "password") VALUES($1, $2) RETURNING *;'
    const values = [user.username, user.password]
    console.log('Values ', values)
    // save that user to the collection
    db.query(target, values, (err, user) => {
      if (err) {
        reject(err)
      }
    //console.log(user.rows[0]['_id'])
    resolve(user.rows[0])
    })
  })
}



function findUser (body) {
  console.log(body.username)
  return new Promise((resolve, reject) => {
    db.query(`SELECT * FROM users WHERE username = '${body.username}';`, (err, user) => {
      if(err) reject({error: 'Database Error'});
      else if (user === null) reject({error: 'User not found'});
      console.log(user);
      resolve(body.password, user);
    })
  });
}

function validatePassword (plain, user) {
  let plainPassword = plain;
  return new Promise((resolve, reject) => {
    comparePassword(plainPassword, user.rows[0]['password'], (err, isMatch) => {
      if(err) reject({error: 'Database Error'});
      else if (!isMatch) reject({error: 'Incorrect Password'});
      resolve(user.rows[0]);
    })
  });
}

function comparePassword (plainPassword, user, callback) {
  let isMatch;
  let error = null;
  try {
    isMatch = bcrypt.compareSync(plainPassword, user.password);
  } catch(err) {
    error = err;
  }
  return callback(error, isMatch);
}

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
