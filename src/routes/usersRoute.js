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
  const user = new User(req.body);
  user.save(function(err, user){
    if(err) return next(err)
    res.status(201);
    res.location('/');
    res.end();
  })
})


module.exports = router;
