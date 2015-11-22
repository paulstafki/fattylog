var express = require('express');
var router = express.Router();
var passport = require('passport');
var path = require('path');
var Establishment = require('../models/happyhour');

router.get('/', function(req, res, next){
    console.log("create happy hour JS 'get' hit!");
    res.sendFile(path.resolve(__dirname, '../views/addhh.html'));
});

router.post('/', function(req,res,next) {
    Establishment.create(req.body, function (err, post) {
        if (err)
            res.send("Brakes are gone, ain't no point in steering now.");
        else
            res.send("Happy hour created! Click the back button to be taken to your user page.");
        //res.redirect('/assets/views/routes/landing.html');  Bad redirect took you to a fresh session
    })
});

module.exports = router;