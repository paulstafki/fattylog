var express = require('express');
var bodyParser = require('body-parser');
var app = express();

var index = require('./routes/index');
var passport = require('passport');
var session = require('express-session');
var User = require('./models/user');
var register = require('./routes/register');
var happyhour = require('./routes/createhappyhour');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
        entended: true
    }
));

app.use(session({
    secret: 'secret',
    key: 'user',
    resave: true,
    saveUninitialized: false,
    cookie: { maxAge: 60000, secure: false }
}));

app.use(passport.initialize());
app.use(passport.session());

var localStrategy = require('passport-local').Strategy;

passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    User.findById(id, function(err,user){
        if(err) done(err);
        done(null,user);
    });
});


passport.use('local', new localStrategy({
        passReqToCallback : true,
        usernameField: 'username'
    },
    function(req, username, password, done){
        User.findOne({ username: username }, function(err, user) {
            if (err) throw err;
            if (!user)
                return done(null, false, {message: 'Incorrect username and password.'});

            // test a matching password
            user.comparePassword(password, function(err, isMatch) {
                if (err) throw err;
                if(isMatch)
                    return done(null, user);
                else
                    done(null, false, { message: 'Incorrect username and password.' });
            });
        });
    }));

app.use('/add', happyhour);
app.use('/register', register);
app.use('/', index);

var mongoose = require('mongoose');

var mongoURI = "mongodb://localhost:27017/fatty_logue";
//var mongoURI = "mongodb://paulstafki:kRGd2Ssw@ds035583.mongolab.com:35583/hose_head";

var MongoDB = mongoose.connect(mongoURI).connection;

MongoDB.on('error', function (err) {
    console.log('mongodb connection error', err);
});

MongoDB.once('open', function () {
    console.log('mongodb connection open');
});

app.set("port", (process.env.PORT || 5000));

app.listen(app.get("port"), function(){
    console.log("Listening on port: " + app.get("port"));
});

module.exports = app;