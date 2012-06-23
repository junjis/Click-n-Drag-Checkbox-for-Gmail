
function EmailTable() {

}
EmailTable.prototype.getCheckboxes = function() {
	
};
EmailTable.prototype.getTable = function() {
	
};
EmailTable.prototype.getDocument = function() {
	
};
EmailTable.prototype.getMenu = function() {
	
};

function GmailTable() {
	
	this.canvas_frame = document.getElementById('canvas_frame');
	//this.table = this.canvas_frame.getElementById(':pg');
	
	// css class for mouse cursor during drag
	var styleContent = ".row-handle {cursor: default!important;}";	
	var styleElem = document.createElement("style");
	styleElem.innerHTML = styleContent;
	this.canvas_frame.contentDocument.head.appendChild(styleElem);
	
}

GmailTable.prototype.classNames = {
	'checkbox': 'T-Jo-auh'
};
GmailTable.prototype.getCheckboxes = function() {
	/*
	var table = this.getTable();
	var $sibs = $(table).parent().siblings().find("table");
	var $table = ($sibs.length)? $(table).add($sibs.toArray()) : $(table);
	
	var checkboxes = $table.find("tbody input[type='checkbox']");
	if (checkboxes.length == 0)
		checkboxes = $table.find("tbody .T-Jo-auh");
		
	return checkboxes.toArray();
	*/
	//return $table.find("tbody input[type='checkbox'], tbody .T-Jo-auh").toArray();
	
	var table = this.getTable();
	var checkboxes = $(table).find('.T-Jo-auh:visible');
	return checkboxes.toArray();
	
	
};

/*
 * Based on the risky assumption that the point (300, 300)
 * is within the table element
 */
GmailTable.prototype.getTable = function() {
	/*
	var doc = this.getDocument();
	var elem = doc.elementFromPoint(300, 250);
	var table = $(elem).closest('table')[0];
	return table;
	*/
	var doc = this.getDocument();
	var tables = $("table:visible", doc).filter(function(i){ 
		// .T-Jo-auh class name is used for a checkbox div
		if ($(this).find('div.T-Jo-auh').length > 0) 
			return true; 
		else 
			return false;
	}).get().sort(function(a, b){return a.offsetHeight < b.offsetHeight;});
	return tables;
};
/*
 * Returns the document that contains elements in the page.
 * If iframe contains the whole page, it's iframe's contentDocument
 */
GmailTable.prototype.getDocument = function() {
	var iframe = this.canvas_frame;
	return (iframe)? iframe.contentDocument : document;
};
/*
 * In Gmail, menu section is element with ":uh" id or closest table
 * from (100, 200)
 */
GmailTable.prototype.getMenu = function() {
	var doc = this.getDocument();
	/*
	var menu = doc.getElementById(":uh");
	if (!menu)
		menu = doc.getElementById(":v3");
	if (!menu)
		menu = doc.getElementById(":v5");
		
	if (!menu) {
		menu = $(doc.elementFromPoint(100,200)).closest('table')[0];
	}
	return menu;
	*/
	var $button = $("div[role='button'][data-tooltip='Delete']", doc);
	var $menu = $("div[role='navigation']", doc).filter(function(i){ 
		if (this.offsetWidth < 300) 
			return true; 
		else 
			return false;
	});
	
	var menu = $menu.add($button.toArray()).get();
	
	return menu;
	
};

GmailTable.prototype.isNewLook = function() {
	var boxes = this.getCheckboxes();
	var tname = boxes[0].tagName.toLowerCase();
	
	return (tname == "div")? true : false;
	
};
GmailTable.prototype.getTableScrollTop = function() {
	var doc = this.getDocument();
	var div = doc.getElementById(":rp");
	
	return div.scrollTop;
};
GmailTable.prototype.compareTable = function(a, b) {
	
	var isSame = Util.compareArray(a, b);
	
	// if the array contains the same elements, do deep compare of checkbox elements??
	if (isSame) {
		var className = GmailTable.classNames['checkbox'];
		var al = $(a).find('.' + className).length;
		var bl = $(b).find('.' + className).length;
		if (al != bl)
			isSame = false;
	}
	
	return isSame;
};






















