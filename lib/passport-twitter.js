'use strict';

var passport = require('passport'),
    TwitterStrategy = require('passport-twitter').Strategy,
    nconf = require('nconf');

var secrets = nconf.file('config/settings-secret.env').env();
var TWITTER_CONSUMER_KEY = secrets.get('twitter_key');
var TWITTER_CONSUMER_SECRET = secrets.get('twitter_secret');

// Passport session setup.
//   To support persistent login sessions, Passport needs to be able to
//   serialize users into and deserialize users out of the session.  Typically,
//   this will be as simple as storing the user ID when serializing, and finding
//   the user by ID when deserializing.  However, since this example does not
//   have a database of user records, the complete Twitter profile is serialized
//   and deserialized.
passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (obj, done) {
    done(null, obj);
});

// Use the TwitterStrategy within Passport.
//   Strategies in passport require a `verify` function, which accept
//   credentials (in this case, a token, tokenSecret, and Twitter profile), and
//   invoke a callback with a user object.
passport.use(new TwitterStrategy({
        consumerKey: TWITTER_CONSUMER_KEY,
        consumerSecret: TWITTER_CONSUMER_SECRET,
        callbackURL: '/auth/twitter/callback'
    },
    function (token, tokenSecret, profile, done) {
        // asynchronous verification, for effect...
        process.nextTick(function () {

            // To keep the example simple, the user's Twitter profile is returned to
            // represent the logged-in user.  In a typical application, you would want
            // to associate the Twitter account with a user record in your database,
            // and return that user instead.
            return done(null, profile);
        });
    }
));


module.exports = function (req, res, next) {
    next();
};