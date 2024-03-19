const SHA1 = require('sha1');
const dbClient = require('../utils/db');

const UsersController = {
  postNew: (request, response) => {
    const { email, password } = request.body;
    const usersCollection = dbClient.client.db(dbClient.database).collection('users');

    if (!email) { return response.status(400).json({ error: 'Missing email' }); }
    if (!password) { return response.status(400).json({ error: 'Missing password' }); }
    if (usersCollection.find({ email: email })) {
      return response.status(400).json({ error: 'Already exist' });
    }

    const user = usersCollection.insertOne({ email: email, password: SHA1(password) });
    return response.status(201).json({ id: user._id, email: email });
  },
};

module.exports = UsersController;
