/**
 * Profile.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    name:             { type: 'string', required: true, unique:true },
    users: {
      collection: 'user',
      via: 'profile'
    },
    routes: {
      collection: 'routes',
      via: 'profile'
    },
  },
};

