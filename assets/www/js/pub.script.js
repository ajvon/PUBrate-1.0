
$(document).bind('pageinit', function(){
    $('#pub').one('pagebeforeshow', function(){
        console.log('pub pageinit');
        $(document).unbind('backbutton');
        $(document).one('backbutton', function(){
            console.log("backToScan");
            //gotoScan();
            $.mobile.changePage("index.html", { transition: "slide", reverse: true });
        });
        
        obj = JSON.parse(window.localStorage.getItem('currentPub'));
        
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
    
    $('#pub #benefitsButton').one('tap', function(){
        gotoBenefits(false);
        //$.mobile.changePage('benefits.html', {transition: 'slide'});
        
        /*$(document).one('pageinit', function(){
            $(document).unbind('backbutton');
            $(document).one('backbutton', function(){
                console.log("backToPub");
                console.log(window.localStorage.getItem('currentPub'));
                parsePub(JSON.parse(window.localStorage.getItem('currentPub')), true);
            });
            $('#benefits #headerBackButton').one('tap', function(){
                console.log("headerBackButton");
                console.log(window.localStorage.getItem('currentPub'));
                parsePub(JSON.parse(window.localStorage.getItem('currentPub')), true);
            });
        });*/
    });
});

//TODO na každou stránku přidat výše uvedenou konstrukci


function isPub(pubId){
    var isPubResult = false;
    $.mobile.loading('show');
    console.log("waiting for sync request: " + pubId);
    $.ajax({
        url: SERVER_HOST + "/ispub.php",
        cache: false,
        async: false,
        type: "POST",
        dataType: "json",
        data: {
            'pubId': pubId
        }
    })
    .done(function(response) {
        console.log('sync request response');
        if(response.status == "ok"){
            isPubResult = true;
        }
    })
    .always(function(){
        $.mobile.loading('hide');
    });
    console.log('sync after request: ' + isPubResult);
    return isPubResult;
}

function gotoPub(pubId){
    $.mobile.loading('show');
    
    $.ajax({
        url: SERVER_HOST + "/_data/pub-" + pubId + ".json",
        cache: false,
        type: "GET",
        dataType: "json"
    })
    .done(function(response) {
        //alert("success: " + response);

        window.localStorage.setItem('currentPub', JSON.stringify(response));
        parsePub();
    })
    .fail(function(jqXHR, status, error) {
        console.log("ajax error: " + jqXHR.status + ":" + error);
        $('#wrongPub-popup').popup('open');
        $.mobile.loading('hide');
    })
    .always(function() {
        //alert("complete");
        //$.mobile.loading('hide');
    });
}

function parsePub(back){
    back = typeof back !== 'undefined' ? back : false;
    
    $.mobile.changePage("pub.html", { transition: "slide", reverse: back });
}
