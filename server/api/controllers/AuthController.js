/**
 * AuthController
 *
 * @description :: Server-side logic for managing auths
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
  index: async function (req, res) {
    let email = req.param('email');
    let password = req.param('password');

    if (!email || !password) {
      return res.status(401).json({ err: 'email and password are required' });
    }

    await User.findOne({ email: email }).populate('profile').exec(function (err, user) {
      if (!user) {
        return res.status(401).json({ err: 'invalid email or password' });
      }
      User.comparePassword(password, user, async function (err) {
        if (!err) {
          return res.status(401).json({ err: 'invalid email or password' });
        } else {
          return res.status(200).json({
            user: user,
            token: await jwToken.issue({ id: user.id })
          });
        }
      });
    })
  }
};
