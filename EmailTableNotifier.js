
/*
 * Constructor
 */
function EmailTableNotifier(observer) {
	
	this.observers = [];
	this.hasNotified = false;
	this.lastTable;
	this.lastItem;
	this.mailBox = new GmailTable();
	
	this.observers.push(observer);
	this.init();
}

/*
 * Initialization
 */
EmailTableNotifier.prototype.init = function() {
	this.initEvents();
	this.notifyWhenFirstTableReady();
};
/*
 * TODO: 
 *  - implement mailBox.getDocument()
 *  - implement mailBox.getMenu()
 */
EmailTableNotifier.prototype.initEvents = function() {
	var self = this, mailBox = this.mailBox;
	
	var doc = mailBox.getDocument();
	
	// table ready
	$(doc).bind('tableReady', function(){
		self.notify();
	});
	
	// table ready after menu is clicked
	var menu = mailBox.getMenu();
	
	$(menu).click(function(e) {
		self.notifyWhenTableReady();
	});
	
	var table = mailBox.getTable();
	
	this.startWatchingTableChange();
};


/*
 * Registration
 */
EmailTableNotifier.prototype.register = function(observer) {

	if ($.inArray(observer, this.observers) == -1) {
		this.observers.push(observer);
	}
};


/*
 * Notifications
 */
EmailTableNotifier.prototype.notify = function() {
	var table = this.mailBox.getTable();
	
	this.hasNotified = true;
	this.lastTable = table;
	this.lastItem = $(table).find("input:checkbox, .T-Jo-auh").eq(0)[0];

	//alert("Table is ready");
	//window.location.hash = "Table is ready";
	
	for (var i=0; i<this.observers.length; i++) {
		this.observers[i].update(this.mailBox);
	}
};
EmailTableNotifier.prototype.notifyWhenTableReady = function() {
	var self = this, mailBox = this.mailBox;
	
	var origTable = mailBox.getTable();
	var doc = mailBox.getDocument();
	
	var count = 0;
	var handle;
	handle = setInterval(function() {
		
		var curTable = mailBox.getTable();
		//if (curTable != origTable) {
		if (mailBox.compareTable(curTable, origTable) == false) {
			
			clearInterval(handle);
			self.notify();				
		}
		if (++count == 30) {
			clearInterval(handle);
			self.notify();
		}
		
	}, 100);
	
};
EmailTableNotifier.prototype.notifyWhenFirstTableReady = function() {
	var self = this, mailBox = this.mailBox;
	
	var count = 0;
	var doc = mailBox.getDocument();
	
	var handle;
	handle = setInterval(function() {
		
		var table = mailBox.getTable();
		
		if (table) {
			clearInterval(handle);
			if (!self.hasNotified) {
				self.notify();
			}
		}
		
		if (++count ==100) {
			clearInterval(handle);
		}
				
	}, 100);
};

/*
 * Event callbacks
 */
EmailTableNotifier.prototype.onTableModified = function() {
	var self = this, mailBox = this.mailBox;
	
	
	var doc = mailBox.getDocument();
	
	this.stopWatchingTableChange();
	
	var table = mailBox.getTable();
	var lastTable = self.lastTable;
	var item = $(table).find("input:checkbox, .T-Jo-auh").eq(0)[0];
	var lastItem = self.lastItem;
	
	// if the table in the page is different from the last one, or
	// if the first item in the table is different from the one 
	// captured last time
	if (table && (table != lastTable || item != lastItem)) {
		
		if (!Util.isVisible(lastTable) || item != lastItem) {
			this.hasNotified = false;
		}
		
		if (table && !this.hasNotified) {
			this.notify();
		}
	}
	
	
	setTimeout(function() {
		self.startWatchingTableChange();
	}, 300);
	
	
};
EmailTableNotifier.prototype.startWatchingTableChange = function() {
	var doc = this.mailBox.getDocument();
	$(doc).bind('DOMSubtreeModified', $.proxy(this.onTableModified, this));
};
EmailTableNotifier.prototype.stopWatchingTableChange = function() {
	var doc = this.mailBox.getDocument();
	$(doc).unbind('DOMSubtreeModified');
};















