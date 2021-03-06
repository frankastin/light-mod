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