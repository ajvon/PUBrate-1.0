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
    });
});

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