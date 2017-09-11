"use strict";
var StageManager = (function () {

    // Instance stores a reference to the Singleton
    var instance;

    function init() {

        // Singleton Init

        var canvasWidth;
        var canvasHeight;
        var width;
		var height;
        var callBackArray = new Array();

        setSize();
        //var app = new PIXI.Application(canvasWidth, canvasHeight, {backgroundColor : 0x4fa7ff, resolution: window.devicePixelRatio});
        var app = new PIXI.Application(canvasWidth, canvasHeight, {backgroundColor : 0x000000, resolution: window.devicePixelRatio});
        app.view.style.display = "block";
        app.view.style.width = "100%";
        app.view.style.height = "100%";

        //Add style in document head
        var newStyle = document.createElement("style");
        var style = "* {padding: 0; margin: 0}";
        newStyle.appendChild(document.createTextNode(style));
        document.head.appendChild(newStyle);

        //Add the canvas to the HTML document
        document.body.appendChild(app.view);

        var container = new PIXI.Container();

		app.stage.addChild(container);

        callBackArray.push(resize);

        window.addEventListener("resize", function (event) {
            for (var i = 0; i < callBackArray.length; i++) {
                callBackArray[i]();
            }
        });

        function resize()
        {
            setSize();
            app.renderer.resize(canvasWidth, canvasHeight);
        }

        function setSize()
        {
            canvasWidth = window.innerWidth;
            canvasHeight = window.innerHeight;

            width = canvasWidth;
    		height = canvasHeight;
        }

        function addCallBack(value)
        {
            value();
            callBackArray.push(value);
        }

        function getContainer()
        {
            return container;
        }

        function getDimension()
        {
            this.canvasWidth = canvasWidth;
            this.canvasHeight = canvasHeight;
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
            addCallBack: addCallBack
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
