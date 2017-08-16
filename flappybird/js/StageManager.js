"use strict";
var StageManager = (function () {

    // Instance stores a reference to the Singleton
    var instance;

    function init() {

        // Singleton Init

        const logicalWidth = 480;
        const logicalHeight = 800;

        PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;

        var app = new PIXI.Application(logicalWidth, logicalHeight, {backgroundColor : 0x1099bb, resolution: window.devicePixelRatio});
        app.view.id = 'pixi-canvas';
        // app.view.style.width = width + 'px';
        // app.view.style.height = height + 'px';


        //Add style in document head
        var newStyle = document.createElement("style");
        var style = "* {padding: 0; margin: 0}";
        newStyle.appendChild(document.createTextNode(style));
        document.head.appendChild(newStyle);

        //Add the canvas to the HTML document
        document.body.appendChild(app.view);

        var container = new PIXI.Container();

		app.stage.addChild(container);

        const resizeHandler = () => {
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

        window.addEventListener("resize", function (event) {
            resizeHandler();
        });

        function getContainer()
        {
            return container;
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
            getDimension: getDimension,
            getContainer: getContainer
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
