//const abpid = "d10d0bf8-f5b5-c8b4-a8b2-2b9879e08c5d";
//const abeid = "fe272bd1-5f76-4ea4-8501-a05d35d823fc";

//Importing the chrome constants
const {Cc,Cu,Ci} = require("chrome");
var data = require("sdk/self").data;
//var pageMod = require("sdk/page-mod");

//go!
main();

function main() {
	//Importing AdblockPlus
	try{
		let abpURL = Cc["@adblockplus.org/abp/public;1"].getService(Ci.nsIURI);
		Cu.import(abpURL.spec);
	} catch (e) {
		//alert("youtube-antiadblock: Could not find AdblockPlus addon, exiting");
		console.error("Could not find AdblockPlus addon, exiting");
		return;
	}

	//listen to tabs loading
	require("sdk/tabs").on("ready", onLoad);

	function onLoad(tab) {
		//console.log("Load detected: " + tab.url);
		if(tab.url.match(/^https?:\/\/[^/]*youtube.com/)) {
			//console.log("attatching contentscript.js");
			var worker = require("sdk/tabs").activeTab.attach({
				contentScriptFile: data.url("contentscript.js"),
				contentScriptOptions: {"ired" : data.url("ired.png"),
										"igreen" : data.url("igreen.png")} 
				});
			worker.port.on("addFilter", function(filter) {
				//console.log("addFilter function called");
				AdblockPlus.addPatterns([filter]);
				});
			worker.port.on("removeFilter", function(filter) {
				AdblockPlus.removePatterns([filter]);
				});
				
			var linkfixer = require("sdk/tabs").activeTab.attach({
				contentScriptFile: data.url("linkfixer.js")
			});
				
		}
	}
}

