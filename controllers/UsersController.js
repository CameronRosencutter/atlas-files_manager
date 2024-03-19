const redisClient = require('../utils/redis');
const dbClient = require('../utils/db');
const crypto = require('crypto');

const UsersController = {
  postNew: async (email, password) => {
    const usersCollection = dbClient.client.db(dbClient.database).collection('users');

    if (!email) { return Error('Missing email'), 400; }
    if (!password) { return Error('Missing password'), 400; }
    if (email in dbClient.client.db(dbClient.database).collection('users')) {
      return Error('Already exist'), 400;
    }

    const user = {
      email: email,
      password: crypto.createHash('SHA1').update(password).digest('hex')
    };
    return await usersCollection.insertOne(user);
  }
}

module.exports = UsersController;
