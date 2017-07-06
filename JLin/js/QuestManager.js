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

            backgroundContainer = new PIXI.Container();


            stageManager.getContainer().addChild(backgroundContainer);

            res =  AssetLoaderManager.getInstance().getRes();

            var backgroundObj = createImage('mainbg', backgroundContainer, res['images-bg'].texture);
            backgroundObj.anchor.set(0.5);

            backgroundObj.content.setLayout = function () {
                backgroundObj.scale.x = backgroundObj.scale.y = 1;
                backgroundObj.scale.x = backgroundObj.scale.y = stageManager.getDimension().calculateRatioBoth('width', backgroundObj.width, backgroundObj.height, 1, 1);
                backgroundObj.position.x = stageManager.getDimension().width * 0.5;
                backgroundObj.position.y = stageManager.getDimension().height * 0.5;
            }
            
            stageManager.addCallBack(backgroundObj.content.setLayout);

            // window.addEventListener("resize", function (event) {
            //     backgroundObj.content.setLayout();
            // });


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
