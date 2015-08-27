/*!
 * Copyright 2015 Inmagik SRL.
 * http://www.inmagik.com/
 *
 * ionic-color-picjer, v1.0.0
 * Flexible color picker directives for Ionic framework.
 * 
 * By @bianchimro
 *
 * Licensed under the MIT license. Please see LICENSE for more information.
 *
 */

(function(){

angular.module('ionic-color-picker', [])


.directive('parseInteger', [function () {
    return {
        restrict: 'A',
        require : "ngModel",
        priority : 1000,
        link: function (scope, iElement, iAttrs, modelCtrl) {
            
            modelCtrl.$formatters.push(function formatter(modelValue){
                return parseInt(modelValue);
            });
        }
    };
}])


.directive('colorBox', [function () {
    return {
        restrict: 'A',
        scope:true,
        link: function (scope, iElement, iAttrs) {

            var pristines = {
                backgroundColor : iElement.css('background-color'),
                color : iElement.css('color'),
                borderColor : iElement.css('border-color')
            };

            var modelMode = iAttrs.modelMode || 'hex';
            var strokeColors = iAttrs.availableStrokeColors ? iAttrs.availableStrokeColors.split(",") : ["#ffffff", "#000000"];

            var colorNames = iAttrs.namedColors ? scope.$eval(iAttrs.namedColors) :  tinycolor.names;
            var colorNamesInverted = {};
            angular.forEach(colorNames, function(v, k){
                var v2 = v.indexOf("#") == 0 ? v : "#"+v;
                v2 = tinycolor(v2).toHexString();
                colorNamesInverted[v2] = k;
            });
            
            var tColor, txt;
            iAttrs.$observe('colorBox', function(nv){
                if(!nv){
                    iElement.css('background-color', pristines.backgroundColor);    
                    iElement.css('color', pristines.color);
                    iElement.css('border-color', pristines.borderColor);
                    return;
                }

                if(modelMode == 'name'){
                    nv = colorNames[nv];
                    nv = nv.indexOf("#") == 0 ? nv : "#"+nv;
                    tColor = tinycolor(nv);
                } else {
                    if(modelMode == 'hex'){
                        nv = nv.indexOf("#") == 0 ? nv : "#"+nv;
                        tColor = tinycolor(nv);
                    } else {
                        try {
                            nv = scope.$eval(nv);
                            tColor = tinycolor.fromRatio(nv);
                            
                        } catch (err){
                            return;
                        }
                        
                    }
                }
                
                txt = tinycolor.mostReadable(tColor, strokeColors).toHexString();
                if(iAttrs.colorBoxNoBorder !== "true"){
                    iElement.css('border-color', txt);    
                }
                if(iAttrs.colorBoxNoText !== "true"){
                    iElement.css('color', txt);
                }
                iElement.css('background-color', tColor.toHexString());
                
            });
            
        }
    };
}])


.directive('colorPicker', ['$ionicModal','$timeout' ,function ($ionicModal, $timeout) {
    return {
        restrict: 'A',
        require : 'ngModel',
        scope:true,
        link: function (scope, iElement, iAttrs, ngModelController) {
            
            var colorMode =  iAttrs.colorMode || 'rgb';
            var customColors = iAttrs.namedColors !== undefined;
            var colorNames = iAttrs.namedColors ? scope.$eval(iAttrs.namedColors) :  tinycolor.names;
            var colorNamesInverted = {};
            var shortListBreak = iAttrs.shortListBreak ? parseInt(iAttrs.shortListBreak) : 10;

            var modelMode = iAttrs.modelMode || 'hex';
            
            angular.forEach(colorNames, function(v, k){
                var v2 = v.indexOf("#") == 0 ? v : "#"+v;
                v2 = tinycolor(v2).toHexString();
                colorNamesInverted[v2] = k;
            });


            scope.internalColors = {
                rgb : {
                    r : 0,
                    g : 0,
                    b : 0
                },
                hsl : {
                    h : 0,
                    s : 0,
                    l : 0
                },
                hsv : {
                    h : 0,
                    s : 0,
                    v : 0
                },

                hex : "#000000"
                    
            };


            scope.ui = {
                modalTitle : iAttrs.modalTitle || 'Pick a color',
                okButton : iAttrs.okButton || 'OK',
                hideReset : iAttrs.hideReset  !== "true" ? false : true,
                resetButton : iAttrs.okButton || 'Reset',
                cancelButton : iAttrs.cancelButton || 'Cancel',
                loadListMessage : iAttrs.loadListMessage || 'Loading',
                modalClass : iAttrs.modalClass || '',
                headerFooterClass : iAttrs.headerFooterClass || 'bar-stable',
                mode : colorMode,
                selectMode : 'sliders',
                namedColors : colorNames,
                namedColorsAsList : []
            };

            var output = [];
            for (var key in scope.ui.namedColors) {
              var k = scope.ui.namedColors[key];
              k = k.indexOf("#") == 0 ? k : "#"+k;
              scope.ui.namedColorsAsList.push([key, k]);
            };

            var shortList = scope.ui.namedColorsAsList.length < shortListBreak;
            scope.ui.shortColorList = shortList;

            var initial = ngModelController.$viewValue;  

            var getScopeColor = function(c){
                if(colorMode == 'rgb'){
                    return c.toRgb();
                }
                if(colorMode == 'hsl'){
                    return c.toHsl();
                }
                if(colorMode == 'hsv'){
                    return c.toHsv();
                }
            };

            if(initial){
                if(customColors){
                    c = tinycolor(colorNames[initial]);
                } else {
                    c  = tinycolor(initial);
                }
                scope.internalColors[colorMode] = getScopeColor(c);
            } 

            scope.unsetColor = function(){
                $timeout(function(){
                    ngModelController.$setViewValue("");
                    scope.modal.hide();
                    scope.showList = false;
                });
            };

            var setColorTo = function(col, fun){
                ngModelController.$setViewValue(col[fun]());    
            };

            //we expect a color here
            var setColorToName = function(col){
                var theCol = colorNamesInverted[col.toHexString()];
                if(!theCol){
                    console.error("cannot set color", col)
                    return;
                }
                ngModelController.$setViewValue(colorNamesInverted[col.toHexString()]);    
            };

            // sets color to model
            // must be set according to modelMode
            scope.setColor = function(col){
                //for named convert to hex
                if(colorMode == 'name'){
                    col = tinycolor(scope.ui.namedColors[col]);
                } else {
                    col = tinycolor(getCurrentColorModel())
                }

                switch(modelMode){
                    case 'name':
                        setColorToName(col);
                        break;
                    case 'rgb':
                        setColorTo(col, 'toRgb');
                        break;    
                    default:
                        setColorTo(col, 'toHexString');    
                }
                
                scope.modal.hide();
                scope.showList = false;
            };

            scope.closeModal = function(){
                scope.modal.hide();
                scope.showList = false;
                var v = ngModelController.$viewValue;
                if(v){
                    v = tinycolor(v);
                    scope.internalColors[colorMode] = getScopeColor(v);
                }
                
            };

            scope.toggleSelectMode = function(){
                scope.ui.selectMode = scope.ui.selectMode == 'sliders' ? 'form' : 'sliders';
            };
            
            //loading the modal
            var tplName = "modal-template-"+ scope.ui.mode + ".html";
            scope.modal = $ionicModal.fromTemplate(
                colorPickerTemplates[tplName],
                    { scope: scope });

            scope.$on('$destroy', function(){
                scope.modal.remove();  
            });

            iElement.on('click', function(){
                if(shortList){
                    scope.showList = true;    
                    scope.modal.show()
                } else {
                    scope.modal.show().then(function(){
                     scope.showList = true;    
                    });    
                }
            });



            var getCurrentColorModel = function(){
                
                if(colorMode != 'hex'){
                    var out = {}
                    angular.forEach(scope.internalColors[colorMode], function(v,k){
                        out[k] = parseFloat(v);
                    })
                    return out;
                };
                
                return scope.internalColors[colorMode];    

            };

            scope.$watch(
                function(){
                    return getCurrentColorModel();
                }, 
                function(nv){
                    if(!nv){return;}
                    scope.ui.sample = tinycolor(nv).toHexString();
                }, 
                true 
            );

        }
    };
}])


})();