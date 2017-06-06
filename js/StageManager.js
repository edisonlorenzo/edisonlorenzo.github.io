var StageManager = (function () {

    // Instance stores a reference to the Singleton
    var instance;

    function init() {

        // Singleton Init

        var renderer;
        var stage;

        //Create the renderer
        renderer = PIXI.autoDetectRenderer(720, 1280, {backgroundColor : "0x1099bb"});

        renderer.view.style.width = '720px';
        renderer.view.style.height = '1280px';

        //Add style in document head
        var newStyle = document.createElement("style");
        var style = "* {padding: 0; margin: 0}";
        newStyle.appendChild(document.createTextNode(style));
        document.head.appendChild(newStyle);

        //Add the canvas to the HTML document
        document.body.appendChild(renderer.view);

        //Create a container object called the `stage`
        stage = new PIXI.Container();

        //Tell the `renderer` to `render` the `stage`
        renderer.render(stage);

        scaleToWindow(renderer.view);

        window.addEventListener("resize", function (event) { 
            scaleToWindow(renderer.view);
        });

        function update (){
            //Loop this function 60 times per second
            requestAnimationFrame(update);

            //Render the stage
            renderer.render(stage);
        }

        function getStage()
        {
            return stage;
        }
        
        function getRenderer()
        {
            return renderer;
        }

        update(); 
        
        return {
            getRenderer: getRenderer,
            getStage: getStage
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

