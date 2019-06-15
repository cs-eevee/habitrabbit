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
const url =
  'postgres://hzsdplxx:7wpGwYpCuoKnA0uj_X98IVAZ0a2gIm8S@raja.db.elephantsql.com:5432/hzsdplxx';

// eslint-disable-next-line no-unused-vars
const pool = new Pool({
  connectionString: url,
});

module.exports = pool;
