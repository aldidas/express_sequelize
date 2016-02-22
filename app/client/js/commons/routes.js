'use strict';

module.exports = ['$routeProvider', function($routeProvider) {
	$routeProvider
		.when('/', {
			templateUrl: '/partials/home.html',
			controller: 'HomeCtrl',
			controllerAs: 'home',
			resolve: {
				homeData: ['DataSrv', function(DataSrv) {
					return DataSrv.getPosts();
				}]
			}
		})
		.when('/post/:id', {
			templateUrl: '/partials/item.html',
			controller: 'ItemCtrl',
			controllerAs: 'item',
			resolve: {
				itemData: ['DataSrv', '$route', function(DataSrv, $route) {
					return DataSrv.getItem($route.current.params.id);
				}]
			}
		})
		.when('/create', {
			templateUrl: '/partials/create.html',
			controller: 'CreateCtrl',
			controllerAs: 'create'
		})
		.otherwise({
			redirectTo: '/'
		});
}];