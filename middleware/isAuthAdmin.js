module.exports = (req, res, next) => {
    if (!req.session.isLoggedIn || req.session.userType!=='admin') {
        return res.redirect('/login/admin');
    }
    next();
}