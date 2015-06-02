var cont = {};
// global variables:
// userNameNode
// messageBoxInner


//listen to backgound 
chrome.extension.onMessage.addListener(function(message, sender, sendResponse) {
	switch(message.type) {
		case "replaceTheName":
			console.log("content js  target:" + message.target );
			
			var targetName = message.target;
			var targetNameNew = message.targetN;
			
			replaceTheNameMain( targetName, targetNameNew );
			
			//setObserver( targetName , targetNameNew );
		break;
	}
});

// replace the name and img ,etc
function replaceTheNameMain( targetName  , targetNameNew ){
	
		//find the dom with target name
	cont.userNameNode = findTheDomWithName( targetName );
	cont.userNameNode.hide();

	//append the dom with fake name 
	appendFakeNameDom( targetNameNew );
	
	//find the dom fo messageBoxInner
	cont.messageBoxInner = cont.userNameNode.closest(".fbNubFlyoutInner");
	
	//replace the img source
	replaceImgHeadShot();
		
	//replace the name when message box minimizes
	$("div.name:contains('" + targetName + "')").html( targetNameNew );

	//set the observer to observe the messageBoxInner
	//when the messageBoxInner changes, replace the img again
	setObserverOfMessageBoxInner();

}

//find the dom with target name
function findTheDomWithName( targetName ){

	var userNameNode = $("a.titlebarText:contains('" + targetName + "')");
	if( userNameNode == null ){
		console.log("null target");
	}
	return userNameNode; 
}

//append the dom with fake name
function appendFakeNameDom( targetNameNew ){

	var fakeNameDom = "<a class='titlebarText' >" + targetNameNew + "</a>";
	cont.userNameNode.parent().append( fakeNameDom );

}

function replaceImgHeadShot(){

	var img_src = chrome.extension.getURL("photos/fullBlack.jpg");
	cont.messageBoxInner.find("[ data-hover='tooltip'] img").attr( "src", img_src ); 
	
}


function setObserverOfMessageBoxInner(){
	console.log("setObserverOfMessageBoxInner");
	var observeNode;
	observeNode = cont.messageBoxInner.find("div.conversation");

	console.log( observeNode[0] );

	cont.observer = new MutationObserver( DomModifyHandlerMessageBoxInner );
	// conmfiguration of the observer
	var config = { childList: true, subtree: true };
	
	//observeNode[0], the first object of jQuery object is the DOM object
	//Object.observe( observeNode[0] , DomModifyHandlerMessageBoxInner );
	cont.observer.observe( observeNode[0] ,config );

}

function DomModifyHandlerMessageBoxInner( mutations ){
	console.log("DomModifyHandlerMessageBoxInner");
	
	mutations.forEach(function(mutation) {
    	console.log(mutation.type);
  	});    

	replaceImgHeadShot();
}


//=========== below is old codes ===============


function setObserverOfMessageBoxInner( ){

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




//set an observer to monitor the change of message div 
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
	
	//get the target from local storage 
	chrome.storage.local.get(  [ "target" , "targetN"] , function( storage_item ){
		
		targetName = storage_item.target ;
		targetNameNew = storage_item.targetN ;
		
		//setObserver( targetName , targetNameNew );
		

		/*
		// set an observer to monitor the message group 
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
		*/
	});

});
