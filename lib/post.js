'use strict';

var db = require('./db.js')('myhn','posts'), 
	comment = require('./comment.js'), 
	async = require('async'),
	postModel = require('../models/post.js');


function post(){

	this.create = function createPost(data,callback){
		var postData =  postModel(data);
		db.create(postData, function(err,data){
			callback(err,data);
		});
	};

	this.read = function readPost(id,callback){
		console.log('lib id:',id);
		db.findOne(id, function(err,data){
			callback(err,data);
		});
	};

	this.readWithComments = function readPostWithComments(id, callback){
		var queue = [], self=this;
		//get the post from the db
		queue.push(function(callback){
			self.read(id, function(err,data){
				callback(err, data);
			});
		});
		//get the comments from the db
		queue.push(function(callback){
			comment.readAll(id, function(err,data){
				callback(err, data);
			});
		});

		async.parallel(queue,function(err, results){
			if(typeof results[0] !== 'undefined'){
				results[0].comments = results[1];
			}
			callback(null,results[0]);
		});
		
	};

	this.readAll = function readPost(boardId,callback){
		boardId = boardId || {};
		db.findAll(boardId, function(err,data){
			callback(err,data);
		});
	};

	this.update = function updatePost(id,data,callback){
		var postData =  postModel(data);
		db.update(id,postData, function(err,data){
			callback(err,data);
		});
	};

	this.del = function deletePost(id,callback){
		db.del(id, function(err,data){
			callback(err,data);
		});
	};
}

module.exports = new post();

