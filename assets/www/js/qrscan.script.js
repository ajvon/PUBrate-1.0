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