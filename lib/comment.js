'use strict';

var db = require('./db.js')('myhn','comments'),
	commentModel = require('../models/comment.js');



function comment(){

	this.create = function createComment(postId,data,callback){
		data.postId = postId;
		var commentData =  commentModel(data);
		db.create(commentData, function(err,data){
			callback(err,data);
		});
	};

	this.read = function readComment(id,callback){
		db.findOne(id, function(err,data){
			callback(err,data);
		});
	};

	this.readAll = function readAllComments(postId,callback){
		db.findAll({postId:postId}, function(err,data){
			callback(err,data);
		});
	};

	this.update = function updateComment(id,data,callback){
		var commentData =  commentModel(data);
		db.update(id,commentData, function(err,data){
			callback(err,data);
		});
	};

	this.del = function deleteComment(id,callback){
		db.del(id, function(err,data){
			callback(err,data);
		});
	};
}

module.exports = new comment();