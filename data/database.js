// Keep a pool of db connection
const { Pool } = require('pg');
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: true
});

export const validateUser = async (token, userId) => {
  // query the userId assigned token
  // compare the token with the db token, if match then return true, false otherwise
}

export const addToUserWatchlist = async (token, userId, symbol) => {
  const client = await pool.connect();
  // validate the user token with the userId
  // await validateUser(token, userId)
  
  // query the old watchlist and then concatenate the new stock and update back
  // select watchlist from user_watchlist where userId = {userId}
  // update ...table_name... set ...column_name... where userId = {userId}
  // const result = await pool.query('update user_watchlist set watchlist = '...')
}