# ionic-color-picker

Flexible color pickers for Ionic Framework based on [$ionicModal](http://ionicframework.com/docs/api/service/$ionicModal/) and [tinycolor](https://github.com/bgrins/TinyColor).

Demo [here](http://codepen.io/bianchimro/pen/EVYgym?editors=101)


## Usage

Get the files from github or install from bower:
```
bower install ionic-color-picker
```


Include `ionic-color-picker.css`  and `ionic-color-picker-tinycolor.js` or their minified version in your index.html:

```html

<link rel="stylesheet" href="lib/ionic-color-picker/ionic-color-picker.css">
<script src="lib/ionic-color-picker/ionic-color-picker-tinycolor.js"></script>

```
The js script bundles [tinycolor](https://github.com/bgrins/TinyColor).
If you want you can add tinycolor separately, in this case use this js file for the picker:


```html
<script src="lib/ionic-color-picker/ionic-color-picker.js"></script>
```


Add the module `ionic-color-picker` to your application dependencies:

```javascript

angular.module('starter', ['ionic', 'ionic-color-picker'])


```


And you're ready to go.



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

#### Options

option|meaning|accepted values|default
---|---|---|---
`color-mode`|Controls type of picker shown|'rgb', 'hsl', 'hsv', 'name')|'rgb'
`model-mode`|Controls the representation used for setting and getting color for the bound model|'hex', 'rgb', 'hsl', 'hsv', 'name' ('name' can be used only if also `color-mode` is set to 'name'|'hex'
`named-colors`|Custom named colors to be used if `color-mode` is set to 'name'.|Custom colors must be passed as an object with keys as color names and values as colors hex values. Example: customColors = { "redcanaglia" : "#ff0000", "canaryblue" : "#33ffff" }|Not set. css named colors will be used as default
`modal-class`|The class for the modal (set on `<ion-modal-view>`|string|''
`modal-title`|The title shown on the modal header|string|'Pick a color'
`header-footer-class`|The class for header and footer of the modal|string|'bar-stable'
`ok-button`|Text of the button for setting color in the modal dialog|string|'OK'
`cancel-button`|Text of the button for closing the picker without changing the color|string|'Cancel'
`reset-button`|Text of the button for unsetting color in the modal dialog|string|'Reset'
`hide-reset`|Hides the button for unsetting color in the modal dialog|string. Set to 'true' for hiding the button|false
`short-list-break`|The maximum number of colors in list to be rendered with `ng-repeat`. If the list has a number of colors greater than this attribute it will be rendered with ionic `collection-repeat` directive instead. (see also `load-list-message` option)|integer|10
`load-list-message`|Message to be shown when loading a long list of color in the modal|string|'Loading'



### color-box
This directive binds an element background, color and border-color to a given color, with the following logic:

* background color is set as the given color
* text color and border are calculated automatically for using the "most readable" color between a given set. The default set is ["#ffffff", "#000000"] (black and white)  and  other colors may be specified via `available-stroke-colors` attribute. 


#### options


option|meaning|accepted values|default
---|---|---|---
`color-box`|The main color to use for the element background| a string or an object according to `model-mode` property|
`model-mode`|Tells about the representation used for the given color color for the bound model|'hex', 'rgb', 'hsl', 'hsv', 'name' ('name' can be used only if also `color-mode` is set to 'name'|'hex'
`named-colors`|Custom named colors to be used if `color-mode` is set to 'name'.|Custom colors must be passed as an object with keys as color names and values as colors hex values. Example: customColors = { "redcanaglia" : "#ff0000", "canaryblue" : "#33ffff" }|Not set. css named colors will be used as default
`color-box-no-border`|Tells to not change the `border-color` css property for the element| string. Set to true for no border| false
`color-box-no-text`|Tells to not change the css `color` property for the element| string. Set to true for no color change| false



### Examples

Here's an example of a color picker button with rgb `color-mode` (default) and hex `model-mode` (default).

```html
<button class="button" color-picker ng-model="testColors.first" modal-title="Choose a color" color-box="{{testColors.first}}">
    {{ testColors.first || 'Choose a color' }} 
</button>    
```

More examples to come.

See this [codepen](http://codepen.io/bianchimro/pen/EVYgym?editors=101) for now.


## Support this project

This software package is available for free with a MIT license, but
if you find it useful and want support its development consider buying a copy on the [Ionic Marketplace](http://market.ionic.io/plugins/ionic-color-picker) for just a few bucks.
