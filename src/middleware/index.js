const User = require('../models/user');
const auth = require('basic-auth');

function authenticateUser(req, res, next){
  const user = auth(req);
  if(user.name && user.pass){
    User.authenticate(user.name, user.pass, function(error, user){
      if(!user || error){
        const err = new Error('Wrong email or password');
        err.status = 403;
        return next(err);
      } else{
        req.loggedInUser = user;
        next();
    }
    })
  } else{
    const err = new Error('Email and password are required.')
    err.status = 401;
    return next(err);
  }
}



module.exports.authenticateUser = authenticateUser;
