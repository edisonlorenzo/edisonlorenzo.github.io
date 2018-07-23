"use strict";
var GameManager = (function () {

    // Instance stores a reference to the Singleton
    var instance;

    function init() {

        // Singleton Init

        var stageManager;
        //var soundManager;
        var particleManager;
        var res;

        var chestContainer;

        var splashEmitter;
        var splashEmitterContainer;
        var splashEmitterConfig;

        var rayEmitterConfig;

        var assets = new Array();

        assets.push(new Asset('chest_container', filesLocation + 'images/chest_container.png'));
        assets.push(new Asset('chest_bottom', filesLocation + 'images/chest_bottom.png'));
        assets.push(new Asset('chest_open', filesLocation + 'images/chest_open.png'));
        assets.push(new Asset('chest_closed', filesLocation + 'images/chest_closed.png'));
        assets.push(new Asset('enfagrow_logo', filesLocation + 'images/enfagrow_logo.png'));
        assets.push(new Asset('flag', filesLocation + 'images/flag.png'));

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

            var chestScale = 0.5;

            var item = new PIXI.Sprite(res['enfagrow_logo'].texture);
            item.alpha = 0;
            item.anchor.x = 0.5;
            item.anchor.y = 1;
            item.scale.x = item.scale.y = 1;
            item.position.x = 0;
            item.position.y = -110;

            var chest = new PIXI.Sprite(res['chest_container'].texture);
            chest.interactive = true;
            chest.anchor.x = 0.5;
            chest.anchor.y = 1;
            chest.scale.x = chest.scale.y = chestScale;
            chest.position.x = position.x + (chest.width * 0.5);
            chest.position.y = chest.height + 50;

            var chestTop = new PIXI.Sprite(res['chest_closed'].texture);
            chestTop.anchor.x = 0.5;
            chestTop.anchor.y = 1;
            chestTop.position.x = 0;
            chestTop.position.y = 0;

            var chestBottom = new PIXI.Sprite(res['chest_bottom'].texture);
            chestBottom.anchor.x = 0.5;
            chestBottom.anchor.y = 1;
            chestBottom.position.x = 0;
            chestBottom.position.y = 0;

            chest.addChild(chestTop);
            chest.addChild(item);
            chest.addChild(chestBottom);

            content.x = chest.position.x;
            content.y = chest.position.y - (chest.height * 0.5);

            content.hasLogo = hasLogo;
            console.log(content.hasLogo);

            content.isOpened = false;
            content.animation = {};

            content.animation.shake = (function()
            {
                CustomWiggle.create("funWiggle", {wiggles:6, type:"easeOut"});
                TweenMax.fromTo(chest, 0.5, {rotation:0},  {rotation:0.5, ease:"funWiggle"});
            });

            content.animation.intro = (function()
            {
                var tl = new TimelineMax();
                tl.add(function(){ content.animation.bounce(); }, "+=0");
                tl.add(function(){ rayEmitter.emit = true; }, "+=0.4");
            });

            content.animation.bounce = (function()
            {
                var tl = new TimelineMax();
                tl.add(TweenMax.fromTo(chest.scale, 0.1, {x:chestScale},  {x:chestScale + (chestScale * 0.25), ease:Quad.easeOut}));
                tl.add(TweenMax.fromTo(chest.scale, 0.1, {y:chestScale},  {y:chestScale - (chestScale * 0.25), ease:Quad.easeOut}),"-=0.1");
                tl.add(TweenMax.to(chest.scale, 0.5, {x:chestScale, ease:Bounce.easeOut}), "+=0.1");
                tl.add(TweenMax.to(chest.scale, 0.5, {y:chestScale, ease:Bounce.easeOut}), "-=0.5");
            });

            content.animation.chestOpen = (function()
            {
                chestTop.texture = res['chest_open'].texture;
                //soundManager.playSound('point', 0);
            });

            content.animation.showItem = (function()
            {
                console.log(content.hasLogo);
                if(!content.hasLogo)
                {
                    item.texture = res['flag'].texture;
                }
                var tl = new TimelineMax();
                tl.add(TweenMax.fromTo(item, 0.25, {alpha:0},  {alpha:1, ease:Expo.easeOut}));
                tl.add(TweenMax.fromTo(item, 0.25, {y:-20},  {y:-200, ease:Expo.easeOut}), "-=0.25");
            });

            content.animation.chestParticle = (function()
            {
                splashEmitter.emit = true;
                splashEmitter.cleanup();
                splashEmitter.resetPositionTracking();
                splashEmitter.updateOwnerPos(content.x, content.y);
            });

            chest.on('pointertap', (function(eventData) {
                if(!content.isOpened)
                {
                    var tl = new TimelineMax();
                    tl.add(this.animation.bounce);
                    tl.add(this.animation.chestOpen, "+=0.4");
                    tl.add(this.animation.showItem, "+=0");
                    if(content.hasLogo)
                    {
                        tl.add(this.animation.chestParticle, "+=0");
                    }
                    content.isOpened = true;
                }

            }).bind(content));

            var rayEmitterContainer = new PIXI.Container();
            rayEmitterContainer.position.y = 50;
            var rayEmitter = new PIXI.particles.Emitter(
                rayEmitterContainer,
                [
                    new PIXI.Texture(res['particle-glitter'].texture),
                ],
                rayEmitterConfig
            );

            rayEmitter.emit = false;
            rayEmitter.cleanup();
            rayEmitter.resetPositionTracking();
            rayEmitter.updateOwnerPos(content.x, content.y);

            particleManager.setEmitter(rayEmitter);

            chestContainer.addChild(rayEmitterContainer);
            chestContainer.addChild(chest);

            content.animation.intro();

            return content;
        }

        function setup()
        {

            stageManager = StageManager.getInstance();
            //soundManager = SoundManager.getInstance();
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

            var width = stageManager.getDimension().width;
            var offset = -290;

            var tl = new TimelineMax();
            tl.add(function(){ chests.push(createChest({x: (width * 0.25) + offset}, item[0])); }, "+=0.2");
            tl.add(function(){ chests.push(createChest({x: (width * 0.5) + offset}, item[1])); }, "+=0.2");
            tl.add(function(){ chests.push(createChest({x: (width * 0.75) + offset}, item[2])); }, "+=0.2");
            tl.add(function(){ chests.push(createChest({x: (width * 1) + offset}, item[3])); }, "+=0.2");
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
