LightMod.classes.application.prototype.classes.viewParser.text = function (element, parent) {
	this.element = element;
	this.parent = parent;

	this.unparsedString = this.element.innerHTML;

	this.baseModel = this.parseModel(this.element.dataset.text);

	this.matches = this.unparsedString.match(/\{([^}]+)\}/g);
	this.parseText();
}

LightMod.classes.application.prototype.classes.viewParser.text.inherits(LightMod.classes.application.prototype.classes.viewParser.abstractElement);

LightMod.classes.application.prototype.classes.viewParser.text.prototype.parseText = function () {

    var reference = this;
	var parsedString = this.unparsedString;

	if (this.matches) {
		this.matches.forEach(function (match) {
			var model = match.replace('{', '').replace('}', '');
			if (this.baseModel) {
				model = this.baseModel += model;
			}
			parsedString = parsedString.replace(match, reference.parseModel(model, reference.parent));
		})
	}

	reference.element.innerHTML = parsedString;
}