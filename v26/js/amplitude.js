var _lastRequestNumber = 0;
var _currentRequestNumber = 0;

function sendEvent(eventName) {
	console.log("sendEvent: " + eventName);
	var requestNumber = _currentRequestNumber++;
	sendEventLogic(eventName, requestNumber);
}

function sendEventLogic(eventName, requestNumber){
	if (clientId !== "") {
		if (_lastRequestNumber != requestNumber){
			setTimeout(function() {
				sendEventLogic(eventName, requestNumber);
			}, 100);
		} else{
			
			var myBody = 
			{
			   "events":[
				  {
					  // "user_properties":{
						 // "Server":"Prod",
						 // "Fullscreen":false,
						 // "ProcessorsCount":16,
						 // "VideoCard":"NVIDIA GeForce GTX 1650",
						 // "Min_RAM":16.0,
						 // "Browser":null,
						 // "Link_Open":"editor_MegaMod",
						 // "Room_ID":"SERVER-EDITOR_ROOM_0001",
						 // "Player_ID":"e6ba93c2-9534-4e6f-8d4f-2a864bef91c1",
						 // "Player_Name":"",
						 // "Skin_ID":null,
						 // "Login_Method":"No Authorized",
						 // "Email":"No Authorized"
					  // },
					 "session_id": currentSessionId,
					 // "insert_id":"638179608219672505_-417362788",
					 "user_id": clientId,
					 "app_version": app_version,
					 "platform":"HTML",
					 "event_type": eventName,
				  }
			   ]
			}

			fetch('https://dev-better-space-api.herokuapp.com/api/game/httpApi', {
				method: 'POST',
				headers: {
					'Accept': '*/*',
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(myBody)
			})
			.then(response => _lastRequestNumber++)
			.then(response => console.log("event successfuly sent: " + eventName));
			//.then(response => response.json())
			//.then(response => console.log(JSON.stringify(response)));
		}
	  } else {
		setTimeout(function() {
		  sendEventLogic(eventName, requestNumber);
		}, 100);
	}
}
