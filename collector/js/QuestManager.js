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
        var cardContainer;
        
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
        assets.push(new Asset('tc_close', 'images/tc_close.png'));
        
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
        
        function setup()
        {
            stageManager = StageManager.getInstance();
            
            elements = new Array();
            
            backgroundContainer = new PIXI.Container();
            footerContainer = new PIXI.Container();
            questContainer = new PIXI.Container();
            cardContainer = new PIXI.Container();

            stageManager.getContainer().addChild(backgroundContainer);
            stageManager.getContainer().addChild(questContainer);
            stageManager.getContainer().addChild(footerContainer);
            stageManager.getContainer().addChild(cardContainer);
            
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
            
            for(var i=0; i < 9; i++)
            {
                var questBtn = createImage('mainQuest_questBtn'+i, questContentObj.image, res['q_medallion'].texture);
                questBtn.image.anchor.x = 0.5;
                questBtn.image.scale.x = questBtn.image.scale.y = 0.05;
                questBtn.image.position.y = (Math.floor(i / 3) * 10) + 1;
                questBtn.image.position.x = ((i % 3)-1) * 11;
                questBtn.image.interactive = true;
                
                questBtn.image.on('pointertap', function () {
                    if(!questBtn.hasClicked)
                    {
                        questBtn.hasClicked = true;
                        showCard(function()
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
            collectBtn.image.scale.x = collectBtn.image.scale.y = stageManager.getDimension().calculateRatioByWidth(collectBtn.image.width, 0.18);
            collectBtn.image.position.y = stageManager.getDimension().height;
            collectBtn.image.position.x = 8;
            
            var helpBtn = createImage('footer_helpBtn', footerContainer, res['q_help'].texture);
            helpBtn.image.anchor.y = 1;
            helpBtn.image.scale.x = helpBtn.image.scale.y = stageManager.getDimension().calculateRatioByWidth(helpBtn.image.width, 0.12);
            helpBtn.image.position.y = stageManager.getDimension().height;
            helpBtn.image.position.x = footerObj.image.width - helpBtn.image.width - 5;
            
            var statusObj = createImage('footer_status', footerContainer, res['q_status_bg'].texture);
            statusObj.image.scale.x = stageManager.getDimension().calculateRatioByWidth(statusObj.image.width, 0.6);
            statusObj.image.scale.y = stageManager.getDimension().calculateRatioByHeight(statusObj.image.height, 0.05);
            statusObj.image.position.y = footerObj.image.y + 12;
            statusObj.image.position.x = (stageManager.getDimension().width * 0.5) - (statusObj.image.width * 0.5) + 15;
            
            var cardBgObj = createImage('cardQuest_background', cardContainer, res['white'].texture);
            cardBgObj.image.visible = false;
            cardBgObj.image.tint = 0x000000;
            cardBgObj.image.alpha = 0.5;
            cardBgObj.image.interactive = true;
            cardBgObj.image.anchor.set(0.5);
            cardBgObj.image.scale.x = stageManager.getDimension().calculateRatioByWidth(cardBgObj.image.width, 1);
            cardBgObj.image.scale.y = stageManager.getDimension().calculateRatioByHeight(cardBgObj.image.height, 1);
            cardBgObj.image.position.y = stageManager.getDimension().height * 0.5;
            cardBgObj.image.position.x = stageManager.getDimension().width * 0.5;
            
            var cardObj = createImage('cardQuest', cardContainer, res['q_card'].texture);
            cardObj.image.visible = false;
            cardObj.image.anchor.set(0.5);
            cardObj.image.scale.x = cardObj.image.scale.y = stageManager.getDimension().calculateRatioByHeight(cardObj.image.height, 0.6);
            cardObj.image.position.x =  stageManager.getDimension().width * 0.5;
            cardObj.image.position.y =  stageManager.getDimension().height * 0.5;
            
            var cardCloseBtn = createImage('cardQuest_closeBtn', cardObj.image, res['tc_close'].texture);
            cardCloseBtn.image.anchor.set(0.5);
            cardCloseBtn.image.scale.x = cardCloseBtn.image.scale.y = 1.5;
            cardCloseBtn.image.position.x = cardObj.image.width - 35;
            cardCloseBtn.image.position.y = -(cardObj.image.height) + 50;
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
            
            function showCard(callBack)
            {
                TweenMax.fromTo(cardObj.image.position, 0.5, {y: stageManager.getDimension().height}, {y: stageManager.getDimension().height * 0.5, ease: Power2.easeOut, onComplete: onComplete});
                TweenMax.fromTo(cardBgObj.image, 0.5, {alpha: 0}, {alpha: 0.5, ease: Power2.easeOut});
                cardBgObj.image.visible = true;
                cardObj.image.visible = true;  
                function onComplete()
                {
                    callBack();
                }
            }

            function hideCard(callBack)
            {
                TweenMax.to(cardObj.image.position, 0.5, {y: stageManager.getDimension().height, ease: Power2.easeIn, onComplete: onComplete});
                TweenMax.to(cardBgObj.image, 0.5, {alpha: 0, ease: Power2.easeIn});
                function onComplete()
                {
                    cardBgObj.image.visible = false;
                    cardObj.image.visible = false;
                    callBack();
                }
            }
            
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

