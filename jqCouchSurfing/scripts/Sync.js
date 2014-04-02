function SyncExpensesNow() {
    console.log('sadadas');
 
    
    $.ajax({
            url: url + "GetData",
            type: 'GET',
            dataType: 'text',
            success : function(text){processExpensesData(text);},
            error:processError
    });
    
} 


function SyncHouses() {
    console.log('Sync houses');
    
    $.ajax({
            url: url + "GetHouses",
            type: 'GET',
            dataType: 'text',
            success : function(text){processHousesData(text);},
            error:processError
    });
    
} 

function getusrs() {
    
    $.ajax({
            url: url + "GetUsers",
            type: 'GET',
            dataType: 'text',
            success : function(text){processUsers(text);},
            error:processError
    });
    
} 


function savehousenow(){
    $.mobile.changePage($('#home'));
    currentHouseMY=ko.mapping.toJS(chosenExpKO11);
    SaveHouses(currentHouseMY);
}

function saveeventsnow(){
    
    $.mobile.changePage($('#home'));
currentEventMY=ko.mapping.toJS(chosenExpKO);    
 SaveEvents(currentEventMY);
}


function SaveHouses(curhouse) {
    console.log('save houses');
 
    var st=JSON.stringify(curhouse);
    console.log(st);
    $.ajax({
            url: url + "SaveHouses?ss="+st,
            type: 'GET',
            dataType: 'text',
            error:processError
    });
    
} 

function SaveEvents(curEvent) {
    console.log('sadadas');
 
    
    var st=JSON.stringify(curEvent);
    $.ajax({
            url: url + "SetEven?ss="+st,
            type: 'GET',
            dataType: 'text',
            error:processError
    });
    
} 


function processError(jqXHR, textStatus, errorThrown) {
    alert("Sync Error: " + textStatus + " " + jqXHR.status + ": " + GetErrorMessageByCode(jqXHR.status));
    setLoader("Loading...", false);
}

function processSuccess(jqXHR, textStatus, data) {
    setLoader("Loading...", false);
}



function processHousesData(data) {
    try{
        var dd = data.substr(68);
        var dod=dd.substring(0,dd.indexOf("</string>"));
        var jsData = $.parseJSON(dod);
        
        allHouses=jsData;
		console.log(allHouses);
        countHouses = allHouses.length;
        $("#totalhousesss").html("Total houses:  "+countHouses);
		$("#totalhousesss1").html(countHouses);
        
        
        $("#bagTrackView1").attr("style", "visibility: visible");
        $("#bagTrackView111").attr("style", "visibility: visible");
        
        
		console.log($("#totalhousesss").html());
        createListHouses();
    }
    catch(e){
         console.log(e.message);
    }
}


function processExpensesData(data) {
    try{
        var dd = data.substr(68);
        var dod=dd.substring(0,dd.indexOf("</string>"));
        var jsData = $.parseJSON(dod);
        
        allEvents=jsData;
console.log(allEvents);
        countEvents = allEvents.length;
        $("#totalEventsss").html("Total events:  "+countEvents);
        $("#totalEventsss1").html(countEvents);
        
        $("#flightStatusView").attr("style", "visibility: visible");
        $("#flightStatusView11").attr("style", "visibility: visible");
       
		console.log($("#totalEventsss").html());
        createListEvents();
    }
    catch(e){
         console.log(e.message);
    }
}






function processUsers(data) {
    try{
        var dd = data.substr(68);
        var dod=dd.substring(0,dd.indexOf("</string>"));
        var jsData = $.parseJSON(dod);
        
        var allusrss=jsData;
		console.log(allusrss);
        var nowusr = jlinq.from(allusrss).equals("name", $('#login-username').val()).first();
        
        if(nowusr.pass===$('#login-password').val()){
        $('#login-username').css({'background-color' : '#f9f9f9'}); 
        $('#login-password').css({'background-color' : '#f9f9f9'}); 
	    $.mobile.changePage($('#home'));
        }else{
            $('#login-password').css({'background-color' : '#FF99FF'});
            $('#login-username').css({'background-color' : '#FF99FF'});
        }
		        
    }
    catch(e){
         console.log(e.message);
    }
}







function checklogin(){
  
    getusrs();
    
}


