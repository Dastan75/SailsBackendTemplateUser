/**
 * isAuthorized
 *
 * @description :: Policy to check if user is authorized with JSON web token
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Policies
 */

module.exports = function (req, res, next) {
    if (sails.config.environment === 'development') {
        if (sails.config.custom.debug.token === false) {
            sails.log.debug("Token \t\t | Access permission : \t ok");
            return next();
        }
    }
    let token;
    if (req.headers && req.headers.authorization) {
        let parts = req.headers.authorization.split(' ');
        if (parts.length == 2) {
            let scheme = parts[0],
                credentials = parts[1];
            if (/^Bearer$/i.test(scheme)) {
                token = credentials;
            }
        } else {
            return res.status(401).json({ err: 'Format is Authorization: Bearer [token]' });
        }
    } else if (req.param('token')) {
        token = req.param('token');
        // We delete the token from param to not have a mess
        delete req.query.token;
    } else {
        return res.status(401).json({ err: 'No Authorization header was found' });
    }

    jwToken.verify(token, async function (err, token) {
        if (err) return res.status(401).json(
            { err: 'Invalid Token!' }
        );
        req.token = token; // This is the decrypted token or the payload you provided
        req.user = await User.find(token.id);
        return next();
    });
};