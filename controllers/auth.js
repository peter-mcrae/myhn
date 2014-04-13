'use strict';

var passport = require('passport');

function twitterLogin(app) {

    app.get('/auth/twitter',
        passport.authenticate('twitter'),
        function (req, res) {
            // The request will be redirected to Twitter for authentication, so this
            // function will not be called.
        });

    app.get('/auth/twitter/callback', passport.authenticate('twitter', {
            failureRedirect: '/login'
        }),
        function (req, res) {
            res.redirect('/');
            console.log('user', req.user);
        });

    app.get('/logout', function (req, res) {
        req.logout();
        res.redirect('/');
    });

}

module.exports = twitterLogin;