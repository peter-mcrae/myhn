'use strict';

function postModel(data){
	//todo validate & escape data
	return {
		author: data.author || '',
		subject: data.subject || '',
		link: data.link || '',
		text: data.text || '',
		createdDate: data.createdDate || new Date().getTime(),
		lastComment: null,
		lastUpdate: new Date().getTime(),
		tags: data.tags || [],
		voteCount: 0
	};

}

module.exports = postModel;