/**
 * Policy Mappings
 * (sails.config.policies)
 *
 * Policies are simple functions which run **before** your actions.
 *
 * For more information on configuring policies, check out:
 * https://sailsjs.com/docs/concepts/policies
 */

module.exports.policies = {

  /***************************************************************************
  *                                                                          *
  * Default policy for all controllers and actions, unless overridden.       *
  * (`true` allows public access)                                            *
  *                                                                          *
  ***************************************************************************/

  // '*': true,

  // 'isAuthorized': Token verification
  // 'asPermission': Routes verification [ALLOW ALL, ALLOW OWNER, DENY ALL] by profile
  // *Policies: Policies to enable/refuse access to the data (required if ALLOW OWNER)

  '*': false, // Everything resctricted here
  
  'UserController': {
    '*': false, 
    'create': ['isAuthorized', 'asPermission'],
    'update': ['isAuthorized', 'asPermission', 'userPolicies'],
    'find': ['isAuthorized', 'asPermission'],
    'findOne': ['isAuthorized', 'asPermission', 'userPolicies'],
    'destroy': ['isAuthorized', 'asPermission', 'userPolicies'],
    'forgot': true,
  },

  'ProfileController': {
    '*': false, 
    'create': ['isAuthorized', 'asPermission'],
    'update': ['isAuthorized', 'asPermission'],
    'find': ['isAuthorized', 'asPermission'],
    'findOne': ['isAuthorized', 'asPermission'],
    'destroy': ['isAuthorized', 'asPermission']
  },

  'RoutesController': {
    '*': false, 
    'create': ['isAuthorized', 'asPermission'],
    'update': ['isAuthorized', 'asPermission'],
    'find': ['isAuthorized', 'asPermission'],
    'findOne': ['isAuthorized', 'asPermission'],
    'destroy': ['isAuthorized', 'asPermission']
  },

  'AuthController': {
    '*': true // We dont need authorization here, allowing public access
  }
};