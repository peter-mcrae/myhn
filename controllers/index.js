'use strict';


var IndexModel = require('../models/index');


module.exports = function (app) {

    var model = new IndexModel();


    app.get('/', function (req, res) {
        
        model.user = req.user;
        res.render('index', model);
        
    });

};
