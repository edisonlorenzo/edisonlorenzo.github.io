"use strict";
var GameManager = (function () {

    // Instance stores a reference to the Singleton
    var instance;

    function init() {

        // Singleton Init

        var stageManager;
        var soundManager;
        var particleManager;
        var res;

        var chestContainer;

        var emitter;
        var emitterContainer;
        var emitterConfig;

        var rayEmitterConfig;

        var assets = new Array();

        assets.push(new Asset('chest_open', 'treasurechest/images/chest_open.png'));
        assets.push(new Asset('chest_closed', 'treasurechest/images/chest_closed.png'));

        function Asset(resName, resPath)
        {
            this.resName = resName;
            this.resPath = resPath;
        }

        function getAsset()
        {
            return assets;
        }

        function createChest(position)
        {
            var content = {};
            var image = new PIXI.Sprite(res['chest_closed'].texture);

            image.interactive = true;
            image.anchor.x = 0.5;
            image.anchor.y = 1;
            image.scale.x = image.scale.y = 0.8;
            image.position.x = position.x + (image.width * 0.5);
            image.position.y = image.height + 50;

            content.x = image.position.x;
            content.y = image.position.y - (image.height * 0.5);

            console.log(content.x + " | " +content.y);
            //content.position = image.position;
            content.isOpened = false;
            content.animation = {};
            content.animation.shake = (function()
            {
                CustomWiggle.create("funWiggle", {wiggles:6, type:"easeOut"});
                TweenMax.fromTo(image, 0.5, {rotation:0},  {rotation:0.5, ease:"funWiggle"});
            });

            content.animation.bounce = (function()
            {
                var tl = new TimelineMax();
                tl.add(TweenMax.fromTo(image.scale, 0.1, {x:0.8},  {x:1, ease:Quad.easeOut}));
                tl.add(TweenMax.fromTo(image.scale, 0.1, {y:0.8},  {y:0.6, ease:Quad.easeOut}),"-=0.1");
                tl.add(TweenMax.to(image.scale, 0.5, {x:0.8, ease:Bounce.easeOut}), "+=0.1");
                tl.add(TweenMax.to(image.scale, 0.5, {y:0.8, ease:Bounce.easeOut}), "-=0.5");
            });

            content.animation.chestOpen = (function()
            {
                image.texture = res['chest_open'].texture;
                soundManager.playSound('point', 0);
            });

            content.animation.chestParticle = (function()
            {
                emitter.emit = true;
                emitter.cleanup();
                emitter.resetPositionTracking();
                emitter.updateOwnerPos(content.x - 15, content.y - 25);

                console.log(content.y);
            });

            image.on('pointertap', (function(eventData) {
                if(!content.isOpened)
                {
                    var tl = new TimelineMax();
                    tl.add(this.animation.bounce);
                    tl.add(this.animation.chestOpen, "+=0.4");
                    tl.add(this.animation.chestParticle, "+=0");
                    content.isOpened = true;
                }

            }).bind(content));

            var rayEmitterContainer = new PIXI.Container();
            var rayEmitter = new PIXI.particles.Emitter(
                rayEmitterContainer,
                [
                    new PIXI.Texture(res['particle-glitter'].texture),
                ],
                rayEmitterConfig
            );

            rayEmitter.emit = true;
            rayEmitter.cleanup();
            rayEmitter.resetPositionTracking();
            rayEmitter.updateOwnerPos(content.x, content.y);

            particleManager.setEmitter(rayEmitter);

            chestContainer.addChild(rayEmitterContainer);
            chestContainer.addChild(image);

            content.animation.bounce();

            return image;
        }

        function setup()
        {

            stageManager = StageManager.getInstance();
            soundManager = SoundManager.getInstance();
            particleManager = ParticleManager.getInstance();

            elements = new Array();

            chestContainer = new PIXI.Container();

            stageManager.getContainer().addChild(chestContainer);

            res =  AssetLoaderManager.getInstance().getRes();

            emitterConfig = {
            	"alpha": {
            		"start": 1,
            		"end": 0.5
            	},
            	"scale": {
            		"start": 0.5,
            		"end": 1,
            		"minimumScaleMultiplier": 1
            	},
            	"color": {
            		"start": "#fff700",
            		"end": "#ffd900"
            	},
            	"speed": {
            		"start": 100,
            		"end": -600,
            		"minimumSpeedMultiplier": 3
            	},
            	"acceleration": {
            		"x": 0,
            		"y": 400
            	},
            	"maxSpeed": 1000,
            	"startRotation": {
            		"min": 0,
            		"max": 0
            	},
            	"noRotation": false,
            	"rotationSpeed": {
            		"min": 0,
            		"max": 0
            	},
            	"lifetime": {
            		"min": 0.5,
            		"max": 1
            	},
            	"blendMode": "normal",
            	"frequency": 0.001,
            	"emitterLifetime": 0.1,
            	"maxParticles": 30,
            	"pos": {
            		"x": 0,
            		"y": 0
            	},
            	"addAtBack": false,
            	"spawnType": "ring",
            	"spawnCircle": {
            		"x": 0,
            		"y": 0,
            		"r": 4,
            		"minR": 0
            	}
            };

            emitterContainer = new PIXI.Container();
            emitter = new PIXI.particles.Emitter(
                emitterContainer,
                [
                    new PIXI.Texture(res['particle-star'].texture),
                    new PIXI.Texture(res['particle-circle'].texture)
                ],
                emitterConfig
            );
            particleManager.setEmitter(emitter);
            emitter.emit = false;

            rayEmitterConfig = {
            	"alpha": {
            		"start": 1,
            		"end": 0
            	},
            	"scale": {
            		"start": 0.5,
            		"end": 4,
            		"minimumScaleMultiplier": 1
            	},
            	"color": {
            		"start": "#fffdb8",
            		"end": "#7fa8ff"
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
            	"maxParticles": 5,
            	"pos": {
            		"x": 0,
            		"y": 0
            	},
            	"addAtBack": false,
            	"spawnType": "point"
            };

            var chests = new Array();

            var tl = new TimelineMax();
            tl.add(function(){ chests.push(createChest({x: 40})); }, "+=0.2");
            tl.add(function(){ chests.push(createChest({x: 225})); }, "+=0.2");
            tl.add(function(){ chests.push(createChest({x: 415})); }, "+=0.2");
            tl.add(function(){ chests.push(createChest({x: 605})); }, "+=0.2");

            // var chestObj1 = createChest({x: 40});
            // var chestObj2 = createChest({x: 225});
            // var chestObj3 = createChest({x: 415});
            // var chestObj4 = createChest({x: 605});

            chestContainer.addChild(emitterContainer);

        }

        var elements;

        function getElement(id)
        {
            return elements.find(function(item){return item.id === id});
        }

        return {
            getAsset: getAsset,
            setup: setup
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
