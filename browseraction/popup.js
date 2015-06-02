window.onload = function() {
	
	// get the target name from the local storage
	chrome.storage.local.get( [ "target" , "targetN"], function( storage_item ){
		//console.log(  storage_item  );
		$("#target_input").attr("value" , storage_item.target );
		$("#target_inputN").attr("value" , storage_item.targetN );
	});
	

	$("#button").click( function() {
		var target1 = $("#target_input").val();
		var target1N = $("#target_inputN").val();
		
		//trigger the function in content.js
		chrome.extension.sendMessage({
	        type: "replaceTheName",
			target: target1,
			targetN: target1N
	    });
		
		//store the target name 
		chrome.storage.local.set({'target': target1 , 'targetN': target1N  }, function() {
			console.log("store" + target1 + target1N );
        });
	});
}