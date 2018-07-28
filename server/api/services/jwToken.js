/**
 * jwToken
 *
 * @description :: JSON Webtoken Service for sails
 * @help        :: See https://github.com/auth0/node-jsonwebtoken & http://sailsjs.org/#!/documentation/concepts/Services
 */

let jwt = require('jsonwebtoken'),
  tokenSecret = sails.config.session.secret || 'test123456';

// Generates a token from supplied payload
module.exports.issue = async function (payload) {
  if (sails.config.environment === 'development') {
    if (sails.config.custom.debug.token === false) {
      sails.log.debug('Token payload', payload);
      return ;
    }
  }
  return jwt.sign(
    payload,
    tokenSecret, // Token Secret that we sign it with
    {
      algorithm: 'HS256',
      expiresIn: 606024 * 30 * 7 // expires in 7 days
    }
  );
};

// Verifies token on a request
module.exports.verify = function (token, callback) {
  return jwt.verify(
    token, // The token to be verified
    tokenSecret, // Same token we used to sign
    {}, // No Option
    callback //Pass errors or decoded token to callback
  );
};