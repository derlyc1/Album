const express = require('express');
const app = express();
const path = require('path');
const passport = require('passport');
const flash= require('connect-flash');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');


// conecting DB
require ('./config/database');

// config module passport

require('./config/passport')(passport);

// settings
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname , 'views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');
app.set('view engine', 'html');


// middlewares

app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: false}));
app.use(session({
   secret: 'ramirez',
   resave: false,
   saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());


// routes

app.use(require('./routes/index'));
app.use(require('./routes/user'));

// static files

app.use(express.static(path.join(__dirname ,'public')));


//listening server
app.listen(app.get('port'), () => {
    console.log('server on port',app.get('port'));
});