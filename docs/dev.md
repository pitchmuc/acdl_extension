# Development Consideration

This page gather all of our thoughts and considerations that have been thought during the first releae of the extension.
This list is non-exhaustive but should help guide the developer that would like to participate in this project.

## AEM and Non-AEM websites

The Launch Extension has been developed to work with AEM and non-AEM website.

### AEM Websites

AEM websites may load the Adobe Client Data Layer (ACDL) extension before loading Launch (best practice). In that case, Launch should be able to prevent loading the library a second time.

If AEM is not setting the ACDL, then Launch is taking care of initializing the adobeDataLayer object and loading the script to wrap it with ACDL.

### Non-AEM Websites

Non-AEM website would need to integrate the ACDL script library.
The Launch extension is identifying if the adobeDataLayer variable is present or not and instantiate it accordingly.\
The same way than for AEM website, the Launch extension is detecting if the adobeDataLayer exist and load the script accordingly.

We would always recommend to ask your IT department for implementation of the script and instantiation of the adobeDataLayer variable but the extension should take care of it if required.

## Renaming the Data Layer

At the moment there is no pure renaming for the Data Layer. The current implementation copy the adobeDataLayer object and methods into your own variable name defined in the extension configuration.
Therefore, the adobeDataLayer object will still exist on the page.

## State of Data Layer

The ACDL library is keeping a safe copy of the last state of the data layer. Therefore deleting the element in the object itself will not impact the getState computed value returned.

# Testing scenarios

When working on the Launch Extension, you will be required to run some tests before requesting a pull request.\
Some considerations are required when realizing your tests.

When developping new features, we recommend you to test the following scenarios:

* Load the extension on a page with the ACDL already implemented
  * Expected behavior : The Launch Extension shouldn't load the ACDL core library then.
* Load the extension on a page without the ACDL already implemented
  * Expected behavior : The Launch Extension should load the ACDL core library then.
* Create the following rules within your Launch environment:
  * Listen to all events
  * Listen to all data
  * Listen to a specific event\
  We recommend that you return console logs on all of these rules to see if they fire correctly.
* Create some data elements:
  * Computed State
  * Specific Computed State (for a specific path)
  * Data Layer Size\
  We recommend that you implement them in the rules as well.
* Push action : Testing a push action to the data layer is also important.
* Renaming the data layer : you can also re-test the previous recommended scenarios when renaming the data layer. This is not a recommended scenario but it is available and is expected to work.