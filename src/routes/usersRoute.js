const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const mid = require('../middleware');
const User = require('../models/user');


//GET login User details

router.get('/users', mid.authenticateUser, function(req, res, next){
  res.status(200);
  res.json(req.loggedInUser);
})

//POST User data
router.post('/users', function(req, res, next){
  if(req.body.fullName &&
     req.body.emailAddress &&
     req.body.password &&
     req.body.confirmPassword){
       if(req.body.password === req.body.confirmPassword){
         const userData = {
           fullName: req.body.fullName,
           emailAddress: req.body.emailAddress,
           password: req.body.password
         }
         User.create(userData, function(err, user){
           if(err) return next(err);
           res.location('/');
           res.status(201);
           res.end();
         })
       }
     }
})


module.exports = router;
