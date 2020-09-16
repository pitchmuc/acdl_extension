# ACDL Launch Extension

This documentation provide example and best practices on the Extension usage.
If you would like to have more details on development consideration, [please reach this page](./dev.md).

## Installation

In order to install the Adobe Client Data Layer Extension, you will need to navigate to the Extension catalogue in Launch Extension and select the Adobe Client Data Layer.\
![ACDL Extension view in Catalogue](./ACDL_extension.png)

There is also the possibility to fork this project. You can download this github project, realize the change that you deem required for your specific use-case and re-upload it on your Organization as a private extension.
This installation will not be supported on our end.\
**Note** : _Consider renaming the extension name in the extension.json file_

## Extension View

The extension view provides you with the possibility to change the name of the datalayer.
By default the ACDL script will create a new datalayer with the variable name "adobeDataLayer".
Setting a new name will provide you the possibility to use a specific name for it.

The name that you have set will be instantiated when Launch is loaded.

**Be careful**: The adobeDataLayer object is still being insantiated and then being duplicated to the new variable name you have selected.

## Events

The extension will provide you with the possibility to listen to events on the Data Layer. The type of event that you can listen to are:

* Listen to all data changes : If you select this option, your event listener will listen to any change made to the data layer.\
**Important** : pushing events are not changing data layer.\
Your event listener will listen to this kind of action:\
``` adobeDataLayer.push({"data":"something"}) ```\
or this kind of push: \
``` adobeDataLayer.push({"event":"myevent","data":"something"})```\
but not this kind of push\
``` adobeDataLayer.push({"event":"myevent"})```

* Listen to all events : If you select this option, your event listener will listen to any event push to the data layer.\
**Important** : pushing events.\
Your event listener will listen to this kind of action:\
``` adobeDataLayer.push({"event":"myevent"})```\
or this kind of push: \
``` adobeDataLayer.push({"event":"myevent","data":"something"})```\
but not this kind of push\
``` adobeDataLayer.push({"data":"something"}) ```

* Listen to specific event : In the case that you specify an event, then the event listen will listen to any event that match this string.\
Example : setting "myevent" in this configuration will listen to this kind of push : \
```adobeDataLayer.push({"event":"myEvent"})```

There is also possibility to change the scope of your event listener.\
The different options are:

* all: This is the default option and will trigger the rule every time the condition you have selected above has been met in the past or will be push in the future.\
This is the safest option if you are using an asynchrous implementation.

* future: This option will trigger the rule only when new push matching your condition will be send to the Data Layer.

* past: This option will trigger the rule only for old push matching your condition. New push matching your condition will be ignore and will not trigger the rule anymore.

## Actions

### Reset Data Layer

The extension provides you with a way to reset the datalayer length.
This will help you keeping a limited size for Single Page Application.\
However there is, currently, no possibility to completely remove information set previously during the push methods.

* Reset & Set Computed State : This will copy the last computed state, empty the data layer object and re-push the last state.

### Push to Data Layer

The extension provides you with an action to push JSON content to the Data Layer itself.\
You will need to pass valid JSON data.\
This action make it possible to use Data Elements directly in the JSON.

## Data Elements

The launch extension provides you with 2 Data Element type.

### Computed State

The Data Layer Computed State data element can return you 2 things, depending on the way you configure it:

* The complete Data Layer State : If you let the configuration empty, the complete Data Layer computed state will be returned.
* A specific Path : You can specify the Path that you want to return in your Data Layer. Path is taking dot notation. \
Example of path: `data.foo`

### Data Layer Size

This data element will return you the size of the Data Layer, the number of element that have been pushed to this object is returned.
Example :

```JS
adobeDataLayer.push({"event":"myEvent"})
adobeDataLayer.push({"data":{"foo":"bar"}})
```

This will return size : 2
