var Sequelize = require('sequelize'),
	c = require('./conf');

var Post = c.config.db.define( 'post', {
	postTitle: {
		type: Sequelize.STRING,
		field: 'post_title'
	},
	postContent: {
		type: Sequelize.TEXT,
		field: 'post_content'
	}
} , {
	timestamps: true
});

exports.models = {
	post: Post
}