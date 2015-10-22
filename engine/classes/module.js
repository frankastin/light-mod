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
	this.HTMLelement.style.display = 'none';
}