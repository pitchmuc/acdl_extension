'use strict';

/**
 * Returns the Adobe Client Data Layer, based on the extension configuration.
 * @returns {Object|undefined}
 */
module.exports = function () {
    var extensionSettings = turbine.getExtensionSettings();
    return window[extensionSettings.dataLayerName];
};