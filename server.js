/* eslint-disable linebreak-style */
/* eslint-disable no-multiple-empty-lines */
/* eslint-disable linebreak-style */
/* eslint-disable arrow-parens */
/* eslint-disable linebreak-style */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable linebreak-style */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
/* eslint-disable linebreak-style */
const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const routes = require('./routes/index');
const dbClient = require('./utils/db'); // Import the MongoDB client from db.js

dotenv.config();

console.log('MONGODB_URI:', process.env.MONGODB_URI);

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

dbClient.client.connect().then(() => {
  console.log('MongoDB connected');
  app.use('/', routes); // Move the route registration inside the connection callback
}).catch(err => console.log(err));

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

module.exports = app;
