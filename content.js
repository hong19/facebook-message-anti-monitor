

chrome.extension.onMessage.addListener(function(message, sender, sendResponse) {
	switch(message.type) {
		case "colors-div":
			//console.log("content js  target:" + message.target );
			
			var targetName = message.target;
			var targetNameNew = message.targetN;
			
			setObserver( targetName , targetNameNew );

		break;
	}
});

function replaceTheName( targetName  , targetNameNew ){
	console.log("replace " + targetName );
	var messageBoxInner;
	var userNameNode = $("a.titlebarText:contains('" + targetName + "')");
	if( userNameNode == null ){
		console.log("null target");
	}
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
	
	//replaceTheName( targetName , targetNameNew );
	
	setTimeout(function(){
		// can't pass parameter 
		replaceTheName( targetName , targetNameNew );
	},10);
	
}

//set observer
function setObserver( targetName , targetNameNew ){

	var mainNode;
	mainNode = $("a.titlebarText:contains('" + targetName + "')").closest( ".fbNubFlyoutInner").find("div[data-reactid]");
	//console.log( mainNode[0] );
	
	if( mainNode[0] != null ){
					
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
		
	}else{
		console.log("null target");
	}




}


function messageGroupModifyHandler(){

	console.log( "messageGroupModifyHandler");
	
	var targetName = $(this)[0].targetName;
	var targetNameNew = $(this)[0].targetNameNew;
	setObserver( targetName , targetNameNew );
	
}

//after document ready,  observe and replace
$( document ).ready( function(){
	console.log("document ready");
	var targetName , targetNameNew;
	
	chrome.storage.local.get(  [ "target" , "targetN"] , function( storage_item ){
		
		targetName = storage_item.target ;
		targetNameNew = storage_item.targetN ;
		
		setObserver( targetName , targetNameNew );
		
		var fbMessageGroup;
		// <div class="fbNubGroup clearfix videoCallEnabled" id="u_0_5g"> 
		fbMessageGroup = $(".fbNubGroup.clearfix.videoCallEnabled") ; 
		console.log( fbMessageGroup[0] );
		if( fbMessageGroup != null ){
			console.log("observe on message group");
			
			var observer = new MutationObserver( messageGroupModifyHandler );
			var config = { attributes: true, childList: true, characterData: true };
			
			observer.targetName = targetName;
			observer.targetNameNew = targetNameNew;
			
			observer.observe( fbMessageGroup[0] , config );
			
		}
		
	});

});
