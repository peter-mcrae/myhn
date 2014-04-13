'use strict';

var comment = require('../lib/comment.js');


function commentRoutes(app){


	app.get('/comment/postId', function(req,res){
		comment.readAll({postId:req.params.postId},function(err,data){
			if(err){
				throw err;
			}
			res.json(data);
		});
	});

	app.post('/comment/postId', function(req,res){
		comment.create(req.body, function(err){
			if(err){
				throw err;
			}
			res.send(200);
		});
	});

	app.put('/comment/:id', function(req,res){
		comment.update(req.params.id, req.body, function(err){
			if(err){
				throw err;
			}
			res.send(200);
		});
	});


	app.delete('/comment/:id', function(req,res){
		comment.del(req.params.id, function(err){
			if(err){
				throw err;
			}
			res.send(200);
		});
	});

}

module.exports = commentRoutes;