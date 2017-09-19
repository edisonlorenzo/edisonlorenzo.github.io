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
                fontSize: 40,
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

                    var canvasContainer = function()
                    {
                        var container = new PIXI.Container();
                        container.content = {};
                        return container;
                    }();

                    stageManager.getContainer().addChild(canvasContainer);

                    canvasContainer.content.setLayout = function () {
                        canvasContainer.scale.x = canvasContainer.scale.y = 1;
                        canvasContainer.position.x = stageManager.getDimension().canvasWidth * 0.5;
                        canvasContainer.position.y = stageManager.getDimension().canvasHeight * 0.5;
                    }
                    stageManager.addCallBack(canvasContainer.content.setLayout);

                    canvasContainer.addChild(richText);
                }
            }

            function stop() {
                if (requestId) {
                    cancelAnimationFrame(requestId);
                    requestId = undefined;
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
