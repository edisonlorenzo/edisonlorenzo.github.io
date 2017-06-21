"use strict";

var scriptMap = [
    "js/StageManager.js", 
    "js/AssetLoaderManager.js", 
    "js/SoundManager.js", 
    "js/GameManager.js"];

var order = 0;

function init()
{
    var soundManager = SoundManager.getInstance();
    var gameManager = GameManager.getInstance();
    var assetLoaderManager = AssetLoaderManager.getInstance();

    assetLoaderManager.addAsset(soundManager.getAsset());
    assetLoaderManager.addAsset(gameManager.getAsset());
    assetLoaderManager.onReady(assetReady);
    assetLoaderManager.load();

    function assetReady()
    {
        gameManager.setup();
    } 
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