const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const mid = require('../middleware');
const User = require('../models/user');
const Course = require('../models/course');

//courseID param
router.param('cID', function(req, res, next, id){
  Course.findById(id, function(err, doc){
    if(err) return next(err);
    if(!doc){
      const err = new Error('Course not found');
      err.status = 404;
      return next(err);
    }
    req.course = doc;
    return next();
  });
})

//POST create course
router.post('/courses', mid.authenticateUser, function(req, res, next) {
  const course = new Course(req.body);
  course.save(function(err, course) {
    if(err) return res.json(err);
    res.status(201);
    res.location('/courses').json();
  });
});

//GET all courses
router.get('/courses', function(req, res, next){
  Course.find({})
        .sort({createdAt: -1})
        .exec(function(err, courses){
            if(err) return next(err);
            res.json(courses);
        })
});

//GET course by id :cID
router.get('/courses/:cID', function(req, res, next){
  res.json(req.course);
})

module.exports = router;
