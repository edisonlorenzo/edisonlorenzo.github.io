"use strict";
var GameManager = (function () {

    // Instance stores a reference to the Singleton
    var instance;

    function init() {

        // Singleton Init

        var stageManager;
        var soundManager;
        var res;

        var chestContainer;

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

        function createChest(imageRes, position)
        {
            var content = {};
            var image = new PIXI.Sprite(imageRes);
            image.interactive = true;
            image.anchor.x = 0.35;
            image.anchor.y = 0.6;
            image.scale.x = image.scale.y = 0.8;
            image.position.x = position.x + (image.width * 0.35);
            image.position.y = stageManager.getDimension().height * 0.5;

            content.isOpened = false;
            content.animation = {};
            content.animation.shake = (function()
            {
                CustomWiggle.create("funWiggle", {wiggles:6, type:"easeOut"});
                TweenMax.fromTo(image, 0.5, {rotation:0},  {rotation:0.5, ease:"funWiggle"});
            });

            content.animation.chestOpen = (function()
            {
                image.texture = res['chest_open'].texture;
                soundManager.playSound('point', 0);
            });

            image.on('pointertap', (function() {
                if(!content.isOpened)
                {
                    var tl = new TimelineMax();
                    tl.add(this.animation.shake);
                    tl.add(this.animation.chestOpen, "+=0.5");
                    content.isOpened = true;
                }
            }).bind(content));

            chestContainer.addChild(image);

            return image;
        }

        function setup()
        {

            stageManager = StageManager.getInstance();
            soundManager = SoundManager.getInstance();

            elements = new Array();

            chestContainer = new PIXI.Container();

            stageManager.getContainer().addChild(chestContainer);

            res =  AssetLoaderManager.getInstance().getRes();

            var chestObj1 = createChest(res['chest_closed'].texture, {x: 40});
            var chestObj2 = createChest(res['chest_closed'].texture, {x: 225});
            var chestObj3 = createChest(res['chest_closed'].texture, {x: 415});
            var chestObj4 = createChest(res['chest_closed'].texture, {x: 605});

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
