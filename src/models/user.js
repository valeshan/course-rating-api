const isEmail = require('validator').isEmail;
const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  emailAddress: {
    type: String,
    required: true,
    unique: [true, 'This email address has been used before'],
    trim: true,
    validate: [isEmail, 'invalid email']
  },
  password: {
    type: String,
    required: true
  }
})


const User = mongoose.model('User', userSchema);
module.exports = User;
