const SHA1 = require('sha1');
const dbClient = require('../utils/db');

const UsersController = {
    // Create a new user
    postNew: async (req, res) => {
      const { email, password } = req.body;
  
      // Check if email and password are provided
      if (!email) {
        return res.status(400).json({ error: 'Missing email' });
      }
  
      if (!password) {
        return res.status(400).json({ error: 'Missing password' });
      }
  
      try {
        // Check if the email already exists in the database
        const existingUser = await User.findOne({ email });
        if (existingUser) {
          return res.status(400).json({ error: 'Already exists' });
        }
  
        // Hash the password using SHA1
        const hashedPassword = crypto.createHash('sha1').update(password).digest('hex');
  
        // Create a new user object
        const newUser = new User({
          email,
          password: hashedPassword
        });
  
        // Save the new user to the database
        await newUser.save();
  
        // Return the new user with only the email and id
        return res.status(201).json({ email: newUser.email, id: newUser._id });
      } catch (error) {
        console.error('Error creating user:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
      }
    }
  };

module.exports = UsersController;
