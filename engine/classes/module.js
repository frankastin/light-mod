LightMod.classes.application.prototype.classes.module = function(name, extend, parent) {
	this.name = name;
	
	for(prop in extend) {
		this[prop] = extend[prop];
	}
	
	this.HTMLelement = document.querySelector('[data-module="'+name+'"]');
	
	if(this.init){
		this.init();
	}
	
	this.viewObject = new LightMod.classes.application.prototype.classes.viewParser.module(this.HTMLelement,this);
	
	this.children = {};
	
	this.parent = parent;
}

LightMod.classes.application.prototype.classes.module.prototype.update = function() {
	if(this.viewObject) {
	   this.viewObject.update();
	}
}

LightMod.classes.application.prototype.classes.module.prototype.addChild = function(modulename,object) {
	this.children[modulename] = new LightMod.classes.application.prototype.classes.module(modulename,object);
}

LightMod.classes.application.prototype.classes.module.prototype.hide = function() {
	this.HTMLelement.style.display = 'none';
}

LightMod.classes.application.prototype.classes.module.prototype.show = function() {
	this.HTMLelement.style.display = 'none';
}