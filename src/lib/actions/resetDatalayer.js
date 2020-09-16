'use strict';
/**
 * Resets the data layer to either the computed state or an empty array
 * @param settings Object containing the settings
 */
module.exports = function (settings) {
    if (typeof settings !== 'undefined' && settings !== null) {
        var extensionSettings = turbine.getExtensionSettings();
        var dlName = extensionSettings.dataLayerName;

        /**
         * As we cannot simply overwrite the data layer object, we need to clean it up manually
         */
        var resetDataLayer = function () {
            for (var i = 0; i < window[dlName].length; i++) {
                delete window[dlName][i];
            }
        };

        if (settings.useComputedState === true) {
            var computedState = window[dlName].getState();
            resetDataLayer();
            window[dlName][0] = computedState;
            window[dlName].length = 1;
            turbine.logger.log('Setting window.' + dlName + ' to computedState');

        } else {
            resetDataLayer();
            window[dlName].length = 0;
            turbine.logger.log('Setting window.' + dlName + ' to []');
        }
    }
};
