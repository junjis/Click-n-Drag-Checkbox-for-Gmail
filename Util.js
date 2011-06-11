
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
	}
	
};
