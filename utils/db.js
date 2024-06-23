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
      this.files = this.db.collection('files');
    });
  }

  async getUser(query) {
    return this.users.findOne(query);
  }

  async getUserById(id) {
    return this.users.findOne({ _id: ObjectId(id) });
  }

  async getFileById(id) {
    return this.files.findOne({ _id: ObjectId(id) });
  }

  async getFilesByUserIdAndParentId(userId, parentId, skip, limit) {
    return this.files.find({ userId, parentId }).skip(skip).limit(limit).toArray();
  }

  async addFile(fileDocument) {
    const result = await this.files.insertOne(fileDocument);
    return { ...fileDocument, _id: result.insertedId };
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
