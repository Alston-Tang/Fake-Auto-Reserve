var setting;
var loaded = false;
var settingReady = false;
response = false;
window.onload = function()
{
	loaded = true;
	sync();
}

var fill = function(){
	var nameField = document.getElementById(setting.nameId);
	var passField = document.getElementById(setting.passId);
	var image = document.getElementById(setting.picId);
	var form = document.getElementById(setting.formId);
	if (!nameField || !passField || !form || !setting.nameVal || !setting.passVal){
		return;
	}
	if (nameField) nameField.value = setting.nameVal;
	if (passField) passField.value = setting.passVal;
	if (image){
		var captcha = document.createElement("canvas");
		captcha.height = image.naturalHeight;
		captcha.width = image.naturalWidth;
		captcha.getContext("2d").drawImage(image, 0, 0);
		var captchaRes = OCRAD(captcha);
		document.getElementById(setting.picInputId).value = captchaRes;
	}
	
	if (form && setting.auto){
		form.submit();
	}
}

var sync = function(){
	if (loaded && settingReady) fill();
}

var port = chrome.runtime.connect();
port.postMessage("setting-required");
port.onMessage.addListener(function(msg) {
	setting = msg;
	settingReady = true;
	sync();
});

chrome.runtime.onMessage.addListener(
	function(request, sender, sendResponse) {
   		port.postMessage("setting-required");
	}
);