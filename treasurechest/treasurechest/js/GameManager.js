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

        var splashEmitter;
        var splashEmitterContainer;
        var splashEmitterConfig;

        var rayEmitterConfig;

        var assets = new Array();

        assets.push(new Asset('chest_open', 'treasurechest/images/chest_open.png'));
        assets.push(new Asset('chest_closed', 'treasurechest/images/chest_closed.png'));
        assets.push(new Asset('enfagrow_logo', 'treasurechest/images/enfagrow_logo.png'));
        assets.push(new Asset('flag', 'treasurechest/images/flag.png'));

        function Asset(resName, resPath)
        {
            this.resName = resName;
            this.resPath = resPath;
        }

        function getAsset()
        {
            return assets;
        }

        function createChest(position, hasLogo)
        {
            var content = {};

            var item = new PIXI.Sprite(res['enfagrow_logo'].texture);
            item.alpha = 0;
            item.anchor.x = 0.5;
            item.anchor.y = 1;
            item.scale.x = item.scale.y = 1;
            item.position.x = 0;
            item.position.y = -110;

            var chest = new PIXI.Sprite(res['chest_closed'].texture);
            chest.interactive = true;
            chest.anchor.x = 0.5;
            chest.anchor.y = 1;
            chest.scale.x = chest.scale.y = 0.8;
            chest.position.x = position.x + (chest.width * 0.5);
            chest.position.y = chest.height + 50;

            content.x = chest.position.x;
            content.y = chest.position.y - (chest.height * 0.5);

            chest.addChild(item);

            content.hasLogo = hasLogo;
            console.log(content.hasLogo);

            content.isOpened = false;
            content.animation = {};
            content.animation.shake = (function()
            {
                CustomWiggle.create("funWiggle", {wiggles:6, type:"easeOut"});
                TweenMax.fromTo(chest, 0.5, {rotation:0},  {rotation:0.5, ease:"funWiggle"});
            });

            content.animation.bounce = (function()
            {
                var tl = new TimelineMax();
                tl.add(TweenMax.fromTo(chest.scale, 0.1, {x:0.8},  {x:1, ease:Quad.easeOut}));
                tl.add(TweenMax.fromTo(chest.scale, 0.1, {y:0.8},  {y:0.6, ease:Quad.easeOut}),"-=0.1");
                tl.add(TweenMax.to(chest.scale, 0.5, {x:0.8, ease:Bounce.easeOut}), "+=0.1");
                tl.add(TweenMax.to(chest.scale, 0.5, {y:0.8, ease:Bounce.easeOut}), "-=0.5");
            });

            content.animation.chestOpen = (function()
            {
                chest.texture = res['chest_open'].texture;
                soundManager.playSound('point', 0);
            });

            content.animation.showItem = (function()
            {
                console.log(content.hasLogo);
                if(!content.hasLogo)
                {
                    item.texture = res['flag'].texture;
                }
                var tl = new TimelineMax();
                tl.add(TweenMax.fromTo(item, 0.3, {alpha:0},  {alpha:1, ease:Quad.easeOut}));
                tl.add(TweenMax.fromTo(item, 0.3, {y:-80},  {y:-100, ease:Quad.easeOut}), "-=0.3");
            });

            content.animation.chestParticle = (function()
            {
                splashEmitter.emit = true;
                splashEmitter.cleanup();
                splashEmitter.resetPositionTracking();
                splashEmitter.updateOwnerPos(content.x - 10, content.y - 15);
            });

            chest.on('pointertap', (function(eventData) {
                if(!content.isOpened)
                {
                    var tl = new TimelineMax();
                    tl.add(this.animation.bounce);
                    tl.add(this.animation.chestOpen, "+=0.4");
                    tl.add(this.animation.showItem, "+=0");
                    tl.add(this.animation.chestParticle, "+=0.1");
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
            chestContainer.addChild(chest);

            content.animation.bounce();

            return chest;
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

            splashEmitterConfig = {
            	"alpha": {
            		"start": 1,
            		"end": 1
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

            splashEmitterContainer = new PIXI.Container();
            splashEmitter = new PIXI.particles.Emitter(
                splashEmitterContainer,
                [
                    new PIXI.Texture(res['particle-star'].texture),
                    new PIXI.Texture(res['particle-circle'].texture)
                ],
                splashEmitterConfig
            );
            particleManager.setEmitter(splashEmitter);
            splashEmitter.emit = false;

            rayEmitterConfig = {
            	"alpha": {
            		"start": 1,
            		"end": 0
            	},
            	"scale": {
            		"start": 1,
            		"end": 4,
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
            	"maxParticles": 5,
            	"pos": {
            		"x": 0,
            		"y": 0
            	},
            	"addAtBack": false,
            	"spawnType": "point"
            };

            var chests = new Array();

            var item = new Array();
            for(var i = 0; i < 4; i++)
            {
                item.push(false);
            }

            var numOfLogo = window.numOfLogo;

            if(numOfLogo != null)
            {
                while(numOfLogo > 0)
                {
                    var randomIdx = parseInt(Math.random() * 4);
                    if(!item[randomIdx])
                    {
                        item[randomIdx] = true;
                        numOfLogo -= 1;
                    }

                }
            }

            var tl = new TimelineMax();
            tl.add(function(){ chests.push(createChest({x: 40}, item[0])); }, "+=0.2");
            tl.add(function(){ chests.push(createChest({x: 225}, item[1])); }, "+=0.2");
            tl.add(function(){ chests.push(createChest({x: 415}, item[2])); }, "+=0.2");
            tl.add(function(){ chests.push(createChest({x: 605}, item[3])); }, "+=0.2");
            tl.add(function(){ chestContainer.addChild(splashEmitterContainer); });

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
