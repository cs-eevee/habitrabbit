/**
 * ************************************
 *
 * @module db.js
 * @author Jun
 * @date 06/14/2019
 * @description: Setting up the postgreSQL for our best product
 *
 * ************************************
 */

const { Pool } = require('pg'); // pg module was used to connect uri practically.

// elephantSQL uri address.
const url = process.env.DATABASE;

// eslint-disable-next-line no-unused-vars
const pool = new Pool({
  connectionString: url,
});

// export elephantsql database
module.exports = pool;
