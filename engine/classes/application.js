LightMod.classes.application = function() {
	
}

LightMod.classes.application.prototype.modules = {};

LightMod.classes.application.prototype.classes = {};
LightMod.classes.application.prototype.classes.viewParser = {};

LightMod.classes.application.prototype.addModule = function(modulename, object) {
	this.modules[modulename] = new LightMod.classes.application.prototype.classes.module(modulename, object);
}

LightMod.application = LightMod.classes.application;