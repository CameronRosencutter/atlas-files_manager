// controllers/AppController.js

const redisClient = require('../utils/redis');
const dbClient = require('../utils/db');

const AppController = {
    // Get status of Redis and MongoDB
    getStatus: (request, response) => {
      // Check if things are alive
      const redisAlive = redisClient.isAlive();
      const dbAlive = dbClient.isAlive();
  
      // Send status as JSON response
      if (redisAlive && dbAlive) {
        response.status(200).json({ redis: true, db: true });
      } else {
        response.status(500).json({ error: 'Service Not Available' });
      }
    },
}

module.exports = AppController;
