'use strict'

var post = require('../lib/post.js');


function postRoutes(app){

	//get a post
	app.get('/post/:id', function(req,res){
		post.read(req.params.id, function(err,data){
			if(err){
				throw err;
			}
			res.json(data);
		});
	});

	app.post('/post', function(req,res){
		post.delete(req.body, function(err){
			if(err){
				throw err;
			}
			res.send(200);
		});
	});

	app.put('/post/:id', function(req,res){
		post.delete(req.params.id, req.body, function(err){
			if(err){
				throw err;
			}
			res.send(200);
		});
	});


	app.delete('/post/:id', function(req,res){
		post.delete(req.params.id, function(err){
			if(err){
				throw err;
			}
			res.send(200);
		});
	});

}

module.exports = postRoutes;