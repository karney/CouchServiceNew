

$('#tabstrip-home').ready(function (e) {
 
     longitudeMY=49.835228;
        	latitudeMY=24.00827;
    $('#downloadButton').click(function (e) {
        SyncExpensesNow();
 	   SyncHouses();   
        
    });
    
    $('#butonevents').click(function (e) {
        if(isHousesViewLoaded!==true){
            createListHouses();
        }
        if(isEventViewLoaded!==true){
            createListEvents();
        }
    });
      $('#buttonHouses').click(function (e) {
       
        if(isHousesViewLoaded!==true){
            createListHouses();
        }
        if(isEventViewLoaded!==true){
            createListEvents();
        }
    });
});



function createListEvents(){
    $('#expensesShownList').empty();
    
    
    $.each(allEvents, function (ind, valu) {
        var str="";
        str='<ul data-role="listview" id="flightStatusView" data-inset="true" data-theme="d"><li><a name="'+valu.Name+'" data-transition="slide" href="#page-eventdetails" id="butonevents" onclick="gotoEvent(name)">'+valu.Name+'</a></li></ul>';
		
			$('#expensesShownList').append(str);//"<a name='"+valu.Name+"' data-transition='slide' href='#page-eventdetails' onclick='gotoEvent(name)'>"+'<ul data-role="listview" data-split-icon="gear" data-theme="d" data-divider-theme="b" data-inset="true">'+"<li data-theme='d' data-role='list-divider' style='height:30px'>"+valu.Name+"</li></ul></a>");
			//console.log(valu.Name);
		});
    isEventViewLoaded=true;
}



function createListHouses(){
    
    $('#houseList').empty();
    $.each(allHouses, function (ind, valu) {
        
         str='<ul data-role="listview" id="flightStatusView" data-inset="true" data-theme="d"><li><a name="'+valu.ID+'" data-transition="slide" href="#page-housedetails" id="butonevents" onclick="gotoHouse(name)" >'+valu.ID+"<br/>"+valu.Address+'</a></li></ul>';
		
        
                      $('#houseList').append(str);//"<li data-theme='d' data-role='list-divider' style='height:30px'><a name='"+valu.ID+"' data-transition='slide' href='#page-housedetails' onclick='gotoHouse(name)'>"+valu.ID+"<br/>"+valu.Address+"</a></li>");
						//console.log(valu.ID);
                    }); 
    isHousesViewLoaded=true;

}
function changeviewtomap(){
    		try{
            
            var curJs = jlinq.from(allEvents).equals("Name", currentEventMY).first();
                if(curJs){
                longitudeMY=curJs.Longitude;
                latitudeMY=curJs.Latitude;
                }
        }catch(e){
            longitudeMY=49.835228;
        	latitudeMY=24.00827;
    	}
    console.log(longitudeMY);
    console.log(latitudeMY);
    
}