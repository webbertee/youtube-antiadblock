//-----the my-subcriptions page-----
//get all feed items
var itemList = document.querySelectorAll(".feed-item-main-content");
for (var i = 0; i < itemList.length; ++i) {
  var clink = itemList[i].querySelector('a[href*="/channel/"]');
  var ytid = clink.href.slice(clink.href.lastIndexOf("/")+1);
  var linkList = itemList[i].querySelectorAll('a[href*="/watch?"]');
  for(var j = 0; j < linkList.length; j++) {
	linkList[j].href = linkList[j].href + "&channel=" + ytid;
  }
}
