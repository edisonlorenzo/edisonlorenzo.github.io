var AssetLoaderManager = (function () {

    // Instance stores a reference to the Singleton
    var instance;

    function init() {

        // Singleton Init
        var stageManager = StageManager.getInstance();
        
        var ticker = new PIXI.ticker.Ticker();
        var assetLoader = new PIXI.loaders.Loader();
        var resources;
        var onReadyCallback;

        var progress = new function ()
        {
            var style = new PIXI.TextStyle({
                fontFamily: 'Arial',
                fontSize: 36,
                fontStyle: 'italic',
                fontWeight: 'bold',
                fill: ['#ffaa11', '#11ffaa'], // gradient
                stroke: '#000000',
                strokeThickness: 2,
                dropShadow: true,
                dropShadowColor: '#000000',
                dropShadowBlur: 4,
                dropShadowAngle: Math.PI / 6,
                dropShadowDistance: 6,
                wordWrap: true,
                wordWrapWidth: 500
            });

            var richText = new PIXI.Text('Loading 0%', style);
            richText.x = stageManager.getDimension().width / 2;
            richText.y = stageManager.getDimension().height / 2;
            richText.anchor.set(0.5);
            richText.scale.x = richText.scale.y = stageManager.getDimension().calculateRatioBoth(richText.width, richText.height, .5, .1);
            
            var requestId;
            function loop() {
                if (requestId) {
                    richText.text = 'Loading ' + Math.floor(assetLoader.progress) + "%";
                    window.requestAnimationFrame(loop);
                }
            }

            function start() {
                if (!requestId) {
                    requestId = window.requestAnimationFrame(loop);
                    stageManager.getStage().addChild(richText);
                }
            }

            function stop() {
                if (requestId) {
                    window.cancelAnimationFrame(requestId);
                    requestId = undefined;
                    stageManager.getStage().removeChild(richText);
                }
            }
            
            return {
                start: start,
                stop: stop
            };
            
        };
        
        function onReady(callback)
        {
            onReadyCallback = callback;
        }

        function onAssetsLoaded(loader, res)
        {
            resources = res;
            setTimeout(function(){
                    onReadyCallback();
                    progress.stop();
                }, 200
            );
        }
        
        function getRes()
        {
            return resources;
        }

        function addAsset(assets)
        {
            for(var i = 0; i<assets.length; i++)
            {
                assetLoader.add(assets[i].resName, assets[i].resPath);
            }
        }

        function load()
        {
            progress.start();
            assetLoader.load(onAssetsLoaded);
        }
   
        return {
            getRes: getRes,
            onReady: onReady,
            addAsset: addAsset,
            load: load
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

