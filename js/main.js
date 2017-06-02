
if(window.jsonic) {
	// kludge for spines being in JS rather than json
	JSON.parse = jsonic;
}

var assetLoaderManager = AssetLoaderManager.getInstance();
var stageManager = StageManager.getInstance();
var spineManager = SpineManager.getInstance();
var soundManager = SoundManager.getInstance();

assetLoaderManager.addAsset(spineManager.getAsset());
assetLoaderManager.addAsset(soundManager.getAsset());
assetLoaderManager.onReady(assetReady);
assetLoaderManager.load();

function assetReady()
{
    spineManager.createSpine("powercore_male","Edison",100,250,0.5);  
    spineManager.createSpine("powercore_male","Jia",300,250,0.5);  
    spineManager.createSpine("powercore_male","Jian",500,250,0.5);  
    spineManager.createSpine("popple","Popple",150,500,0.5); 
    spineManager.createSpine("popple","Pico",450,500,0.5);  
}



