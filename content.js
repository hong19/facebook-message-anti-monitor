

chrome.extension.onMessage.addListener(function(message, sender, sendResponse) {
	switch(message.type) {
		case "colors-div":
			console.log("content js  target:" + message.target );
			
			var targetName = message.target;
		
			var mainNode;
			mainNode = $("a.titlebarText:contains('" + targetName + "')").parents( ".fbNubFlyoutInner").find("div[data-reactid]");
			console.log( mainNode[0] );
			
			//replace the name and picture
			replaceTheName( targetName );
			
			
			var observer = new MutationObserver( DOMModificationHandler );
			// conmfiguration of teh observer
			observer.targetName = targetName;
			var config = { attributes: true, childList: true, characterData: true };
			
			observer.observe( mainNode[0] , config );
			
			
			//mainNode.bind('DOMNodeInserted.event1', { "targetName" : targetName } ,  DOMModificationHandler );
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

function DOMModificationHandler(  ){
	console.log( "DOMModificationHandler");
	console.log( $(this));
	
	
	setTimeout(function(){
		// can't pass parameter 
		replaceTheName( $(this).targetName );
	},10);
}


/*
function test ( event  ){
	console.log( "test event trigger 1" );
	console.log( "target: " +  event.data.targetName  );
	console.log( event );			
}
*/