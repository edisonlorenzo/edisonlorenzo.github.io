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

        var splashEmitterConfig;
        var rayEmitterConfig;
        var logoRayEmitterConfig;

        var assets = new Array();
        var openedChestCount = 0;

        var nextPageLoc = window.treasureChest ? window.treasureChest.nextPageLoc : "https://edisonlorenzo.github.io/treasurehunt/";

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

            var chest = new PIXI.Sprite(res['chest_container'].texture);
            chest.alpha = 0;
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

            var item = new PIXI.Sprite(res['enfagrow_logo'].texture);
            item.alpha = 0;
            item.anchor.x = 0.5;
            item.anchor.y = 1;
            item.scale.x = item.scale.y = 1;
            item.position.x = 0;
            item.position.y = -110;

            var chestButton = new PIXI.Sprite(res['chest_container'].texture);
            chestButton.interactive = true;
            chestButton.anchor.x = 0.5;
            chestButton.anchor.y = 1;
            chestButton.position.x = 0;
            chestButton.position.y = 0;

            var logoRayParticles = createParticle(logoRayEmitterConfig, [
                new PIXI.Texture(res['particle-circle'].texture),
            ]);

            logoRayParticles.container.alpha = 0;
            logoRayParticles.emitter.emit = true;
            logoRayParticles.emitter.updateOwnerPos(item.x, item.y - 130);

            chest.addChild(chestTop);
            chest.addChild(logoRayParticles.container);
            chest.addChild(item);
            chest.addChild(chestBottom);
            chest.addChild(chestButton);

            content.x = chest.position.x;
            content.y = chest.position.y - (chest.height * 0.5);

            content.hasLogo = hasLogo;

            content.isOpened = false;
            content.animation = {};

            content.animation.intro = (function()
            {
                var tl = new TimelineMax();
                tl.add(function(){ content.animation.fall(); }, "+=0");
                tl.add(function(){ content.animation.bounce(); }, "+=0.25");
                tl.add(function(){ rayParticles.emitter.emit = true; }, "+=0.4");
            });

            content.animation.fall = (function()
            {
                var tl = new TimelineMax();
                tl.add(TweenMax.fromTo(chest, 0.25, {alpha:0},  {alpha:1, ease:Quad.easeOut}));
                tl.add(TweenMax.fromTo(chest, 0.25, {y:0},  {y:chest.height + 50 , ease:Quad.easeIn}), "-=0.25");
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
                soundManager.playSound(content.hasLogo ? 'success' : 'failed', 0);
            });

            content.animation.showItem = (function()
            {
                if(content.hasLogo) {
                    item.texture = res['enfagrow_logo'].texture;
                    var tl = new TimelineMax();
                    tl.add(TweenMax.fromTo(item, 0.25, {alpha:0},  {alpha:1, ease:Expo.easeOut}));
                    tl.add(TweenMax.fromTo(item.scale, 0.25, {x:0.8, y:0.8},  {x:1, y:1, ease:Expo.easeOut}), "-=0.25");
                    tl.add(TweenMax.fromTo(logoRayParticles.container, 1, {alpha:0},  {alpha:1, ease:Expo.easeOut}), "-=0.5");
                    tl.add(function(){ logoRayParticles.emitter.emit = true; }, "-=2");
                }
                // item.texture = content.hasLogo ? res['enfagrow_logo'].texture : res['transparent'].texture;

                // var tl = new TimelineMax();
                // tl.add(TweenMax.fromTo(item, 0.25, {alpha:0},  {alpha:1, ease:Expo.easeOut}));
                // //tl.add(TweenMax.fromTo(item, 0.25, {y:-20},  {y:-200, ease:Expo.easeOut}), "-=0.25");
                // tl.add(TweenMax.fromTo(logoRayParticles.container, 1, {alpha:0},  {alpha:content.hasLogo ? 1 : 0, ease:Expo.easeOut}), "-=0.5");
                // tl.add(function(){ logoRayParticles.emitter.emit = content.hasLogo; }, "-=2");

            });

            content.animation.chestParticle = (function()
            {
                splashParticles.emitter.emit = true;
            });

            chestButton.on('pointertap', (function(eventData) {
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
                    openedChestCount += 1;
                    checkOpenedChest();
                }

            }).bind(content));


            var rayParticles = createParticle(rayEmitterConfig, [
                new PIXI.Texture(res['particle-glitter'].texture),
            ]);

            rayParticles.emitter.emit = false;
            rayParticles.container.position.y = 50;
            rayParticles.emitter.updateOwnerPos(content.x, content.y);

            var splashParticles = createParticle(splashEmitterConfig, [
                new PIXI.Texture(res['particle-bubble'].texture)
            ]);

            splashParticles.emitter.emit = false;
            splashParticles.emitter.updateOwnerPos(content.x, content.y);

            chestContainer.addChild(rayParticles.container);
            chestContainer.addChild(chest);
            chestContainer.addChild(splashParticles.container);

            content.animation.intro();

            return content;
        }

        function gotoNextPage()
        {
            window.location.href = nextPageLoc;
        }

        function checkOpenedChest()
        {
            if(openedChestCount >= 4)
            {
                var tl = new TimelineMax();
                tl.add(gotoNextPage, "+=2");
            }
        }

        function createParticle(config, textures)
        {
            var container = new PIXI.Container();
            var emitter = new PIXI.particles.Emitter(
                container,
                textures,
                config
            );

            emitter.cleanup();
            emitter.resetPositionTracking();
            particleManager.setEmitter(emitter);

            return {
                emitter: emitter,
                container: container
            };
        }

        function setup()
        {

            stageManager = StageManager.getInstance();
            soundManager = SoundManager.getInstance();
            particleManager = ParticleManager.getInstance();

            chestContainer = new PIXI.Container();

            stageManager.getContainer().addChild(chestContainer);

            res =  AssetLoaderManager.getInstance().getRes();

            splashEmitterConfig = {
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

            logoRayEmitterConfig = {
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

            var items = new Array();
            for(var i = 0; i < 4; i++)
            {
                items.push(false);
            }

            var numOfLogo = window.treasureChest ? window.treasureChest.numOfLogo : 0;

            while(numOfLogo > 0)
            {
                var randomIdx = parseInt(Math.random() * 4);
                if(!items[randomIdx])
                {
                    items[randomIdx] = true;
                    numOfLogo -= 1;
                }

            }

            var width = stageManager.getDimension().width;
            var offset = -290;

            var chests = new Array();
            var tl = new TimelineMax();
            items.forEach((item, index) => {
                if(item != undefined)
                {
                    var multiplier = 0.25 + (0.25 * index);
                    tl.add(function(){ chests.push(createChest({x: (width * multiplier) + offset}, item)); }, "+=0.2");
                }
            });

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
