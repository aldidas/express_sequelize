'use strict';

module.exports = ['$log', '$location', 'DataSrv', function($log, $location, DataSrv) {
	var ad = this;
	ad.data = {
		title: '',
		content: ''
	};
	ad.create = function() {
		DataSrv.postItem(ad.data)
			.then(function(res){
				$log.debug(res);
				$location.path('/');
			}, function(err){
				$log.debug(err);
			});
	};
}];