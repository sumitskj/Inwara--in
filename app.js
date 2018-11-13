const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const passport = require('passport');
const bodyParser = require('body-parser');
const config = require('./config/config');

const admins = require('./routes/admins');
const reports = require('./routes/reports');
const home = require('./routes/home');
const users = require('./routes/users');


const app = express();
const port = process.env.PORT || 8080;

mongoose.connect(config.database);
mongoose.connection.on('connected', ()=>{
    console.log('connected to database: '+ config.database);
});
mongoose.connection.on('error', (err)=>{
    console.log('connection database error: '+err);
});

app.use(cors());

app.use(bodyParser.json());

app.use(express.static(path.join(__dirname,'angular-front/dist/angular-front')));

app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport);

app.use('/', home);

app.use('/admins', admins);
app.use('/reports', reports);
app.use('/users', users);

app.listen(port, ()=>{
    console.log('Server started: '+ port);
});