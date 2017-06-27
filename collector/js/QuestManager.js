"use strict";
var QuestManager = (function () {
    
    // Instance stores a reference to the Singleton
    var instance;

    function init() {

        // Singleton Init
        var jsonString;
        var jsonObject;
        var questId = 'toyconuk2017';
        
        var stageManager;
        var res;

        var backgroundContainer;
        var footerContainer;
        var questContainer;
        var dialogContainer;
        
        var assets = new Array();
        
        assets.push(new Asset('white', 'images/white.png'));
        assets.push(new Asset('transparent', 'images/transparent.png'));
        assets.push(new Asset('tc_quest_bg', 'images/tc_quest_bg.png'));
        assets.push(new Asset('q_form_bg', 'images/q_form_bg.png'));
        assets.push(new Asset('q_footer', 'images/q_footer.png'));
        assets.push(new Asset('q_collect', 'images/q_collect.png'));
        assets.push(new Asset('q_help', 'images/q_help.png'));
        assets.push(new Asset('q_status_bg', 'images/q_status_bg.png'));
        assets.push(new Asset('tc_quest_header_small', 'images/tc_quest_header_small.png'));
        assets.push(new Asset('q_medallion', 'images/q_medallion.png'));
        assets.push(new Asset('q_card', 'images/q_card.png'));
        assets.push(new Asset('q_help_info', 'images/q_help_info.png'));
        assets.push(new Asset('tc_close', 'images/tc_close.png'));
        assets.push(new Asset('rounded_rectangle', 'images/rounded_rectangle.png'));
        
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
            var content = {};
            var image = new PIXI.Sprite(imageRes);

            container.addChild(image);
            
            content.id = id;
            content.hasClicked = false;
            content.image = image;
            
            elements.push(content);
            
            return content;
        }
        
        function parseJsonString()
        {
            var json = jsonString, jsonObj = JSON && JSON.parse(json) || $.parseJSON(json);
            console.log(jsonObj);
            
            jsonObject = new Array();
            for(var key in jsonObj)
            {
                if (jsonObj.hasOwnProperty(key)) {
                    if(jsonObj[key].quest_id == questId && jsonObj[key].type == 'item')
                    {
                        jsonObject.push(jsonObj[key]);
                        console.log(jsonObj[key]); 
                    }
                }
            }
            
            jsonObject.sort(function(a, b) {
                return parseInt(a.order) - parseInt(b.order);
            });
            
            console.log(jsonObject);
        }
        
        function getJsonObject(sku)
        {
            return jsonObject.find(function(item){return item.sku === sku});
        }
        
        function setup()
        {
            parseJsonString();
            
            console.log(getJsonObject('toyconuk2017quest_wego_custom_show'));
            
            stageManager = StageManager.getInstance();
            
            elements = new Array();
            
            backgroundContainer = new PIXI.Container();
            footerContainer = new PIXI.Container();
            questContainer = new PIXI.Container();
            dialogContainer = new PIXI.Container();

            stageManager.getContainer().addChild(backgroundContainer);
            stageManager.getContainer().addChild(questContainer);
            stageManager.getContainer().addChild(footerContainer);
            stageManager.getContainer().addChild(dialogContainer);
            
            res =  AssetLoaderManager.getInstance().getRes();

            var backgroundObj = createImage('mainbg', backgroundContainer, res['tc_quest_bg'].texture);
            backgroundObj.image.scale.x = backgroundObj.image.scale.y = stageManager.getDimension().calculateRatioBoth('height', backgroundObj.image.width, backgroundObj.image.height, 1, 1);
            
            var questObj = createImage('mainQuest', questContainer, res['q_form_bg'].texture);
            questObj.image.anchor.set(0.5);
            questObj.image.scale.x = questObj.image.scale.y = stageManager.getDimension().calculateRatioByWidth(questObj.image.width, 1);
            questObj.image.position.x = stageManager.getDimension().width * 0.5;
            questObj.image.position.y = stageManager.getDimension().height * 0.45;
            
            var questHeaderObj = createImage('mainQuest_header', questObj.image, res['tc_quest_header_small'].texture);
            questHeaderObj.image.anchor.x = 0.5;
            questHeaderObj.image.scale.x = questHeaderObj.image.scale.y = (questObj.image.width / questHeaderObj.image.width);
            questHeaderObj.image.position.y = -(questObj.image.height * 0.52);
            questHeaderObj.image.position.x = 0;
            
            var questHeaderSubTextObj = createImage('mainQuest_subHeader', questObj.image, res['white'].texture);
            questHeaderSubTextObj.image.tint = 0x13c7f0;
            questHeaderSubTextObj.image.anchor.x = 0.5;
            questHeaderSubTextObj.image.scale.x = (questObj.image.width / questHeaderSubTextObj.image.width);
            questHeaderSubTextObj.image.scale.y = (questObj.image.height / questHeaderSubTextObj.image.height) * 0.10;
            questHeaderSubTextObj.image.position.y = questHeaderObj.image.position.y + questHeaderObj.image.height + 10;
            questHeaderSubTextObj.image.position.x = 0;
            
            var questContentObj = createImage('mainQuest_content', questObj.image, res['transparent'].texture);
            questContentObj.image.anchor.x = 0.5;
            questContentObj.image.scale.x = questContentObj.image.scale.y = (questObj.image.width / questContentObj.image.width);
            questContentObj.image.position.y = questHeaderSubTextObj.image.position.y + questHeaderSubTextObj.image.height + 10;
            questContentObj.image.position.x = 0;
            
            for(var i=0; i < jsonObject.length; i++)
            {
                var questBtn = createImage('mainQuest_questBtn'+i, questContentObj.image, res['q_medallion'].texture);
                questBtn.image.anchor.x = 0.5;
                questBtn.image.scale.x = questBtn.image.scale.y = 0.05;
                questBtn.image.position.y = (Math.floor(i / 3) * 10) + 1;
                questBtn.image.position.x = ((i % 3)-1) * 11;
                questBtn.image.interactive = true;
                questBtn.sku = jsonObject[i].sku;
      
                questBtn.image.on('pointertap', function () {
                    if(!questBtn.hasClicked)
                    {
                        questBtn.hasClicked = true;
                        showCard(questBtn.sku, function()
                        {
                            questBtn.hasClicked = false;
                        });
                    }
                
                });
            }
            
            
            var footerObj = createImage('footer', footerContainer, res['q_footer'].texture);
            footerObj.image.scale.x = stageManager.getDimension().calculateRatioByWidth(footerObj.image.width, 1);
            footerObj.image.scale.y = stageManager.getDimension().calculateRatioByHeight(footerObj.image.height, .08);
            footerObj.image.position.y = stageManager.getDimension().height - footerObj.image.height + 12;
            
            var collectBtn = createImage('footer_collectBtn', footerContainer, res['q_collect'].texture);
            collectBtn.image.anchor.y = 1;
            collectBtn.image.scale.x = collectBtn.image.scale.y = stageManager.getDimension().calculateRatioByWidth(collectBtn.image.width, 0.2);
            collectBtn.image.position.y = stageManager.getDimension().height;
            collectBtn.image.position.x = 8;
            
            var helpBtn = createImage('footer_helpBtn', footerContainer, res['q_help'].texture);
            helpBtn.image.anchor.y = 1;
            helpBtn.image.scale.x = helpBtn.image.scale.y = stageManager.getDimension().calculateRatioByWidth(helpBtn.image.width, 0.15);
            helpBtn.image.position.y = stageManager.getDimension().height;
            helpBtn.image.position.x = footerObj.image.width - helpBtn.image.width - 5;
            helpBtn.image.interactive = true;
            helpBtn.image.on('pointertap', function () {
                if(!helpBtn.hasClicked)
                {
                    helpBtn.hasClicked = true;
                    showHelp(function()
                    {
                        helpBtn.hasClicked = false;
                    });
                }

            });
            
            var statusObj = createImage('footer_status', footerContainer, res['q_status_bg'].texture);
            statusObj.image.scale.x = stageManager.getDimension().calculateRatioByWidth(statusObj.image.width, 0.6);
            statusObj.image.scale.y = stageManager.getDimension().calculateRatioByHeight(statusObj.image.height, 0.05);
            statusObj.image.position.y = footerObj.image.y + 12;
            statusObj.image.position.x = (stageManager.getDimension().width * 0.5) - (statusObj.image.width * 0.5) + 15;
            
            var dialogBgObj = createImage('cardQuest_background', dialogContainer, res['white'].texture);
            dialogBgObj.image.visible = false;
            dialogBgObj.image.tint = 0x000000;
            dialogBgObj.image.alpha = 0.5;
            dialogBgObj.image.interactive = true;
            dialogBgObj.image.anchor.set(0.5);
            dialogBgObj.image.scale.x = stageManager.getDimension().calculateRatioByWidth(dialogBgObj.image.width, 1);
            dialogBgObj.image.scale.y = stageManager.getDimension().calculateRatioByHeight(dialogBgObj.image.height, 1);
            dialogBgObj.image.position.y = stageManager.getDimension().height * 0.5;
            dialogBgObj.image.position.x = stageManager.getDimension().width * 0.5;
            
            
            var cardObjContainer = new PIXI.Container();
            cardObjContainer.visible = false;
            dialogContainer.addChild(cardObjContainer);
            
            var helpObjContainer = new PIXI.Container();
            helpObjContainer.visible = false;
            dialogContainer.addChild(helpObjContainer);
            
            var cardObj = createImage('cardQuest', cardObjContainer, res['q_card'].texture);
            cardObj.image.anchor.set(0.5);
            cardObj.image.scale.x = cardObj.image.scale.y = stageManager.getDimension().calculateRatioByWidth(cardObj.image.width, 0.9);
            cardObj.image.position.x =  stageManager.getDimension().width * 0.5;
            cardObj.image.position.y =  stageManager.getDimension().height * 0.5;
            
            var cardCloseBtn = createImage('cardQuest_closeBtn', cardObjContainer, res['tc_close'].texture);
            cardCloseBtn.image.anchor.set(0.5);
            cardCloseBtn.image.scale.x = cardCloseBtn.image.scale.y = 1;
            cardCloseBtn.image.position.x = cardObj.image.position.x + (cardObj.image.width * 0.46);
            cardCloseBtn.image.position.y = cardObj.image.position.y - (cardObj.image.height * 0.46);
            cardCloseBtn.image.interactive = true;
            cardCloseBtn.image.on('pointertap', function () {
                if(!cardCloseBtn.hasClicked)
                {
                    cardCloseBtn.hasClicked = true;
                    hideCard(function()
                    {
                        cardCloseBtn.hasClicked = false;
                    });
                }
                
            });
            
            var cardImageObj = createImage('cardQuest_image', cardObjContainer, res['q_medallion'].texture);
            cardImageObj.image.anchor.x = 0.5;
            cardImageObj.image.scale.x = cardImageObj.image.scale.y = 1;
            cardImageObj.image.position.x = cardObj.image.position.x;
            cardImageObj.image.position.y = cardObj.image.position.y - (cardObj.image.height * 0.4);
            
            var cardContentBgObj = createImage('cardQuest_contentBg', cardObjContainer, res['rounded_rectangle'].texture);
            cardContentBgObj.image.anchor.x = 0.5;
            cardContentBgObj.image.scale.x = cardContentBgObj.image.scale.y = (cardObj.image.width * 0.85) / cardContentBgObj.image.width;
            cardContentBgObj.image.position.x = cardObj.image.position.x;
            cardContentBgObj.image.position.y = cardObj.image.position.y - 25;
            
            var helpObj = createImage('helpQuest', helpObjContainer, res['q_help_info'].texture);
            helpObj.image.anchor.set(0.5);
            helpObj.image.scale.x = helpObj.image.scale.y = stageManager.getDimension().calculateRatioByWidth(helpObj.image.width, 0.85);
            helpObj.image.position.x =  stageManager.getDimension().width * 0.5;
            helpObj.image.position.y =  stageManager.getDimension().height * 0.5;
            
            var helpCloseBtn = createImage('helpQuest_closeBtn', helpObjContainer, res['tc_close'].texture);
            helpCloseBtn.image.anchor.set(0.5);
            helpCloseBtn.image.scale.x = helpCloseBtn.image.scale.y = 1;
            helpCloseBtn.image.position.x = helpObj.image.position.x + (helpObj.image.width * 0.5);
            helpCloseBtn.image.position.y = helpObj.image.position.y - (helpObj.image.height * 0.5);
            helpCloseBtn.image.interactive = true;
            helpCloseBtn.image.on('pointertap', function () {
                if(!helpCloseBtn.hasClicked)
                {
                    helpCloseBtn.hasClicked = true;
                    hideHelp(function()
                    {
                        helpCloseBtn.hasClicked = false;
                    });
                }
                
            });
            
            function showCard(sku, callBack)
            {
                TweenMax.fromTo(cardObjContainer.position, 0.5, {y: stageManager.getDimension().height}, {y: 0, ease: Power2.easeOut, onComplete: onComplete});
                TweenMax.fromTo(dialogBgObj.image, 0.5, {alpha: 0}, {alpha: 0.5, ease: Power2.easeOut});
                dialogBgObj.image.visible = true;
                cardObjContainer.visible = true;  
                cardImageObj.image.texture = PIXI.Texture.fromImage(getJsonObject(sku).card_thumbnail_url);

                function onComplete()
                {
                    callBack();
                }
            }

            function hideCard(callBack)
            {
                TweenMax.to(cardObjContainer.position, 0.5, {y: stageManager.getDimension().height, ease: Power2.easeIn, onComplete: onComplete});
                TweenMax.to(dialogBgObj.image, 0.5, {alpha: 0, ease: Power2.easeIn});
                function onComplete()
                {
                    dialogBgObj.image.visible = false;
                    cardObjContainer.visible = false;
                    callBack();
                }
            }
            
            function showHelp(callBack)
            {
                TweenMax.fromTo(helpObjContainer.position, 0.5, {y: stageManager.getDimension().height}, {y: 0, ease: Power2.easeOut, onComplete: onComplete});
                TweenMax.fromTo(dialogBgObj.image, 0.5, {alpha: 0}, {alpha: 0.5, ease: Power2.easeOut});
                dialogBgObj.image.visible = true;
                helpObjContainer.visible = true;  
                function onComplete()
                {
                    callBack();
                }
            }
            
            function hideHelp(callBack)
            {
                TweenMax.to(helpObjContainer.position, 0.5, {y: stageManager.getDimension().height, ease: Power2.easeIn, onComplete: onComplete});
                TweenMax.to(dialogBgObj.image, 0.5, {alpha: 0, ease: Power2.easeIn});
                function onComplete()
                {
                    dialogBgObj.image.visible = false;
                    helpObjContainer.visible = false;
                    callBack();
                }
            }
            
        }
        
        function setJsonString(value)
        {
            jsonString = value;
        }
        
        var elements;
        
        function getElement(id)
        {
            return elements.find(function(item){return item.id === id});
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

