const mongoose = require('mongoose');
const User = require('./user');
const Review = require('./review');

const courseSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  title: {
    type: String,
    required: [true, 'Title is required.']
  },
  description: {
    type: String,
    required: [true, 'Description is required.']
  },
  estimatedTime: {
    type: String
  },
  materialsNeeded:{
    type: String
  },
  steps:[
    {
      stepNumber: {
        type: Number
      },
      title: {
        type: String,
        required: [true, 'Step title is required.']
      },
      description: {
        type: String,
        required: [true, 'Step description is required.']
      }
    }
  ],
  reviews: [
    {
     type: mongoose.Schema.Types.ObjectId,
     ref: 'Review'
    }
  ]
})


const Course = mongoose.model('Course', courseSchema);
module.exports = Course;
