/**
 * asPermission
 *
 * @description :: Policy to check if user as the good permission
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Policies
 */

function checkPerm(method, route, disabled) {
    if (disabled) {
        return "DENY ALL";
    }
    let asPerm = "DENY ALL";
    switch (method) {
        case "GET":
            asPerm = route.boGet;
            break;

        case "POST":
            asPerm = route.boPost;
            break;

        case "DELETE":
            asPerm = route.boDelete;
            break;

        case "PATCH":
            asPerm = route.boPatch;
            break;

        default:
            asPerm = "DENY ALL";
            break;
    }
    return asPerm;
};

module.exports = async function (req, res, next) {
    if (sails.config.environment === 'development') {
        if (sails.config.custom.debug.limitedAccess === false) {
            sails.log.debug("Limited Access \t | Access permission : \t ok");
            return next();
        }
    }
    let userId = req.token.id;
    let url = req.route.path;
    
    if (url === '/user/:id?') {
        url = '/user/:id'
    }

    let method = req.method;
    let asPerm = "DENY ALL";
    
    //GET USER
    let user = null;
    try {
        user = await User.findOne(userId);
    } catch (e) {
        return res.status(404).json({ err: 'Oups... something wrong happened!', print: e });
    }
    if (!user) {
        return res.status(404).json({ err: 'No data found' });
    }
    
    
    let profileId = user.profile;
    let route = null;

    // GET ROUTES FROM PROFILE
    try {
        route = await Routes.findOne({ profile: profileId, url: url })
    } catch (e) {
        return res.status(404).json({ err: 'Oups... something wrong happened!', print: e });
    }
    if (!route) {
        return res.status(404).json({ err: 'Permission denied' });
    }
    
    // CHECK PERM ON ROUTE
    asPerm = checkPerm(method, route, route.isDisabled);

    if (asPerm == "ALLOW ALL") {
        req.owner = false;
        return next();
    } else if (asPerm === "ALLOW OWNER") {
        req.owner = true;
        return next();
    } else {
        return res.status(403).json({ err: 'Permission denied' });
    }
};