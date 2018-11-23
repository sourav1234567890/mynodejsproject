const express = require('express');
const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser');
const mysql = require('mysql');
//code add for session
const expressValidator = require('express-validator');
var session = require('express-session');
//const cookieParser = require('cookie-parser');
//end
var md5 = require('md5');
const path = require('path');
const app = express();
app.use(session({secret: 'souravproject'}));
//new code for jwtauthentication
/*var cors = require(‘cors’)
var jwt = require(‘jsonwebtoken’);
var token;*/
//end

const {getHomePage} = require('./routes/index');
const {addPlayerPage, addPlayer, deletePlayer, editPlayer, editPlayerPage} = require('./routes/player');
const {registration,registrationpage,login,loginsubmit,logout}=require('./routes/registration');
const {dashboard}=require('./routes/dashboard');
const {adminlogin,adminsubmit}=require('./routes/admin/login');
const {admindashboard,userlist,useractive}=require('./routes/admin/dashboard');
const port = 5000;

// create connection to database
// the mysql.createConnection function takes in a configuration object which contains host, user, password and the database name.
const db = mysql.createConnection ({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'mycrudoperation'
});

// connect to database
db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('Connected to database');
});
global.db = db;
global.session=session;
global.md5=md5;

// configure middleware
app.set('port', process.env.port || port); // set express to use this port
app.set('views', __dirname + '/views'); // set express to look in this folder to render our view
app.set('view engine', 'ejs'); // configure template engine
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); // parse form data client
app.use(express.static(path.join(__dirname, 'public'))); // configure express to use public folder
app.use(fileUpload()); // configure fileupload
app.use(expressValidator());

//new
app.use(express.static(__dirname + '/public'));
//end
//app.use(cookieParser());
// routes for the app
//
//console.log(sess);
/*app.use(session({
console.log(req.session);
});*/

app.get('/',getHomePage);
//console.log(session);
app.get('/admin/login',adminlogin);
app.get('/admin/dashboard',admindashboard);
app.post('/admin/login',adminsubmit)
app.get('/dashboard',dashboard);
app.get('/registration',registration);
app.get('/login',login);
app.get('/logout',logout);
app.get('/add', addPlayerPage);
app.get('/edit/:id', editPlayerPage);
app.get('/delete/:id', deletePlayer);
app.post('/add', addPlayer);
app.post('/registration',registrationpage);
app.post('/edit/:id', editPlayer);
app.post('/login',loginsubmit);
app.post('/useractive',useractive)

// set the app to listen on the port

//code for listing of all users

app.get('/admin/userlist',userlist);
//end
app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});
