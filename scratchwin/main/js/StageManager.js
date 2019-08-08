"use strict";
var StageManager = (function () {

    // Instance stores a reference to the Singleton
    var instance;

    function init() {

        // Singleton Init

        var width = 1280;
		var height = 380;

        PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.LINEAR;

        var myView = document.getElementById(canvasId);

        var app = new PIXI.Application(width, height, {view: myView, transparent: true, resolution: window.devicePixelRatio});
        app.view.style.width = '100%';
        app.view.style.height = '100%';

        //Add style in document head
        var newStyle = document.createElement("style");
        var style = "* {padding: 0; margin: 0}";
        newStyle.appendChild(document.createTextNode(style));
        document.head.appendChild(newStyle);

        var container = new PIXI.Container();

		app.stage.addChild(container);

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
