"use strict";
var StageManager = (function () {

    // Instance stores a reference to the Singleton
    var instance;

    function init() {

        // Singleton Init

        const logicalWidth = 768;
        const logicalHeight = 1350;

        var callBackArray = new Array();

        var app = new PIXI.Application(logicalWidth, logicalHeight, {backgroundColor : 0x000000});

        app.view.style.position = 'absolute';
        app.view.style.top = 0;
        app.view.style.left = 0;
        app.view.style.right = 0;
        app.view.style.bottom = 0;
        app.view.style.margin = 'auto';

        //Add the canvas to the HTML document
        document.body.appendChild(app.view);

        //Add style in document head
        var newStyle = document.createElement("style");
        var style = "* {padding: 0; margin: 0}";
        newStyle.appendChild(document.createTextNode(style));
        document.head.appendChild(newStyle);

        var container = new PIXI.Container();

		app.stage.addChild(container);

        const resizeHandler = function () {
            const scaleFactor = Math.min(
                window.innerWidth / logicalWidth,
                window.innerHeight / logicalHeight
            );
            const newWidth = Math.ceil(logicalWidth * scaleFactor);
            const newHeight = Math.ceil(logicalHeight * scaleFactor);
            app.view.style.width = `${newWidth}px`;
            app.view.style.height = `${newHeight}px`;
            app.renderer.resize(newWidth, newHeight);
            container.scale.set(scaleFactor);
        };

        resizeHandler();

        callBackArray.push(resizeHandler);

        const runAllCallbacks = function () {
            for (var i = 0; i < callBackArray.length; i++) {
                callBackArray[i]();
            }
        };

        window.addEventListener("resize", runAllCallbacks);
        window.addEventListener("load", function(event) {
            console.log("All resources finished loading!");
            runAllCallbacks();
        });

        function addCallBack(value)
        {
            value();
            callBackArray.push(value);
        }

        function getContainer()
        {
            return container;
        }

        function getRenderer()
        {
            return app.renderer;
        }

        function getDimension()
        {

            this.width = logicalWidth;
            this.height = logicalHeight;

            this.calculateRatioByWidth = function(value, multiplier){
                return (multiplier * this.width) / value;
            };
            this.calculateRatioByHeight = function(value, multiplier){
                return (multiplier * this.height) / value;
            };
            this.calculateRatioBoth = function(_match, _width, _height, _multiplierWidth, _multiplierHeight){
                var ratioByWidth = (_multiplierWidth * this.width) / _width;
                var ratioByHeight = (_multiplierHeight * this.height) / _height;
                if(_match == 'width')
                {
                    return this.width > this.height ? ratioByWidth : ratioByHeight;
                }
                else
                {
                    return this.width < this.height ? ratioByWidth : ratioByHeight;
                }
            };
            return this;
        }

        return {
            getRenderer: getRenderer,
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
