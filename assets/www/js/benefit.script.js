$(document).bind('pageinit', function(){
    $('#benefit').one('pagebeforeshow', function(){
        console.log('single benefit pageinit');
        
        $(document).unbind('backbutton');
        $(document).one('backbutton', function(){
            console.log("backToBenefits");
            gotoBenefits(true);
        });
        
        $('#benefit #headerBB').one('tap', function(){
            console.log('backToBenefits 2');
            gotoBenefits(true);
        });
        
        parseBenefit();
        
        $('#benefit #fbLogin').hide();
        $('#benefit .benefitCodeWrapper').hide();
        $('#benefit #fbNotLogged').hide();
        $('#benefit #addPermsRequired').hide();
        
        $('#benefit #getBenefitBtn').bind('tap', function(){
            $.mobile.loading('show');
            $('#benefit #getBenefitBtn').hide();
            
            FB.getLoginStatus(function(response) {
                console.log("FB: status2: " + JSON.stringify(response));
                if (response.status == 'connected') {
                    benefitCheckPerms();
                } else {
                    $('#benefit #fbNotLogged').show();
                    $.mobile.loading('hide');
                }
            });
        });
        
        $('#benefit #fbLoginBtn, #benefit #fbAddPerms').bind('tap', function(){
            console.log("benefit fbLogin");
            $.mobile.loading('show');
            CDV.FB.login(
                {scope: "publish_stream,publish_checkins"},
                function(response) {
                    //alert("response");
                    console.log("fbLogin response: " + JSON.stringify(response));
                    if (response.status == "connected") {
                        $('#benefit #fbNotLogged').hide();
                        console.log('logged in');
                        console.log("FB: status: " + response.status);
                        benefitCheckPerms();
                    } else {
                        $('#fbConnectFailed-popup').popup('open');
                    }
                },
                function(response){
                    //alert("CDV.FB.login fail:" + response);
                    $('#fbConnectFailed-popup').popup('open');
                }
            );
        });
    });
});

function benefitCheckPerms(){
    console.log("CHECKING FB Permissions");
    FB.api('/me/permissions', function (response) {
        console.log("TESTING PERMISSIONS: " + JSON.stringify(response));
        if(response.data == undefined
                || !response.data[0].publish_stream
                || !response.data[0].publish_checkins){
            $('#benefit #addPermsRequired').show();
            $.mobile.loading('hide');
        }else{
            $('#benefit #addPermsRequired').hide();
            getBenefitCode();
        }
        
        if(response.data && !response.data[0].publish_checkins){
            console.log("dont have publish_checkins");
        }else{
            console.log("FB: publish_checkins OK");
        }
        if(response.data && !response.data[0].publish_stream){
            console.log("dont have publish_stream");
        }else{
            console.log("FB: publish_stream OK");
        }
    });
}

function getBenefitCode(){
    var fbUserId = '0';
    FB.api('/me', function (fbResponse) {
        console.log(JSON.stringify(fbResponse));
        
        objPub = JSON.parse(window.localStorage.getItem('currentPub'));
        console.log(JSON.stringify(objPub));
        objBft = JSON.parse(window.localStorage.getItem('currentBenefit'));
        console.log(JSON.stringify(objBft));
        
        var sData = {
            'fbUserId': fbResponse.id,
            'fbUserName': fbResponse.name,
            'pubId': objPub.id,
            'benefitId': objBft.id,
            'benefitImage': SERVER_HOST + objBft.imageUrl,
            'name': objBft.title,
            'description': objBft.shortDesc,
            'pubName': objPub.name
        };
        
        $.ajax({
            url: SERVER_HOST + "/benefit.php",
            cache: false,
            type: "POST",
            dataType: "json",
            data: sData
        })
        .done(function(response) {
            //alert("success: " + JSON.stringify(response));

            //window.localStorage.setItem('currentPub', JSON.stringify(response));
            //parsePub();
            
            console.log("POST response: " + JSON.stringify(response));
            
            if(response.status == "failed"){
                $('#codeError-popup').popup('open');
                $('#benefit #getBenefitBtn').show();
                return ;
            }
            
            $('#benefit #benefitCode p.code').html(response.code);
            $('#benefit #benefitCode p.date').html("Datum: " + response.date);
            
            $('#benefit .benefitCodeWrapper').show();
            $.mobile.loading('hide');
        })
        .fail(function(jqXHR, status, error) {
            console.log("ajax error: " + jqXHR.status + ":" + error);
            $('#codeError-popup').popup('open');
            $('#benefit #getBenefitBtn').show();
        })
        .always(function() {
            $.mobile.loading('hide');
        });
    });
}

function gotoBenefit(back){
    back = typeof back !== 'undefined' ? back : false;

    $.mobile.changePage("benefit.html", { transition: "slide", reverse: back });
}

function parseBenefit(){
    objPub = JSON.parse(window.localStorage.getItem('currentPub'));
    objBft = JSON.parse(window.localStorage.getItem('currentBenefit'));
    
    $('#benefit .pubName span').html(objPub.name);
    
    $('#benefit .foto img').attr('src', SERVER_HOST + objBft.imageUrl);
    $('#benefit .title strong').html(objBft.title);
    $('#benefit .basic-info p').html(objBft.shortDesc);
    $('#benefit .info').html(objBft.desc);
    $('#benefit .conditions').html(objBft.conditions);
}