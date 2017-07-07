"use strict";

function init()
{
    console.log('Initializing...');
    var isAssetReady = false;
    var isDone = false;

    var spineManager = SpineManager.getInstance();
    var questManager = QuestManager.getInstance();
    var assetLoaderManager = AssetLoaderManager.getInstance();

    function loadAsset()
    {
        console.log('Loading...');
        assetLoaderManager.addAsset(spineManager.getAsset());
        assetLoaderManager.addAsset(questManager.getAsset());
        assetLoaderManager.onReady(assetReady);
        assetLoaderManager.load();

        function assetReady()
        {
            isAssetReady = true;
        }
    }

    loadAsset();

    function checkInit()
    {
        if(!isDone)
        {
            if(isAssetReady)
            {
                isDone = true;
            }
            requestAnimationFrame(checkInit);
        }
        else
        {
            console.log('Loading Complete!');
            assetLoaderManager.getProgress().done();
            questManager.setup();
        }
    }

    requestAnimationFrame(checkInit);

}

init();
