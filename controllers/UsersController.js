const SHA1 = require('sha1');
const dbClient = require('../utils/db');

const UsersController = {
  postNew: async (request, response) => {
    const { email, password } = request.body;
    const usersCollection = dbClient.client.db(dbClient.database).collection('users');

    if (!email) { return response.status(400).json({ error: 'Missing email' }); }
    if (!password) { return response.status(400).json({ error: 'Missing password' }); }

    const emailExists = await usersCollection.findOne({ email });
    if (emailExists) {
      return response.status(400).json({ error: 'Already exist' });
    }

    const user = await usersCollection.insertOne({ email, password: SHA1(password) });
    return response.status(201).json({ id: user._id, email });
  },
};

module.exports = UsersController;
