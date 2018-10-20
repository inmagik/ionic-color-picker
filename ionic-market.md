# ionic-color-picker

Flexible color pickers for Ionic Framework based on $ionicModal and tinycolor.


## Directives

### color-picker

This directive will transform the element into a color picker: when clicking the element a color picker dialog will be open you must specify an ng-model attribute to bind the chosen color to a model.

* The element you use this directive must be clickable.
* The directive requires ngModel to be set on the element

The picker modal will be rendered according to the `color-mode` attribute set on the element (see options for details of setting this attribute):

* 'rgb', 'hsl', 'hsv' color modes will render the picker as 3 sliders for controlling the color properties
* 'name' color mode will show an ionic list of colors to choose from

The chosen color is set using ngModel and may be represented in different ways. This is controlled by the `model-mode` property:

* 'hex' (default): as an hex string: (#000000)
* 'name' as a named colors (works with color-mode='name' only): 'black'
* 'rgb': { r:0, g:0, b:0 }
* 'hsv': { h:0, s:0, v:0 }
* 'hsl': { h:0, s:l, l:0 }


### color-box

This directive helps binds an element background, color and border-color to a given color, with the following logic:

* background color is set as the given color
* text color and border are calculated automatically for using 'black' or 'white' (or other colors you might specify via `available-stroke-colors` attribute 



## Docs

You can find all options explained here

https://github.com/inmagik/ionic-color-picker


## Demo and test app

You can see the picker in action in the Ionic view with this app id: **7698b7ab**.

There is also a demo available via web on [codepen](http://codepen.io/bianchimro/pen/EVYgym?editors=101)


## Why should I buy? The project is on github!

This component is freely available on github and with a very permissive license (MIT).

However, if you find it useful and want support its development consider buying a copy on the Ionic Marketplace.


## What you get

The zip file on the Ionic marketplace contains the lib (source and minified versions) as well as a sample app demonstrating various way to use it.