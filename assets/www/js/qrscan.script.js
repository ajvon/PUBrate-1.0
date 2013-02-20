$(document).bind('pageinit', function(){
    $('#home').bind('pagebeforeshow', function(){
        console.log('scan pageInit');
        $(document).unbind('backbutton');
        $(document).one('backbutton', function(){
            console.log("backFromScan");
            window.PubrateActivity.onBackPressed();
        });
    });
});

/*$(document).bind('deviceready', function(){
    console.log("deviceready");
    $('#home').bind('pagebeforeshow', function(){
        $(document).unbind('backbutton');
        $(document).one('backbutton', function(){
            console.log("backFromScan");
            navigator.app.exitApp();
        });
    });
})*/

function gotoScan(){
    console.log("gotoScan");
    //$(document).one('pageinit', function(){
        alert("scan pageinit");
        console.log("scan pageinit 2");
        
    //});
    //$.mobile.changePage("index.html", { transition: "slide", reverse: true });
    //$.mobile.changePage("index.html", { transition: "slide", reverse: true });
    /*console.log("urlHistory: " + $.mobile.urlHistory);
    console.log("urlHistory stack: " + $.mobile.urlHistory.stack);
    console.log("urlHistory stack len: " + $.mobile.urlHistory.stack.length);
    console.log("clearHistory: " + $.mobile.urlHistory.clearHistory);
    console.log("History length: " + $.mobile.urlHistory.length);
    $.mobile.urlHistory.back(history.length - 1);
    $.mobile.changePage("index.html", { transition: "slide", reverse: true });
    clearHistory();
    console.log("History length: " + $.mobile.urlHistory.stack.length);*/
}

function qrScan(){
    window.plugins.barcodeScanner.scan(
        function(result){
            if(result.cancelled){
                $('#scanFailed-popup').popup('open');
                return ;
            } 
            if(result.format != "QR_CODE"){
                $('#wrongQR-popup').popup('open');
                return ;
            }
            
            //$('#scanQrBtn').unbind('tap', qrScan);
            pubId = '958';
            if(isPub(pubId)){
                gotoPub(pubId);
                return ;
            }else{
                $('#wrongPub-popup').popup('open');
                return ;
            }
            //$.mobile.changePage( "pub.html", { transition: "flow"} );
        },
        function(error){
            $('#scanFailed-popup').popup('open');
        }
    );
}