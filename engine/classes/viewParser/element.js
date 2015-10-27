LightMod.classes.application.prototype.classes.viewParser.element = function (element, module) {
	var name = this.parseModel(element.dataset.element, null);
	module[name] = element;
}

LightMod.classes.application.prototype.classes.viewParser.element.inherits(LightMod.classes.application.prototype.classes.viewParser.abstractElement);