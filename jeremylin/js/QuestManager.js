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
        assets.push(new Asset('images-icon-mohawk', 'images/icon_mohawk.png'));

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

        function createSpine(id, container, spineName, skinName, x, y, scale)
        {
            var spineManager = SpineManager.getInstance();
            var spine = spineManager.createSpine(spineName, skinName, x, y, scale);
            container.addChild(spine);

            var content = {};
            content.id = id;

            spine.content = content;

            elements.push(spine);

            return spine;
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

        function createText(id, container, text, style)
        {
            var richText = new PIXI.Text(text, style);

            container.addChild(richText);

            var content = {};
            content.id = id;

            richText.content = content;

            elements.push(richText);

            return richText;
        }

        function createGraphic(id, container, width, height, color)
        {
            var graphic = new PIXI.Graphics();
            graphic
            .beginFill(color)
            .drawRect(0, 0, width, height)
            .endFill();

            container.addChild(graphic);

            var content = {};
            content.id = id;

            graphic.content = content;

            elements.push(graphic);

            return graphic;
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
            elements = new Array();

            stageManager = StageManager.getInstance();
            res =  AssetLoaderManager.getInstance().getRes();

            var canvasContainer = createContainer('mainContainer', stageManager.getContainer());
            canvasContainer.content.setLayout = function () {
                canvasContainer.scale.x = canvasContainer.scale.y = 1;
                canvasContainer.position.x = stageManager.getDimension().canvasWidth * 0.5;
                canvasContainer.position.y = stageManager.getDimension().canvasHeight * 0.5;
            }
            stageManager.addCallBack(canvasContainer.content.setLayout);

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

            var spineCharacterObj = createSpine('characterSpine', backgroundContainer, 'jlin', 'braid', 0, 0, 1);

            var headerObj = createImage('header', backgroundContainer, res['images-header'].texture);
            headerObj.anchor.set(0.5);
            headerObj.position.y = -(backgroundObj.content.height * 0.5) + (headerObj.height * 0.5);

            var footerObjBottom = createImage('footerBottom', backgroundContainer, res['images-white'].texture);
            footerObjBottom.tint = 0x292929;
            footerObjBottom.anchor.set(0.5);
            footerObjBottom.width = backgroundObj.content.width;
            footerObjBottom.height = 300;
            footerObjBottom.position.y = (backgroundObj.content.height * 0.5) - (footerObjBottom.height * 0.5);

            var footerObjTop = createImage('footerBottom', backgroundContainer, res['images-white'].texture);
            footerObjTop.anchor.set(0.5);
            footerObjTop.width = backgroundObj.content.width;
            footerObjTop.height = 80;
            footerObjTop.position.y = footerObjBottom.position.y - (footerObjBottom.height * 0.5) - (footerObjTop.height * 0.5);

            var iconMohawkObj = createImage('iconMohawk', backgroundContainer, res['images-icon-mohawk'].texture);
            iconMohawkObj.anchor.set(0.5);
            iconMohawkObj.position.x = -300;
            iconMohawkObj.position.y = footerObjTop.position.y;

            var iconMohawkObjText = createText('iconMohawkText', backgroundContainer, 'Collect 5 Pins to Unlock the 6th!', new PIXI.TextStyle({
                fontFamily: 'Arial',
                fontSize: 40,
                fontStyle: 'normal',
                fill: '#777777', // gradient
            }));
            iconMohawkObjText.anchor.set(0.5);
            iconMohawkObjText.position.x = iconMohawkObj.width * 0.5;
            iconMohawkObjText.position.y = iconMohawkObj.position.y;

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
