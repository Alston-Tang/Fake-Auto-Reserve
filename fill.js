var setting;
var loaded = false;
var settingReady = false;
var loginErr = false;
var loginSuc = false;

window.onload = function()
{
	loginErr = Boolean(document.getElementsByClassName("alert-danger").length);
	loginSuc = Boolean(document.getElementsByClassName("alert-success").length);
	if (loginErr) alert("Opp! Login Failed!");
	loaded = true;
	sync();
}

var fill = function(){
	var nameField = document.getElementById(setting.nameId);
	var passField = document.getElementById(setting.passId);
	var image = document.getElementById(setting.picId);
	var form = document.getElementById(setting.formId);
	var imageInput = document.getElementById(setting.picInputId);
	if (!nameField || !passField || !form || !imageInput || !setting.nameVal || !setting.passVal){
		chrome.runtime.sendMessage({setting: false});
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
		imageInput.value = captchaRes;
	}
	
	if (form && setting.auto && !loginErr && !loginSuc){
		form.submit();
	}
	chrome.runtime.sendMessage({setting: true});
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