'use strict';

/**
 * Pushes a JSON string into the adobe client data layer.
 *
 * @param settings Object containing the settings
 */
module.exports = function (settings) {
    if (typeof settings !== 'undefined' && settings !== null) {
        var content = settings.content;

        var dl = getDataLayer();
        var dlName = turbine.getExtensionSettings().dataLayerName;

        if (typeof dl !== 'undefined') {
            try {
                dl.push(JSON.parse(content));
                turbine.logger.log('Successfully pushed JSON into ' + dlName);
            } catch (e) {
                turbine.logger.error('Could not push content into ' + dlName + ' -- ' + e.message);
            }
        } else {
            turbine.logger.error('Could not find the datalayer: ' + dlName);
        }
    }
};

var getDataLayer = require('../util/getDataLayer');