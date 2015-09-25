Function.prototype.inherits = function(sup) {
	var inhert = Object.create(sup);
	this.prototype = sup.prototype;
	this.prototype.constructor = this;
}