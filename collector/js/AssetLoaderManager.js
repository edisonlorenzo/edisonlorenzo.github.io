"use strict";
var AssetLoaderManager = (function () {

    // Instance stores a reference to the Singleton
    var instance;

    function init() {

        // Singleton Init

        var ticker = new PIXI.ticker.Ticker();
        var assetLoader = new PIXI.loaders.Loader();
        var resources;
        var onReadyCallback;

        var progress = new function ()
        {
            var stageManager;
            var style = new PIXI.TextStyle({
                fontFamily: 'Arial',
                fontSize: 28,
                fontStyle: 'normal',
                fontWeight: 'bold',
                fill: ['#ffffff', '#ffffff'], // gradient
                stroke: '#000000',
                strokeThickness: 1,
                dropShadow: true,
                dropShadowColor: '#000000',
                dropShadowBlur: 5,
                dropShadowAngle: Math.PI / 6,
                dropShadowDistance: 2,
                wordWrap: false,
                wordWrapWidth: 600
            });

            var richText = new PIXI.Text('Loading 0%', style);
                    richText.anchor.set(0.5);
            //richText.scale.x = richText.scale.y = stageManager.getDimension().calculateRatioBoth('height', richText.width, richText.height, .5, .1);
            
            var requestId = undefined;
            function loop() {
                if (requestId) {
                    richText.text = 'Loading ' + Math.floor(assetLoader.progress) + "%";
                    requestAnimationFrame(loop);
                }
            }

            function start() {
                if (requestId == undefined) {
                    requestId = requestAnimationFrame(loop);
                    
                    stageManager = StageManager.getInstance();
                    richText.x = stageManager.getDimension().width / 2;
                    richText.y = stageManager.getDimension().height / 2;
                    stageManager.getContainer().addChild(richText);
                }
            }

            function stop() {
                if (requestId) {
                    cancelAnimationFrame(requestId);
                    requestId = undefined;
                    //stageManager.getContainer().removeChild(richText);
                    richText.text = 'Please wait...';
                }
            }
            
            function done()
            {
                stageManager.getContainer().removeChild(richText);
                
            }
            
            return {
                start: start,
                stop: stop,
                done: done
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

        function getProgress()
        {
            return progress;    
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
            getProgress: getProgress,
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

