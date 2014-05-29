

chrome.extension.onMessage.addListener(function(message, sender, sendResponse) {
	switch(message.type) {
		case "colors-div":
			//console.log("content js  target:" + message.target );
			
			var targetName = message.target;
			var targetNameNew = message.targetN;
			var mainNode;
			mainNode = $("a.titlebarText:contains('" + targetName + "')").closest( ".fbNubFlyoutInner").find("div[data-reactid]");
			//console.log( mainNode[0] );
			
			//replace the name and picture
			replaceTheName( targetName , targetNameNew );
			
			
			
			
			var observer = new MutationObserver( DOMModificationHandler );
			// conmfiguration of teh observer
			observer.targetName = targetName;
			observer.targetNameN = targetNameNew;
			var config = { attributes: true, childList: true, characterData: true };
			
			observer.observe( mainNode[0] , config );
			console.log( "observer:");
			console.log( observer);
			console.log( "observer.targetName:");
			console.log( observer.targetName );
			
			
			//mainNode.bind('DOMNodeInserted.event1', { "targetName" : targetName } ,  DOMModificationHandler );
			//$("a.titlebarText:contains('" + targetName + "')").bind('DOMNodeInsertedIntoDocument', { "targetName" : targetName } ,  DOMModificationHandler );
			//console.log( $("a.titlebarText:contains('" + targetName + "')") );
				
				
		
		break;
	}
});

function replaceTheName( targetName  , targetNameNew ){
	console.log("replace " + targetName );
	var messageBoxInner;
	var userNameNode = $("a.titlebarText:contains('" + targetName + "')");
	userNameNode.html( targetNameNew );
	
	messageBoxInner = userNameNode.closest(".fbNubFlyoutInner");
	var img_src = chrome.extension.getURL("photos/fullBlack.jpg");
	messageBoxInner.find("[ data-hover='tooltip'] img").attr( "src", img_src ); // facebook 偷改版
	$("div.name:contains('" + targetName + "')").html( targetNameNew );
}

function DOMModificationHandler(  ){
	console.log( "DOMModificationHandler");
	//console.log( $(this)[0] );
	//console.log( $(this)[0].targetName );
	var targetName = $(this)[0].targetName;
	var targetNameNew = $(this)[0].targetNameN;
	
	replaceTheName( targetName , targetNameNew );
	/*
	setTimeout(function(){
		// can't pass parameter 
		replaceTheName( targetName );
	},1);
	*/
}
/*
//after document ready,  observe and replace
$( document ).ready( function(){
	var target1;
	chrome.storage.local.get( "target", function( storage_item ){
		
		target1 = storage_item.target;
		console.log(  target1  );
		replaceTheName( target1 );
	});
	
});
*/