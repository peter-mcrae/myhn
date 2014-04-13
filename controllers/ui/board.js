'use strict';

var board = require('../../lib/board.js'),
	post = require('../../lib/post.js');


function boardRoutes(app){

	//get a board
	app.get('/board/:id', function(req,res){

		post.readAll({}, function(err,data){
			if(err){
				throw err;
			}
			var templateData = {
				posts:data
			};

			templateData.user = req.user;
			res.render('board',templateData);
		});
	});
}

module.exports = boardRoutes;