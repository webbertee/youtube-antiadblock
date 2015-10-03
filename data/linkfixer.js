"use strict";

//static loading:
callFixes();

//dynamic loading
var observer = new MutationObserver(function() {
    callFixes();
});
observer.observe(document.body, {childList: true, subtree: false});
window.onbeforeunload = function() { observer.disconnect(); };


function callFixes() {
    if(location.href.search("/watch") > -1)
		fixWatch();
	else
		fixHome();
}


function fixWatch() {
    var itemList = document.querySelectorAll(".video-list-item");
    for (var i = 0; i < itemList.length; ++i) {
        //hovercSpan belongs to the g+ hovercard
        var hovercSpan = itemList[i].querySelector('.g-hovercard');
        if(hovercSpan) {
            var ytid = hovercSpan.getAttribute("data-ytid");
            extendLinks(itemList[i], ytid);
        }
    }
}

function fixHome() {
    var itemList = document.querySelectorAll(".yt-lockup");
    for (var i = 0; i < itemList.length; ++i) {
        //hovercSpan belongs to the g+ hovercard
        var hovercSpan = itemList[i].querySelector('.g-hovercard');
        if(hovercSpan) {
            var ytid = hovercSpan.getAttribute("data-ytid");
            extendLinks(itemList[i], ytid);
        }
    }
}

function extendLinks(element, ytid) {
    var linkList = element.querySelectorAll('a[href*="/watch?"]');
    for(var j = 0; j < linkList.length; j++) {
        if(linkList[j].href.search("&channel=") == -1)
            linkList[j].href = linkList[j].href + "&channel=" + ytid;
    }
}