"use strict";
var StageManager = (function () {

    // Instance stores a reference to the Singleton
    var instance;

    function init() {

        // Singleton Init

        var width = 480;
		var height = 800;
        
        PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST; 

        var app = new PIXI.Application(width, height, {backgroundColor : 0x1099bb, resolution: window.devicePixelRatio});
        app.view.style.width = width + 'px';
        app.view.style.height = height + 'px';
        

        //Add style in document head
        var newStyle = document.createElement("style");
        var style = "* {padding: 0; margin: 0}";
        newStyle.appendChild(document.createTextNode(style));
        document.head.appendChild(newStyle);

        //Add the canvas to the HTML document
        document.body.appendChild(app.view);

        var container = new PIXI.Container();
      
		app.stage.addChild(container);

        scaleToWindow(app.view);

        window.addEventListener("resize", function (event) { 
            scaleToWindow(app.view);
        });
        
        function resize()
        {
            width = window.innerWidth;
            height = window.innerHeight;
            app.view.resize(width, height);
        }

        function getContainer()
        {
            return container;
        }
        
        function getDimension()
        {
            this.width = width;
            this.height = height;
            this.calculateRatioByWidth = function(value, multiplier){
                return (multiplier * width) / value;
            };
            this.calculateRatioByHeight = function(value, multiplier){
                return (multiplier * height) / value;
            };
            this.calculateRatioBoth = function(_match, _width, _height, _multiplierWidth, _multiplierHeight){
                var ratioByWidth = (_multiplierWidth * width) / _width;
                var ratioByHeight = (_multiplierHeight * height) / _height;
                if(_match == 'width')
                {
                    return width > height ? ratioByWidth : ratioByHeight;
                }
                else
                {
                    return width < height ? ratioByWidth : ratioByHeight;
                }
            };
            return this;
        }
        
        return {
            getDimension: getDimension,
            getContainer: getContainer,
            resize: resize
        };

    };

    return {

        // Get the Singleton instance if one exists
        // or create one if it doesn't
        getInstance: function () {

            if ( !instance ) {
                instance = init();
            }

            return instance;
        }

    };

})();

