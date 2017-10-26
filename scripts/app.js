var graphModule = angular.module("GraphApp", ['n3-line-chart']);

graphModule.controller("graphCtrl", ['$scope', function($scope, $http){
	    d3.json('chart/chart.json', function(error, data){
		$scope.data = { dataset: data[0]["numbers"]};
		$scope.options = {
		   axes: { 
			   x: { key: "month"}
			 },
		    tooltipHook: function(d){
			 if (d){
				return {
					abscissas: "Social Revenue Impact",
					rows:  d.map(function(s){
						return {
							label: s.series.label,
							value: s.row.y1,
							color: s.series.color,
							id: s.series.id 
							}
						})
					}
				}
		      },
		      series: [
			{
			  dataset: "dataset", 
			  key: 'money', 
			  label: 'Money', 
			  type: ['line', 'dot', 'line', 'area'],
			  color: "rgb(126, 181, 63)"
			},
			{
			  dataset: "dataset",
			  key: 'like',
			  type: ['line', 'dot', 'area'],
			  label: 'Likes',
			  color: "rgb(200, 96, 69)"
			},
			{
			  dataset: "dataset",
			  key: 'views',
			  type: ['line', 'dot', 'area'],
			  label: 'Views',
			  color: "rgb(193, 92, 69)"
			},
			{
			  dataset: "dataset",
			  key: 'share',
			  type: ['line', 'dot', 'area'],
			  label: 'Share',
			  color: "rgb(119, 48, 131)"
			}
		      ]
		    };
	       $scope.$apply();
	    });
}]);


var userModule = angular.module("WebApp", ['GraphApp']);

userModule.controller("userCtrl",['$scope', function($scope){
		  d3.json('chart/user.json', function (error, data) {
			  $scope.user = data;
			  if(error) console.error("Error retrieving user data", error);
			  $scope.$apply();
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
});

