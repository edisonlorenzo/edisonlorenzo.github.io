var ParticleManager = (function () {

    // Instance stores a reference to the Singleton
    var instance;

    function init() {

        // Singleton Init

        var assetLoaderManager = AssetLoaderManager.getInstance();

        var assets = new Array();
        assets.push(new Asset('particle-star', filesLocation + '/images/particle-star.png'));
        assets.push(new Asset('particle-circle', filesLocation + '/images/particle-circle.png'));
        assets.push(new Asset('particle-glitter', filesLocation + '/images/particle-glitter.png'));
        assets.push(new Asset('particle-bubble', filesLocation + '/images/particle-bubble.png'));

        var emitterConfig = {};
        emitterConfig.splashEmitterConfig = {
            "alpha": {
                "start": 1,
                "end": 0
            },
            "scale": {
                "start": 1,
                "end": 1,
                "minimumScaleMultiplier": 0.2
            },
            "color": {
                "start": "#ffffff",
                "end": "#ffffff"
            },
            "speed": {
                "start": -200,
                "end": -400,
                "minimumSpeedMultiplier": 1
            },
            "acceleration": {
                "x": 0,
                "y": -600
            },
            "maxSpeed": 0,
            "startRotation": {
                "min": 0,
                "max": 360
            },
            "noRotation": false,
            "rotationSpeed": {
                "min": 0,
                "max": 0
            },
            "lifetime": {
                "min": 1,
                "max": 1
            },
            "blendMode": "normal",
            "frequency": 0.01,
            "emitterLifetime": 0.2,
            "maxParticles": 30,
            "pos": {
                "x": 0,
                "y": 0
            },
            "addAtBack": false,
            "spawnType": "circle",
            "spawnCircle": {
                "x": 0,
                "y": 0,
                "r": 30
            }
        };

        emitterConfig.rayEmitterConfig = {
            "alpha": {
                "start": 1,
                "end": 0
            },
            "scale": {
                "start": 0.5,
                "end": 1.5,
                "minimumScaleMultiplier": 1
            },
            "color": {
                "start": "#fff700",
                "end": "#ffffaa"
            },
            "speed": {
                "start": 0,
                "end": 0,
                "minimumSpeedMultiplier": 0.001
            },
            "acceleration": {
                "x": 0,
                "y": 0
            },
            "maxSpeed": 0,
            "startRotation": {
                "min": 0,
                "max": 360
            },
            "noRotation": false,
            "rotationSpeed": {
                "min": -10,
                "max": 10
            },
            "lifetime": {
                "min": 1,
                "max": 2
            },
            "blendMode": "screen",
            "frequency": 0.2,
            "emitterLifetime": -1,
            "maxParticles": 10,
            "pos": {
                "x": 0,
                "y": 0
            },
            "addAtBack": false,
            "spawnType": "point"
        };

        emitterConfig.logoRayEmitterConfig = {
            "alpha": {
                "start": 1,
                "end": 0
            },
            "scale": {
                "start": 0,
                "end": 30,
                "minimumScaleMultiplier": 1
            },
            "color": {
                "start": "#fff700",
                "end": "#ffffaa"
            },
            "speed": {
                "start": 10,
                "end": 10,
                "minimumSpeedMultiplier": 0.001
            },
            "acceleration": {
                "x": 0,
                "y": 0
            },
            "maxSpeed": 0,
            "startRotation": {
                "min": 0,
                "max": 360
            },
            "noRotation": false,
            "rotationSpeed": {
                "min": -10,
                "max": 10
            },
            "lifetime": {
                "min": 1,
                "max": 2
            },
            "blendMode": "screen",
            "frequency": 0.2,
            "emitterLifetime": -1,
            "maxParticles": 10,
            "pos": {
                "x": 0,
                "y": 0
            },
            "addAtBack": false,
            "spawnType": "point"
        };

        var emitters = new Array();

        function Asset(resName, resPath)
        {
            this.resName = resName;
            this.resPath = resPath;
        }

        function getAsset()
        {
            return assets;
        }

        function getEmitterConfig(configName)
        {
            return emitterConfig[configName];
        }

        var elapsed = Date.now();
        function update ()
        {
            //Loop this function 60 times per second
            requestAnimationFrame(update);

            var now = Date.now();
            var diff = (now - elapsed) * 0.001;
            if(!window.errormode) {

                emitters.forEach((emitter, index) => {
                    if(emitter != undefined)
                    {
                        emitter.update(diff);
                    }
                });

            }
            elapsed = now;
        }

        requestAnimationFrame(update);

        function setEmitter(_emitter)
        {
            emitters.push(_emitter);
        }

        return {
            getAsset: getAsset,
            setEmitter: setEmitter,
            getEmitterConfig: getEmitterConfig,
            update: update
        };


    };

    return {

        // Get the Singleton instance if one exists
        // or create one if it doesn't
        getInstance: function () {

            if ( !instance ) {
                instance = init();
            }

            return instance;
        }

    };

})();
