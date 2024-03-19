const { MongoClient } = require('mongodb');

class DBClient {
  constructor() {
    this.host = process.env.DB_HOST;
    this.port = process.env.DB_PORT;
    this.database = process.env.DB_DATABASE;
  }

  isAlive() {
    return (true);
  }

  async nbUsers() {}

  async nbFiles() {}
}
