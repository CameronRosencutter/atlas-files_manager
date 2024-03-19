const { MongoClient } = require('mongodb');

class DBClient {
  constructor() {
    this.host = process.env.DB_HOST || 'localhost';
    this.port = process.env.DB_PORT || 27017;
    this.database = process.env.DB_DATABASE || 'files_manager';
    this.client = new MongoClient(`mongodb://${this.host}:${this.port}/${this.database}`, { useUnifiedTopology: true });
    this.client.connect();
  }

  isAlive() {
  //  return true;
    return this.client.isConnected();
  }

  async nbUsers() {
    const users = this.client.db(this.database).collection('users');
    return await users.countDocuments();
  }

  async nbFiles() {
    const files = this.client.db(this.database).collection('files');
    return await files.countDocuments();
  }
}

const dbClient = new DBClient();
module.exports = dbClient;
