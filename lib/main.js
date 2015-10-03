"use strict";

//const abpid = "d10d0bf8-f5b5-c8b4-a8b2-2b9879e08c5d";
//const abeid = "fe272bd1-5f76-4ea4-8501-a05d35d823fc";

//Importing the chrome constants
const {Cc,Cu,Ci} = require("chrome");
var data = require("sdk/self").data;
var pageMod = require("sdk/page-mod");
var sPrefs = require("sdk/simple-prefs");
var linkFixMod = null;

main();

//exports.main = function() {
function main() {
	//Importing AdblockPlus
	try{
		let abpURL = Cc["@adblockplus.org/abp/public;1"].getService(Ci.nsIURI);
		Cu.import(abpURL.spec);
	} catch (e) {
		//alert("youtube-antiadblock: Could not find AdblockPlus addon, exiting");
		console.error("Could not find AdblockPlus addon, exiting"); //Todo: Give User Feedback
		return;
	}
	
	pageMod.PageMod({
		include: "*.youtube.com",
		contentScriptFile: data.url("contentscript.js"),
		contentScriptOptions: {"ired" : data.url("ired.png"),
								"igreen" : data.url("igreen.png")},
		attachTo: ["top"],
		onAttach: function(worker) {
			worker.port.on("addFilter", function(filter) {
				//console.log("addFilter function called");
				AdblockPlus.addPatterns([filter]);
				});
			worker.port.on("removeFilter", function(filter) {
				AdblockPlus.removePatterns([filter]);
				});
			worker.port.on("log", function(msg) {
				console.error(msg);
				});
		}
	});	
	
	checkLinkFixer();
	sPrefs.on("preFixLinks", checkLinkFixer);
}
	
	
function checkLinkFixer() {
	if(sPrefs.prefs['preFixLinks']) {
		linkFixMod = pageMod.PageMod({
			attachTo: ["top"],
			include: "*.youtube.com",
			contentScriptFile: data.url("linkfixer.js")
		});
	} else {
		if(linkFixMod !== null) {
			linkFixMod.destroy();
			linkFixMod = null;
		}
	}
}

