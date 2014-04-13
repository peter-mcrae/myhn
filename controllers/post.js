'use strict';

var post = require('../lib/post.js'), 
	postModel = require('../models/post.js');


function postRoutes(app){

	app.get('/post', function(req,res){
		post.readAll({},function(err,data){
			if(err){
				throw err;
			}
			res.json(data);
		});
	});

	app.post('/post', function(req,res){
		if (!req.isAuthenticated()){
			return res.send(401);
		}
		post.create(req.body, function(err,data){
			if(err){
				throw err;
			}
			//todo if ajax return 200
			res.redirect('/post/'+data[0]._id);
		});
	});

	app.put('/post/:id', function(req,res){
		if (!req.isAuthenticated()){
			return res.send(401);
		}
		post.update(req.params.id, req.body, function(err){
			if(err){
				throw err;
			}
			//todo if ajax return 200
			res.redirect('back');
		});
	});


	app.delete('/post/:id', function(req,res){
		if (!req.isAuthenticated()){
			return res.send(401);
		}
		post.del(req.params.id, function(err){
			if(err){
				throw err;
			}
			//todo: if ajax return a 200
			res.redirect('back');
		});
	});

}

module.exports = postRoutes;