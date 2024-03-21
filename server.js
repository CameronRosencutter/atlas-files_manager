// server.js

const express = require('express');
var bodyParser = require('body-parser')
const routes = require('./routes');

const PORT = process.env.PORT || 5000;

const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.use(routes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
