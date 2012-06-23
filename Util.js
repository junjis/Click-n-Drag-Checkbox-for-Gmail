
var Util = {
	
	isVisible: function(element) {
		if (!element) return false;
		
		return $(element).is(":visible");
	},
	fireDOMSubtreeModified: function(doc, elem) {
		var evt = doc.createEvent('MutationEvents');
		evt.initMutationEvent('DOMSubtreeModified', true, true, elem,
				null, null, null, 1);				
		var bool = elem.dispatchEvent(evt);	
	},
	fireClick: function(element, ctrlPressed) {
		var evt = document.createEvent('MouseEvents');
		evt.initMouseEvent('click', true, true, window,
				1, 0, 0, 0, 0,
				ctrlPressed, false, false, false,
				0, null);				
		var bool = element.dispatchEvent(evt);	
	},
	findPos: function(obj) {
		var curLeft = curTop = 0;
		if (obj.offsetParent) {
			do {
					curLeft += obj.offsetLeft;
					curTop += obj.offsetTop;
			} while (obj = obj.offsetParent);
		}
		return {top: curTop, left: curLeft};
	},
	isChecked: function(elem) {
		var tname = elem.tagName;
		var isChecked = true;
		tname = tname.toLowerCase();		
		
		if (tname == "input") {
			isChecked = $(elem).attr("checked");
		}
		else if (tname == "div") {
			isChecked = (elem.parentElement.getAttribute("aria-checked") == "true")? true : false;
		}
		
		return isChecked;
	},
	
	compareArray: function(a, b) {
	
		if (a.length != b.length) { return false; }
		
		var a = a.sort(),
			b = b.sort();
			
		for (var i=0; b[i]; i++) {
		
			if (a[i] !== b[i]) { 
				return false;
			}
		}
		
		return true;
	}
	
};
