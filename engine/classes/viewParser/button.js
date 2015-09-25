LightMod.classes.application.prototype.classes.viewParser.button = function (element, parent) {
	this.element = element;
	
	this.action = this.parseModel(this.element.dataset.button, parent);
	
	this.element.value = this.model;
	
	var reference = this;
	
	this.element.onclick = function(e) {
		reference.action();
	}
}

LightMod.classes.application.prototype.classes.viewParser.button.inherits(LightMod.classes.application.prototype.classes.viewParser.abstractElement);