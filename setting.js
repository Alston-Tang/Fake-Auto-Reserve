var fields = ["formId", "nameId", "nameVal", "passId", "passVal", "picId", "picInputId"];
window.onload = function()
{
	document.getElementById("save").onclick = save;
	document.getElementById("saveFill").onclick = function(){
		save();
		chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
  			chrome.tabs.sendMessage(tabs[0].id, "fill");
		});
	}
	load();
}

var save = function(){
	for (var i = 0; i < fields.length; i++){
		var fieldId = fields[i];
		var element = document.getElementById(fieldId);	
		localStorage.setItem(fieldId, element.value);
	}
	var autoChecked = document.getElementById("auto").checked;
	localStorage.setItem("auto", autoChecked);
	document.getElementById("message").innerHTML = "Success";
}

var load = function(){
	for (var i = 0; i < fields.length; i++){
		var fieldId = fields[i];
		var element = document.getElementById(fieldId);
		element.value = localStorage.getItem(fieldId);
	}
	var autoChecked = localStorage.getItem("auto");
	document.getElementById("auto").checked = autoChecked === "true"? true : false;
}

chrome.runtime.onMessage.addListener(
	function(request, sender, sendResponse) {
		console.log(request);
   		document.getElementById("message").innerHTML = "Fail";
	}
);