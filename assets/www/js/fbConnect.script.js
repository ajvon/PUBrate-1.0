if ((typeof cordova == 'undefined') && (typeof Cordova == 'undefined')) alert('Cordova variable does not exist. Check that you have included cordova.js correctly');
    else console.log('Cordova OK');
if (typeof CDV == 'undefined') alert('CDV variable does not exist. Check that you have included cdv-plugin-fb-connect.js correctly');
    else console.log('CDV OK');
if (typeof FB == 'undefined') alert('FB variable does not exist. Check that you have included the Facebook JS SDK file.');
    else console.log('FB OK');

FB.Event.subscribe('auth.login', function(response) {
    //alert('auth.login event');
    //console.log("login: " + response);
    console.log("login: " + JSON.stringify(response));
});

FB.Event.subscribe('auth.logout', function(response) {
    //alert('auth.logout event');
    //console.log("logout: " + response);
    console.log("logout: " + JSON.stringify(response));
});

FB.Event.subscribe('auth.sessionChange', function(response) {
    //alert('auth.sessionChange event');
    //console.log("sessionChange: " + response);
    console.log("sessionChange: " + JSON.stringify(response));
});

FB.Event.subscribe('auth.statusChange', function(response) {
    //alert('auth.statusChange event');
    //console.log("StatusChange: " + response);
    console.log("StatusChange: " + JSON.stringify(response));
});

document.addEventListener('deviceready', function() {
    console.log("Notif deviceready: Calling FB.init!!!!");
    try {
        //alert('Device is ready! Make sure you set your app_id below this alert.');
        FB.init({ appId: "415024915257863", nativeInterface: CDV.FB, useCachedDialogs: false });
        //document.getElementById('data').innerHTML = "";
    } catch (e) {
        alert(e);
    }
}, false);

function login() {
    FB.login(
        function(response) {
            console.log(response);
            console.log(JSON.stringify(response));
            if (response.authResponse.status == "connected") {
                alert('logged in');
            } else {
                alert('not logged in');
            }
        },
        { scope: "email" }
     );
}

function logout() {
    FB.logout(function(response) {
        alert('logged out');
    });
}

function getLoginStatus() {
    FB.getLoginStatus(function(response) {
        if (response.status == 'connected') {
            alert('logged in');
        } else {
            alert('not logged in');
        }
    });
}

function testing(){
    FB.api('/me/permissions', function (response) {
        console.log("TESTING: " + JSON.stringify(response));
    } );
}
