$(document).bind("pagebeforehide", function(event, ui) {
});

$(document).bind("orientationchange", function(event, ui){
});

$(document).bind("pageshow", function(event, ui) {
  //$.mobile.loading( 'hide' );
});
document.addEventListener("deviceready", function(){    $('#settingsBtn').bind('tap', gotoSettings);        $('#scanQrBtn').unbind('tap');    $('#scanQrBtn').bind('tap', qrScan);    //alert("register");    window.plugins.pushNotification.register(        successHandler,        errorHandler,        {"senderID":"94113431978","ecb":"onNotificationGCM"}    );        $(".footer").fixedtoolbar({ tapToggleBlacklist: "a, button, input, select, textarea, img, .ui-header-fixed, .ui-footer-fixed" });});
$(document).bind('pageinit', function(){  //alert("pageinit");    //$('#go').bind('tap', function(){  //});    //using "click" event, because "tap" event made popup hide immediately after show  $('#go').bind('click', searchPub);  //$('#search #manualPubId').bind('keypress', searchPub);
});function searchPub(e){        if($('#search #manualPubId').val() == '00'){        $('#search #manualPubId').val('');        gotoPub('958');        return ;    }        pubId = $('#search #manualPubId').val();    if(pubId && isPub(pubId)){        gotoPub(pubId);        $('#search #manualPubId').val('');        return ;    }else{        $('#wrongPub-popup').popup('open');        //return ;    }}

$(document).bind('pagechange', function(event, data){
  //console.log(data.toPage);
});