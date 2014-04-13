'use strict';

var post = require('../lib/post.js');


function postRoutes(app){

	//mail gun
	app.post('/mailgun/post', function(req,res){

		post.create(req.body, function(err,data){
			if(err){
				res.send(500);
			}
			res.send(200);
		});
	});
}

module.exports = postRoutes;