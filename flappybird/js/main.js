
if (window.jsonic) {
	// kludge for spines being in JS rather than json
	JSON.parse = jsonic;
}

var stageManager = StageManager.getInstance();
var soundManager = SoundManager.getInstance();
var gameManager = GameManager.getInstance();
var assetLoaderManager = AssetLoaderManager.getInstance();

assetLoaderManager.addAsset(gameManager.getAsset());
assetLoaderManager.addAsset(soundManager.getAsset());
assetLoaderManager.onReady(assetReady);
assetLoaderManager.load();

function assetReady()
{
    gameManager.setup();
}

