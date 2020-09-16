'use strict';

/**
 * Registers on either all data pushes, all events or specific events
 * @param settings Object containing the settings
 * @param trigger Fn to be called once triggered
 */
module.exports = function (settings, trigger) {
    if (typeof settings !== 'undefined' && settings !== null) {
        var method = settings.method;
        var eventKey = settings.eventKey;
        var scope = settings.scope;
        var dl = getDataLayer();


        /**
         * Function to be called by the Adobe Client Data Layer
         * @param event The event object pushed to the data layer that triggered the callback.
         * @param beforeState The state before the change caused by the event.
         *                    Available only when the event object has data that modify the state.
         *                    If a path filter option has been provided when registering the event, the
         *                    object will only contain the data at the defined path.
         * @param afterState The state after the change caused by the event.
         *                   Available only when the event object has data that modify the state.
         *                   If a path filter option has been provided when registering the event, the
         *                   object will only contain the data at the defined path.
         */
        var handler = function (event, beforeState, afterState) {
            var result = {
                message: event,
                beforeState: beforeState,
                afterState: afterState
            };
            trigger(result);
        };

        var options = {};
        if (typeof scope !== 'undefined') {
            options.scope = scope;
        }

        // Register to all data pushes
        if (method === 'allData') {
            dl.push(function (dl) {
                dl.addEventListener("adobeDataLayer:change", handler, options);
            });
        }

        // Register to all event pushes
        else if (method === 'allEvents') {
            dl.push(function (dl) {
                dl.addEventListener("adobeDataLayer:event", handler, options);
            });
        }

        // Only listen to specific events
        else if (method === 'specificEvent' && eventKey !== '') {
            dl.push(function (dl) {
                dl.addEventListener(eventKey, handler, options);
            });
        }
    }
};

var getDataLayer = require('../util/getDataLayer');