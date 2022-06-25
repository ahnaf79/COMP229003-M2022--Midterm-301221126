let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');
let compress = require('compression');
let bodyParser = require('body-parser');
let methodOverride = require('method-override');
let session = require('express-session');
let flash = require('connect-flash');
let passport = require('passport');
//let cors = require('cors');

// let passportJWT = require('passport-jwt');
// let JWTStrategy = passportJWT.Strategy;
// let ExtractJWT = passportJWT.ExtractJwt;

//serialize and deserialize the User info
// passport.serializeUser(User.serializeUser());
// passport.deserializeUser(User.deserializeUser());

// verify that the token sent by the user - check if valid
// let jwtOptions = {};
// jwtOptions.jwtFromRequest = ExtractJWT.fromAuthHeaderAsBearerToken();
// //jwtOptions.secretOrKey = DB.secret;
// let strategy = new JWTStrategy(jwtOptions, (jwt_payload, done) => {
//     User.findById(jwt_payload.id)
//         .then(user => {
//             return done(null, user);
//         })
//         .catch(err => {
//             return done(err, false);
//         });
// });

// let jwt = require('jsonwebtoken');
// let DB = require('../db');

//live reload
var livereload = require("livereload");
var connectLiveReload = require("connect-livereload");



const liveReloadServer = livereload.createServer();
liveReloadServer.server.once("connection", () => {
    setTimeout(() => {
        liveReloadServer.refresh("/");
    }, 100);
});


let app = express();

app.use(connectLiveReload());

app.use(session({
    saveUninitialized: true,
    resave: true,
    secret: "sessionSecret"
}));


let indexRouter = require('../routes/index');
let usersRouter = require('../routes/users');
let carsRouter = require('../routes/car');

// view engine setup
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../public')));
app.use(express.static(path.join(__dirname, '../node_modules')));

// Sets up passport
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());


app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/cars', carsRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;