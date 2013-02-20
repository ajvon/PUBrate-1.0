
$(document).bind('pageinit', function(){
    $('#benefits').one('pagebeforeshow', function(){
        console.log('benefits pageinit');
        
        $(document).unbind('backbutton');
        $(document).one('backbutton', function(){
            console.log("backToPub");
            //gotoScan();
            //$.mobile.changePage("pub.html", { transition: "slide", reverse: true });
            parsePub(true);
        });
        
        $('#benefits #headerBackButton').one('tap', function(){
            console.log('backToPub 2');
            parsePub(true);
        });
        
        parseBenefits();
    });
});

console.log("gotoBenefits declaration");
function gotoBenefits(back){
    back = typeof back !== 'undefined' ? back : false;
    
    console.log("gotoBenefits: " + back);

    $.mobile.changePage("benefits.html", { transition: "slide", reverse: back });
}

function parseBenefits(){
    obj = JSON.parse(window.localStorage.getItem('currentPub'));
    
    $('#benefits .pubName span').html(obj.name);
    console.log(JSON.stringify(obj.benefits));
    $('#benefits .benefits ul').html('');
    for(var i in obj.benefits){
        var bft = obj.benefits[i];
        console.log(JSON.stringify(bft));
        console.log(SERVER_HOST + bft.imageUrlSmall);
        var benefitLI = '<li class="benefit">'
            + '<a href="#" id="' + bft.id + '">'
            + '<img class="benefit-img" src="' + SERVER_HOST + bft.imageUrlSmall + '" />'
            + '<h3>' + bft.title + '</h3>'
            + '<p>' + bft.shortDesc + '</p>'
            + '</a>'
            + '</li>';
        //console.log('appending: ' + benefitLI);
        $('#benefits .benefits ul').append(
            benefitLI
        );
        
    }
    $('#benefits .benefits ul').listview('refresh');
    $('#benefits .benefits ul li a').one('tap', function(){
        console.log('gotoBenefit ' + $(this).attr('id'));
        obj = JSON.parse(window.localStorage.getItem('currentPub'));
        window.localStorage.setItem('currentBenefit', JSON.stringify(
            obj.benefits[$(this).attr('id')]
        ));
        console.log(window.localStorage.getItem('currentBenefit'));
        gotoBenefit();
    });
    $('#benefits .benefits-conditions').html(obj.benefitsConditions);
}
