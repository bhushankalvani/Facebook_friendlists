This is the more structured and beautified code.
This application has been coded in AngularJS platform along with Cordova for hybrid application platforms. The previously uploaded directory,
has the basic code that totally works on JavaScript. This application directory is a successor to  "via_JavaScript" directory in this same project,
which is only uploaded for the basic knowledge and understanding of how the JavaScript SDK of facebook GraphAPI works.

This application follows the MVC structure and thus I have put all the API calls in the "factory.js" file under "js/" directory.
The API calls return data to the controller in the form of deferred promises or rejects.

I've upoloaded the config.xml file along with the project because it provides permission only to facebook via this access origin tag, 
"<access origin="http://connect.facebook.net"/>" to open facebook intents in the inAppBrowser.

The most important plugin "cordova-plugin-inappbrowser", allows us to open facebook authentication page from within our app, and also permissions for our application are all handled after login in the inAppBrowser.
