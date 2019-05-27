module.exports = (req, res, next) => {
    if (!req.session.isLoggedIn || req.session.userType!=='jobseeker') {
        return res.redirect('/login/jobseeker');
    }
    next();
}