// controllers/AppController.js

const { checkRedis, checkDB } = require('../utils');

const AppController = {
  getStatus: (req, res) => {
    const redisAlive = checkRedis();
    const dbAlive = checkDB();
    if (redisAlive && dbAlive) {
      return res.status(200).json({ redis: true, db: true });
    } else {
      return res.status(500).json({ error: "Server error" });
    }
  },
  getStats: (req, res) => {
    // Logic to count users and files from respective collections
    const usersCount = 12; // Logic to count users
    const filesCount = 1231; // Logic to count files
    return res.status(200).json({ users: usersCount, files: filesCount });
  }
};

module.exports = AppController;
