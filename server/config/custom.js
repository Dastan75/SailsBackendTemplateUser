/**
 * Custom configuration
 * (sails.config.custom)
 *
 * One-off settings specific to your application.
 *
 * For more information on custom configuration, visit:
 * https://sailsjs.com/config/custom
 */

module.exports.custom = {

  /***************************************************************************
  *                                                                          *
  * Any other custom config this Sails app should use during development.    *
  *                                                                          *
  ***************************************************************************/

  defaultPassword: {
    asDefaultPassword: false,
    password: 'I_AM_THE_PASSWORD',
  },
  debug: {
    token: true,
    limitedAccess: true,
  },
};
