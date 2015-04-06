// ==UserScript==
// @name        YouTube - whitelist channels in Adblock Plus
// @namespace   http://forums.mozillazine.org/memberlist.php?mode=viewprofile&u=261941
// @author      Gingerbread Man, customized by webbertee
// @credits     Eyeo GmbH, Gantt
// @description Helps whitelist YouTube channels in Adblock Plus
// @include     http://*.youtube.com/*
// @include     https://*.youtube.com/*

// For static pages
if(location.href.search("/watch") > -1)
	refresh();

// For dynamic content changes, like when clicking a video on the main page.'#watch7-content link[href*="/user/"]
// This bit is based on Gantt's excellent Download YouTube Videos As MP4 script:
// https://github.com/gantt/downloadyoutube
var observer = new MutationObserver(function(mutations) {
  mutations.forEach(function(mutation) {
    if (mutation.addedNodes !== null) {
      for (i = 0; i < mutation.addedNodes.length; i++) {
        if (mutation.addedNodes[i].id == "watch7-container") {
			refresh()
			break;
        }
      }
    }
  });
});
observer.observe(document.body, {childList: true, subtree: true});


function refresh() {
	var ytid = getYTID();
	if(ytid !== "") {
		if (location.href.search("&channel=") == -1)
			location.replace(location.href+"&channel="+ytid);
		addMenu();
	}
}

function getYTID() {
	// clink: Link to channel
	var clink = document.querySelector('.yt-user-info > a[href*="/channel/"]');
	if (clink) 
	  return clink.href.slice(clink.href.lastIndexOf("/")+1);
	else
	  return "";
}



// Add the context menu to the user name below the video
// Only works in Firefox
function addMenu() {

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