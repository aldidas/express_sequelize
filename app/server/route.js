var config = require('./conf'),
	m = require('./model');

var getPosts = function(req, res) {
	m.models.post.findAll({
		order: 'createdAt DESC'
	}).then(function(result){	
		res.send(result);
	}, function(err){
		console.log(err);
	});
};

var getItem = function(req, res) {
	var id = req.params.id;
	m.models.post.findOne({
		where: {
			id: id
		}
	}).then(function(result){
		res.send(result);
	}, function(err){
		console.log(err);
	});
}

var postEntry = function(req, res) {
	var title = req.body.title,
		content = req.body.content;
	m.models.post.sync()
		.then(function() {
			return 	m.models.post.create({
				postTitle: title,
				postContent: content
			});
		})
		.then(function(data) {
			res.send({
				status: 'OK',
				data: data
			});
		});
};

exports.routes = {
	getPosts: getPosts,
	getItem: getItem,
	postEntry: postEntry
};