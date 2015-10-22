LightMod.classes.application.prototype.classes.viewParser.button = function (element, model, module) {
	this.action = this.parseModel(element.dataset.button, module.model) || this.parseModel(element.dataset.button, module.module.model);
	element.onclick = this.action.bind(module.model, model);
}

LightMod.classes.application.prototype.classes.viewParser.button.inherits(LightMod.classes.application.prototype.classes.viewParser.abstractElement);