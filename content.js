

chrome.extension.onMessage.addListener(function(message, sender, sendResponse) {
	switch(message.type) {
		case "colors-div":
			console.log("content js  target:" + message.target );
			
			var targetName = message.target;
			
			
			var mainNode;
			mainNode = $("a.titlebarText:contains('" + targetName + "')").parents( ".fbNubFlyoutInner").find("div[data-reactid]");
			console.log( mainNode );
			replaceTheName( targetName );
			
			mainNode.bind('DOMNodeInserted.event1', { "targetName" : targetName } ,  DOMModificationHandler );
			//$("a.titlebarText:contains('" + targetName + "')").bind('DOMNodeInsertedIntoDocument', { "targetName" : targetName } ,  DOMModificationHandler );
			//console.log( $("a.titlebarText:contains('" + targetName + "')") );
			
		
		break;
	}
});

function replaceTheName( targetName ){
	console.log("replace " + targetName );
	$("a.titlebarText:contains('" + targetName + "')").html("Anonymous");
	$("[aria-label$='" + targetName + "'] img").attr( "src","https://fbcdn-profile-a.akamaihd.net/hprofile-ak-prn2/t1.0-1/p40x40/1891065_10203713186696473_1228623972_t.jpg" );
}

function DOMModificationHandler( event ){
	console.log( "DOMModificationHandler");
	console.log( $(this));
	console.log( "fired event:"  );
	console.log( event );
	$(this).unbind();
	 /*
	var message = "The value of the " + event.attrName + " attribute has been changed from " + event.prevValue + " to " + event.newValue + ".";
	console.log( message );
	*/
	
	setTimeout(function(){
		replaceTheName( event.data.targetName );
		$(this).bind('DOMNodeInserted.event1', { "targetName": event.data.targetName } ,DOMModificationHandler );
	},10);
}


/*
function test ( event  ){
	console.log( "test event trigger 1" );
	console.log( "target: " +  event.data.targetName  );
	console.log( event );			
}
*/