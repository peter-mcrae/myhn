'use strict'

var board = require('../lib/board.js');


function boardRoutes(app){

	//get a board
	app.get('/board/:id', function(req,res){
		res.render('board');
		/*board.read(req.params.id, function(err,data){
			if(err){
				throw err;
			}
			res.json(data);
		});*/
	});

	app.post('/board', function(req,res){
		board.delete(req.body, function(err){
			if(err){
				throw err;
			}
			res.send(200);
		});
	});

	app.put('/board/:id', function(req,res){
		board.delete(req.params.id, req.body, function(err){
			if(err){
				throw err;
			}
			res.send(200);
		});
	});


	app.delete('/board/:id', function(req,res){
		board.delete(req.params.id, function(err){
			if(err){
				throw err;
			}
			res.send(200);
		});
	});

}

module.exports = boardRoutes;