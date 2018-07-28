/**
 * User.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

var bcrypt = require('bcrypt');

module.exports = {
  // schema: true,
  attributes: {
    email:              { type: 'string', required: true, unique:true /*isEmail: true*/},
    encryptedPassword:  { type: 'string'},
    name:               { type: 'string', required: true },
    firstName:          { type: 'string', required: true },
    gender:             { type: 'number' },
    tel:                { type: 'number'},
    address:            { type: 'string'},
    zipCode:            { type: 'number'},
    city:               { type: 'string'},
    state:              { type: 'string', required: true }, // 1 first connect - 2 Already connected - 0 Disabled
    avatarUrl:          { type: 'string', defaultsTo: 'default'},
    profile: {
      model: 'profile'
    },
  },

  customToJSON: function () {
    return _.omit(this, ['encryptedPassword'])
  },

  beforeCreate: function (values, next) {
    bcrypt.genSalt(10, function (err, salt) {
      if(err) 
        return next(err);
      bcrypt.hash(values.password, salt, function (err, hash) {
        if(err)
          return next(err);
        values.encryptedPassword = hash;
        delete values.password;
        delete values.confirmPassword;
        return next();
      })
    })
  },
  comparePassword: function (password, user, callback) {
    bcrypt.compare(password, user.encryptedPassword, function (err, match) {
      if(err) 
        return callback(false);
      if(match) {
        return callback(true);
      } else {
        return callback(false);
      }
    })
  }
};
