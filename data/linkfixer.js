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
}

function fixSub() {
	var itemList = document.querySelectorAll(".feed-item-main-content");
	for (var i = 0; i < itemList.length; ++i) {
	  var clink = itemList[i].querySelector('a[href*="/channel/"]');
	  var ytid = clink.href.slice(clink.href.lastIndexOf("/")+1);
	  var linkList = itemList[i].querySelectorAll('a[href*="/watch?"]');
	  for(var j = 0; j < linkList.length; j++) {
		if(linkList[j].href.search("&channel=") == -1)
			linkList[j].href = linkList[j].href + "&channel=" + ytid;
	  }
	}
}
