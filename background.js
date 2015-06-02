// listening for an event / one-time requests
// coming from the popup
chrome.extension.onMessage.addListener(function(request, sender, sendResponse) {
    switch(request.type) {
        case "replaceTheName":
            trigReplaceTheName( request );
        break;
    }
    return true;
});



// send a message to the content script
function trigReplaceTheName( message ) {
	chrome.tabs.getSelected(null, function(tab){
	    chrome.tabs.sendMessage(tab.id, {type: "replaceTheName", target: message.target , targetN: message.targetN });
	    // setting a badge
		chrome.browserAction.setBadgeText({text: "red!"});
	});
}

