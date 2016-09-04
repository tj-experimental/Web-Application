var userModule = angular.module("WebApp", []);
userModule.controller("userCtrl",function($scope, $http){
		  $http.get('chart/user.json')
            .success(function (userData) {
                $scope.user = userData;
            }).error(function (userData, status, error, config) {
              alert (userData, status, erroe, config);
            });
	      //$scope.
});

userModule.controller("emailCtrl",function($scope, $http){
		$scope.emailadd= {
			"email": ""
		};
});

//
// var theApp = angular.module('theApp', []);
//
// theApp.factory('mainTagFactory', function() {
//
// 	var mainTags = [
//
// 		{ mainTag: 'Tag 1'},
// 		{ mainTag: 'Tag 2'},
// 		{ mainTag: 'Tag 3'}
//
// 	];
//
// 	var factory = {};
//
// 	factory.getMainTags = function() {
//
// 		return mainTags;
//
// 	};
//
// 	return factory;
//
// });
//
// theApp.controller('mainTagController', function ($scope, mainTagFactory) {
//
// 	init();
//
// 	function init() {
//
// 		$scope.mainTags = mainTagFactory.getMainTags();
//
// 	}
//
// });


var graphModule = angular.module("GraphApp",['n3-line-chart']);


graphModule.factory("Graph", function($scope, $http){
	$http.get('chart/chart.json')
		.success(function(userData){
			var factory = {};

			factory.getChart= function() {

				return userData[0];

			};

			return factory;
		})
		.error(function(userData, status, error, config){
			$scope.content = '<p>Error Getting JSON data object: </p>' + status + error + config;
		});

});
graphModule.controller("graphCtrl", function(Graph){
	  console.log(Graph.getChart());
});



angular.element(document).ready(function(){
	setTimeout(function () {
		$('.users').slick({
			infinite: true,
			slidesToShow: 1,
			slidesToScroll: 1,
			autoplay: true,
			autoplaySpeed: 4000,
			pauseOnDotsHover: true,
			touchMove: true,
			swipe: true,
			arrows: true,
			dots: true,
			mobileFirst: true,
			swipeToSlide: true
		});
	},500);
	//angular.bootstrap(document.getElementById("chart"),['GraphApp']);
});

