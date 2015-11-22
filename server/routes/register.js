var express = require('express');
var router = express.Router();
var passport = require('passport');
var path = require('path');
var Users = require('../models/user');

router.get('/', function(req, res, next){
    console.log("registerJS 'get' hit!");
    res.sendFile(path.resolve(__dirname, '../views/register.html'));
});

router.post('/', function(req,res,next) {
    console.log("post hit, new user created");
    Users.create(req.body, function (err, post) {
        if (err)
            res.send("Take off you knob, that username is taken! Click the back button to go back to the register page.");
        else
            res.redirect('/assets/views/index.html');
    })
});

module.exports = router;