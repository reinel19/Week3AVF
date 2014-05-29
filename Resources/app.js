
	var Cloud = require('ti.cloud');
	// set .debug property to 'true' as we are in Development mode
	Cloud.debug = true;
	
	var loginUser = function(){
		Cloud.Users.login({
			login: 'reinel19',
			password: 'avefenyx19'
		}, function(e){
			// use .info method to view login info in the Console, if successful
			if (e.success){
				var user = e.users[0];
				Ti.API.info('Success!\n' + 
					'ACS User ID: ' + user.id + '\n' + 
					'ACS App sessionId: ' + Cloud.sessionId + '\n' + 
					'ACS App Username: ' + user.username);
			} else {
				alert((e.error && e.message) || JSON.stringify(e));
			}
		});
	}; // loginUser ends
	loginUser();
	
var tabGroup = Titanium.UI.createTabGroup();

var MapModule = require("ti.map");
//
// create base UI tab and root window
//
var win1 = Titanium.UI.createWindow({  
    title:'Your Current Location!',
    backgroundColor:"#434A7F",
    layout: "vertical"
});
var tab1 = Titanium.UI.createTab({  
    icon:'KS_nav_views.png',
    title:'Tab 1',
    window:win1
});


Titanium.Geolocation.purpose = "Recieve User Location";
Titanium.Geolocation.accuracy = Titanium.Geolocation.ACCURACY_BEST;
Titanium.Geolocation.distanceFilter = 10;


var mapview = MapModule.createView ({
    mapType: MapModule.STANDAR_TYPE,
    animate:true,
    region: {latitude:39.30109620906199, longitude:-76.60234451293945, latitudeDelta:0.1, longitudeDelta:0.1},
    regionFit:true,
    userLocation:true,
    visible: true,
});
 
function getLocation(){

Titanium.Geolocation.getCurrentPosition(function(e){
        var region={
            latitude: e.coords.latitude,
            longitude: e.coords.longitude,
            animate:true,
            latitudeDelta:0.001,
            longitudeDelta:0.001
        };
        mapview.setLocation(region);
});
}
 
win1.add(mapview);
 
Titanium.Geolocation.addEventListener('location',function(){
    getLocation();
});

tabGroup.addTab(tab1);
var req = require("camera");
tabGroup.open();