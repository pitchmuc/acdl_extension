'use strict';

/**
 * Returns the current size of the data layer.
 * @returns {Number|undefined}
 */
module.exports = function () {
    var dl = getDataLayer();

    if (typeof dl !== 'undefined') {
        return dl.length;
    }
};

var getDataLayer = require('../util/getDataLayer');