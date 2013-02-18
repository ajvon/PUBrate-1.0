$(document).bind("pagebeforehide", function(event, ui) {
});

$(document).bind("orientationchange", function(event, ui){
});

$(document).bind("pageshow", function(event, ui) {
  $.mobile.loading( 'hide' );
});
document.addEventListener("deviceready", function(){    $('#scanQrBtn').unbind('tap');    $('#scanQrBtn').bind('tap', qrScan);    //alert("register");    window.plugins.pushNotification.register(        successHandler,        errorHandler,        {"senderID":"94113431978","ecb":"onNotificationGCM"}    );});
$(document).bind('pageinit', function(){
  $(".footer").fixedtoolbar({ tapToggleBlacklist: "a, button, input, select, textarea, img, .ui-header-fixed, .ui-footer-fixed" });  //alert("pageinit");    //$('#go').bind('tap', function(){  //});      $('#go').bind('tap', function(){      $.mobile.changePage("pub.html", { transition: "flow"});  });
});

$(document).bind('pagechange', function(event, data){
  //console.log(data.toPage);
});