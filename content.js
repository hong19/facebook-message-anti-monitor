

chrome.extension.onMessage.addListener(function(message, sender, sendResponse) {
	switch(message.type) {
		case "colors-div":
			console.log("content js  target:" + message.target );
			
			var targetName = message.target;
			

			//after document-load
			$("a.titlebarText:contains('" + targetName + "')").bind('DOMSubtreeModified', test( event , targetName ) );
			//$("a.titlebarText:contains('" + targetName + "')").attr( "aria-level" , "2");
			replaceTheName( targetName );
		
		break;
	}
});

function replaceTheName( targetName ){
	console.log("replace " + targetName );
	$("a.titlebarText:contains('" + targetName + "')").html("Anonymous");
	$("[aria-label$='" + targetName + "'] img").attr( "src","https://fbcdn-profile-a.akamaihd.net/hprofile-ak-prn2/t1.0-1/p40x40/1891065_10203713186696473_1228623972_t.jpg" );
}

function DOMModificationHandler( event ){
	$(this).unbind();
	 
	 //var message = "The value of the " + eventObj.attrName + " attribute has been changed from " + eventObj.prevValue + " to " + eventObj.newValue + ".";
	//console.log( message );
	
	setTimeout(function(){
		replaceTheName( event.data.targetName );
		$(this).bind('DOMAttrModified', { "targetName": targetName } ,DOMModificationHandler() );
	},1000);
}



function test ( event , targetName ){
	console.log( "test event trigger" );
	console.log( "target: " +  targetName );
	console.log( event );			
}
