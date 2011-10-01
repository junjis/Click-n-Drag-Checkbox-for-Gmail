
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
	
}
GmailTable.prototype.sortRowsBy = function() {
    
    var $rows = this.getRows();
    var $parent = $rows.parent();
    var rows = $rows.detach().get();
    
    rows.sort(function(a, b) {
        // 5th td | 1st div | 1st div | 2nd div | 1st span
        var av = $(a).find("div:nth-child(1) div:nth-child(1) div:nth-child(2) span:nth-child(1)").text();
        var bv = $(b).find("div:nth-child(1) div:nth-child(1) div:nth-child(2) span:nth-child(1)").text();
        return av - bv;
    });
    
    for (var i=0; i<rows.length; i++) {
        $parent.append(rows[i]);
    }
};
GmailTable.prototype.getRows = function() {
    var table = this.getTable();
    var $sibs = $(table).parent().siblings().find("table");
    var $table = ($sibs.length)? $(table).add($sibs.toArray()) : $(table);
    return $table.find("tbody tr");
};

GmailTable.prototype.getCheckboxes = function() {
	var table = this.getTable();
	var $sibs = $(table).parent().siblings().find("table");
	var $table = ($sibs.length)? $(table).add($sibs.toArray()) : $(table);
	return $table.find("tbody input[type='checkbox']").toArray();
};

/*
 * Based on the risky assumption that the point (300, 300)
 * is within the table element
 */
GmailTable.prototype.getTable = function() {
	var doc = this.getDocument();
	var elem = doc.elementFromPoint(300, 250);
	var table = $(elem).closest('table')[0];
	return table;
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
	var menu = doc.getElementById(":uh");
	if (!menu) {
		menu = $(doc.elementFromPoint(100,200)).closest('table')[0];
	}
	return menu;
};

























