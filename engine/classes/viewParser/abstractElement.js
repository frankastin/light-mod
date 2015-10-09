LightMod.classes.application.prototype.classes.viewParser.abstractElement = function () { };

LightMod.classes.application.prototype.classes.viewParser.abstractElement.prototype = {

    parseModel: function (modelString, model) {
        modelString = modelString.split('.');

        if (modelString[0] === 'this') {
            var returnModel = model;
            modelString.shift();
        } else if (modelString[0] === 'parent') {
			var returnModel = this.module.parent;
			modelString.shift();
        } else {
            var returnModel = LightMod;
        }
		
        modelString.forEach(function (part) {
            returnModel = returnModel[part];
		})
		
		if(!returnModel && this.module) {
			var returnModel = model.parent;
			modelString.forEach(function (part) {
            returnModel = returnModel[part];
		    })
		}

        return returnModel;
    },

    setModelValue: function (modelString, parent, value) {
        modelString = modelString.split('.');

        if (modelString[0] === 'this') {
            var model = parent;
            modelString.shift();
        } else {
            var model = LightMod;
        }

        modelString.forEach(function (part) {
            model[part] = value;
        })

        return true;
    }
}