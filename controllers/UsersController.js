const dbClient = require('../utils/db');
const crypto = require('crypto');

const UsersController = {
  postNew: (email, password) => {
    const usersCollection = dbClient.client.db(dbClient.database).collection('users');

    if (!email) {
      const err = new Error('Missing email');
      err.code = 400;
      return err;
    }
    if (!password) {
      const err = new Error('Missing password');
      err.code = 400;
      return err;
    }
    if (usersCollection.find({email: email})) {
      const err = new Error('Already exist');
      err.code = 400;
      return err;
    }

    const user = {
      email: email,
      password: crypto.createHash('SHA1').update(password).digest('hex'),
    };
    return usersCollection.insertOne(user);
  }
}

module.exports = UsersController;
