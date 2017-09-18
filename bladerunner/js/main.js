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
            sceneManager.setup();
        }
    }

    loadAsset();

}

init();

// document.addEventListener('DOMContentLoaded', function(){
//     console.log('DOM Loaded');
//     init();
// }, false);
