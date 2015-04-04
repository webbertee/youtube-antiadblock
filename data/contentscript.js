// ==UserScript==
// @name        YouTube - whitelist channels in Adblock Plus
// @namespace   http://forums.mozillazine.org/memberlist.php?mode=viewprofile&u=261941
// @author      Gingerbread Man, customized by webbertee
// @credits     Eyeo GmbH, Gantt
// @description Helps whitelist YouTube channels in Adblock Plus
// @include     http://*.youtube.com/*
// @include     https://*.youtube.com/*

// For static pages
var uo = document.querySelector('#watch7-content link[href*="/user/"]');
var uv = document.querySelector('.yt-user-info > a[href*="/channel/"]');
if (uo) {
  addMenu();
  var ut = uo.href.slice(uo.href.lastIndexOf("/")+1);
  if (location.href.search("&user=") == -1) location.replace(location.href+"&user="+ut);
}
else if (uv) {
  addMenu();
  var ut = uv.textContent;
  if (location.href.search("&user=") == -1) location.replace(location.href+"&user="+ut);
}

// For dynamic content changes, like when clicking a video on the main page.'#watch7-content link[href*="/user/"]
// This bit is based on Gantt's excellent Download YouTube Videos As MP4 script:
// https://github.com/gantt/downloadyoutube
var observer = new MutationObserver(function(mutations) {
  mutations.forEach(function(mutation) {
    if (mutation.addedNodes !== null) {
      for (i = 0; i < mutation.addedNodes.length; i++) {
        if (mutation.addedNodes[i].id == "watch7-container") {
          addMenu();
          var uo = document.querySelector('#watch7-content link[href*="/user/"]');
          var uv = document.querySelector('.yt-user-info > a[href*="/channel/"]');
          if (uo) {
            addMenu();
            var ut = uo.href.slice(uo.href.lastIndexOf("/")+1);
            if (location.href.search("&user=") == -1) location.replace(location.href+"&user="+ut);
            break;
          }
          else if (uv) {
            addMenu();
            var ut = uv.textContent;
            if (location.href.search("&user=") == -1) location.replace(location.href+"&user="+ut);
            break;
          } 
        }
      }
    }
  });
});
observer.observe(document.body, {childList: true, subtree: true});

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
  mione.setAttribute("icon","data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAhlQTFRFKaFfJ6BdsOnR////3vbtnlUNvHAVq+fOnuLFjty66fnzM6prKqNhPbN2iEAGgtexftaufCgCj927b8+j9/37neLE0/Pm+/37YsmYqFoPSbqCbFoMw4IWrWoRkpxSrXwZxXkX1fHhjJlMXYk3d14SWHouV1cMr2IRR1INq1wPkU4JaU4LcXUW5PbtvnAVbFUMqmkQb1oO4vXrklQKkr6B0fLklUcKq3wYbFcOkmAQsGURsGEStGcSm1AMo8uWxeC49fz5zn4albBoo1kPl0wKnVQNiV0Qvm8U5vfvrWsRsG0RlWkSVXkt0enOo6dYjkcHVHUtgFUNzOXIjnMZTnIq/f38VGcZc6lfsnARcZdDo6dXVHUri3IXtGkTVXYtotOkqFkPT3MqfzEFsmsSkUwJXkAIgDoFosiRncePYciXxYQX4PTow3QWaGkcaWwfVHQrVXMkVGUVVGARY0cKlVcN+/36+fz5WH8vqs2YkkUKfGURgD0FVcKNcFoOlVwRdKVYVnoniF4PxePCjFcNaZdJ0/Dfo3EWsN67lFUKmE4LfmURlEkK7/ftR7qBYYcylJ5Sq20QVMGMom0WjkcIfzQFoKRSznwaflIMyn0ZjEIHnqRTlVQKiZlNbaFajHIXtWkSW4U2o2QOtOC+a5tSnVINi6tfr2YRynsZaX8yo2UOflAKmMePwd23lUwKeWURkUcIj30YsmoSAAAA7psQygAAALN0Uk5T/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////wAPKb/oAAABCElEQVR42mLYtGkTOxMUsAM5DJs2iXJEGchGeHlO8OMQBQkIcc5aZiPjrpc132oqp9AmBn4BuY1sOcsdp81QYEvuF+BnEFZS9+6aJB8zz7ytap3lHGEGCUnrpcxOG5hL7YuYxe0CMxlqNGPTeyqCmSPL+phbQvMmMkgl1DVlBOmIrPENE6l3yO1l4HVWMSrXLeQyyW7g8lg9nZeB23YFSyuLMkuB4gIWteYl3Aw8lXPbFy8KFzON1xCTdjXjYWDwSS0u0bcwrHVr1F41W5WBgZEhwLjbZSEr68rOtR1xQO4mRoZ8vpmTtVLW+/NFMzCCPMfIECKYNiWpWjARyAcJAEWgAMjfBBBgAJM4T1pkCARcAAAAAElFTkSuQmCC");
  var mitwo = mione.cloneNode(true);
  mitwo.setAttribute("label", "Adblock Plus: Remove Channel from whitelist");
  
  menu.appendChild(mione);
  menu.appendChild(mitwo);
  
  document.body.appendChild(menu);
  uh.setAttribute("contextmenu","abpfilter");
  
  
  function getFilter() {
	var fpo = "@@||youtube.com/*&user=";
    var fpt = "$document";
    if (uo) var ut = uo.href.slice(uo.href.lastIndexOf("/")+1);
    else if (uv) var ut = uv.textContent;
    var ffl = fpo+ut+fpt;
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