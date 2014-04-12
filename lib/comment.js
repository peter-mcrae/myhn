'use strict'

var db = require('./db.js')('myhn','comments');

function commentModel(data){
	//todo validate & escape data
	return {
		author: data.author || '',
		parent: data.parent || null,
		postId: data.postId || null,
		text: data.text || '',
		createdDate: new Date().getTime(),
		lastUpdate: new Date().getTime(),
		voteCount: 0
	}
}

function comment(){

	this.create = function createComment(data,callback){
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
		db.findAll(postId, function(err,data){
			callback(err,data);
		});
	};

	this.update = function updateComment(id,data,callback){
		var commentData =  commentModel(data);
		db.update(id,commentData, function(err,data){
			callback(err,data);
		});
	};

	this.delete = function deleteComment(id){
		db.delete(id, function(err,data){
			callback(err,data);
		});
	};
};

module.exports = new comment();