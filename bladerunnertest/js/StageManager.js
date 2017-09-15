"use strict";
var StageManager = (function () {

    // Instance stores a reference to the Singleton
    var instance;

    function init() {

        // Singleton Init

        var ratio;
        // var canvasWidth = 768;
        // var canvasHeight = 1350;
        var canvasWidth;
        var canvasHeight;
        var callBackArray = new Array();

        getCanvasSize();

        var renderer = PIXI.autoDetectRenderer(canvasWidth, canvasHeight, {backgroundColor : 0x000000, resolution: window.devicePixelRatio});
        renderer.view.style.display = "block";
        renderer.view.style.width = "100%";
        renderer.view.style.height = "100%";

        //Add style in document head
        var newStyle = document.createElement("style");
        var style = "* {padding: 0; margin: 0}";
        newStyle.appendChild(document.createTextNode(style));
        document.head.appendChild(newStyle);

        //Add the canvas to the HTML document
        document.body.appendChild(renderer.view);

        var stage = new PIXI.Container();
        var container = new PIXI.Container();

		stage.addChild(container);

        callBackArray.push(setSize);

        window.addEventListener("resize", function (event) {
            for (var i = 0; i < callBackArray.length; i++) {
                callBackArray[i]();
            }
        });

        window.addEventListener("load", function (event) {
            setSize();
        });

        requestAnimationFrame(update);

        function update (){
            //Loop this function 60 times per second
            requestAnimationFrame(update);

            //Render the stage
            renderer.render(stage);
        }


        function getCanvasSize()
        {
            canvasWidth = window.innerWidth;
            canvasHeight = window.innerHeight;
            // var width = $(window).width();
            // var height = $(window).height();
            //
            // var ratioX = width / canvasWidth;
	        // var ratioY = height / canvasHeight;
            //
	        // ratio = Math.min(ratioX, ratioY);
            // console.log(ratioX + ' | ' + ratioY);
        }

        function setSize()
        {
            getCanvasSize();

            if(renderer)
            {
                renderer.resize(canvasWidth, canvasHeight);

                // var view = renderer.view;
		        // view.style.width = "100%";
		        // view.style.height = canvasHeight * ratio + "px";
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
