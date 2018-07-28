const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../models/user');



//tester
router.get('/users', function(req, res, next){
  console.log("It's here somewhere")
  return res.render('user');
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
           return res.redirect('/');
         })
       }
     }
})


module.exports = router;
