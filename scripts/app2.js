angular.element(document).ready(function(){
	angular.bootstrap(document.getElementById("users"),['WebApp']);
});


var graphModule = angular.module("GraphApp",[]);

graphModule.factory('test', function($http){
	var content = $http.get('chart/chart.json')
		.success(function(data){
			content = data[0].numbers;
			return content;
	});

	return content;
});
graphModule.controller("chartCtrl",function($scope, test){
	  $scope.content = test.$$state;
		console.log($scope.content);
		// test.get().then(function(response){
		// 	$scope.share = response.data[0];
		//
		// });

		//  test.get().then(function(response){
		// 	 $scope.content = response[0].numbers;
		// 	 console.log($scope.content);
		//  })


		// $http.get('chart/chart.json')
		// .success(function(data){
		// 	$scope.content = data[0].numbers;
		// 	console.log($scope.content[0]);
			// $scope.data = {
			// months: [
		 //               {x:1},
		 //               {x:2}
			// 		]
			// 	};

			// $scope.options = {
			// 	series: [
			// 	{
			// 		axis: "y",
			// 		dataset: "months",
			// 		key: "",
			// 		label: "Months of the Year",
			// 		color: "#000000",
			// 		type: ['line', 'dot', 'area'],
			// 		id: '11'
			// 	}],
			// 	axes: {x:{key:'months'}}

			// };
		// })
		// .error(function(data, status, error, config){
		// 	 $scope.data = '<p>Error Getting JSON data object: </p>' + status + error + config;
		//
		// });
});


var app = angular.module('TestApp', []);


var userModule = angular.module("WebApp", []);
userModule.controller("userCtrl",function($scope){
		$scope.user = [
		{
			"image":"images/irina.jpg",
			"name": "Irina Bykova",
			"job": "Photographer",
			"team": "works with Slack team",
			"message1": "Just Started Using awesome Module. Great way to boost the hard designing or prototyping process.",
			"message2": " Also a perfect tool for creative studios and freelancers"
		},
		{
			"image":"images/jane.jpg",
			"name": "Jane Peter",
			"job": "UI Developer",
			"team": "works with Genpak team",
			"message1": "It works great I can make new protoypes faster and with high detial orientation.",
			"message2": " What a relive from a user standpoint."
		},
		{
			"image":"images/john.jpg",
			"name": "John Mark",
			"job": "Tech Writer",
			"team": "works with Flexnet Team",
			"message1": "Great way to boost output and makes design changes easy.",
			"message2": "Will definitely recommend this product to freelancers,It's a 5 star rating for me."
		}]
});

userModule.controller("emailCtrl",function($scope){
		$scope.emailadd= {
			"email": ""
		}

});
