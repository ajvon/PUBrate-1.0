$(document).bind("pagebeforehide", function(event, ui) {
  //alert("pagehide");
  /*$.mobile.loading( 'show', {
  	text: 'foo',
  	textVisible: true,
  	theme: 'e',
  	html: ""
  });*/
});

$(document).bind("orientationchange", function(event, ui){
  //alert("orientationchange");
});

$(document).bind("pageshow", function(event, ui) {
  //alert("pageshow");
  $.mobile.loading( 'hide' );
  $('.pub .icons .icon').bind("tap", function(event, ui){
    $('#icon-popup p').html(event.target.title);
    $('#icon-popup').popup('open');
    event.preventDefault();
  });
});

$(document).bind('pageinit', function(){
  $(".footer").fixedtoolbar({ tapToggleBlacklist: "a, button, input, select, textarea, img, .ui-header-fixed, .ui-footer-fixed" });  //alert("pageinit");    //$('#go').bind('tap', function(){  document.addEventListener("deviceready", function(){      //alert("register");      window.plugins.pushNotification.register(          successHandler,          errorHandler,          {"senderID":"94113431978","ecb":"onNotificationGCM"}      );  });  //});      /*$('#go').bind('tap', function(){      window.plugins.statusBarNotification.notify(          "Restaurace U Špirků - PUBrate",          {              body: "Ohodnoťte prosím Váš zážitek v restauraci",              onclick: function(){                  $.mobile.changePage("notif.html");              }          });  });*/
});

$(document).bind('pagechange', function(event, data){
  //console.log(data.toPage);
});