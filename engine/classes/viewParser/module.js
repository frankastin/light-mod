LightMod.classes.application.prototype.classes.viewParser.module = function(element, model, parent) {
	this.element = element;
	
	this.name = this.element.dataset.module;
	
	this.parent = parent;
	
	this.model = model;
	this.objects = {inputs:[], repeaters:[], buttons:[], text:[], modules:[]};

	this.parseElement(this.element);
	
}

LightMod.classes.application.prototype.classes.viewParser.module.prototype.parseElement = function(element) {
	var reference = this;
	
	Array.prototype.forEach.call(element.children, function(child) {
		if(child.hasAttribute('data-module')) {
		    return;
		}
		
	    if(child.hasAttribute('data-input')) {
			reference.objects.inputs.push(new LightMod.classes.application.prototype.classes.viewParser.input(child, reference.model));
		}
		
		if (child.hasAttribute('data-button')) {
			reference.objects.buttons.push(new LightMod.classes.application.prototype.classes.viewParser.button(child, reference.model, reference.model));
		}
		
		if (child.hasAttribute('data-repeater')) {
		   reference.objects.repeaters.push(new LightMod.classes.application.prototype.classes.viewParser.repeater(child, reference.model, reference));
		   return;
		} 

		if (child.hasAttribute('data-text')) {
		    reference.objects.text.push(new LightMod.classes.application.prototype.classes.viewParser.text(child, reference.model));
		}
		
		if(child.children.length > 0) {
			reference.parseElement(child);
		}
	})
}

LightMod.classes.application.prototype.classes.viewParser.module.prototype.update = function(cascade) {
	Array.prototype.forEach.call(this.objects.repeaters, function(repeater) {
		repeater.parseRepeater();
	})
	Array.prototype.forEach.call(this.objects.text, function(text) {
		text.parseText();
	})
	Array.prototype.forEach.call(this.objects.inputs, function(input) {
		input.parseInput();
	})
	
	if(cascade) {
		for (var key in this.model.children) {
			if (this.model.children.hasOwnProperty(key)) {
				this.model.children[key].update(true);
			}
		}	
	}
}