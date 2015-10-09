LightMod.classes.application.prototype.classes.viewParser.button = function (element, model, module) {

	this.action = this.parseModel(element.dataset.button, module);
	
	this.element.onclick = this.action.bind(this.module, model);
}

LightMod.classes.application.prototype.classes.viewParser.button.inherits(LightMod.classes.application.prototype.classes.viewParser.abstractElement);