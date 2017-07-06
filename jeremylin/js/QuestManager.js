"use strict";
var QuestManager = (function () {

    // Instance stores a reference to the Singleton
    var instance;

    function init() {

        // Singleton Init
        var stageManager;
        var res;

        var backgroundContainer;
        var footerContainer;
        var questContainer;
        var dialogContainer;

        var assets = new Array();

        assets.push(new Asset('images-white', 'images/white.png'));
        assets.push(new Asset('images-transparent', 'images/transparent.png'));
        assets.push(new Asset('images-bg', 'images/bg.png'));
        assets.push(new Asset('images-header', 'images/header.png'));

        function Asset(resName, resPath)
        {
            this.resName = resName;
            this.resPath = resPath;
        }

        function getAsset()
        {
            return assets;
        }

        function createImage(id, container, imageRes)
        {
            var image = new PIXI.Sprite(imageRes);
            container.addChild(image);

            var content = {};
            content.id = id;
            content.hasClicked = false;

            image.content = content;

            elements.push(image);

            return image;
        }

        function createContainer(id, parent)
        {
            var container = new PIXI.Container();
            parent.addChild(container);

            var content = {};
            content.id = id;

            container.content = content;

            elements.push(container);

            return container;
        }

        // function parseJsonString()
        // {
        //     var json = jsonString, jsonObj = JSON && JSON.parse(json) || $.parseJSON(json);
        //     console.log(jsonObj);
        //
        //     jsonObject = new Array();
        //     for(var key in jsonObj)
        //     {
        //         if (jsonObj.hasOwnProperty(key)) {
        //             if(jsonObj[key].quest_id == questId && jsonObj[key].type == 'item')
        //             {
        //                 jsonObject.push(jsonObj[key]);
        //                 console.log(jsonObj[key]);
        //             }
        //         }
        //     }
        //
        //     jsonObject.sort(function(a, b) {
        //         return parseInt(a.order) - parseInt(b.order);
        //     });
        //
        //     console.log(jsonObject);
        // }
        //
        // function getJsonObject(sku)
        // {
        //     return jsonObject.find(function(item){return item.sku === sku});
        // }

        function setup()
        {
            stageManager = StageManager.getInstance();

            elements = new Array();

            var canvasContainer = createContainer('mainContainer', stageManager.getContainer());
            canvasContainer.content.setLayout = function () {
                canvasContainer.scale.x = canvasContainer.scale.y = 1;
                canvasContainer.position.x = stageManager.getDimension().canvasWidth * 0.5;
                canvasContainer.position.y = stageManager.getDimension().canvasHeight * 0.5;
            }

            stageManager.addCallBack(canvasContainer.content.setLayout);

            res =  AssetLoaderManager.getInstance().getRes();

            var backgroundObj = createImage('mainbg', canvasContainer, res['images-bg'].texture);
            backgroundObj.anchor.set(0.5);
            backgroundObj.content.width = backgroundObj.width;
            backgroundObj.content.height = backgroundObj.height;
            backgroundObj.content.setLayout = function () {
                backgroundObj.scale.x = backgroundObj.scale.y = 1;
                backgroundObj.scale.x = backgroundObj.scale.y = stageManager.getDimension().calculateRatioBoth('height', backgroundObj.width, backgroundObj.height, 1, 1);
            }
            stageManager.addCallBack(backgroundObj.content.setLayout);


            backgroundContainer = createContainer('bgContainer', backgroundObj);
            backgroundContainer.content.setLayout = function () {
                backgroundContainer.scale.x = backgroundContainer.scale.y = 1;
                backgroundContainer.position.x = backgroundObj.width * 0.5;
                backgroundContainer.position.y = backgroundObj.height * 0.5;
            }

            var headerObj = createImage('header', backgroundContainer, res['images-header'].texture);
            headerObj.anchor.set(0.5);
            headerObj.content.setLayout = function () {
                headerObj.scale.x = headerObj.scale.y = 1;
                headerObj.position.y = -(backgroundObj.content.height * 0.5) + (headerObj.height * 0.5);
            }
            stageManager.addCallBack(headerObj.content.setLayout);

        }

        function setJsonString(value)
        {
            //jsonString = value;
        }

        var elements;

        function getElement(id)
        {
            return elements.find(function(item){return item.content.id === id});
        }

        return {
            getAsset: getAsset,
            setJsonString: setJsonString,
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
