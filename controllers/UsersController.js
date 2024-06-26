/* eslint-disable linebreak-style */
/* eslint-disable import/order */
/* eslint-disable no-undef */
/* eslint-disable linebreak-style */
import redisClient from '../utils/redis';
import dbClient from '../utils/db';

class UsersController {
  static async getMe(req, res) {
    const token = req.header('X-Token');
    if (!token) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const key = `auth_${token}`;
    const userId = await redisClient.get(key);
    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const user = await dbClient.getUserById(userId);
    if (!user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    return res.status(200).json({ id: user._id.toString(), email: user.email });
  }
}

export default UsersController;
