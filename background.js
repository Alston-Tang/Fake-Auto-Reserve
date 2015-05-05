var fields = ["formId", "nameId", "nameVal", "passId", "passVal", "picId", "picInputId"];
var setting = {};
var load = function(){
	for (var i = 0; i < fields.length; i++){
		var fieldId = fields[i];
		setting[fieldId] = localStorage.getItem(fieldId);
	}
	var autoChecked = localStorage.getItem("auto");
	setting["auto"] = autoChecked === "true"? true : false;
}

chrome.runtime.onConnect.addListener(function(port) {
  	port.onMessage.addListener(function(msg) {
  		load();
    	port.postMessage(setting);
  	});
});



