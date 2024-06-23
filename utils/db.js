/* eslint-disable linebreak-style */
/* eslint-disable no-unused-vars */
/* eslint-disable linebreak-style */
import { MongoClient, ObjectId } from 'mongodb';

class DBClient {
  constructor() {
    const host = process.env.DB_HOST || 'localhost';
    const port = process.env.DB_PORT || 27017;
    const database = process.env.DB_DATABASE || 'files_manager';
    this.client = new MongoClient(`mongodb://${host}:${port}/${database}`, { useUnifiedTopology: true });
    this.client.connect().then(() => {
      this.db = this.client.db(database);
      this.users = this.db.collection('users');
    });
  }

  async getUser(query) {
    return this.users.findOne(query);
  }

  async getUserById(id) {
    return this.users.findOne({ _id: ObjectId(id) });
  }

  isAlive() {
    return this.client.isConnected();
  }

  async nbUsers() {
    return this.users.countDocuments();
  }
}

const dbClient = new DBClient();
export default dbClient;
