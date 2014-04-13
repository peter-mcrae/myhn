'use strict';

var post = require('../lib/post.js'),
	postModel = require('../models/post.js');

function postRoutes(app){
	
	

	app.get('/bookmarklet/post', function(req,res){

		var data = {
			author: req.query.author,
			subject: req.query.subject, 
			link: req.query.link
		};

		post.create(data, function(err,data){
			if(err){
				res.send(500);
			}
			res.send(200);
		});
	});
}

module.exports = postRoutes;