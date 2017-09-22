"use strict";
var AssetLoaderManager = (function () {

    // Instance stores a reference to the Singleton
    var instance;

    function init() {

        // Singleton Init

        var ticker = new PIXI.ticker.Ticker();
        var assetLoader = new PIXI.loaders.Loader();
        var resources = new Array();
        var onReadyCallback;

        var progress = new function ()
        {

            var requestId = undefined;
            function loop() {
                if (requestId) {
                    requestAnimationFrame(loop);
                }
            }

            var canvasContainer;

            function start() {
                if (requestId == undefined) {
                    requestId = requestAnimationFrame(loop);
                }
            }

            function stop() {
                if (requestId) {
                    cancelAnimationFrame(requestId);
                    requestId = undefined;
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
            resources = extend(resources, res);
            setTimeout(function(){
                    onReadyCallback();
                    progress.stop();
                }, 200
            );
        }

        function extend()
        {
            var o = {};

            for (var i in arguments)
            {
                var s = arguments[i];

                for (var i in s)
                {
                    o[i] = s[i];
                }
            }

            return o;
        }

        function getRes()
        {
            return resources;
        }

        function setRes(res)
        {
            resources = extend(resources, res);
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
            setRes: setRes,
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
