"use strict";

var scriptMap = [
    "js/pixi/pixi.min.js",
    "js/pixi/pixi-spine.js",
    "js/pixi/pixi-particles.min.js",
    "js/pixi/pixi-sound.js",
    "js/gsap/TweenMax.min.js",
    "js/scaleToWindow.js",
    "js/StageManager.js",
    "js/AssetLoaderManager.js",
    "js/QuestManager.js"];

var order = 0;

function init()
{
    var isAssetReady = false;
    var isDone = false;

    var questManager = QuestManager.getInstance();
    var assetLoaderManager = AssetLoaderManager.getInstance();

    function loadAsset()
    {
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
            console.log('loading complete');
            assetLoaderManager.getProgress().done();
            questManager.setup();
        }
    }

    requestAnimationFrame(checkInit);

}

function loadScriptInOrder()
{

    if(order == scriptMap.length) {

        init();
        return;

    }

    var JSLink = scriptMap[order];
    var JSElement = document.createElement('script');
    JSElement.src = JSLink;
    JSElement.onload = callback;
    document.getElementsByTagName('body')[0].appendChild(JSElement);

    function callback(){
        order++;
        loadScriptInOrder();
    }


};

loadScriptInOrder();
