//Importing the ABP API
let abpURL = Cc["@adblockplus.org/abp/public;1"].getService(Ci.nsIURI);
Cu.import(abpURL.spec);
//listen to tabs loading
require("sdk/tabs").on("ready", onLoad);

function onLoad(tab) {
	if(tab.url.match(/^https?:\/\/[^/]*youtube.com/)) {
		var worker = require("sdk/tabs").activeTab.attach({
			contentScriptFile: self.data.url("contentscript.js")
			});
		worker.port.on("addFilter", function(filter) {
			AdblockPlus.addPatterns([filter]);
		}
	}
}
