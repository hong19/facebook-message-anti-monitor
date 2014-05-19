

chrome.extension.onMessage.addListener(function(message, sender, sendResponse) {
	switch(message.type) {
		case "colors-div":
			console.log("content js  target:" + message.target );
			
			var targetName = message.target;
			
			$("a.titlebarText:contains('" + targetName + "')").html("Anonymous");
			$("[aria-label$='" + targetName + "'] img").attr( "src","https://fbcdn-profile-a.akamaihd.net/hprofile-ak-prn2/t1.0-1/p40x40/1891065_10203713186696473_1228623972_t.jpg" );
			
		break;
	}
});