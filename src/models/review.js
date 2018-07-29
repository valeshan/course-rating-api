const mongoose = require('mongoose');
const User = require('./user');

const reviewSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  postedOn: {
    type: Date,
    default: Date.now
  },
  rating:{
    type: Number,
    required: [true, 'Rating is required.'],
    min: [1, 'Rate between 1 and 5'],
    max: [5, 'Rate between 1 and 5']
  },
  review: {
    type: String
  }
})

const Review = mongoose.model('Review', reviewSchema);
module.exports = Review;
