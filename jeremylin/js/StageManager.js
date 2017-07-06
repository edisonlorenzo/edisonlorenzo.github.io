"use strict";
var StageManager = (function () {

    // Instance stores a reference to the Singleton
    var instance;

    function init() {

        // Singleton Init

        var width = window.innerWidth;
        var height = window.innerHeight;

        var app = new PIXI.Application(width, height, {backgroundColor : 0xf59ad5, resolution: window.devicePixelRatio});
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

        var callBackArray = new Array();
        addCallBack(resize);

        window.addEventListener("resize", function (event) {
            for(var i = 0; i < callBackArray.length; i++)
            {
                console.log(callBackArray[i]);
                callBackArray[i]();
            }
        });

        function addCallBack(value)
        {
            value();
            callBackArray.push(value);
        }

        function resize()
        {
            width = window.innerWidth;
            height = window.innerHeight;
            app.renderer.resize(width, height);
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
            addCallBack: addCallBack,
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
