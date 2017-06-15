
if (window.jsonic) {
	// kludge for spines being in JS rather than json
	JSON.parse = jsonic;
}

var stageManager = StageManager.getInstance();
var gameManager = GameManager.getInstance();
var assetLoaderManager = AssetLoaderManager.getInstance();

assetLoaderManager.addAsset(gameManager.getAsset());
assetLoaderManager.onReady(assetReady);
assetLoaderManager.load();

function assetReady()
{
    gameManager.setup();
}

