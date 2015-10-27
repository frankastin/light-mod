LightMod = (function() {
/*  
    LightMod - Light weight and modular JavaScript Framework
    Copyright (C) 2015  Frank Astin http://frankastin.com

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

LightMod = {};
LightMod.classes = {};

Function.prototype.inherits = function(sup) {
	var inhert = Object.create(sup);
	this.prototype = sup.prototype;
	this.prototype.constructor = this;
}
LightMod.classes.application = function() {
	
}

LightMod.classes.application.prototype.modules = {};

LightMod.classes.application.prototype.classes = {};
LightMod.classes.application.prototype.classes.viewParser = {};

LightMod.classes.application.prototype.addModule = function(modulename, object) {
	this.modules[modulename] = new LightMod.classes.application.prototype.classes.module(modulename, object);
}

LightMod.application = LightMod.classes.application;
LightMod.classes.application.prototype.classes.module = function(name, extend, parent) {
	this.name = name;
	this.parent = parent;
	
	for(prop in extend) {
		this[prop] = extend[prop];
	}
	
	this.HTMLelement = document.querySelector('[data-module="'+name+'"]');
	if(this.init){
		this.init();
	}
	
	this.viewObject = new LightMod.classes.application.prototype.classes.viewParser.module(this.HTMLelement,this,parent);
	
	this.children = {};
}

LightMod.classes.application.prototype.classes.module.prototype.update = function(cascade) {
	if(this.viewObject) {
	  this.viewObject.update(cascade);
	}
}

LightMod.classes.application.prototype.classes.module.prototype.addModule = function(modulename,object) {
	this.children[modulename] = Object.create(this);
	this.children[modulename].constructor(modulename,object,this);
}

LightMod.classes.application.prototype.classes.module.prototype.hide = function() {
	this.HTMLelement.style.display = 'none';
}

LightMod.classes.application.prototype.classes.module.prototype.show = function() {
	this.HTMLelement.style.display = 'block';
}
LightMod.classes.application.prototype.classes.viewParser.abstractElement = function() {};

LightMod.classes.application.prototype.classes.viewParser.abstractElement.prototype = {

    parseModel: function(modelString, model) {
        modelString = modelString.split('.');
        if (model === null) {
            console.log('here')
            var returnModel = modelString[1];

        } else {

            if (modelString[0] === 'this') {
                var returnModel = model;
                modelString.shift();
            } else if (modelString[0] === 'parent') {
                var returnModel = this.module.parent;
                modelString.shift();
            } else {
                var returnModel = LightMod;
            }

            modelString.forEach(function(part) {
                returnModel = returnModel[part];
            })
        }


        return returnModel;
    },

    setModelValue: function(modelString, parent, value) {
        modelString = modelString.split('.');

        if (modelString[0] === 'this') {
            var model = parent;
            modelString.shift();
        } else {
            var model = LightMod;
        }

        modelString.forEach(function(part) {
            model[part] = value;
        })

        return true;
    }
}
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
LightMod.classes.application.prototype.classes.viewParser.button = function (element, model, module) {
	this.action = this.parseModel(element.dataset.button, module.model) || this.parseModel(element.dataset.button, module.module.model);
	element.onclick = this.action.bind(module.model, model);
}

LightMod.classes.application.prototype.classes.viewParser.button.inherits(LightMod.classes.application.prototype.classes.viewParser.abstractElement);
LightMod.classes.application.prototype.classes.viewParser.repeater = function (element, parent, module) {

	this.parentModel = parent;

	this.node = element;

    var reference = this;

	this.referenceNode = document.createComment(' reference ')

	this.liveNodes = [];
	this.module = module;

	this.node.parentNode.insertBefore(this.referenceNode, this.node);
	this.parseRepeater();
	this.node.parentNode.removeChild(this.node);
}

LightMod.classes.application.prototype.classes.viewParser.repeater.inherits(LightMod.classes.application.prototype.classes.viewParser.module);

LightMod.classes.application.prototype.classes.viewParser.repeater.prototype.parseRepeater = function () {
	this.model = this.parseModel(this.node.dataset.repeater, this.parentModel);
	this.instances = [];
    this.populateInstances(); if (this.model) {
		this.updateDom(); this.instances = [];
		this.populateInstances();
		this.updateDom();
	}

}

LightMod.classes.application.prototype.classes.viewParser.repeater.prototype.populateInstances = function () {
	var reference = this;
	if (typeof this.model === 'number') {
		for (var x = 0; x < this.model; x++) {
			var instanceObj = new LightMod.classes.application.prototype.classes.viewParser.repeater.instance(x, reference.node.cloneNode(true));
			reference.instances.push(instanceObj);
		}

	} else {
		if (this.model) {
			this.model.forEach(function (instance) {
				var instanceObj = new LightMod.classes.application.prototype.classes.viewParser.repeater.instance(instance, reference.node.cloneNode(true));
				reference.instances.push(instanceObj);
			});
		}
	}


	this.instances.forEach(function (instance, index) {
		var instance = instance;
		var model = (typeof reference.model === "object") ? reference.model[index] : reference.module.model;
		reference.parseElement(instance.node, model, instance);
	})

}

LightMod.classes.application.prototype.classes.viewParser.repeater.prototype.updateDom = function () {
	var reference = this;
	if (this.liveNodes.length > 0) {
		this.liveNodes.forEach(function (element) {
			element.parentNode.removeChild(element);
		})
	}
	this.liveNodes = [];
	this.instances.forEach(function (instance) {
		reference.liveNodes.push(instance.node);
		reference.referenceNode.parentNode.insertBefore(instance.node, reference.referenceNode);
	})
}

LightMod.classes.application.prototype.classes.viewParser.repeater.instance = function (model, node) {
	this.model = model;
	this.node = node;
	this.children = [];
};
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
LightMod.classes.application.prototype.classes.viewParser.element = function (element, module) {
	var name = this.parseModel(element.dataset.element, null);
	module[name] = element;
}

LightMod.classes.application.prototype.classes.viewParser.element.inherits(LightMod.classes.application.prototype.classes.viewParser.abstractElement);
return LightMod;
}());