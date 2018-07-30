const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const mid = require('../middleware');
const User = require('../models/user');
const Course = require('../models/course');
const Review = require('../models/review');

//courseID param
router.param('courseId', function(req, res, next, id){
  Course.findById(id, function(err, doc){
          if(err) return next(err);
          if(!doc){
            const err = new Error('Course not found');
            err.status = 404;
            return next(err);
          }
          req.course = doc;
          return next();
        }).populate('user reviews');
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


//POST add review into course by courseId
router.post('/courses/:courseId/reviews', mid.authenticateUser, function(req, res, next){
  const review = new Review(req.body);
  review.save(function(err, review){
    if(err) return next(err);
    req.course.reviews.push(review._id);
    req.course.save(function(err, course) {
      if(err) return next(err);
    })
    res.status(201);
    res.location('couses/:courseId').json();
  })
})


//GET all courses
router.get('/courses', function(req, res, next){
  Course.find({}, '_id title')
        .sort({createdAt: -1})
        .exec(function(err, courses){
            if(err) return next(err);
            res.json(courses);
        });
});

//GET course by courseId
router.get('/courses/:courseId', function(req, res, next){
  res.json(req.course);
})

//PUT update course by courseId
router.put('/courses/:courseId', function(req, res, next){
  req.course.update(req.body, function(err, result){
    if(err) return next(err);
    res.status(204);
    res.location('/');
    res.end();
  })
})




module.exports = router;
