'use strict'

var db = require('./db.js')('myhn','posts');

function postModel(data){
	//todo validate & escape data
	return {
		author: data.author || '',
		subject: data.subject || '',
		link: data.link || '',
		text: data.text || '',
		createdDate: new Date().getTime(),
		lastComment: null,
		lastUpdate: new Date().getTime(),
		tags: data.tags || [],
		voteCount: 0
	}
}

function post(){

	this.create = function createPost(data,callback){
		var postData =  postModel(data);
		db.create(postData, function(err,data){
			callback(err,data);
		});
	};

	this.read = function readPost(id,callback){
		db.findOne(id, function(err,data){
			callback(err,data);
		});
	};

	this.readAll = function readPost(boardId,callback){
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

	this.delete = function deletePost(id,callback){
		db.delete(id, function(err,data){
			callback(err,data);
		});
	};
};

module.exports = new post();

