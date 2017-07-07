"use strict";
var QuestManager = (function () {

    // Instance stores a reference to the Singleton
    var instance;

    function init() {

        // Singleton Init
        var stageManager;
        var res;

        var dataObject = [
            {sku: 'braid', spineName:'jlin', skinName:'braid', isActivated: false, scale: 1, iconName: 'images-icon-braid'},
            {sku: 'buzz', spineName:'jlin', skinName:'buzz', isActivated: false, scale: 1, iconName: 'images-icon-buzz'},
            {sku: 'logo', spineName:'jlin-logo', skinName:'logo', isActivated: false, scale: 1, iconName: 'images-icon-logo'},
            {sku: 'bun', spineName:'jlin', skinName:'bun', isActivated: false, scale: 1, iconName: 'images-icon-bun'},
            {sku: 'slickback', spineName:'jlin', skinName:'slickback', isActivated: false, scale: 1, iconName: 'images-icon-slick'}
        ];

        var assets = new Array();

        assets.push(new Asset('images-white', 'images/white.png'));
        assets.push(new Asset('images-transparent', 'images/transparent.png'));
        assets.push(new Asset('images-bg', 'images/bg.png'));
        assets.push(new Asset('images-gradient-black', 'images/gradient_black.png'));
        assets.push(new Asset('images-gradient-gold', 'images/gradient_gold.png'));
        assets.push(new Asset('images-header', 'images/header.png'));
        assets.push(new Asset('images-poweredby', 'images/poweredby.png'));
        assets.push(new Asset('images-icon-mohawk', 'images/icon_mohawk.png'));
        assets.push(new Asset('images-slot', 'images/slot.png'));
        assets.push(new Asset('images-slot-mask', 'images/slot_mask.png'));
        assets.push(new Asset('images-icon-braid', 'images/icon_braid.png'));
        assets.push(new Asset('images-icon-buzz', 'images/icon_buzz.png'));
        assets.push(new Asset('images-icon-bun', 'images/icon_bun.png'));
        assets.push(new Asset('images-icon-slick', 'images/icon_slick.png'));
        assets.push(new Asset('images-icon-logo', 'images/icon_logo.png'));

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

        function createSpine(id, container, spineJsonData)
        {
            var spineManager = SpineManager.getInstance();
            var spine = spineManager.createSpine(spineJsonData);
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

        function getSKU(sku)
        {
            return dataObject.find(function(item){return item.sku === sku});
        }

        function getSKUIndex(sku)
        {
            return dataObject.findIndex(function(item){return item.sku === sku});
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

        function initMainCanvas()
        {
            stageManager = StageManager.getInstance();
            var canvasContainer = createContainer('canvasContainer', stageManager.getContainer());
            canvasContainer.content.setLayout = function () {
                canvasContainer.scale.x = canvasContainer.scale.y = 1;
                canvasContainer.position.x = stageManager.getDimension().canvasWidth * 0.5;
                canvasContainer.position.y = stageManager.getDimension().canvasHeight * 0.5;
            }
            stageManager.addCallBack(canvasContainer.content.setLayout);
        }

        function initBackground()
        {
            var canvasContainer = getElement('canvasContainer');
            var backgroundObj = createImage('backgroundObj', canvasContainer, res['images-bg'].texture);
            backgroundObj.anchor.set(0.5);
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
            var backgroundObj = getElement('backgroundObj');
            var backgroundContainer = createContainer('backgroundContainer', backgroundObj);

            var backgroundContainerMask = new PIXI.Graphics();
            backgroundContainerMask
            .beginFill(0xFFFFFF)
            .drawRect(-(backgroundObj.content.width * 0.5), -(backgroundObj.content.height * 0.5), backgroundObj.content.width + 1, backgroundObj.content.height + 1)
            .endFill();
            backgroundContainer.addChild(backgroundContainerMask);
            backgroundContainer.mask = backgroundContainerMask;

            var characterData = getSKU(activate.sku);

            characterData.isActivated = true;

            var spineJsonData = {spineName: characterData.spineName, skinName: characterData.skinName, position:{x: 0, y:0}, scale: 1, animationName: 'summon_appear', loop: false};
            var spineCharacterObj = createSpine('characterSpine', backgroundContainer, spineJsonData);

            var activatedContainer = createContainer('activatedContainer', backgroundContainer);
            var unlockedContainer = createContainer('unlockedContainer', backgroundContainer);

            var activatedObj = createImage('activatedObj', activatedContainer, res['images-gradient-black'].texture);
            activatedObj.anchor.set(0.5);

            var unlockedObj = createImage('unlockedObj', unlockedContainer, res['images-gradient-gold'].texture);
            unlockedObj.anchor.set(0.5);

            activatedContainer.visible = true;
            unlockedContainer.visible = false;

            var activateTitleObjText = createText('activateTitleObjText', activatedObj, ' ' + 'Activated' + ' ', new PIXI.TextStyle({
                fontFamily: 'Arial',
                fontSize: 60,
                fontStyle: 'italic',
                fontWeight: 'bold',
                fill: '#ffffff'
            }));
            activateTitleObjText.anchor.set(0.5);
            activateTitleObjText.position.y = -20;

            var activateCodeObjText = createText('activateCodeObjText', activatedObj, 'Serial Code', new PIXI.TextStyle({
                fontFamily: 'Arial',
                fontSize: 40,
                fontStyle: 'normal',
                fill: '#ffffff'
            }));
            activateCodeObjText.anchor.set(0.5);
            activateCodeObjText.position.y = 30;
        }

        function initHeader()
        {
            var backgroundObj = getElement('backgroundObj');
            var backgroundContainer = getElement('backgroundContainer');

            var headerObj = createImage('header', backgroundContainer, res['images-header'].texture);
            headerObj.anchor.set(0.5);
            headerObj.position.y = -(backgroundObj.content.height * 0.5) + (headerObj.height * 0.5);
        }

        function initFooter()
        {
            var backgroundObj = getElement('backgroundObj');

            var footerContainer = createContainer('footerContainer', backgroundObj);

            var footerObjBottom = createImage('footerBottom', footerContainer, res['images-white'].texture);
            footerObjBottom.tint = 0x292929;
            footerObjBottom.anchor.set(0.5);
            footerObjBottom.width = backgroundObj.content.width;
            footerObjBottom.height = 300;
            footerObjBottom.position.y = (backgroundObj.content.height * 0.5) - (footerObjBottom.height * 0.5);

            var footerObjTop = createImage('footerTop', footerContainer, res['images-white'].texture);
            footerObjTop.anchor.set(0.5);
            footerObjTop.width = backgroundObj.content.width;
            footerObjTop.height = 80;
            footerObjTop.position.y = footerObjBottom.position.y - (footerObjBottom.height * 0.5) - (footerObjTop.height * 0.5);

            var footerObjPoweredBy = createImage('footerPoweredBy', footerContainer, res['images-poweredby'].texture);
            footerObjPoweredBy.anchor.set(0.5);
            footerObjPoweredBy.position.y = (backgroundObj.content.height * 0.5) - (footerObjPoweredBy.height * 0.5) - 30;

            var iconMohawkObj = createImage('iconMohawk', footerContainer, res['images-icon-mohawk'].texture);
            iconMohawkObj.anchor.set(0.5);
            iconMohawkObj.position.x = -300;
            iconMohawkObj.position.y = footerObjTop.position.y - 30;

            var iconMohawkObjText = createText('iconMohawkText', footerContainer, 'Collect 5 Pins to Unlock the 6th!', new PIXI.TextStyle({
                fontFamily: 'Arial',
                fontSize: 40,
                fontStyle: 'normal',
                fill: '#777777'
            }));
            iconMohawkObjText.anchor.set(0.5);
            iconMohawkObjText.position.x = iconMohawkObj.width * 0.5;
            iconMohawkObjText.position.y = footerObjTop.position.y;

            for(var i = 0; i < dataObject.length; i++)
            {
                var slotCharacterObj = createImage('slotCharacter' + i, footerContainer, res['images-slot'].texture);
                slotCharacterObj.anchor.set(0.5);
                slotCharacterObj.scale.set(0.69);
                slotCharacterObj.position.x = -285 + ((slotCharacterObj.width + 5) * i);
                slotCharacterObj.position.y = footerObjBottom.position.y - 30;

                slotCharacterObj.content.container = new PIXI.Container();

                slotCharacterObj.content.container.width = slotCharacterObj.width;
                slotCharacterObj.content.container.height = slotCharacterObj.height;

                slotCharacterObj.content.textureMask = new PIXI.Sprite(res['images-slot-mask'].texture);
                slotCharacterObj.content.textureMask.anchor.set(0.5);

                slotCharacterObj.content.container.addChild(slotCharacterObj.content.textureMask);

                slotCharacterObj.content.container.mask = slotCharacterObj.content.textureMask;
                slotCharacterObj.addChild(slotCharacterObj.content.container);

                // slotCharacterObj.content.spineCharacter = createSpine('slotCharacterSpine' + i, slotCharacterObj.content.container, dataObject[i].skinData, dataObject[i].skinName, 0, 0, dataObject[i].scale);
                // slotCharacterObj.content.spineCharacter.position.y = dataObject[i].position.y;

                slotCharacterObj.content.iconCharacter = createImage('slotCharacterIcon' + i, slotCharacterObj.content.container, res[dataObject[i].iconName].texture);
                slotCharacterObj.content.iconCharacter.anchor.set(0.5);
                slotCharacterObj.content.iconCharacter.visible = dataObject[i].isActivated;

                slotCharacterObj.content.iconQuestionMark = createText('slotQuestionMark' + i, slotCharacterObj.content.container, '?', new PIXI.TextStyle({
                    fontFamily: 'Arial',
                    fontSize: 150,
                    fontStyle: 'normal',
                    fontWeight: 'bold',
                    fill: '#777777'
                }));
                slotCharacterObj.content.iconQuestionMark.anchor.set(0.5);
                slotCharacterObj.content.iconQuestionMark.visible = !dataObject[i].isActivated;

            }
        }

        function setup()
        {
            console.log('Setting up User Interface...');
            elements = new Array();

            res =  AssetLoaderManager.getInstance().getRes();

            initMainCanvas();

            initBackground();

            initMainContent();

            initHeader();

            initFooter();

            console.log('User Interface Complete!');

            show();
        }

        function show()
        {
            console.log(getSKUIndex(activate.sku));

            // var characterSpine = getElement('characterSpine');
            // characterSpine.scale.set(3);
            // TweenMax.to(characterSpine.scale, 0.5, {x: 1, y: 1, ease: Linear.none}).delay(.1);
            //
            // var activatedContainer = getElement('activatedContainer');
            // TweenMax.fromTo(activatedContainer.position, .5, {x: -(stageManager.getDimension().width)}, {x: 0, ease: Power2.easeOut}).delay(.6);
            //
            // var activateCodeObjText = getElement('activateCodeObjText');
            // TweenMax.fromTo(activateCodeObjText, .5, {alpha: 0}, {alpha: 1, ease: Power2.easeOut}).delay(1.5);
            //
            // var footerContainer = getElement('footerContainer');
            // TweenMax.fromTo(footerContainer.position, .5, {y: 450}, {y: 0, ease: Power2.easeOut}).delay(1);
            //
            // var characterIcon = getElement('slotCharacterIcon' + getSKUIndex(activate.sku));
            // characterIcon.scale.set(3);
            // TweenMax.to(characterIcon.scale, 0.5, {x: 1, y: 1, ease: Power2.easeOut}).delay(2);

            var tl = new TimelineMax();

            var characterSpine = getElement('characterSpine');
            tl.from(characterSpine.scale, 0.5, {x: 3, y: 3, ease: Linear.none})

            var activatedContainer = getElement('activatedContainer');
            tl.from(activatedContainer.position, 0.5, {x: -(stageManager.getDimension().canvasWidth + (activatedContainer.width * 0.5)), ease: Power2.easeOut});

            var footerContainer = getElement('footerContainer');
            tl.from(footerContainer.position, 0.5, {y: 450, ease: Power2.easeOut});

            var iconMohawkObjText = getElement('iconMohawkText');
            tl.from(iconMohawkObjText, 0.5, {alpha: 0, ease: Power2.easeOut});

            var activateCodeObjText = getElement('activateCodeObjText');
            tl.from(activateCodeObjText, 0.5, {alpha: 0, ease: Power2.easeOut}, "-=0.25");

            var characterIcon = getElement('slotCharacterIcon' + getSKUIndex(activate.sku));
            tl.from(characterIcon, 0.5, {alpha: 0, ease: Power2.easeOut}, "-=0.25");
            tl.from(characterIcon.scale, 0.5, {x: 3, y: 3, ease: Power2.easeOut}, "-=0.5");

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
