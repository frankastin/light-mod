LightMod.classes.application.prototype.classes.viewParser.input = function (element, parent) {
	this.element = element;
	this.parent = parent;
	this.parseInput();
}

LightMod.classes.application.prototype.classes.viewParser.input.inherits(LightMod.classes.application.prototype.classes.viewParser.abstractElement);

LightMod.classes.application.prototype.classes.viewParser.input.prototype.parseInput = function() {
	this.model = this.parseModel(this.element.dataset.input, this.parent);
    
	this.element.value = this.model;
	
	var reference = this;
	
	this.element.oninput = function(e) {			
		reference.setModelValue(reference.element.dataset.input, reference.parent,e.target.value)			
	}
}