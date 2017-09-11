"use strict";
var SceneManager = (function () {

    // Instance stores a reference to the Singleton
    var instance;

    function init() {

        // Singleton Init

        var assetLoaderManager;
        var stageManager;
        var interfaceManager;
        var soundManager;
        var libraryManager;

        var res;
        var tl;

        var scenes = {};

        var assets = new Array();

        assets.push(new Asset('img_bg', 'images/img_bg.png'));
        assets.push(new Asset('img_white', 'images/img_white.png'));
        assets.push(new Asset('img_loading_police', 'images/img_loading_police.png'));
        assets.push(new Asset('img_loading_mask', 'images/img_loading_mask.png'));
        assets.push(new Asset('txt_loading', 'images/txt_loading.png'));

        function Asset(resName, resPath)
        {
            this.resName = resName;
            this.resPath = resPath;
        }

        function getAsset()
        {
            return assets;
        }

        function setup()
        {

            initManagers();

            initResourceData();

            initMainCanvas();

            initBackground();

            initMainContent();

            initScenes();

            initTimeLinedTween();

            start();

        }

        function start()
        {
            loadAdditionalAssets(interfaceManager.showHeader);
        }

        function loadAdditionalAssets()
        {

            scenes.loadingScene.show();

            assetLoaderManager.addAsset(interfaceManager.getAsset());
            assetLoaderManager.addAsset(soundManager.getAsset());
            assetLoaderManager.onReady(assetReady);
            assetLoaderManager.load();

            function assetReady()
            {
                initResourceData();

                interfaceManager.setup();

                tl.add(scenes.loadingScene.hide, "+=1");
                tl.add(interfaceManager.showHeader, "+=0");
                tl.add(interfaceManager.showFooter, "+=0");
                tl.add(interfaceManager.showHeaderStatus, "+=0.5");
                tl.add(interfaceManager.showMission, "+=0");
                tl.add(interfaceManager.showHeaderFlicker, "+=1");
            }

        }


        function initScenes()
        {
            initLoadingScene();
        }

        function initTimeLinedTween()
        {
            tl = new TimelineMax();
        }

        function initResourceData()
        {
            res =  assetLoaderManager.getRes();
        }

        function initManagers()
        {
            assetLoaderManager = AssetLoaderManager.getInstance();
            interfaceManager = InterfaceManager.getInstance();
            stageManager = StageManager.getInstance();
            soundManager = SoundManager.getInstance();
            libraryManager = LibraryManager.getInstance();
        }

        function initMainCanvas()
        {
            var canvasContainer = libraryManager.createContainer('canvasContainer', stageManager.getContainer());
            canvasContainer.content.setLayout = function () {
                canvasContainer.scale.x = canvasContainer.scale.y = 1;
                canvasContainer.position.x = stageManager.getDimension().canvasWidth * 0.5;
                canvasContainer.position.y = stageManager.getDimension().canvasHeight * 0.5;
            }
            stageManager.addCallBack(canvasContainer.content.setLayout);
        }

        function initBackground()
        {
            var canvasContainer = libraryManager.getElement('canvasContainer');
            var backgroundObj = libraryManager.createImage('backgroundObj', canvasContainer, res['img_bg'].texture);
            backgroundObj.tint = 0x000000;
            backgroundObj.content.width = backgroundObj.width;
            backgroundObj.content.height = backgroundObj.height;

            backgroundObj.content.setLayout = function () {
                backgroundObj.scale.x = backgroundObj.scale.y = 1;
                backgroundObj.scale.x = backgroundObj.scale.y = stageManager.getDimension().calculateRatioBoth('height', backgroundObj.width, backgroundObj.height, 1, 1);
            }
            stageManager.addCallBack(backgroundObj.content.setLayout);
        }

        function initMainContent()
        {
            var backgroundObj = libraryManager.getElement('backgroundObj');
            var backgroundContainer = libraryManager.createContainer('backgroundContainer', backgroundObj);
            var foregroundContainer = libraryManager.createContainer('foregroundContainer', backgroundObj);
            var topContainer = libraryManager.createContainer('topContainer', backgroundObj);

            var backgroundContainerMask = libraryManager.createImage('backgroundContainerMask', backgroundContainer, res['img_white'].texture);
            backgroundContainerMask.width = backgroundObj.content.width;
            backgroundContainerMask.height = backgroundObj.content.height;

            backgroundContainer.mask = backgroundContainerMask;
        }

        function initLoadingScene()
        {
            scenes.loadingScene = {};
            var backgroundContainer = libraryManager.getElement('backgroundContainer');

            var loadingSceneContainer = libraryManager.createContainer('loadingSceneContainer', backgroundContainer);
            loadingSceneContainer.visible = false;

            var loadingImage = libraryManager.createImage('loadingImage', loadingSceneContainer, res['img_loading_police'].texture);
            loadingImage.position.y = -70;

            var loadingText = libraryManager.createImage('loadingText', loadingSceneContainer, res['txt_loading'].texture);
            loadingText.position.y = 70;

            var loadingImageMask = libraryManager.createImage('loadingImageMask', loadingSceneContainer, res['img_loading_mask'].texture);
            loadingImageMask.position.y = -320;
            loadingSceneContainer.mask = loadingImageMask;

            loadingSceneContainer.content.loadingImageMask = loadingImageMask;

            loadingSceneContainer.content.show = (function() {
                this.visible = true;
                TweenMax.fromTo(this, 0.5, {alpha: 0}, {alpha: 1, ease: Power2.easeOut});
            }).bind(loadingSceneContainer);

            loadingSceneContainer.content.hide = (function() {
                this.visible = true;
                TweenMax.fromTo(this.content.loadingImageMask.position, 1, {y: -320}, {y: 320, ease: Power2.easeOut, onComplete: (function(){this.visible = false;}).bind(this)});
            }).bind(loadingSceneContainer);

            loadingText.content.show = (function() {
                this.visible = true;
                TweenMax.fromTo(this, 0.5, {alpha: 0}, {alpha: 1, ease: Power2.easeOut, repeat: -1, yoyo: true});
            }).bind(loadingText);

            var objects = {};
            objects.loadingSceneContainer = loadingSceneContainer;
            objects.loadingText = loadingText;

            scenes.loadingScene.show = (function () {
                this.loadingSceneContainer.content.show();
                this.loadingText.content.show();
            }).bind(objects);

            scenes.loadingScene.hide = (function () {
                this.loadingSceneContainer.content.hide();
            }).bind(objects);

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
