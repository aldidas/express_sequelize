'use strict';

window.$ = window.jQuery = require('jquery');
var bootstrap = require('bootstrap-sass');
var angular = require('angular');
var ngRoute = require('angular-route');
var ngSanitize = require('angular-sanitize');
var app = angular.module('app', ['ngRoute', 'ngSanitize']);

// commons setup
var routes = require('./commons/routes');
app.config(routes);

// services
var dataSrv = require('./services/data');
app.factory('DataSrv', dataSrv);

// controllers
var homeCtrl = require('./controllers/home'),
	itemCtrl = require('./controllers/item'),
	createCtrl = require('./controllers/create');
app.controller('HomeCtrl', homeCtrl);
app.controller('ItemCtrl', itemCtrl);
app.controller('CreateCtrl', createCtrl);
