/**
 * Production environment settings
 * (sails.config.*)
 *
 * What you see below is a quick outline of the built-in settings you need
 * to configure your Sails app for production.  The configuration in this file
 * is only used in your production environment, i.e. when you lift your app using:
 *
 * ```
 * NODE_ENV=production node app
 * ```
 *
 * > If you're using git as a version control solution for your Sails app,
 * > this file WILL BE COMMITTED to your repository by default, unless you add
 * > it to your .gitignore file.  If your repository will be publicly viewable,
 * > don't add private/sensitive data (like API secrets / db passwords) to this file!
 *
 * For more best practices and tips, see:
 * https://sailsjs.com/docs/concepts/deployment
 */

module.exports = {

  datastores: {

    /***************************************************************************
    *                                                                          *
    * Configure your default production database.                              *
    *                                                                          *
    * 1. Choose an adapter:                                                    *
    *    https://sailsjs.com/plugins/databases                                 *
    *                                                                          *
    * 2. Install it as a dependency of your Sails app.                         *
    *    (For example:  npm install sails-mysql --save)                        *
    *                                                                          *
    * 3. Then set it here (`adapter`), along with a connection URL (`url`)     *
    *    and any other, adapter-specific customizations.                       *
    *    (See https://sailsjs.com/config/datastores for help.)                 *
    *                                                                          *
    ***************************************************************************/
    default: {
      /****************************************************************************
      *                                                                           *
      * More adapter-specific options                                             *
      *                                                                           *
      * > For example, for some hosted PostgreSQL providers (like Heroku), the    *
      * > extra `ssl: true` option is mandatory and must be provided.             *
      *                                                                           *
      * More info:                                                                *
      * https://sailsjs.com/config/datastores                                     *
      *                                                                           *
      ****************************************************************************/
      // ssl: true,
      adapter: 'sails-mongo',
      host: 'mongo',
      port: 27017,
      database:'template'
    },
  },

  models: {

    /***************************************************************************
    *                                                                          *
    * To help avoid accidents, Sails automatically sets the automigration      *
    * strategy to "safe" when your app lifts in production mode.               *
    * (This is just here as a reminder.)                                       *
    *                                                                          *
    * More info:                                                               *
    * https://sailsjs.com/docs/concepts/models-and-orm/model-settings#?migrate *
    *                                                                          *
    ***************************************************************************/
    migrate: 'drop', 


    // 1. FOR DEV:      alter   wipe/drop and try to re-insert ALL my data (recommended)
    // 2. FOR TESTS:    drop    wipe/drop ALL my data every time I lift Sails
    // 3. FOR STAGING:  safe    don't auto-migrate my data. I will do it myself

    /***************************************************************************
    *                                                                          *
    * If, in production, this app has access to physical-layer CASCADE         *
    * constraints (e.g. PostgreSQL or MySQL), then set those up in the         *
    * database and uncomment this to disable Waterline's `cascadeOnDestroy`    *
    * polyfill.  (Otherwise, if you are using a databse like Mongo, you might  *
    * choose to keep this enabled.)                                            *
    *                                                                          *
    ***************************************************************************/
    // cascadeOnDestroy: false,

  },



  session: {

    cookie: {
      // secure: true,
      maxAge: 24 * 60 * 60 * 1000,  // 24 hours
    },

  },




  /**************************************************************************
  *                                                                         *
  * Set the production log level.                                           *
  *                                                                         *
  * (https://sailsjs.com/config/log)                                        *
  *                                                                         *
  ***************************************************************************/


  /**************************************************************************
  *                                                                         *
  * Production overrides for any custom settings specific to your app.      *
  * (for example, production credentials for 3rd party APIs like Stripe)    *
  *                                                                         *
  * > See config/custom.js for more info on how to configure these options. *
  *                                                                         *
  ***************************************************************************/
  security: {

    /***************************************************************************
    *                                                                          *
    * If this app has CORS enabled (see `config/security.js`) with the         *
    * `allowCredentials` setting enabled, then you should uncomment the        *
    * `allowOrigins` whitelist below.  This sets which "origins" are allowed   *
    * to send cross-domain (CORS) requests to your Sails app.                  *
    *                                                                          *
    * > Replace "https://example.com" with the URL of your production server.  *
    * > Be sure to use the right protocol!  ("http://" vs. "https://")         *
    *                                                                          *
    ***************************************************************************/
    cors: {
      allowOrigins: [
        'http://localhost',
        'http://localhost:8081',
      ]
    },

  },
};
