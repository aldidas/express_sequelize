'use strict';

module.exports = ['$log', 'itemData', function($log, itemData) {
	var ad = this;
	ad.post = itemData.data;
	$log.debug(itemData);
}];