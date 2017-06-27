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
    var isJsonReady = false;
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
    
    function loadJson()
    {
        var theUrl = 'https://script.google.com/a/macros/flightdigitalmedia.com/s/AKfycbxq5IfxY3aSgL_qhKwH3R6b7zdaiEq-evzGQ4vZ7ZoTP3A5DTw/exec?sheetName=codes';
        var xmlhttp;

        if (window.XMLHttpRequest)
        {// code for IE7+, Firefox, Chrome, Opera, Safari
            xmlhttp=new XMLHttpRequest();
            xmlhttp.overrideMimeType('text/plain');
        }
        else
        {// code for IE6, IE5
            xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
        }
        xmlhttp.onreadystatechange=function()
        {
            if (xmlhttp.readyState==4 && xmlhttp.status==200)
            {
                isJsonReady = true;
                questManager.setJsonString(xmlhttp.responseText);
//                console.log(xmlhttp.responseText);
//                return xmlhttp.responseText;
            }
        }
        xmlhttp.open("GET", theUrl, true );
        xmlhttp.send();    
    }
    
    loadJson();
    loadAsset();
    
    requestAnimationFrame(checkInit);
    
    function checkInit()
    {
        if(!isDone)
        {
            if(isAssetReady && isJsonReady)
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