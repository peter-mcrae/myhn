'use strict';

var mongodb = require('mongodb'),
	MongoClient = mongodb.MongoClient,
	bson = mongodb.ObjectID,
	nconf = require('nconf');

function MongoDB (db,collection) {

	nconf.file('config/settings.env').env();
	// Options
	this.host = nconf.get('mongo_host');
	this.port = nconf.get('mongo_port');
	this.db = nconf.get('mongo_db') || db;
	this.collection = collection;
	this.uri = nconf.get('mongo_uri') || 'mongodb://' + nconf.get('mongo_user') + ':' + nconf.get('mongo_pass')+ '@'+ this.host + ':' + this.port + '/' + this.db; // use for localhost 'mongodb://localhost:27017/models'
	console.log(this.uri);

	this.findAll = function (filter,callback) {
		
		var self = this;
		filter = filter || {};

		MongoClient.connect(self.uri, function (err, db) {
			
			if(err){
				return callback(err);
			}
			db.collection(self.collection, function (err, collection) {
				if(err){
					return callback(err);
				}
				
				collection.find(filter).toArray(function (err, data) {
					callback(err, data);
					db.close();
				});

			});
			
		});

	};

	this.findOne = function (id, callback) {
		
		var self = this;

		MongoClient.connect(self.uri, function (err, db) {
			
			if(err){
				return callback(err);
			}
			db.collection(self.collection, function (err, collection) {	
				if(err){
					return callback(err);
				}
				
				id = bson.createFromHexString(id);
				collection.findOne({_id : id},function (err, data) {
					callback(err, data);
					db.close();
				});

			});
			
		});
	};

	

	/**
	 * create
	 * Create a new document in a collection
	 * @param {Object} data
	 * @param {Function} callback
	 * @return {callback} The document that was stored in the database or error
	 */
	this.create = function (data, callback) {

		var self = this;

		MongoClient.connect(self.uri, function (err, db) {
			if(err){
				return callback(err);
			}

			db.collection(self.collection, function (err, collection) {
				if (err){
					return callback(err);
				}	

				collection.insert(data, {safe : true}, function (err, data) {
					console.log('created',data);
					callback(err, data);
					db.close();
				});
				
			});
			
		});
	};

	this.delete = function (id, callback) {
		
		var self = this;

		MongoClient.connect(self.uri, function (err, db) {
			if(err){
				return callback(err);
			}

			db.collection(self.collection, function (err, collection) {
				if (err) {
					return callback(err);
				}

				id = new bson.createFromHexString(id);
				collection.remove({_id : id}, {safe : true}, function (err, data) {
					callback(err, data);
					db.close();
				});
			});
		});
	};

	/**
	 * update
	 * Update a document in a collection
	 * @param {String} lookup
	 * @param {String} change
	 * @param {Function} callback
	 * @return {JSON} The document that was updated from the database or error
	 */
	this.update = function (id, change, callback) {

		var self = this;

		MongoClient.connect(self.uri, function (err, db) {
			if(err){
				return callback(err);
			}
			db.collection(self.collection, function (err, collection) {
				if(err){
					return callback(err);
				}				
				id = new bson.createFromHexString(id);
				collection.update({_id : id}, change, {safe: true}, function (err, data) {
					callback(err, data);
					db.close();
				});
			
			});
		});
	};
}

module.exports = function(db,collection){
	return new MongoDB(db,collection);
};