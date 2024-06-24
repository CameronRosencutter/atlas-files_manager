const { MongoClient, ObjectId } = require('mongodb');

class DBClient {
  constructor() {
    const host = process.env.DB_HOST || 'localhost';
    const port = process.env.DB_PORT || 27017;
    const database = process.env.DB_DATABASE || 'files_manager';
    this.client = new MongoClient(`mongodb://${host}:${port}`, { useUnifiedTopology: true });
    this.client.connect().then(() => {
      this.db = this.client.db(database);
      this.users = this.db.collection('users');
      this.files = this.db.collection('files');
    }).catch((err) => { 
      console.error('Failed to connect to MongoDB', err);
    });
  }

  isAlive() {
    return this.client && this.client.isConnected();
  }

  async nbUsers() {
    if (!this.users) return 0;
    return this.users.countDocuments();
  }

  async nbFiles() {
    if (!this.files) return 0;
    return this.files.countDocuments();
  }
}

const dbClient = new DBClient();
module.exports = dbClient;
