const db = require('../database/dbConfig.js');

function getAll(filter) {
  return db('users');
}

function getBy(filter) {
  return db('users')
    .where(filter);
}

async function add(user) {
  const [id] = await db('users').insert(user);

  return getBy({ id }).first();
}

module.exports = {
  getAll,
  getBy,
  add
};