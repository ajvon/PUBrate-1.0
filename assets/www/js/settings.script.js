
$(document).bind('pageinit', function(){
    $('#settings').one('pageshow', function(){
        
    });
    $('#settings').one('pagebeforeshow', function(){
        console.log('settings pageinit');
        
        $(document).unbind('backbutton');
        $(document).one('backbutton', function(){
            console.log("backToScan");
            $.mobile.changePage("index.html", { transition: "slidedown", reverse: true });
        });
        
        $('#settings #backBtn').one('tap', function(){
            console.log('backToScan 2');
            $.mobile.changePage("index.html", { transition: "slidedown", reverse: true });
        });
        
        $('#settings #addPermsRequired').hide();
        //checkPerms();
        
        $('#settings .conditionsBtn').bind('tap', function(){
            testing();
        });
        
        $('#settings #fbFanBtn').bind('tap', function(){
            console.log('FB become a fan');
            window.plugins.childBrowser.showWebPage("http://www.facebook.com/PUBrate.cz", { showLocationBar: true });
        });
        
        $.mobile.loading('show');
        
        FB.getLoginStatus(function(response) {
            
            if (response.status == 'connected') {
                //alert('logged in');
                console.log('FB: logged in');
                console.log(JSON.stringify(response));
                
                showLoggedIn();
            } else {
                //alert('not logged in');
                console.log('FB: not logged in');
                console.log(JSON.stringify(response));
                $.mobile.loading('hide');
            }
        });
        
        $('#settings #fbLogout').bind('tap', function(){
            console.log("fbLogout");
            FB.logout(function(response) {
                $.mobile.loading('show');
                //alert('logged out');
                
                showLoggedOut();
            });
        });
        
        $('#settings #fbLogin, #settings #fbAddPerms').bind('tap', function(){
            console.log("fbLogin");
            $.mobile.loading('show');
            CDV.FB.login(
                {scope: "publish_stream,publish_checkins"},
                function(response) {
                    console.log("fbLogin response: " + JSON.stringify(response));
                    console.log(JSON.stringify(response.status));
                    console.log(JSON.stringify(response.authResponse));
                    if (response.status == "connected") {
                        console.log('logged in');
                        showLoggedIn();
                        //checkPerms();
                    } else {
                        $('#fbConnectFailed-popup').popup('open');
                        $.mobile.loading('hide');
                    }
                },
                function(response){
                    //alert("CDV.FB.login fail:" + response);
                    $('#fbConnectFailed-popup').popup('open');
                    $.mobile.loading('hide');
                }
            );
        });
    });
});

function gotoSettings(){
    $.mobile.changePage("settings.html", { transition: "slidedown" });
}

function showLoggedOut(){
    $('#settings img.foto').attr('src', 'img/avatar-unknown.jpg');
    $('#settings #name').html('<h5 class="gray">Nepřihlášen</h5>');
    
    $('#settings #fbLogged').hide();
    $('#settings #fbNotLogged').show();
    $.mobile.loading('hide');
}

function showLoggedIn(){
    FB.api('/me', {
        fields: 'name, picture.type(large)'
    },
    function(response) {
        if (!response.error) {
            checkPerms();
            $('#settings img.foto').attr('src', response.picture.data.url);
            $('#settings #name').html('<h5 class="gray">Přihlášen jako</h5> <h3>' + response.name + '</h3>');
            
            $('#settings #fbNotLogged').hide();
            $('#settings #fbLogged').show();
            
            $.mobile.loading('hide');
            
            //user = response;
            console.log('Got the user\'s name and picture: ' + JSON.stringify(response));
        }
    });
}

function checkPerms(){
    console.log("CHECKING FB Permissions");
    FB.api('/me/permissions', function (response) {
        console.log("TESTING PERMISSIONS: " + JSON.stringify(response));
        if(!response.data[0].publish_stream
                || !response.data[0].publish_checkins){
            $('#settings #addPermsRequired').show();
        }else{
            $('#settings #addPermsRequired').hide();
        }
        $.mobile.loading('hide');
        if(!response.data[0].publish_checkins){
            console.log("dont have publish_checkins");
        }else{
            console.log("FB: publish_checkins OK");
        }
        if(!response.data[0].publish_stream){
            console.log("dont have publish_stream");
        }else{
            console.log("FB: publish_stream OK");
        }
    });
}