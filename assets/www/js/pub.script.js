
function isPub(pubId){
    return true;
}

function gotoPub(pubId){
    $.mobile.loading('show');
    
    $.ajax({
        url: SERVER_HOST + "/_data/pub-958.json",
        type: "GET",
        dataType: "json"
    })
    .done(function(response) {
        //alert("success: " + response);
        parsePub(response);
    })
    .fail(function(jqXHR, status, error) {
        //alert("error: " + jqXHR.status + ":" + error);
        $('#wrongPub-popup').popup('open');
        $.mobile.loading('hide');
    })
    .always(function() {
        //alert("complete");
        //$.mobile.loading('hide');
    });
}

function parsePub(obj){
    $(document).one('pageinit', function(){
        $('#pub').bind('pagebeforeshow', function(){
            //alert("beforeshow");
            $('#pub .pubName').html(obj.name);
            $('#pub .foto img').attr('src', obj.imageUrl);
            $('#pub .pub-type strong').html(obj.type);
            $('#pub .basic-info').html(obj.basicInfo);
            $('#pub .address a').html(obj.addressHtml);
            $('#pub .address a').attr('href', 'geo:' + obj.addressGeo);
            $('#pub .phone a').html(obj.phoneHtml);
            $('#pub .phone a').attr('href', 'tel:' + obj.phoneTel);
            $('#pub .email a').html(obj.email);
            $('#pub .email a').attr('href', 'mailto:' + obj.email);
            
            $('#pub .icons').html('');
            for(var i in obj.icons){
                var currIcon = obj.icons[i];
                $('#pub .icons').append(
                    '<img src="img/icons/' + currIcon.icon + '" title="' + currIcon.title + '" class="icon" />'
                );
            }
            
            $('.pub .icons .icon').bind("tap", function(event, ui){
                $('#icon-popup p').html(event.target.title);
                $('#icon-popup').popup('open');
                event.preventDefault();
            });
            
            $('#pub .info').html(obj.info);
        });
        
        $('#pub').bind('pageshow', function(){
            //alert("pageshow");
            //$.mobile.loading('hide');
        });
    });
    
    $.mobile.changePage("pub.html", { transition: "flow"}, true, true);
}
