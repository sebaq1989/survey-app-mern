// import dependencies
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const userRouter = require('./routes/user');
const surveyRouter = require('./routes/survey');
const db = require('./lib/db');

db.connect();

const app = express();
app.use(bodyParser.json())
app.use(express.static('client/build'));

app.use('/user', userRouter);
app.use('/survey', surveyRouter);

app.listen(process.env.PORT, () => {
  console.log(`now connected`);
});
// import express and instantiate a server
