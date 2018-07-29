const isEmail = require('validator').isEmail;
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  emailAddress: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    validate: [isEmail, 'Please correctly type in your email.']
  },
  password: {
    type: String,
    required: true
  }
})

userSchema.statics.authenticate = function(email, password, callback){
  User.findOne({emailAddress : email})
      .exec(function(err, user){
        if(err) return callback(err)
        else if(!user){
          const error = new Error('User not found.');
          error.status = 400;
          return callback(error);
        }
        else{
          bcrypt.compare(password, user.password, function(err, result){
          if(result === true){
            return callback(null, user);
          } else{
            return callback();
          }
        })}
      })
}

userSchema.pre('save', function(next){
  const user = this;
  bcrypt.hash(user.password, 10, function(err, hash){
    if(err) next(err);
    user.password = hash;
    next();
  })
})


const User = mongoose.model('User', userSchema);
module.exports = User;
