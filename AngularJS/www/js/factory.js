angular.module("facebookFriendList")
		.factory("facebookFactory",['$q',function($q){
			var obj = {};
			
			obj.facebookLogin = function(){
				var deferred  = $q.defer();
				
				FB.login(function(response){
					if(response.authResponse){
						window.sessionStorage.setItem("facebook_access_token",response.authResponse.accessToken);
						//Successful Login
						FB.api('v2.0/'+response.authResponse.userID,
							{
								fields:'name,picture'
							},function(success){
							//Get the user data from response and resolve and return promise
							deferred.resolve(success);
						});
					}
					else{
						//User denied permissions or error ocurred during login
						deferred.reject('Error occured' + success.error);
					}
				},{
					//permissions that this app needs from the user. It will be passed with API call
					scope:'public_profile,email,user_friends,read_custom_friendlists'
				});
				return deferred.promise;
			};

			//Function to get the list of friendlists and send their names along as response
			obj.getFriendList = function(){
				var deferred = $q.defer();
				
				FB.api('v2.0/me/friendlists',{
					fields:'name'
				},function(success){
					if(success && !success.error){
						deferred.resolve(success);
					}
					else{
						deferred.reject('Error while fetching friendlists' + success.error);
					}
				});
				return deferred.promise;
			};

			obj.facebookLogout = function(){
				var deferred = $q.defer();
				FB.logout(function(response){
					window.sessionStorage.clear();
					window.sessionStorage.setItem('status','Facebook Log In required');
					deferred.resolve(response);
				});
				return deferred.promise;
			};

			obj.checkLoginState = function() {
		    	FB.getLoginStatus(function(response) {
			    	statusChangeCallback(response);
		   		});
			}

			return obj;
		}]);