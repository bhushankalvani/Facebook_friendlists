(function(){
    var app = angular.module("FBLogin",[]);
    app.display = false;
    app.getConnection = function(connVal){
        app.display = connVal;
    };
    app.run(
        FB.init({
            appId : '1763430833879846',
            cookie : true,
            xfbml : true,
            version : 'v2.6',
          })
    );

    app.controller("DisplayController",function(){
        
        this.disp = function(){
            return this.display;
        };
        
        function getConnection(connVal){
            this.display = connVal;
        };
    });

    app.directive("fbLogin",function(){
        return{
            restrict:"E",
            templateUrl:"FBLoginDialog.html",
            controller:function(){
                                      
                //Connect Function fired when button clicked using ng-click with the scope
                this.connect= function(){
                    var newWindow = window.open("https://www.facebook.com/dialog/oauth?client_id=1763430833879846&redirect_uri=https://www.facebook.com/connect/login_success.html","_self","location=yes|1");
                    if(newWindow == null){
                        newWindow.close();
                    }else{
                        document.getElementById("").innerHTML = newWindow.open.location.href;
                        $(newWindow.open.location.href).on("change",function(){
                        if(newWindow.document.getElementsByTagName("body").innerHTML == "Success"){
                            newWindow.close();
                        }
                    });
                    
                  }
                    FB.getLoginStatus(function(response){
                        FB.statusChangeCallback(response);
                    });
                };
                
                FB.statusChangeCallback = function(response){
                    
                    console.log('statusChangeCallback');
                    console.log(response);
                    if (response.status === 'connected') {
                        //Get the friends list from the API
                        app.getConnection(true);
                        getFriends();
                    } else if (response.status === 'not_authorized') {
                      //Logged into facebook but not the current app
                        console.log( 'Please log into this app.');
                        getConnection(false);                            
                    } else {
                        //Not logged into facebook
                        console.log('Please log into Facebook.');
                        getConnection(false);
                    }    
                };
                
                function getFriends(){
                    console.log('Getting the list');
                    FB.api('/me', function(response) {
                        console.log('Successful login for: ' + response.name);
                        this.status = 'Thanks for logging in, ' + response.name + '!';
                    });                  
                    };
            },
            controllerAs:"fbAuth",

        };
    });

    // app.directive("listView",function(){

    // });
    
})();