'use strict';

var board = require('../lib/board.js'),
	post = require('../lib/post.js');


function boardRoutes(app){


	app.post('/board', function(req,res){
		board.create(req.body, function(err){
			if(err){
				throw err;
			}
			res.send(200);
		});
	});

	app.put('/board/:id', function(req,res){
		board.update(req.params.id, req.body, function(err){
			if(err){
				throw err;
			}
			res.send(200);
		});
	});


	app.delete('/board/:id', function(req,res){
		board.del(req.params.id, function(err){
			if(err){
				throw err;
			}
			res.send(200);
		});
	});

}

module.exports = boardRoutes;