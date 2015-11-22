var express = require('express');
var router = express.Router();
var passport = require('passport');
var path = require('path');
var mongoose = require('mongoose');
var Establishment = require('../models/happyhour');
var User = require('../models/user');

router.get('/username', function(req, res, next){
    res.json(req.user);
});

router.put("/incUser/:id", function(req, res, next){
    console.log(req);
    User.findByIdAndUpdate(req.params.id, {useractivity: req.body.useractivity, rank: req.body.rank}, function() {
    });
    res.send("user activity +1'd!");
});

router.post("/happyhour/:zipcode", function(req, res, next){
    return Establishment.find({city: req.params.city}).exec(function(err, info){
        if (err) throw new Error(err);
        res.send(JSON.stringify(info));
    });
});

router.put("/flag/:id", function(req, res, next){
    Establishment.findByIdAndUpdate(req.params.id, {flag: !req.body.flag}, function() {
    });
    res.send("Task complete!(zorg zorg)");
});

router.put("/upvote/:id", function(req, res, next){
    Establishment.findByIdAndUpdate(req.params.id, {upvotes: req.body.upvotes}, function() {
    });
    res.send("upvotes posted +1!");
});

router.put("/downvote/:id", function(req, res, next){
    Establishment.findByIdAndUpdate(req.params.id, {downvotes: req.body.downvotes}, function() {
    });
    res.send("downvotes posted +1!");
});

router.get("/", function(req,res,next){
    res.sendFile(path.resolve(__dirname, '../public/assets/views/index.html'));
});

router.post('/',
    passport.authenticate('local', {
        successRedirect: "/assets/views/routes/landing.html",
        failureRedirect: '/'
    })
);

router.get('/*', function(req, res, next){
    var file = req.params[0] || "/assets/views/index.html";
    res.sendFile(path.join(__dirname, "../public", file));
});

module.exports = router;