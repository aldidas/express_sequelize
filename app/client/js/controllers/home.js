'use strict';

module.exports = ['$log', 'homeData', function($log, homeData) {
	var ad = this;
	ad.posts = homeData.data;
	$log.debug(homeData);
}];