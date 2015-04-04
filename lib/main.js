//Importing the ABP API
const {Cc,Cu,Ci} = require("chrome");
let abpURL = Cc["@adblockplus.org/abp/public;1"].getService(Ci.nsIURI);
Cu.import(abpURL.spec);

var data = require("sdk/self").data;

//listen to tabs loading
require("sdk/tabs").on("ready", onLoad);

function onLoad(tab) {
	console.log("Load detected: " + tab.url);
	if(tab.url.match(/^https?:\/\/[^/]*youtube.com/)) {
		console.log("attatching contentscript.js");
		var worker = require("sdk/tabs").activeTab.attach({
			contentScriptFile: data.url("contentscript.js")
			});
		worker.port.on("addFilter", function(filter) {
			console.log("addFilter function called");
			AdblockPlus.addPatterns([filter]);
			});
		worker.port.on("removeFilter", function(filter) {
			AdblockPlus.removePatterns([filter]);
			});
			
	}
}