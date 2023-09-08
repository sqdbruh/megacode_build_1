const Max_Requests_Attemps_Count = 5;
var _requestsAttempsCount = 0;

function checkMaintenanceBreak(onDone){
	try {
		fetch('https://megamod-monitor-service.herokuapp.com/api/status/better-space-api.herokuapp.com', {
					method: 'GET'
				})
				.then(r => r.json().then(data => ({status: r.status, body: data})))
				.then(obj => {
					try {
						console.log(obj);
						if (obj.status == 200){
							_requestsAttempsCount = 0;
							onDone(obj.body.maintenance);
						}else{
							onError(onDone);
						}
					}catch(err){
						console.log('checkMaintenanceBreak3: ' + err);
						onError(onDone);
					}
				}).catch(error => {
                    console.log('checkMaintenanceBreak2: ' + error);
					onError(onDone);
                });
	} catch(err){
		console.log('checkMaintenanceBreak1: ' + err);
		onError(onDone);
	}
}

function onError(onDone) {
	_requestsAttempsCount++;

	if (_requestsAttempsCount == Max_Requests_Attemps_Count) {
		_requestsAttempsCount = 0; 
		onDone(false);
	}
	else {
		setTimeout(() => {
  			checkMaintenanceBreak(onDone);
		}, 1000);
	}
}

function showMaintenanceBreakUI() {
	var maintenance_break_container = document.querySelector("#maintenance_break_div");

	if (maintenance_break_container == null) {
		return;
	}

	sendEvent("Client_MaintenanceBreak_Showed");

	maintenance_break_container.style.display = "flex";
}

function closeMaintenanceBreakUI() {
	var maintenance_break_container = document.querySelector("#maintenance_break_div");

	if (maintenance_break_container == null) {
		return;
	}

	sendEvent("Client_MaintenanceBreak_Closed");

	maintenance_break_container.style.display = "none";
}

function destroyMaintenanceBreakUI() {
	var maintenance_break_container = document.querySelector("#maintenance_break_div");

	if (maintenance_break_container == null) {
		return;
	}

	maintenance_break_container.remove();
}
