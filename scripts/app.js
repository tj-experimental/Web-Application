angular.module("WebApp", [])
.controller("userCtrl",function($scope){
		$scope.user = [
		{
			"name": "Irina Bykova",
			"job": "Photographer",
			"team": "works with Slack team",
			"message1": "Just Started Using awesome Module. Great way to boost the hard",
			"message2": "designing or prototyping process. Also a perfect tool for creative",
			"message3": "studios and freelancers",
		},
		{
			"name": "Jones Peter",
			"job": "UI Developer",
			"team": "works with Genpak team",
			"message1": "Just Started Using ",
			"message2": "designing or creative",
			"message3": "studiocers",
		},
		{
			"name": "John Mark",
			"job": "Tech Writer",
			"team": "works with Flexnet Team",
			"message1": " Great way to boost the hard",
			"message2": "designing or prototyping process. ",
			"message3": "studios and freelancers",
		},
]
})

.controller("emailCtrl",function($scope){
		$scope.emailadd= {
			"email": ""
		}

});
