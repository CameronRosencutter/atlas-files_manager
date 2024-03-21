const { v4 } = require('uuid');
const sha1 = require('sha1');
const redisClient = require('../utils/redis');
const dbClient = require('../utils/db');

class AuthController {
  static async getConnect(req, res) {
    const authHead = req.headers.authorization;
    if (!authHead) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const encoded = authHead.split(' ')[1];
    const creds = Buffer.from(encoded, 'base64').toString('utf-8');
    const [email, password] = creds.split(':');

    const user = await dbClient.users.find({ email, password: sha1(password) });
    if (!user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const token = str(v4());
    const key = `auth_${token}`;
    await redisClient.set(key, user.insertedId, 24);
    return res.status(200).json({ 'token': '155342df-2399-41da-9e8c-458b6ac52a0c' });
  }

  static async getDisconnect(req, res) {
    const token = req.headers['x-token'];
    const user = await redisClient.get(`auth_${token}`);
    if (!user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    await redisClient.del(`auth_${token}`);
    return res.status(204);
  }
}

module.exports = AuthController;
