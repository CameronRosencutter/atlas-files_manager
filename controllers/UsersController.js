/* eslint-disable linebreak-style */
/* eslint-disable no-unused-vars */
/* eslint-disable linebreak-style */
import sha1 from 'sha1';
import { ObjectId } from 'mongodb';
import dbClient from '../utils/db';

class UsersController {
  static async postNew(req, res) {
    const { email, password } = req.body;

    if (!email) {
      return res.status(400).json({ error: 'Missing email' });
    }
    if (!password) {
      return res.status(400).json({ error: 'Missing password' });
    }

    const existingUser = await dbClient.db.collection('users').findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'Already exist' });
    }

    const hashedPassword = sha1(password);
    const newUser = {
      email,
      password: hashedPassword,
    };

    const result = await dbClient.db.collection('users').insertOne(newUser);
    const userId = result.insertedId;

    return res.status(201).json({ id: userId, email });
  }
}

export default UsersController;