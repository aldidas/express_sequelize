'use strict';

module.exports = ['$http', function($http){
	return {
		getPosts: function() {
			return $http.get('/api/posts');
		},
		getItem: function(id) {
			return $http.get('/api/post/' + id);
		},
		postItem: function(data) {
			return $http.post('/api/post', data);
		}
	};
}];