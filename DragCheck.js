
/*
 * Constructor
 */
function DragCheck() {
	
	this.isMouseDown;
	this.isChecking;
	this.dragStarted;
	
	this.firstCheckbox;
	this.checkboxes;
	
	this.startPos;
	this.prevPos;
	
	this.tops = [];
	this.bottoms = [];
	this.visited = [];
	this.origs = [];
	
	this.mailBox;
}

DragCheck.prototype.update = function(mailBox) {
	this.mailBox = mailBox;
	this.clean();
	this.init();
};

/*
 * Clean up
 */
DragCheck.prototype.clean = function() {
	
	this.removeEventHandlers();
	
	this.tops = [];
	this.bottoms = [];
	this.visited = [];
	this.origs = []
	
	this.isMouseDown = false;
	this.isChecking = false;
	this.dragStarted = false;
	
	this.checkboxes = [];
};
DragCheck.prototype.removeEventHandlers = function() {
	var input = this.mailBox.getCheckboxes();
	
	var $input = $(input);
	$input.unbind('mousedown', this.stopEventPropagation);
	$input.unbind('mousedown', this.onCheckPressed);
	
	var doc = this.mailBox.getDocument();
	$(doc).unbind('mousemove', this.onDocMouseMove);
	$(doc).unbind('mouseup', this.onDocMouseUp);
	
};

/*
 * Initialization
 */
DragCheck.prototype.init = function() {
	var self = this, mailBox = this.mailBox;
	
	var checkboxes = mailBox.getCheckboxes();
	this.checkboxes = checkboxes;
	
	for (var i=0; i<checkboxes.length; i++) {
		var item = $(checkboxes[i]).closest("tr")[0];
		var top = Util.findPos(item).top + document.body.scrollTop;
		this.tops.push(top);
		this.bottoms.push(top + $(item).height());
		this.visited.push(false);
	}
		
	this.initEvents();
};
DragCheck.prototype.initEvents = function() {
	var self = this, checkboxes = this.checkboxes, mailBox = this.mailBox;
	
	var $input = $(checkboxes);
	$input.bind("mousedown", this.stopEventPropagation);
	$input.bind("mousedown", {self: self}, this.onCheckPressed);
	
	var doc = mailBox.getDocument();
	$(doc).bind('mousemove', {self: self}, this.onDocMouseMove);
	$(doc).bind('mouseup', {self: self}, this.onDocMouseUp);
};


/*
 * Callbacks
 */
DragCheck.prototype.stopEventPropagation = function (e) {
	e.stopPropagation();
};
DragCheck.prototype.onCheckPressed = function(e) {
	var self = e.data.self, checkboxes = self.checkboxes;
	
	self.isMouseDown = true;
	self.startPos = e.pageY;
	
	if ($(this).attr("checked"))
		self.isChecking = false;
	else
		self.isChecking = true;
		
	self.firstCheckbox = this;
	
	for (var i=0; i<checkboxes.length; i++) {
		self.origs[i] = $(checkboxes[i]).attr("checked");
	}
};
DragCheck.prototype.onDocMouseMove = function(e) {
	var self = e.data.self;
	var curPos, startPos = self.startPos;
	var isChecking = self.isChecking, dragStarted = self.dragStarted;
	
	if (self.isMouseDown) {
		curPos = e.pageY;
		
		if (Math.abs(curPos - startPos) > 10 && !dragStarted) {
			self.dragStarted = true;
			self.onDragStarted();
		}
		
		if (self.dragStarted)
			self.onDrag(e);
	}
};
DragCheck.prototype.onDragStarted = function() {
	var checkbox = this.firstCheckbox;
	var isChecked = $(checkbox).attr("checked");
	var isChecking = this.isChecking;
	
	if (isChecking && !isChecked)
		Util.fireClick(checkbox);
	else if (!isChecking && isChecked)
		Util.fireClick(checkbox);
};
DragCheck.prototype.onDrag = function(e) {
	var self = this, checkboxes = this.checkboxes;
	var curPos = e.pageY, startPos = self.startPos;
	var isChecking = this.isChecking;
	
	// we have upper & lower limits
	var pos;
	var upper = (curPos > startPos)? curPos : startPos;
	var lower = (curPos > startPos)? startPos : curPos;
	
	var tops = this.tops;
	var bottoms = this.bottoms;
	var visited = this.visited;
	var origs = this.origs;
	
	for (var i=0; i<checkboxes.length; i++) {
		
		if (bottoms[i] > lower && tops[i] < upper) {
			var isChecked = $(checkboxes[i]).attr("checked");
			
			if (isChecking) {
				if (!isChecked)
					Util.fireClick(checkboxes[i]);
			}
			else {
				if (isChecked)
					Util.fireClick(checkboxes[i]);
			}				
			visited[i] = true;
		}
		else {
			if (visited[i]) {
				
				var wasChecked = origs[i];
				var isChecked = $(checkboxes[i]).attr("checked");
				if (wasChecked && isChecked) {
					// do nothing
				}
				else if (wasChecked && !isChecked) {
					Util.fireClick(checkboxes[i]);
				}
				else if (!wasChecked && isChecked) {
					Util.fireClick(checkboxes[i]);
				}
				else if (!wasChecked && !isChecked) {
					// do nothing
				}
			}
		}
	}
	//$(self.firstCheckbox).focus();
};
DragCheck.prototype.onDocMouseUp = function(e) {
	var self = e.data.self, checkboxes = self.checkboxes;
	
	self.isMouseDown = false;
	self.dragStarted = false;
	
	// reset visited array					
	for (var i=0; i<checkboxes.length; i++) {
		self.visited[i] = false;
	}
};






















