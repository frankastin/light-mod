LightMod.classes.application.prototype.classes.viewParser.abstractElement = function () { };

LightMod.classes.application.prototype.classes.viewParser.abstractElement.prototype = {

    parseModel: function (modelString, parent) {
        modelString = modelString.split('.');

        if (modelString[0] === 'this') {
            var model = parent;
            modelString.shift();
        } else if (modelString[0] === 'parent') {
            var model = this.parent;
            modelString.shift();
        } else {
            var model = LightMod;
        }

        modelString.forEach(function (part) {
            model = model[part];
        })

        return model;
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