var SERVER_HOST = "http://oneplace.cz/pr2";$(document).bind('pageinit', function(){
  
  //Nechci skryvat paticku pri tapnuti na img.icon
  $(".footer").fixedtoolbar({ tapToggleBlacklist: "a, button, input, select, textarea, img.icon, .ui-header-fixed, .ui-footer-fixed" });
});

$(document).bind("mobileinit", function(){
  //apply overrides here
  //viz. http://jquerymobile.com/demos/1.2.0/docs/api/globalconfig.html
});