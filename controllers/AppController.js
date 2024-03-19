// appcontroller
const redisClient = require('../utils/redis');
const dbClient = require('../utils/db');

const AppController = {

  getStatus: (request, response) => {
    // Check if things are alive
    const redisAlive = redisClient.isAlive();
    const dbAlive = dbClient.isAlive();


    if (redisAlive && dbAlive) {
      response.status(200).json({ redis: true, db: true });
    } else {
      response.status(500).json({ error: 'Service Not Available' });
    }
  },


  getStats: async (request, response) => {
    try {
      const usersCount = await dbClient.nbUsers();
      const filesCount = await dbClient.nbFiles();

      response.status(200).json({ users: usersCount, files: filesCount });
    } catch (error) {
      response.status(500).json({ message: 'Error retrieving statistics' });
    }
  },
};

module.exports = AppController;