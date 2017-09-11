"use strict";
var StageManager = (function () {

    // Instance stores a reference to the Singleton
    var instance;

    function init() {

        // Singleton Init

        var canvasWidth;
        var canvasHeight;
        var callBackArray = new Array();

        getCanvasSize();

        var app = new PIXI.Application(canvasWidth, canvasHeight, {backgroundColor : 0x000000, resolution: window.devicePixelRatio});
        app.view.style.display = "block";
        app.view.style.width = "100%";
        app.view.style.height = "100%";
        // setSize();

        //Add style in document head
        var newStyle = document.createElement("style");
        var style = "* {padding: 0; margin: 0}";
        newStyle.appendChild(document.createTextNode(style));
        document.head.appendChild(newStyle);

        //Add the canvas to the HTML document
        document.body.appendChild(app.view);

        var container = new PIXI.Container();

		app.stage.addChild(container);

        callBackArray.push(setSize);

        window.addEventListener("resize", function (event) {
            for (var i = 0; i < callBackArray.length; i++) {
                callBackArray[i]();
            }
        });

        window.addEventListener("load", function (event) {
            setSize();
        });

        // function resize()
        // {
        //     //setSize();
        //     //app.view.setAttribute('width', canvasWidth);
        //     //app.view.setAttribute('height', canvasHeight);
        //     //app.renderer.resize(canvasWidth, canvasHeight);
        // }

        function getCanvasSize()
        {
            canvasWidth = window.innerWidth;
            canvasHeight = window.innerHeight;
        }

        function setSize()
        {
            getCanvasSize();

            if(app)
            {
                app.renderer.resize(canvasWidth, canvasHeight);
            }
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

            //console.log(canvasWidth + ' | ' + canvasHeight);

            this.calculateRatioByWidth = function(value, multiplier){
                return (multiplier * canvasWidth) / value;
            };
            this.calculateRatioByHeight = function(value, multiplier){
                return (multiplier * canvasHeight) / value;
            };
            this.calculateRatioBoth = function(_match, _width, _height, _multiplierWidth, _multiplierHeight){
                var ratioByWidth = (_multiplierWidth * canvasWidth) / _width;
                var ratioByHeight = (_multiplierHeight * canvasHeight) / _height;
                if(_match == 'width')
                {
                    return canvasWidth > canvasHeight ? ratioByWidth : ratioByHeight;
                }
                else
                {
                    return canvasWidth < canvasHeight ? ratioByWidth : ratioByHeight;
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
