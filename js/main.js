
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
    spineManager.createSpine("powercore_male","Jia",250,250,0.5);  
    spineManager.createSpine("powercore_male","Jian",400,250,0.5);  
}



