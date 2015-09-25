LightMod.classes.application.prototype.classes.viewParser.repeater = function (element, parent, module) {
	
	this.parentModel = parent;
	
	this.node = element;
	
    var reference = this;
	
	this.referenceNode =  document.createComment(' reference ')
	
	this.liveNodes = [];
    
	this.module = module;

	this.node.parentNode.insertBefore(this.referenceNode,this.node);
	this.parseRepeater();
	this.node.parentNode.removeChild(this.node);
}

LightMod.classes.application.prototype.classes.viewParser.repeater.inherits(LightMod.classes.application.prototype.classes.viewParser.abstractElement);

LightMod.classes.application.prototype.classes.viewParser.repeater.prototype.parseRepeater = function () {
	this.model = this.parseModel(this.node.dataset.repeater, this.parentModel);
	this.instances = [];
    this.populateInstances();
	this.updateDom();
}

LightMod.classes.application.prototype.classes.viewParser.repeater.prototype.populateInstances = function () {
	var reference = this;
	if(typeof this.model === 'number') {
		for(var x=0; x < this.model; x++) {
			var instanceObj = new LightMod.classes.application.prototype.classes.viewParser.repeater.instance(x, reference.node.cloneNode(true));
		    reference.instances.push(instanceObj);
		}
		
	} else {
		this.model.forEach(function (instance) {
			var instanceObj = new LightMod.classes.application.prototype.classes.viewParser.repeater.instance(instance, reference.node.cloneNode(true));
			reference.instances.push(instanceObj);
		});	
	}
	

	this.instances.forEach(function (instance, index) {
		var instance = instance;
		
		reference.parseNode(instance.node, index);
		
		Array.prototype.forEach.call(instance.node.children, function (child) {
			if (child.hasAttribute('data-repeater')) {
				instance.children.push(new LightMod.classes.application.prototype.classes.viewParser.repeater(child, reference.model[index], reference.module));
			} else {
				reference.parseNode(child, index);
			}
		})
	})

}

LightMod.classes.application.prototype.classes.viewParser.repeater.prototype.updateDom = function () {
	var reference = this;
	
	if(this.liveNodes.length > 0) {
		this.liveNodes.forEach(function(element) {
			element.parentNode.removeChild(element);
		})
	}
	
	this.liveNodes = [];
	
	this.instances.forEach(function (instance) {
		reference.liveNodes.push(instance.node);
		reference.referenceNode.parentNode.insertBefore(instance.node,reference.referenceNode);
	})
}


LightMod.classes.application.prototype.classes.viewParser.repeater.prototype.parseNode = function (node,index) {
	var reference = this;
	
	var model = (typeof this.model === "object") ? this.model[index] : reference.module.model;
	
	if (node.hasAttribute('data-input')) {
		reference.module.objects.inputs.push(new LightMod.classes.application.prototype.classes.viewParser.input(node, reference.module.model));
	}

	if (node.hasAttribute('data-button')) {
		reference.module.objects.buttons.push(new LightMod.classes.application.prototype.classes.viewParser.button(node, reference.module.model));
	}

	if (node.hasAttribute('data-text')) {
		reference.module.objects.text.push(new LightMod.classes.application.prototype.classes.viewParser.text(node, model));
	}
}

LightMod.classes.application.prototype.classes.viewParser.repeater.instance = function (model, node) {
	this.model = model;
	this.node = node;
	this.children = [];
};