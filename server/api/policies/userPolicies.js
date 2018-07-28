/**
 * User policy
 *
 * @description :: Policy to check if model user is allowed to access
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Policies
 */


module.exports = async function (req, res, next) {
    if (sails.config.environment === 'development') {
        if (sails.config.custom.debug.limitedAccess === false) {
            sails.log.debug("Limited Access \t | Access model : \t ok");
            sails.log.debug("-----------------------------\n");
            return next();
        }
    }

    if (!req.owner) {
        return next();
    }
    if (req.owner) {

        //GET USER
        let user = null;
        try {
            user = await User.findOne(req.token.id);
        } catch (e) {
            return res.status(404).json({ err: 'Oups... something wrong happened!', print: e });
        }
        if (!user) {
            return res.status(404).json({ err: 'No data found' });
        }

        // COMPARE IF USER SAME AS REQUEST
        let userId = user.id;
        if (req.params.id === userId) {
            return next();
        } else {
            return res.status(403).json({ err: 'Access denied' });
        }
    }
    
    return res.status(404).json({ err: 'No data found' });
};