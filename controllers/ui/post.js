'use strict';

var post = require('../../lib/post.js');


function postRoutes(app){

	app.get('/post/:id', function(req,res){
		console.log('controller id:', req.params.id);
		post.readWithComments(req.params.id, function(err,data){
			if(err){
				throw err;
			}
			data.user = req.user;
			res.render('post',data);
		});
	});

	app.get('/createPost', function(req,res){
		if (!req.isAuthenticated()){
			return res.render('pleaseLoginModal');
		}
		var data = {user:req.user};
		res.render('createPost',data);
	});

	app.get('/editPost/:id', function(req,res){
		if (!req.isAuthenticated()){
			return res.render('pleaseLoginModal');
		}
		post.read(req.params.id, function(err,data){
			if(err){
				throw err;
			}

			//todo: move this out of the controller? 
			//handles multi option select's
			//todo: move to database
			var tagOptions = [{name:'NodeJS',val:'node'},{name:'Dev Ops',val:'devops'},{name:'NoSQL',val:'nosql'},{name:'Front-End',val:'frontend'},{name:'Marketing Tech',val:'marketingtech'}];
			var tagValues = data.tags || [];
			var options = [];
			for(var i=0,l=tagOptions.length;i<l;i++){
			    options.push({ value : tagOptions[i].val, selected : tagValues.indexOf(tagOptions[i].val) > -1 });
			}
			data.tags = options;
			console.log(data.tags);
			data.user = req.user;
			res.render('editPost',data);
		});
	});

	app.get('/deletePost/:id', function(req,res){
		post.read(req.params.id, function(err,data){
			if(err){
				throw err;
			}
			data.user = req.user;
			res.render('deletePost',data);
		});
	});
}

module.exports = postRoutes;