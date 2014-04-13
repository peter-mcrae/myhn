'use strict';

if(process.env.NODETIME_ACCOUNT_KEY) {
  require('nodetime').profile({
    accountKey: process.env.NODETIME_ACCOUNT_KEY,
    appName: 'dev-myhn' // optional
  });
}


var kraken = require('kraken-js'),
    express = require('express'),
    passport = require('passport'),
    twitter = require('./lib/passport-twitter.js'),
    app = {};

require('./lib/helper-format-date.js');

app.configure = function configure(nconf, next) {
    // Async method run on startup.
    next(null);
};


app.requestStart = function requestStart(server) {
    // Run before most express middleware has been registered.

};


app.requestBeforeRoute = function requestBeforeRoute(server) {
    server.use(passport.initialize());

    server.use(passport.session());
    server.use(express.methodOverride());
    // Run before any routes have been added.
};


app.requestAfterRoute = function requestAfterRoute(server) {
    // Run after all routes have been added.
};


if (require.main === module) {
    kraken.create(app).listen(function (err) {
        if (err) {
            console.error(err.stack);
        }
    });
}


module.exports = app;
