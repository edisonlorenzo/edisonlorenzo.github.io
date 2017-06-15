var StageManager = (function () {

    // Instance stores a reference to the Singleton
    var instance;

    function init() {

        // Singleton Init

        var renderer;
        var stage;
        var container;
        
//        var width = window.innerWidth;
//        var height = window.innerHeight;
        
        //Create the renderer
//		renderer = PIXI.autoDetectRenderer(width, height, {backgroundColor : "0x000000", resolution: window.devicePixelRatio});
//		renderer.view.style.display = "block";
//		renderer.view.style.width = "100%";
//		renderer.view.style.height = "100%";

        var width = 480;
		var height = 800;
        
        PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST; 
        
        renderer = PIXI.autoDetectRenderer(width, height, {backgroundColor : "0x1099bb", resolution: window.devicePixelRatio});
        renderer.view.style.width = width + 'px';
        renderer.view.style.height = height + 'px';

        
        

        //Add style in document head
        var newStyle = document.createElement("style");
        var style = "* {padding: 0; margin: 0}";
        newStyle.appendChild(document.createTextNode(style));
        document.head.appendChild(newStyle);

        //Add the canvas to the HTML document
        document.body.appendChild(renderer.view);

        //Create a container object called the `stage`
        stage = new PIXI.Container();

        container = new PIXI.Container();
		stage.addChild(container);

        scaleToWindow(renderer.view);

        window.addEventListener("resize", function (event) { 
            scaleToWindow(renderer.view);
        });
        
        requestAnimationFrame(update);

        function update (){
            //Loop this function 60 times per second
            requestAnimationFrame(update);

            //Render the stage
            renderer.render(stage);
        }
        
        function resize()
        {
            width = window.innerWidth;
            height = window.innerHeight;
            renderer.resize(width, height);
        }

        function getStage()
        {
            return stage;
        }
        
        function getContainer()
        {
            return container;
        }
        
        function getRenderer()
        {
            return renderer;
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
            getRenderer: getRenderer,
            getStage: getStage,
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

