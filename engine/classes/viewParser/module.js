LightMod.classes.application.prototype.classes.viewParser.module = function(element, model, parent) {
	this.element = element;
	
	this.name = this.element.dataset.module;
	
	this.parent = parent;
	
	this.model = model;
	this.objects = {inputs:[], repeaters:[], buttons:[], text:[], modules:[], elements:[]};

	this.parseElement(this.element);
	
}

LightMod.classes.application.prototype.classes.viewParser.module.inherits(LightMod.classes.application.prototype.classes.viewParser.abstractElement);

LightMod.classes.application.prototype.classes.viewParser.module.prototype.parseElement = function(element, model, instance) {
	
	var reference = this;
	
	var model = model || reference.model;
	
	var instance = instance || null;
	
	var moduleObjects = (reference.objects) ? reference : reference.module;
	moduleObjects = (moduleObjects.objects) ? moduleObjects.objects : moduleObjects.module.objects;
	var module = this.module || this;
	
	Array.prototype.forEach.call(element.children, function(child) {
		
		if(child.hasAttribute('data-module')) {
		    return;
		}
		
	    if(child.hasAttribute('data-input')) {
			moduleObjects.inputs.push(new LightMod.classes.application.prototype.classes.viewParser.input(child, model));
		}
		
		if (child.hasAttribute('data-button')) {
			moduleObjects.buttons.push(new LightMod.classes.application.prototype.classes.viewParser.button(child, model, module));
		}
		
		if (child.hasAttribute('data-repeater') && !instance) {
		   moduleObjects.repeaters.push(new LightMod.classes.application.prototype.classes.viewParser.repeater(child, model, reference));
		   return;
		} else if (child.hasAttribute('data-repeater') && instance)  {
			instance.children.push(new LightMod.classes.application.prototype.classes.viewParser.repeater(child, model, reference.module));
		}

		if (child.hasAttribute('data-text')) {
		    moduleObjects.text.push(new LightMod.classes.application.prototype.classes.viewParser.text(child, model));
		}

		if (child.hasAttribute('data-element')) {
		    moduleObjects.elements.push(new LightMod.classes.application.prototype.classes.viewParser.element(child, module.model));
		}
		
		if(child.children.length > 0) {
			reference.parseElement(child,model,instance);
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