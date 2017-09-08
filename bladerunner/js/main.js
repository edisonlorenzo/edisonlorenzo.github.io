"use strict";

function init()
{
    console.log('Initializing...');

    var sceneManager = SceneManager.getInstance();
    var assetLoaderManager = AssetLoaderManager.getInstance();

    function loadAsset()
    {
        console.log('Loading...');
        assetLoaderManager.addAsset(sceneManager.getAsset());
        assetLoaderManager.onReady(assetReady);
        assetLoaderManager.load();

        function assetReady()
        {
            assetLoaderManager.getProgress().done();
            sceneManager.setup();
        }
    }

    loadAsset();

}

init();
