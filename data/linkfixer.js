//-----the my-subcriptions page-----
//get all feed items

//static loading:
callFixes();

//dynamic loading
var observer = new MutationObserver(function() {
    callFixes();
    console.log("chages observed");
});
observer.observe(document.body, {childList: true, subtree: false});


function callFixes() {
    if(location.href.search("/feed/") > -1)
        fixSub();
    else if(location.href.search("/watch") > -1)
        fixWatch();
	else
		fixHome();
}

function fixSub() {
    var itemList = document.querySelectorAll(".feed-item-main-content");
    for (var i = 0; i < itemList.length; ++i) {
        //clink is the link to the channel
        var clink = itemList[i].querySelector('a[href*="/channel/"]');
        var ytid = clink.href.slice(clink.href.lastIndexOf("/")+1);
        extendLinks(itemList[i], ytid);        
    }
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
    var itemList = document.querySelectorAll(".yt-lockup-dismissable");
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