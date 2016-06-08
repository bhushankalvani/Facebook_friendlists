angular.module("facebookFriendList")
		.controller('facebookController',['$window','$scope','facebookFactory',function($window,$scope,facebookFactory){
			//init variables to store responses.
			//This array stores the getList response. It will contain names of Friendlists,-- 
			//-- of the user
			$scope.frndlist = [];
			$scope.img_source ;
			var session = $window.sessionStorage;
			$scope.username = "";
			//status of user (Logged in or Logged out/Not Connected)
				$scope.status = session.getItem('status');
				$scope.disp = false;		
			

			//Factory's Login function called for the user to login to facebook
			this.login = function(){
				facebookFactory.facebookLogin()
					.then(function(response){ //response contains success from the app.factory.js
						//getList();
						console.log(response);
						session.setItem('facebook_userID',response.id);
						session.setItem('facebook_username',response.name);
						session.setItem('facebook_profile_pic',response.picture.data.url);
						session.setItem('status','Connected');
						$scope.status = session.getItem('status');
						//$window.localStorage.setItem('facebook_user_token',response.accessToken);
				}).then(function(){
					//Factory's FriendLists function called to get the users friendlist data
					facebookFactory.getFriendList()
						.then(function(response){
							console.log(response);
							$scope.frndlist = [];
							for(var i=0;i<response.data.length;i++){
								console.log(response.data[i].name);
								$scope.frndlist.push(response.data[i].name); 
							}
							session.setItem('facebook_friendlists',JSON.stringify($scope.frndlist));
						});
				});
			};

			//This will log the user out of Facebook too!
			this.logout = function(){
				facebookFactory.facebookLogout()
					.then(function(response){
						console.log(response);
						$scope.status = session.getItem('status');
					});
			};

			this.display = function(){
				if($scope.status == 'Connected'){
					console.log("display function called");
					$scope.username = session.getItem('facebook_username');
					$scope.img_source =session.getItem('facebook_profile_pic');
					$scope.frndlist = JSON.parse(session.getItem('facebook_friendlists'));
					return true;
				}
				else if($scope.status == 'Facebook Log In required'){
					console.log("display function called");
					return false;
				}
				
			};
		}]);