'use strict'

var db = require('./db.js')('myhn','comments');

function comment(){

	this.create = function createComment(data,callback){
		//data should have post, parent, and message
	};

	this.read = function readComment(id,callback){

	};

	this.readAll = function readComments(postId,callback){

	};

	this.update = function updateComment(id,data,callback){

	};

	this.delete = function deleteComment(id){

	};
};

module.exports = new comment();