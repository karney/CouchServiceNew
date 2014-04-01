var url = "http://localhost:53255/Service1.svc/JSON/";
var iseventsloaded=false;
var countofevents=0;
var allEvents;
var allHouses;
var currentEventMY;
var longitudeMY;
var latitudeMY;
var countEvents;
var countHouses;
var isEventViewLoaded;
var isHousesViewLoaded;

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



function gotoHouse(nnn){
     console.log('click');
            var name = nnn;
    console.log(name);
            try {
               var chExpenseJS11 = jlinq.from(allHouses).equals("ID", parseInt(name)).first();
            
            if (chExpenseJS11) {
                var cm = new childModel(chExpenseJS11);

               var chosenExpKO11 = ko.mapping.fromJS(chExpenseJS11, cm);

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
