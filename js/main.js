
//if (window.jsonic) {
//	// kludge for spines being in JS rather than json
//	JSON.parse = jsonic;
//}

var stageManager = StageManager.getInstance();
var spineManager = SpineManager.getInstance();
var soundManager = SoundManager.getInstance();
var uiManager = UIManager.getInstance();
var assetLoaderManager = AssetLoaderManager.getInstance();

assetLoaderManager.addAsset(spineManager.getAsset());
assetLoaderManager.addAsset(soundManager.getAsset());
assetLoaderManager.addAsset(uiManager.getAsset());
assetLoaderManager.onReady(assetReady);
assetLoaderManager.load();

function assetReady()
{
    init();
}

function init()
{
    uiManager.setupUI(onReady);
}

function onReady()
{
    uiManager.showDialog(0);
//    spineManager.createSpine("popple", "Popple", 150, 500, 0.5);
//    spineManager.createSpine("popple", "Pico", 450, 500, 0.5);

}





