exports.home = function(req, res, next) {
    console.log('===> Original URL: ' + req.session.url);
    res.render('index', {
        title: 'Home',
        userName: req.user ? req.user.username : ''
    });
};



let express = require("express");
let router = express.Router();
let mongoose = require("mongoose");
let passport = require("passport");
let jwt = require('jsonwebtoken');
let DB = require('../db');

req.logIn(user,
    (err) => {
        // server error?
        if (err) {
            return next(err);
        }
        const payload = {
            id: user._id,
            displayName: user.displayName,
            username: user.username,
            email: user.email
        }
        const authToken = jwt.sign(payload, DB.secret, {
            expiresIn: 604800 // 1 week
        })
    });