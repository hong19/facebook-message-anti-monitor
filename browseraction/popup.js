window.onload = function() {
	
	chrome.storage.local.get( "target", function( storage_item ){
		//console.log(  storage_item  );
		$("#target_input").attr("value" , storage_item.target );
	});
	
	$("#button").click( function() {
		//$("#target_input").attr("value" , "etert");
		var target1 = $("#target_input").val();
		chrome.extension.sendMessage({
	        type: "color-divs",
			target: target1
	    });
		
		chrome.storage.local.set({'target': target1 }, function() {
			console.log("store" + target1);
        });
	});
}