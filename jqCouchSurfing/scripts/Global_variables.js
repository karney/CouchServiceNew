var url = "http://localhost:53255/Service1.svc/JSON/";
var iseventsloaded=false;
var countofevents=0;
var allEvents;
var allHouses;
var currentEventMY;
var currentHouseMY;
var longitudeMY;
var latitudeMY;
var countEvents;
var countHouses;
var isEventViewLoaded;
var isHousesViewLoaded;

var chosenExpKO;
var chosenExpKO11;

function gotoEvent(nnn){
     console.log('click');
            var name = nnn;
    		currentEventMY=name;
            try {
                chExpenseJS = jlinq.from(allEvents).equals("Name", currentEventMY).first();
            
            if (chExpenseJS) {
                var cm = new childModel(chExpenseJS);

                chosenExpKO = ko.mapping.fromJS(chExpenseJS, cm);

                ko.applyBindings(chosenExpKO, document.getElementById('page-eventdetails'));
            }           
            else {
                alert("Event not found");
            }
    }
    catch (e) {
        alert("19004a:" + e);
		}
}


function createnewevent(){
    try {
                chExpenseJS = jlinq.from(allEvents).first();
            	console.log(chExpenseJS);
        chExpenseJS.Name='New name';
        chExpenseJS.ID=-1;
        chExpenseJS.City= "";
        chExpenseJS.Country= "";
        chExpenseJS.DateEnd="2002-01-01T00:00:00";
        chExpenseJS.DateStart="2001-01-01T00:00:00";
        chExpenseJS.Description= "";
        chExpenseJS.Latitude= 0;
        chExpenseJS.Longitude= 0;
        
            if (chExpenseJS) {
                
                var cm = new childModel(chExpenseJS);
				
                
                
                
                
                chosenExpKO = ko.mapping.fromJS(chExpenseJS, cm);

                ko.applyBindings(chosenExpKO, document.getElementById('page-eventdetails'));
            }           
            else {
                alert("Event not found");
            }
	}
    catch (e) {
        alert("19004a:" + e);
		}
}



function createnewhouse(){
    try {
               var chExpenseJS11 = jlinq.from(allHouses).first();
            console.log(chExpenseJS11);
        
        chExpenseJS11.Address= ""; 
        chExpenseJS11.Rating= 0;
		chExpenseJS11.UserMarks= null; 
        chExpenseJS11.Comments= null; 
        chExpenseJS11.ID= 0;
        
            if (chExpenseJS11) {
                var cm = new childModel(chExpenseJS11);

               chosenExpKO11 = ko.mapping.fromJS(chExpenseJS11, cm);

                ko.applyBindings(chosenExpKO11, document.getElementById('page-housedetails'));
            }           
            else {
                alert("House not found");
            }
    }
    catch (e) {
        alert("19004a:" + e);
		}
}

function gotoHouse(nnn){
     console.log('click');
            var name = nnn;
    currentHouseMY=nnn;
    console.log(name);
            try {
               var chExpenseJS11 = jlinq.from(allHouses).equals("ID", parseInt(name)).first();
            
            if (chExpenseJS11) {
                var cm = new childModel(chExpenseJS11);

               chosenExpKO11 = ko.mapping.fromJS(chExpenseJS11, cm);

                ko.applyBindings(chosenExpKO11, document.getElementById('page-housedetails'));
            }           
            else {
                alert("House not found");
            }
    }
    catch (e) {
        alert("19004a:" + e);
		}
}
