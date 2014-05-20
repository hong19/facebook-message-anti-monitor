window.onload = function() {
	
	chrome.storage.local.get( [ "target" , "targetN"], function( storage_item ){
		//console.log(  storage_item  );
		$("#target_input").attr("value" , storage_item.target );
		$("#target_inputN").attr("value" , storage_item.targetN );
	});
	
	$("#button").click( function() {
		//$("#target_input").attr("value" , "etert");
		var target1 = $("#target_input").val();
		var target1N = $("#target_inputN").val();
		chrome.extension.sendMessage({
	        type: "color-divs",
			target: target1,
			targetN: target1N
	    });
		
		chrome.storage.local.set({'target': target1 , 'targetN': target1N  }, function() {
			console.log("store" + target1 + target1N );
        });
	});
}