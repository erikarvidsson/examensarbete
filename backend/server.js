const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
// const passport = require('passport');
// const flash = require('express-flash')
// const session = require('express-session')

// const initializePassport = require('./passport.config');
// initializePassport(
//   passport, 
//   username => {
//   return users.find(user => user.username === username)
// })

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
// app.use(flash())
// app.use(session({
//   secret: process.env.SESSION_SECRET,
//   resaved: false,
//   saveUninitialized: false
// }))
// app.use(passport.initialize())
// app.use(passport.session())

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });

const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established sucessfully");
})

const userRouter = require('./routes/users');
const dataRouter = require('./routes/data');
const userLogin2Router = require('./routes/userLogin');

app.use('/users', userRouter);
app.use('/data', dataRouter);
app.use('/userLogin', userLogin2Router);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});