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

        var viewContainer;

        var splashEmitterConfig;
        var rayEmitterConfig;
        var logoRayEmitterConfig;

        var assets = new Array();
        var openedChestCount = 0;

        var nextPageLoc = window.scratchWin && window.scratchWin.nextPageLoc ? window.scratchWin.nextPageLoc : "#";

        assets.push(new Asset('star_container', filesLocation + '/images/star_container.png'));
        assets.push(new Asset('lactum_logo', filesLocation + '/images/lactum_logo.png'));
        assets.push(new Asset('star1', filesLocation + '/images/star1.png'));
        assets.push(new Asset('star2', filesLocation + '/images/star2.png'));
        assets.push(new Asset('star3', filesLocation + '/images/star3.png'));
        assets.push(new Asset('star4', filesLocation + '/images/star4.png'));
        assets.push(new Asset('star5', filesLocation + '/images/star5.png'));
        assets.push(new Asset('star_select', filesLocation + '/images/star_select.png'));


        function Asset(resName, resPath)
        {
            this.resName = resName;
            this.resPath = resPath;
        }

        function getAsset()
        {
            return assets;
        }

        function createStar(position, hasLogo)
        {
            var starScale = 0.5;

            var starContainer = new PIXI.Sprite(res['star_container'].texture);
            starContainer.alpha = 0;
            starContainer.anchor.x = 0.5;
            starContainer.anchor.y = 0.5;
            starContainer.scale.x = starContainer.scale.y = starScale;
            starContainer.position.x = position.x + (starContainer.width * 0.5);
            starContainer.position.y = stageManager.getDimension().height * 0.5;

            var item = new PIXI.Sprite(res['star_container'].texture);
            item.alpha = 0;
            item.anchor.x = 0.5;
            item.anchor.y = 0.5;
            item.scale.x = item.scale.y = 1;
            item.position.x = 0;
            item.position.y = 0;

            starContainer.addChild(item);

            var starArray = new Array();
            
            for(var i = 1; i <= 5; i++){
                var star = new PIXI.Sprite(res['star'+i].texture);
                star.alpha = 0;
                star.anchor.x = 0.5;
                star.anchor.y = 0.5;
                star.position.x = 0;
                star.position.y = 0;

                starArray.push(star);
                starContainer.addChild(star);
            }

            starArray[starArray.length - 1].alpha = 1;

            var starSelect = new PIXI.Sprite(res['star_select'].texture);
            starSelect.alpha = 0;
            starSelect.anchor.x = 0.5;
            starSelect.anchor.y = 0.5;
            starSelect.position.x = 0;
            starSelect.position.y = 0;
            
            var starButton = new PIXI.Sprite(res['star_container'].texture);
            starButton.interactive = false;
            starButton.anchor.x = 0.5;
            starButton.anchor.y = 0.5;
            starButton.position.x = 0;
            starButton.position.y = 0;

            starContainer.addChild(starSelect);
            starContainer.addChild(starButton);

            var content = {};

            content.x = starContainer.position.x;
            content.y = starContainer.position.y;

            content.durability = 5;
            content.hasLogo = hasLogo;
            content.isSelected = false;
            content.scratchValue = 0;
            content.eventData = {};

            content.isOpened = false;
            content.animation = {};
            

            content.animation.intro = (function()
            {
                var tl = new TimelineMax();
                tl.add(function(){ content.animation.pop(); }, "+=0");
            });

            content.animation.pop = (function()
            {
                var tl = new TimelineMax();
                tl.add(function(){ content.showStar(false); }, "+=0");
                tl.add(TweenMax.fromTo(starContainer, 0.25, {alpha:0},  {alpha:1, ease:Quad.easeOut}), "+=0");
                tl.add(function(){ content.showStar(true); }, "+=0");
                tl.add(TweenMax.fromTo(starContainer.scale, 2, {x:starScale * 0.5, y:starScale * 0.5},  {x: starScale, y: starScale, ease:Elastic.easeOut}), "-=0.25");
            });

            content.animation.showItem = (function()
            {
                if(content.hasLogo) {
                    item.texture = res['lactum_logo'].texture;
                    item.alpha = 1;
                    soundManager.playSound('success');
                }
            });

            content.animation.chestParticle = (function()
            {
                splashParticles.emitter.emit = true;
            });

            content.showStar = (function(value) {
                starButton.interactive = value;
                for(var i = 0; i < starArray.length - 1; i++){
                    starArray[i].alpha = value ? 1 : 0;
                }
            });


            starButton.on('pointerdown', (function(eventData) {
                content.onMouseOver();
            }).bind(content));

            starButton.on('pointerup', (function(eventData) {
                content.onMouseOut();
            }).bind(content));

            starButton.on('pointerupoutside', (function(eventData) {
                content.onMouseOut();
            }).bind(content));

            starButton.on('pointermove', (function(eventData) {
                content.onMouseMove(eventData);
            }).bind(content));

            content.onMouseOver = (function() {
                starSelect.alpha = 0;
                content.isSelected = true;
            });

            content.onMouseOut = (function() {
                starSelect.alpha = 0;
                content.isSelected = false;
            });

            content.onMouseMove = (function(eventData) {
                if(content.isSelected){
                    var posX = eventData.data.global.x;
                    content.scratchValue += content.eventData.x ? Math.abs(eventData.data.global.x - content.eventData.x) : 0;
                    if(content.scratchValue >= 200){
                        content.scratchValue = 0;
                        content.animation.scratch();
                    }
                    content.eventData.x = posX;
                }
            });

            content.animation.scratch = (function() {
                if(content.durability > 1)
                {
                    var tl = new TimelineMax();
                    tl.add(TweenMax.fromTo(starArray[content.durability - 1], 0.25, {alpha:1},  {alpha:0, ease:Quad.easeOut}));
                    content.durability -= 1;
                    if(!content.isOpened) {
                        content.animation.showItem();
                        content.isOpened = true;
                        openedChestCount += 1;
                        checkOpenedChest();
                    }
                }
            });


            viewContainer.addChild(starContainer);

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

            res =  AssetLoaderManager.getInstance().getRes();

            viewContainer = new PIXI.Container();

            stageManager.getContainer().addChild(viewContainer);

            splashEmitterConfig = particleManager.getEmitterConfig('splashEmitterConfig');
            rayEmitterConfig = particleManager.getEmitterConfig('rayEmitterConfig');
            logoRayEmitterConfig = particleManager.getEmitterConfig('logoRayEmitterConfig');

            var items = new Array();
            for(var i = 0; i < 4; i++)
            {
                items.push(false);
            }

            var numOfLogo = window.scratchWin ? window.scratchWin.numOfLogo : 0;

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
                    tl.add(function(){ chests.push(createStar({x: (width * multiplier) + offset}, item)); }, "+=0.2");
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
