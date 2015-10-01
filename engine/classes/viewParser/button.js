LightMod.classes.application.prototype.classes.viewParser.button = function (element, model, module) {
	
	this.element = element;
	this.action = this.parseModel(this.element.dataset.button, module);
	
	this.model = model;
	this.module = module;
	
	this.element.onclick = this.action.bind(this);
}

LightMod.classes.application.prototype.classes.viewParser.button.inherits(LightMod.classes.application.prototype.classes.viewParser.abstractElement);