var userModule = angular.module("WebApp", []);
userModule.controller("userCtrl",['$scope', '$http', function($scope, $http){
		  $http.get('chart/user.json')
            .success(function (userData) {
                $scope.user = userData;
            }).error(function (userData, status, error, config) {
              alert (userData, status, erroe, config);
            });
}]);

userModule.controller("emailCtrl",['$scope', function($scope){
		$scope.email= {
			emailAdd: "",
			pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/,
			emailPlaceHolder1: "abc@xyz.com",
			emailPlaceHolder2: "E-mail Address"
		};
		$scope.fields = [''];
}]);

userModule.controller("planCtrl", ['$scope', function ($scope) {
	     $scope.plans = [
	     	{id: "pers", planName: "Personal", descriptionId: "personal_plan"},
			{id: "agn", planName: "Agency", descriptionId: "agency_plan"},
			 {id: "unl", planName: "Unlimited", descriptionId: "unlimited_plan"}
		 ]
}]);



userModule.controller("projectCtrl", ['$scope', function ($scope) {
	   $scope.projects = [
		   { link:"https://chat-app0.herokuapp.com", name: "Messenger App"},
		   { link:"pages/Movie-OMDb-api/index.html", name: "OMDb MovieApp"},
		   { link:"pages/geolocation/index.html", name: "Geolocation App"},
		   { link:"pages/flickrAPI_searchForm/index.html", name: "Flickr SearchApp"},
		   { link:"pages/flickrapi/index.html", name: "Flickr ImageApp"},
		   { link:"pages/workopolisAPI/index.html", name: "Workopolis API"},
		   { link:"pages/Interactive-Form/index.html", name: "Payment Form"},
		   { link:"pages/Object-prototype-JavaScript/Quiz-OO-Javascript/index.html", name: "Quiz App"},
		   { link: "pages/Object-prototype-JavaScript/OO-JavaScript-Media-Player/index.html", name: "Media PlayerApp"},
		   { link: "pages/Pagination-Content-Filter/index.html", name: "PaginationApp"},
		   { link: "pages/tic-tac-toe/index.html", name: "Tic Tac Toe App"},
		   { link: "pages/Address-book/index.html", name: "Address Book App"},
		   { link: "pages/angularApp/index.html", name:"Angular App"}
	   	]
}]);


userModule.controller("footerCtrl", ['$scope', function ($scope) {
        $scope.items = ['Gadget', 'Science', 'Nature', 'Creative'];
        $scope.location = "#";
        $scope.className = "url";
        $scope.imageUrl = "images/box_image.jpg";

}]);

var graphModule = angular.module("GraphApp",['n3-line-chart']);

//
// graphModule.factory("Graph",[ function($scope, $http){
// 	$http.get('chart/chart.json')
// 		.success(function(userData){
// 			var factory = {};
//
// 			factory.getChart= function() {
//
// 				return userData[0];
//
// 			};
//
// 			return factory;
// 		})
// 		.error(function(userData, status, error, config){
// 			$scope.content = '<p>Error Getting JSON data object: </p>' + status + error + config;
// 		});
//
// });
// graphModule.controller("graphCtrl", function(Graph){
// 	  console.log(Graph.getChart());
// });
//


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
			arrows: false,
			dots: true,
			mobileFirst: true,
			swipeToSlide: true
		});
	},700);
	//angular.bootstrap(document.getElementById("chart"),['GraphApp']);
});

