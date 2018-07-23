"use strict";

var scriptMap = [
    "treasurechest/js/pixi/pixi.min.js",
    "treasurechest/js/pixi/pixi-spine.js",
    "treasurechest/js/pixi/pixi-particles.min.js",
    //"treasurechest/js/pixi/pixi-sound.min.js",
    "treasurechest/js/gsap/TweenMax.min.js",
    "treasurechest/js/gsap/TimelineMax.min.js",
    "treasurechest/js/gsap/CustomEase.min.js",
    "treasurechest/js/gsap/CustomWiggle.min.js",
    "treasurechest/js/StageManager.js",
    "treasurechest/js/AssetLoaderManager.js",
    "treasurechest/js/ParticleManager.js",
    //"treasurechest/js/SoundManager.js",
    "treasurechest/js/GameManager.js"];

var order = 0;

function init()
{
    //var soundManager = SoundManager.getInstance();
    var gameManager = GameManager.getInstance();
    var particleManager = ParticleManager.getInstance();
    var assetLoaderManager = AssetLoaderManager.getInstance();

    //assetLoaderManager.addAsset(soundManager.getAsset());
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
    document.getElementsByTagName('body')[0].appendChild(JSElement);

    function callback(){
        order++;
        loadScriptInOrder();
    }


};

loadScriptInOrder();
