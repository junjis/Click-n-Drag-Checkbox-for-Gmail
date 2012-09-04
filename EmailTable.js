
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
	}).get().sort(function(a, b){return a.offsetTop < b.offsetTop;});
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

GmailTable.prototype.getEmailFrom = function() {
	var doc = this.getDocument();
	var v = $("select[name='from'] > option:selected", doc).text();
	//$("<span />").text(v).css('font-wight', 'bold').get(0);
	
	var div = $("<div/>");
	$("<span/>").text("From: ").appendTo(div);
	$("<span/>").text(v).appendTo(div);
	$("<br/>").appendTo(div)
	
	div.css('font-family', 'ariel, sans-serif');
	div.css({
		'margin': '5px 5px 5px 13px', 
		'font': 'normal small arial'
	});
	
	return div;
};
GmailTable.prototype.getEmailTo = function() {
	var doc = this.getDocument();
	var v = $("textarea[name='to']", doc).val();
	//$("<span/>").text(v).css({'font-size': '80%', 'color': '#777'}).get(0);
	
	var div = $("<div/>");
	$("<span/>").text("To: ").appendTo(div);
	$("<span/>").text(v).appendTo(div);
	$("<br/>").appendTo(div);
	
	div.css('font-family', 'ariel, sans-serif');
	div.css({
		'margin': '5px 5px 5px 13px', 
		'font': 'normal small arial'
	});
		
	return div;
};
GmailTable.prototype.getEmailSubject = function() {
	var doc = this.getDocument();
	var v = $("input[name='subject']", doc).val();
	
	var div = $("<div/>");
	$("<span/>").text("Subject: ").appendTo(div);
	$("<span/>").text(v).appendTo(div);
	$("<br/>").appendTo(div);
	
	div.css('font-family', 'ariel, sans-serif');
	div.css({
		'margin': '5px 5px 5px 13px', 
		'font': 'normal small arial'
	});
	
	return div;
};
// clone of the compose email content
GmailTable.prototype.getEmailContent = function() {
	var doc = this.getDocument();
	var c = $("body", $("iframe.editable", doc).get(0).contentDocument).clone();
	var div = $("<div/>").html($(c).html()); 
	div.addClass($(c).attr('class')); 
	div.css({
		'margin': '10px', 
		'font': 'normal small arial',
		'background-color': '#fff',
		'padding': '10px'
	});
	return div;
};
GmailTable.prototype.getEmailHeaderPreviewButtons = function() {

	var div = $("<div/>");
	var span = $("<span>This is a preview of your email.&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>");
	var input = $("<input type='button' value='Send'></input>");
	var a = $("<a style='margin-left: 15px;' href='javascript:void(0)'>Go Back</a>");
	var br1 = $("<br/>");
	var br2 = $("<br/>");
	
	div.append(span);
	div.append(input);
	div.append(a);
	
	var that = this;
	input.click(function() {
		that.cancelPreview();
		that.send();
	});
	a.click(function() {
		that.cancelPreview();
	});
	
	
	div.css({
		'margin': '0px 8px 32px 8px', 
		'font': 'normal small arial',
		'background-color': '#fff',
		'padding': '8px'
	});
	return div;
};

GmailTable.prototype.getEmailPreviewButtons = function() {
	
	/*
	var div = $("<div/>");
	var span = $("<span>This is a preview of your email.</span>");
	var input = $("<input type='button' value='Send'></input>");
	var a = $("<a style='margin-left: 15px;' href='javascript:void(0)'>Go Back</a>");
	var br1 = $("<br/>");
	var br2 = $("<br/>");
	
	div.append(span);
	div.append(br1);
	div.append(br2);
	div.append(input);
	div.append(a);
	
	var that = this;
	input.click(function() {
		that.cancelPreview();
		that.send();
	});
	a.click(function() {
		that.cancelPreview();
	});
	
	
	div.css({
		'margin': '8px', 
		'font': 'normal small arial',
		'background-color': '#fff',
		'padding': '8px'
	});
	return div;
	*/
	var div = $("<div/>");
	var span = $("<span>This is a preview of your email.&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>");
	var input = $("<input type='button' value='Send'></input>");
	var a = $("<a style='margin-left: 15px;' href='javascript:void(0)'>Go Back</a>");
	var br1 = $("<br/>");
	var br2 = $("<br/>");
	
	div.append(span);
	div.append(input);
	div.append(a);
	
	var that = this;
	input.click(function() {
		that.cancelPreview();
		that.send();
	});
	a.click(function() {
		that.cancelPreview();
	});
	
	
	div.css({
		'margin': '8px 8px 8px 8px', 
		'font': 'normal small arial',
		'background-color': '#fff',
		'padding': '8px'
	});
	return div;
};

GmailTable.prototype.getEmailCompositeForm = function() {
	var doc = this.getDocument();
	return $("iframe.editable", doc).closest('form');
};

GmailTable.prototype.preview = function() {

	var c = this.getEmailContent();
	var s = this.getEmailSubject();
	var f = this.getEmailFrom();
	var t = this.getEmailTo();
	var hb = this.getEmailHeaderPreviewButtons();
	var b = this.getEmailPreviewButtons();
	
	var form = this.getEmailCompositeForm();
	form.hide();
	hb.insertBefore(form);
	s.insertBefore(form);
	f.insertBefore(form);
	t.insertBefore(form);	
	c.insertBefore(form);
	b.insertBefore(form);
};
GmailTable.prototype.cancelPreview = function() {
	var form = this.getEmailCompositeForm();
	form.prev().remove();
	form.prev().remove();
	form.prev().remove();
	form.prev().remove();
	form.prev().remove();
	form.prev().remove();
	
	form.show();
};
GmailTable.prototype.send = function() {
	var doc = this.getDocument();
	var send = $("div[role='button']", doc).filter(function(i){return $(this).text() == "Send";});
	send.click();
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
		var className = this.classNames['checkbox'];
		var al = $(a).find('.' + className).length;
		var bl = $(b).find('.' + className).length;
		if (al != bl)
			isSame = false;
	}
	
	return isSame;
};






















