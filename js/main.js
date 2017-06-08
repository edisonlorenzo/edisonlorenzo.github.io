
if (window.jsonic) {
	// kludge for spines being in JS rather than json
	JSON.parse = jsonic;
}

var stageManager = StageManager.getInstance();
var spineManager = SpineManager.getInstance();
var soundManager = SoundManager.getInstance();
var particleManager = ParticleManager.getInstance();
var uiManager = UIManager.getInstance();
var assetLoaderManager = AssetLoaderManager.getInstance();

assetLoaderManager.addAsset(spineManager.getAsset());
assetLoaderManager.addAsset(soundManager.getAsset());
assetLoaderManager.addAsset(particleManager.getAsset());
assetLoaderManager.addAsset(uiManager.getAsset());
assetLoaderManager.onReady(assetReady);
assetLoaderManager.load();

function assetReady()
{
    uiManager.setupUI(onReady);
}

function onReady()
{
    uiManager.showDialog();
    
    var emitterConfig = {
            "alpha": {
                "start": 1,
                "end": 0.5
            },
            "scale": {
                "start": 1.0,
                "end": .1,
                "minimumScaleMultiplier": 1.2
            },
            "color": {
                "start": "#ffaa11",
                "end": "#ffffff"
            },
            "speed": {
                "start": 100,
                "end": 50
            },
            "acceleration": {
                "x": 0,
                "y": 200
            },
            "startRotation": {
                "min": 0,
                "max": 360
            },
            "noRotation": false,
            "rotationSpeed": {
                "min": 180,
                "max": 360
            },
            "lifetime": {
                "min": 1,
                "max": 2
            },
            "blendMode": "normal",
            "frequency": 0.001,
            "emitterLifetime": 0.2,
            "maxParticles": 15,
            "pos": {
                "x": 0,
                "y": 0
            },
            "addAtBack": false,
		    "spawnType": "point",
		    "angleStart": 0
        };
    
    var emitterContainer = new PIXI.Container();
    
    var emitter = new PIXI.particles.Emitter(
        emitterContainer,
        [
            new PIXI.Texture(assetLoaderManager.getRes()['particle-star'].texture), 
            new PIXI.Texture(assetLoaderManager.getRes()['particle-circle'].texture)
        ],
        emitterConfig
    );
    particleManager.setEmitter(emitter);
    emitter.emit = false;
    
    var container = stageManager.getContainer();
    container.interactive = true;
    container.on('pointertap', function(eventData){
        emitter.emit = true;
        emitter.cleanup();
		emitter.resetPositionTracking();
		emitter.updateOwnerPos(eventData.data.global.x, eventData.data.global.y); 
    });
    
    container.addChild(emitterContainer);
}
