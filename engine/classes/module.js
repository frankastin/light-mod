LightMod.classes.application.prototype.classes.module = function(name, extend) {
	this.name = name;
	
	this.actions = {};
	this.properties = {};
	
	for(prop in extend) {
		this[prop] = extend[prop];
	}
	
	this.HTMLelement = document.querySelector('[data-module="'+name+'"]');
	
	if(this.init){
		this.init();
	}
	
	this.viewObject = new LightMod.classes.application.prototype.classes.viewParser.module(this.HTMLelement,this);
}

LightMod.classes.application.prototype.classes.module.prototype.update = function() {
	if(this.viewObject) {
	   this.viewObject.update();
	}
}