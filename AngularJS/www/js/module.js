(function(){
	var app = angular.module('facebookFriendList',[]);
	
	app.directive('facebookPanel',function(){
		return{
			restrict : 'E',
			templateUrl : 'facebook-panel.html',
		}
	});

	//code to be executed when the app runs
	app.run(['$rootScope','$window',function($rootScope,$window){
		$rootScope.user = {};
		$window.sessionStorage;

		function statusChangeCallback(response) {
			console.log('statusChangeCallback');
			if (response.status === 'connected') {
				window.sessionStorage.setItem('status','Connected');
				//console.log("Inside statusChangeCallback: " + response);
		    } else if (response.status === 'not_authorized') {
				window.sessionStorage.setItem('status','App Log in required');
		      	console.log("Please Log into this app");
    		} else {
    			window.sessionStorage.clear();
				window.sessionStorage.setItem('status','Facebook Log In required');
		      	console.log("Please log into Facebook");
    		}
		}

		
		$window.fbAsyncInit = function() {
    		FB.init({
      			appId      : '1763430833879846', //app id generated while facebook app registered
      			cookie     : true,  
		    	xfbml      : true,  
      			version    : 'v2.0',
      			status	   : true,
			});
			
			FB.getLoginStatus(function(response) {
      			statusChangeCallback(response);
    		});
    	};

    	//Load the Facebook SDK
    	(function(d, s, id) {
		    var js, fjs = d.getElementsByTagName(s)[0];
		    if (d.getElementById(id)) return;
		    js = d.createElement(s); js.id = id;
		    js.src = "http://connect.facebook.net/en_US/sdk.js";
		    fjs.parentNode.insertBefore(js, fjs);
		}(document, 'script', 'facebook-jssdk'));

				
	}]);
})();