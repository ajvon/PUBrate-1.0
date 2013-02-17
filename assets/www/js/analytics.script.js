document.addEventListener('deviceready', function(){
    //alert("deviceready");
    window.plugins.analytics.start(
        "UA-8581151-20",
        function(){
            window.plugins.analytics.trackPageView(
                "home",
                trackSuccess,
                trackFailed
            );
            $(document).bind('pagechange', function(){
                //alert("pagechange: " + $.mobile.activePage.data('url'));
                window.plugins.analytics.trackPageView(
                    $.mobile.activePage.data('url'),
                    trackSuccess,
                    trackFailed
                );
            });
        },
        function(){
            alert("analytics start FAILED");
        }
    );
});

function trackSuccess(){
    //alert("Track SUCCESS");
}

function trackFailed(){
    alert("Track FAILED");
}