"use strict";

//This contentscript adds the channelID to the url and adds the menus for adding filters

main();

function main() {
	//Set up static pages
	var ytid = getYTID();
	if(ytid !== "") {
		setUpSite(ytid);
	}
	
	//Catch dynamic events
	var pageElement = window.document.getElementById("page");
	var observer = new MutationObserver(function(mutations) {
		//the "watch-shell" class gets added as long as the page is loading and is then removed
		//this is a hack of course, but I could not find any other way to detect video switching
		if(pageElement.className.indexOf("watch-shell") === -1) {
			ytid = getYTID();
			if(ytid !== "") {
				setUpSite(ytid);
			}
		}
	});
	
	observer.observe(pageElement, {attributes: true});
	window.onbeforeunload =  function() { observer.disconnect(); };
}

function getYTID() {
	// clink: Link to channel
	var clink = window.document.querySelector('.yt-user-info > a[href*="/channel/"]');
	
	if (clink) 
	  return clink.href.slice(clink.href.lastIndexOf("/")+1);
	else
	  return "";
}

function setUpSite(ytid) {
	if (location.href.search("&channel=") == -1)
		location.replace(location.href+"&channel="+ytid);
	addMenu(ytid);
}

// Add the context menu to the user name below the video
function addMenu(ytid) {
  var uh = document.getElementById("watch7-user-header");
  var menu = document.createElement("menu");
  menu.setAttribute("id", "abpfilter");
  menu.setAttribute("type", "context");
  var mione = document.createElement("menuitem");
  // Adblock Plus is a registered trademark of Eyeo GmbH.
  mione.setAttribute("label", "Adblock Plus: Add channel to whitelist"); 
  mione.setAttribute("icon", self.options.igreen);
  var mitwo = mione.cloneNode(true);
  mitwo.setAttribute("label", "Adblock Plus: Remove Channel from whitelist");
  mitwo.setAttribute("icon", self.options.ired);
  
  menu.appendChild(mione);
  menu.appendChild(mitwo);
  
  document.body.appendChild(menu);
  uh.setAttribute("contextmenu","abpfilter");
  
  
  function getFilter() {
	var fpo = "@@||youtube.com/*&channel=";
    var fpt = "$document";
    var ffl = fpo + getYTID() + fpt;
	return ffl;
  }
  function abpAddFilter() { 
	//call main script
	self.port.emit("addFilter", getFilter());
  }
  
  function abpRemoveFilter() {
	self.port.emit("removeFilter", getFilter());
  }
  
  mione.addEventListener("click",abpAddFilter,false);
  mitwo.addEventListener("click",abpRemoveFilter, false);
}