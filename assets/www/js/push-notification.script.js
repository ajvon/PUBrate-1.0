
function successHandler (result) {
    console.log('result = ' + result);
}

function errorHandler (error) {
    alert('error = ' + error);
}

function onNotificationGCM(e) {
    switch( e.event )
    {
        case 'registered':
            if ( e.regid.length > 0 )
            {
                // Your GCM push server needs to know the regID before it can push to this device
                // here is where you might want to send it the regID for later use.
                $("#app-status-ul").append('<li>registration id = ' + e.regid + '</li>');
            }
        break;

        case 'message':
            // if this flag is set, this notification happened while we were in the foreground.
            // you might want to play a sound to get the user's attention, throw up a dialog, etc.
            if (e.foreground)
            {
                window.plugins.statusBarNotification.notify(
                    "Restaurace U Špirků - PUBrate",
                    {
                        body: "Ohodnoťte prosím Váš zážitek v restauraci",
                        onclick: function(){
                            $.mobile.changePage("rating.html");
                        }
                    }
                );
                $("#app-status-ul").append('<li>--INLINE NOTIFICATION--' + '</li>');

                // if the notification contains a soundname, play it.
                //var my_media = new Media("/android_asset/www/"+e.soundname);
                //my_media.play();
                navigator.notification.beep(1);
            }
            else{    // otherwise we were launched because the user touched a notification in the notification tray.
                $("#app-status-ul").append('<li>--BACKGROUND NOTIFICATION--' + '</li>');
                $.mobile.changePage("rating.html");
            }

            $("#app-status-ul").append('<li>MESSAGE -> MSG: ' + e.payload.message + '</li>');
            $("#app-status-ul").append('<li>MESSAGE -> MSGCNT: ' + e.payload.msgcnt + '</li>');
            
            
        break;

        case 'error':
            alert('GCM error = ' + e.msg);
        break;

        default:
            alert('An unknown GCM event has occurred ');
        break;
    }
}