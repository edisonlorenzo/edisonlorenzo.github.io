"use strict";

var filesLocation = window.treasureChest ? window.treasureChest.treasureChestLoc : "treasurechest/";

var scriptMap = [
    filesLocation + "js/pixi/pixi.min.js",
    filesLocation + "js/pixi/pixi-spine.js",
    filesLocation + "js/pixi/pixi-particles.min.js",
    filesLocation + "js/pixi/pixi-sound.min.js",
    filesLocation + "js/gsap/TweenMax.min.js",
    filesLocation + "js/gsap/TimelineMax.min.js",
    filesLocation + "js/StageManager.js",
    filesLocation + "js/AssetLoaderManager.js",
    filesLocation + "js/ParticleManager.js",
    filesLocation + "js/SoundManager.js",
    filesLocation + "js/GameManager.js"];

var order = 0;

function init()
{
    var soundManager = SoundManager.getInstance();
    var gameManager = GameManager.getInstance();
    var particleManager = ParticleManager.getInstance();
    var assetLoaderManager = AssetLoaderManager.getInstance();

    assetLoaderManager.addAsset(soundManager.getAsset());
    assetLoaderManager.addAsset(particleManager.getAsset());
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
    document.getElementById('myCanvas').appendChild(JSElement);

    function callback(){
        order++;
        loadScriptInOrder();
    }


};

loadScriptInOrder();
