'use strict';
function index(obj, i) { return obj[i] }
/**
 * Returns the current computed state of the data layer.
 * @param settings Object containing the settings
 * @returns {Object|undefined}
 */
module.exports = function (settings, event) {
    if (typeof settings !== 'undefined' && settings !== null) {
        if (typeof (event) !== "undefined") {
            if (typeof (event.afterState) !== "undefined") {
                var new_dl = event.afterState;
                try {
                    if (settings.path !== "") {
                        var value = settings.path.split('.').reduce(index, new_dl)
                        return value
                    }
                    else {
                        return new_dl
                    }

                }
                catch (e) {
                    turbine.logger.warn('Issue returning Data Element for rule : ', $rule.name);
                }
            }
        }
        var dl = getDataLayer();
        if (typeof dl !== 'undefined') {
            if (settings.path !== '') {
                return dl.getState(settings.path);
            } else {
                return dl.getState();
            }
        }
    }
};

var getDataLayer = require('../util/getDataLayer');