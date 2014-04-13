'use strict';

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
	};
}

module.exports = commentModel;
