/**
 * Bootstrap
 * (sails.config.bootstrap)
 *
 * An asynchronous bootstrap function that runs just before your Sails app gets lifted.
 * > Need more flexibility?  You can also do this by creating a hook.
 *
 * For more information on bootstrapping your app, check out:
 * https://sailsjs.com/config/bootstrap
 */

module.exports.bootstrap = async function (done) {
  // if (sails.config.environment !== 'development') {
  //   return done();
  // }

  //******************* CREATE PROFILE TEMPLATE *******************//

  //******** CREATE PROFILE ADMIN ********//
  let createdAdmin = null
  try {
    createdAdmin = await Profile.findOrCreate({ name: 'ADMIN' }, {
      name: 'ADMIN'
    });
    sails.log('Admin profile created');
  } catch (err) {
    sails.log('Err creating Admin profile', err);
  }
  //******** CREATE PROFILE ADMIN ********//

  //******** CREATE PROFILE USER ********//
  let createdUser = null
  try {
    createdUser = await Profile.findOrCreate({ name: 'USER' }, {
      name: 'USER'
    });
  } catch (err) {
    sails.log.debug('Err creating User profile', err);
  }
  //******** CREATE PROFILE USER ********//

  //******************* CREATE PROFILE TEMPLATE *******************//

 

  //******************* CREATE USERS *******************//

  //******** CREATE USER ADMIN ********//
  try {
    await User.findOrCreate({ email: '1' }, {
      email: '1',
      password: '@@@@',
      name: 'test',
      firstName: 'Admin',
      gender: '1',
      state: '2',
      avatarUrl: '',
      profile: createdAdmin.id,
    });
  } catch (err) {
    sails.log.debug('Err creating Admin user', err);
  }
  //******** CREATE USER ADMIN ********//

  //******************* CREATE USERS *******************//

  //******************* CREATE ROUTING *******************//

  //******** CREATE ROUTES ADMIN ********//
  try {
    await Routes.findOrCreate({ url: '/user', profile: createdAdmin.id }, { name: 'USER', url: '/user', boGet: 'ALLOW ALL', boPost: 'ALLOW ALL', boDelete: 'ALLOW ALL', boPatch: 'ALLOW ALL', isWeb: false, isDisabled: false, profile: createdAdmin.id });
    await Routes.findOrCreate({ url: '/user/:id', profile: createdAdmin.id }, { name: 'USER ID', url: '/user/:id', boGet: 'ALLOW ALL', boPost: 'ALLOW ALL', boDelete: 'ALLOW ALL', boPatch: 'ALLOW ALL', isWeb: false, isDisabled: false, profile: createdAdmin.id });
    await Routes.findOrCreate({ url: '/profile', profile: createdAdmin.id }, { name: 'PROFILE', url: '/profile', boGet: 'ALLOW ALL', boPost: 'ALLOW ALL', boDelete: 'ALLOW ALL', boPatch: 'ALLOW ALL', isWeb: false, isDisabled: false, profile: createdAdmin.id });
    await Routes.findOrCreate({ url: '/profile/:id', profile: createdAdmin.id }, { name: 'PROFILE ID', url: '/profile/:id', boGet: 'ALLOW ALL', boPost: 'ALLOW ALL', boDelete: 'ALLOW ALL', boPatch: 'ALLOW ALL', isWeb: false, isDisabled: false, profile: createdAdmin.id });
    await Routes.findOrCreate({ url: '/routes', profile: createdAdmin.id }, { name: 'ROUTES', url: '/routes', boGet: 'ALLOW ALL', boPost: 'ALLOW ALL', boDelete: 'ALLOW ALL', boPatch: 'ALLOW ALL', isWeb: false, isDisabled: false, profile: createdAdmin.id });
    await Routes.findOrCreate({ url: '/routes/:id', profile: createdAdmin.id }, { name: 'ROUTES ID', url: '/routes/:id', boGet: 'ALLOW ALL', boPost: 'ALLOW ALL', boDelete: 'ALLOW ALL', boPatch: 'ALLOW ALL', isWeb: false, isDisabled: false, profile: createdAdmin.id });
  } catch (err) {
    sails.log.debug('Err creating routes', err);
  }
  //******** CREATE ROUTES ADMIN ********//

  //******** CREATE ROUTES USER ********//
  try {
    await Routes.findOrCreate({ url: '/user', profile: createdUser.id }, { name: 'USER', url: '/user', boGet: 'DENY ALL', boPost: 'DENY ALL', boDelete: 'DENY ALL', boPatch: 'DENY ALL', isWeb: false, isDisabled: false, profile: createdUser.id });
    await Routes.findOrCreate({ url: '/user/:id', profile: createdUser.id }, { name: 'USER ID', url: '/user/:id', boGet: 'ALLOW OWNER', boPost: 'DENY ALL', boDelete: 'DENY ALL', boPatch: 'ALLOW OWNER', isWeb: false, isDisabled: false, profile: createdUser.id });
    await Routes.findOrCreate({ url: '/profile', profile: createdUser.id }, { name: 'PROFILE', url: '/profile', boGet: 'DENY ALL', boPost: 'DENY ALL', boDelete: 'DENY ALL', boPatch: 'DENY ALL', isWeb: false, isDisabled: false, profile: createdUser.id });
    await Routes.findOrCreate({ url: '/profile/:id', profile: createdUser.id }, { name: 'PROFILE ID', url: '/profile/:id', boGet: 'DENY ALL', boPost: 'DENY ALL', boDelete: 'DENY ALL', boPatch: 'DENY ALL', isWeb: false, isDisabled: false, profile: createdUser.id });
    await Routes.findOrCreate({ url: '/routes', profile: createdUser.id }, { name: 'ROUTES', url: '/routes', boGet: 'DENY ALL', boPost: 'DENY ALL', boDelete: 'DENY ALL', boPatch: 'DENY ALL', isWeb: false, isDisabled: false, profile: createdUser.id });
    await Routes.findOrCreate({ url: '/routes/:id', profile: createdUser.id }, { name: 'ROUTES ID', url: '/routes/:id', boGet: 'DENY ALL', boPost: 'DENY ALL', boDelete: 'DENY ALL', boPatch: 'DENY ALL', isWeb: false, isDisabled: false, profile: createdUser.id });
  } catch (err) {
    sails.log.debug('Err creating routes', err);
  }
  //******** CREATE ROUTES ADMIN ********//

  //******************* CREATE ROUTING *******************//


  // By convention, this is a good place to set up fake data during development.
  //
  // For example:
  // ```
  // // Set up fake development data (or if we already have some, avast)
  // if (await User.count() > 0) {
  //   return done();
  // }
  //
  // await User.createEach([
  //   { emailAddress: 'ry@example.com', fullName: 'Ryan Dahl', },
  //   { emailAddress: 'rachael@example.com', fullName: 'Rachael Shaw', },
  //   // etc.
  // ]);
  // ```

  // Don't forget to trigger `done()` when this bootstrap function's logic is finished.
  // (otherwise your server will never lift, since it's waiting on the bootstrap)
  return done();
};