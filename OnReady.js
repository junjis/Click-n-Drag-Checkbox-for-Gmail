
function throttle(method, context) {
	clearTimeout(method.tId);
	method.tId = setTimeout(function() {
		method.call(context);
	}, 200);
}


$(document).ready(function() {
	
	
	/*
	var dragCheck = new DragCheck();
	var notifier = new EmailTableNotifier(dragCheck);
	*/
	
	
	var table = new GmailTable();
	var doc = table.getDocument();
	var menu = table.getMenu();
	var count = 0;
	
	/*
	var timer;
	var hasNotified;
	var count = 0;	
	timer = setInterval(function() {
		var t = table.getTable();
		if (t) {
			clearInterval(timer);
			if (!hasNotified) {
				console.log("Table is ready.");
			}
		}
		if (++count == 100) {
			clearInterval(timer);
		}
	}, 500);
	*/
	
	var f = function() {	
			console.log("Table is ready." + count++);
			var rr = doc.getElementById(":rr");
			var checkboxes = $(rr).find(".T-Jo-auh:visible");
			console.log(checkboxes.length);
	};
	
	setTimeout(function() {
		var rr = doc.getElementById(":rr");
		if (!rr) return;
		
		$(rr).bind("DOMSubtreeModified", function(e) {		
			throttle(f);	
		});
		
	}, 4000);
	
	
	
	
});
