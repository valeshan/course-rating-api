const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const mid = require('../middleware');
const User = require('../models/user');
const Course = require('../models/course');


//POST create course

router.post('/courses', mid.authenticateUser, function(req, res, next) {
  const course = new Course(req.body);
  course.save(function(err, course) {
    if(err) return res.json(err);
    res.status(201);
    res.location('/courses').json();
  });
});

module.exports = router;
