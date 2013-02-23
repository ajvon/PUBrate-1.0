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

/*function gotoScan(){
    console.log("gotoScan");
    //$(document).one('pageinit', function(){
        alert("scan pageinit");
        console.log("scan pageinit 2");
      
}*/

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
            var pubCode = '';
            var arr1 = result.text.split('/');
            console.log(arr1);
            console.log(JSON.stringify(arr1));
            if((arr1[0].toLowerCase() == "http:" || arr1[0].toLowerCase() == "https:")
                    && (arr1[2].toLowerCase() == "pubrate.cz" || arr1[2].toLowerCase() == "www.pubrate.cz")){
                pubCode = arr1[3].toLowerCase();
            }else if(arr1[0].toLowerCase() == "pubrate.cz"
                        || arr1[0].toLowerCase() == "www.pubrate.cz"){
                pubCode = arr1[1].toLowerCase();
            }else{
                $('#wrongQR-popup').popup('open');
                return ;
            }
            console.log('got pubCode: ' + pubCode);
            
            //pubId = '958';
            pubId = pubCode;
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