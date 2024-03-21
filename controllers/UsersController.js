const sha1 = require('sha1');
const redisClient = require('../utils/redis');
const dbClient = require('../utils/db');

class UsersController {
  static async postNew(req, res) {
    const { email, password } = req.body;

    // Check if email is missing
    if (!email) {
      return res.status(400).json({ error: 'Missing email' });
    }

    // Check if password is missing
    if (!password) {
      return res.status(400).json({ error: 'Missing password' });
    }

    try {
      // Check if email already exists in DB
      const userExists = await dbClient.users.findOne({ email });
      if (userExists) {
        return res.status(400).json({ error: 'Already exist' });
      }

      // Hash the password using SHA1
      const hashedPassword = sha1(password);

      // Save the new user in the collection users
      const savedUser = await dbClient.users.insertOne({ email, password: hashedPassword });

      // Return the new user with only the email and the id
      return res.status(201).json({ id: savedUser.insertedId, email });
    } catch (error) {
      console.error('Error creating user: ', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  static async getMe(req, res) {
    const token = req.headers['x-token'];
    const user = await redisClient.get(`auth_${token}`);
    if (!user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    return { email: user.email, id: user.insertedId };
  }
}

module.exports = UsersController;
