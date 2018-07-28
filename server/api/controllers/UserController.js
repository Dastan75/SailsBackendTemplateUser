/**
 * UserController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

var bcrypt = require('bcrypt');

module.exports = {
    create: async function (req, res) {
        if (!req.body.password && sails.config.custom.defaultPassword.asDefaultPassword === true) {
            req.body.password = sails.config.custom.defaultPassword.password;
            req.body.confirmPassword = sails.config.custom.defaultPassword.password;
        }
        if (req.body.password !== req.body.confirmPassword && sails.config.custom.defaultPassword.asDefaultPassword === false) {
            return res.status(401).json({ err: 'Password doesn\'t match' });
        }
        try {

            let profile = await Profile.findOne({
                name: 'USER'
            });
            req.body.profile = profile.id

            let createdUser = await User.create(req.body).fetch();
            return res.status(201).json({ user: createdUser });

        } catch (err) {
            return res.status(404).json({ err: err });
        }
    },
    update: async function (req, res) {
        let tmpPassword = null;
        if (req.body.password) {
            tmpPassword = req.body.password;
        }
        delete req.body.password;
        if (tmpPassword) {
            bcrypt.genSalt(10, function (err, salt) {
                if (err)
                    return next(err);
                bcrypt.hash(tmpPassword, salt, async function (err, hash) {
                    if (err)
                        return res.status(204).json({ err: 'Password update failed' });
                    try {
                        req.body.encryptedPassword = hash;
                        await User.update(req.params.id).set(req.body);
                        return res.status(200).json({ status: 'Success' });
                    } catch (err) {
                        sails.log.debug(err);
                        return res.status(204).json({ err: 'Password update failed' });
                    }
                })
            })
        } else {
            try {
                await User.update(req.params.id).set(req.body);
                return res.status(200).json({ status: 'Success' });
            } catch (err) {
                sails.log.debug(err);
                return res.status(204).json({ err: 'Password update failed' });
            }
        }

    },
    forgot: async function (req, res) {
        let query = req.param('email');
        if (query) {

            bcrypt.genSalt(10, function (err, salt) {
                if (err)
                    return next(err);
                let newPassword = sails.config.custom.defaultPassword.password + Math.floor(Math.random() * Math.floor(100000000))
                bcrypt.hash(newPassword, salt, async function (err, hash) {
                    if (err)
                        return res.status(204).json({ err: 'Password update failed' });
                    try {
                        let user = await User.update({ email: query }).set({ encryptedPassword: hash, state: '1' }).fetch();

                        return res.status(200).json({ status: 'Success' });
                    } catch (err) {
                        sails.log.debug(err);
                        return res.status(204).json({ err: 'Password update failed' });
                    }
                })
            })
        } else {
            return res.status(204).json({ err: 'No data found' });
        }
    },
};