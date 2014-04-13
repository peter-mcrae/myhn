'use strict';

function setup(app){
	app.get('/requestEmail', function(req,res){
		res.render('requestEmail');
	});

	app.get('/configureBookmarklet', function(req,res){
		if (!req.isAuthenticated()){
			return res.render('pleaseLoginModal');
		}
		var data = {user:req.user};
		res.render('configureBookmarklet',data);
	});
}

module.exports = setup;