'use strict'

var db = require('./db.js')('myhn','boards');

function boardModel(data){
	//todo validate & escape data
	return {
		owner: data.author || '',
		parent: data.parent || null,
		name: data.text || '',
		email: data.email || '',
		descriptions: data.description || '',
		createdDate: new Date().getTime(),
		lastUpdate: new Date().getTime()
	}
}

function board(){

	this.create = function createBoard(data,callback){
		var boardData =  boardModel(data);
		db.create(boardData, function(err,data){
			callback(err,data);
		});
	};

	this.read = function readBoard(id,callback){
		db.findOne(id, function(err,data){
			callback(err,data);
		});
	};

	this.readAll = function readAllboards(callback){
		db.findAll(function(err,data){
			callback(err,data);
		});
	};

	this.update = function updateBoard(id,data,callback){
		var boardData =  boardModel(data);
		db.update(id,boardData, function(err,data){
			callback(err,data);
		});
	};

	this.delete = function deleteBoard(id){
		db.delete(id, function(err,data){
			callback(err,data);
		});
	};
};

module.exports = new board();