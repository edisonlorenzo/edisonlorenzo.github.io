"use strict";
var QuestManager = (function () {

    // Instance stores a reference to the Singleton
    var instance;

    function init() {

        // Singleton Init
        var stageManager;
        var soundManager;
        var res;
        var tl;

        var translationObject = [
            {
                language: 'chinese',
                activatedTitleString: '激活成功!',
                collectString: '集齐五枚胸章即可解锁隐藏版胸章!',
                unlockedTitleString: '真棒!',
                unlockedMessageString: '你已经收集了所有的徽章 !',
                unlockedInfoString: '要得到最后一个徽章 ,\n在我们的微信公众号上输入代码 ,\n获取更多的指令代码 !',
                helpText1: '扫瞄並并注\n林书豪微信公众帐号',
                helpText2: '点击左下键盘\n输入代码',
                unlockedString: '隐藏版胸章由此去',
                newString: '新入手!',
                codeTextString: '代码',
                copyTextString: '复制',
                claimNowString: '微信公众帐号'
            },
            {
                language: 'english',
                activatedTitleString: 'Activated!',
                collectString: 'Collect 5 Pins to Unlock the 6th!',
                unlockedTitleString: 'Awesome',
                unlockedMessageString: 'You have collected all the badges!',
                unlockedInfoString: 'To get the last badge,\nenter the code on our WeChat public number\nand get more instruction code!',
                helpText1: 'Scan and follow\nJeremy Lin\'s WeChat\naccount',
                helpText2: 'Click the keyboard\nat the lower left\nand enter the code',
                unlockedString: 'Get Your Secret Pin',
                newString: 'New!',
                codeTextString: 'Codes',
                copyTextString: 'COPY',
                claimNowString: 'WeChat'
            }
        ];

        var languageObject = [
            {tags: ['zh', 'zh-cn', 'zh-hk', 'zh-sg', 'zh-tw'], language: 'chinese'},
            {tags: ['default'], language: 'english'}
        ];

        var languageData;
        var characterData;
        var isNewActivation = false;

        var slotObject = new Array();

        var finalPin = {sku: 'mohawk', spineName:'jlin', skinName:'mohawk', scale: 1};

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
        assets.push(new Asset('images-btn-claim-blank', 'images/btn_claim_blank.png'));
        assets.push(new Asset('images-bg-pop', 'images/bg_pop.png'));
        assets.push(new Asset('images-qr-wechat', 'images/img_qr_wechat.png'));
        assets.push(new Asset('images-phone', 'images/img_phone.png'));
        assets.push(new Asset('images-closebtn', 'images/btn_x.png'));
        assets.push(new Asset('images-gradient-half-circle', 'images/gradient_half_circle.png'));
        assets.push(new Asset('images-bracket-black', 'images/bracket_black.png'));
        assets.push(new Asset('images-btn-copy-blank', 'images/btn_copy_blank.png'));
        assets.push(new Asset('images-arrow', 'images/arrow.png'));

        function Asset(resName, resPath)
        {
            this.resName = resName;
            this.resPath = resPath;
        }

        function getAsset()
        {
            return assets;
        }

        function saveSlotData()
        {
            if (typeof(Storage) !== undefined) {
                console.log('Saving data...');
                localStorage.setItem("slotData-" + activate.saveId, JSON.stringify(slotObject));
            } else {
                console.log('Saving data failed...');
            }
        }

        function getSlotData()
        {
            console.log('Checking Storage...');
            if (typeof(Storage) !== undefined) {
                console.log('Has Local Storage');
                var slotData = (localStorage.getItem("slotData-" + activate.saveId));
                if(slotData !== null)
                {
                    console.log('Getting data...');
                    slotObject = JSON.parse(slotData);
                } else {
                    console.log('Setting data...');
                    slotObject = [
                        {sku: 'braid', spineName:'jlin', skinName:'braid', isActivated: false, scale: 1, iconName: 'images-icon-braid'},
                        {sku: 'buzz', spineName:'jlin', skinName:'buzz', isActivated: false, scale: 1, iconName: 'images-icon-buzz'},
                        {sku: 'logo', spineName:'jlin-logo', skinName:'logo', isActivated: false, scale: 1, iconName: 'images-icon-logo'},
                        {sku: 'bun', spineName:'jlin', skinName:'bun', isActivated: false, scale: 1, iconName: 'images-icon-bun'},
                        {sku: 'slickback', spineName:'jlin', skinName:'slickback', isActivated: false, scale: 1, iconName: 'images-icon-slick'}
                    ];
                }
            } else {
                console.log('No Local Storage!');
            }

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
            return slotObject.find(
                function(item){
                    return compareStrings(item.sku, sku, true, false);
                }
            );
        }

        function getSKUIndex(sku)
        {
            return slotObject.findIndex(
                function(item){
                    return compareStrings(item.sku, sku, true, false);
                }
            );
        }

        function getLanguage(code)
        {
            var translationData = function(){
                return languageObject.find(
                    function(language){
                        var item = language.tags.find(
                            function(tag){
                                //return tag == code;
                                return compareStrings(tag, code, true, true);
                            }
                        );
                        if(item == undefined)
                        {
                            item = language.tags.find(
                                function(tag){
                                    return tag == 'default';
                                }
                            );
                        }
                        return item;
                    }
                );
            }();

            return translationObject.find(
                function(item){
                    return item.language === translationData.language;
                }
            );
        }

        function initMainCanvas()
        {
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

            var backgroundContainerMask = createImage('backgroundContainerMask', backgroundContainer, res['images-white'].texture);
            backgroundContainerMask.anchor.set(0.5);
            backgroundContainerMask.width = backgroundObj.content.width;
            backgroundContainerMask.height = backgroundObj.content.height;

            backgroundContainer.mask = backgroundContainerMask;

            if(characterData !== undefined)
            {
                characterData.isActivated = true;

                var activatedSpineJsonData = {spineName: characterData.spineName, skinName: characterData.skinName, position:{x: 0, y:0}, scale: 1, animationName: 'summon_appear', loop: false};
                var spineActivatedCharacterObj = createSpine('activatedCharacterSpine', backgroundContainer, activatedSpineJsonData);
                spineActivatedCharacterObj.visible = false;
                spineActivatedCharacterObj.position.y = 50;
                spineActivatedCharacterObj.content.spineJsonData = activatedSpineJsonData;

                spineActivatedCharacterObj.content.show = (function() {
                    this.visible = true;
                    this.state.setAnimation(0, this.content.spineJsonData.animationName, this.content.spineJsonData.loop);
                    TweenMax.fromTo(this, 0.5, {alpha: 0}, {alpha: 1, ease: Power2.easeOut});
                    TweenMax.fromTo(this.scale, 0.5, {x: 3, y: 3}, {x: 1, y: 1, ease: Linear.none});
                }).bind(spineActivatedCharacterObj);

                spineActivatedCharacterObj.content.hide = (function() {
                    this.visible = true;
                    TweenMax.fromTo(this, 0.5, {alpha: 1}, {alpha: 0, ease: Power2.easeOut, onComplete: (function(){this.visible = false;}).bind(this)});
                    TweenMax.fromTo(this.scale, 0.5, {x: 1, y: 1}, {x: 0.8, y: 0.8, ease: Power2.easeOut});
                }).bind(spineActivatedCharacterObj);
            }

            var unlockedSpineJsonData = {spineName: finalPin.spineName, skinName: finalPin.skinName, position:{x: 0, y:0}, scale: 1, animationName: 'summon_appear', loop: false};
            var unlockedCharacterSpineObj = createSpine('unlockedCharacterSpine', backgroundContainer, unlockedSpineJsonData);
            unlockedCharacterSpineObj.visible = false;
            unlockedCharacterSpineObj.position.y = 50;
            unlockedCharacterSpineObj.content.spineJsonData = unlockedSpineJsonData;
            unlockedCharacterSpineObj.content.show = (function() {
                this.visible = true;
                this.state.setAnimation(0, this.content.spineJsonData.animationName, this.content.spineJsonData.loop);
                TweenMax.fromTo(this, 0.5, {alpha: 0}, {alpha: 1, ease: Power2.easeOut});
                TweenMax.fromTo(this.scale, 0.5, {x: 3, y: 3}, {x: 1, y: 1, ease: Linear.none});
            }).bind(unlockedCharacterSpineObj);

            var activatedContainer = createContainer('activatedContainer', backgroundContainer);
            var unlockedContainer = createContainer('unlockedContainer', backgroundContainer);

            var activatedObj = createImage('activatedObj', activatedContainer, res['images-gradient-black'].texture);
            activatedObj.anchor.set(0.5);

            var unlockedObj = createImage('unlockedObj', unlockedContainer, res['images-gradient-gold'].texture);
            unlockedObj.anchor.set(0.5);

            var unlockedInfoObj = createImage('unlockedInfoObj', unlockedContainer, res['images-gradient-half-circle'].texture);
            unlockedInfoObj.anchor.set(0.5);
            unlockedInfoObj.visible = false;
            unlockedInfoObj.position.y = (unlockedObj.height * 0.5) + (unlockedInfoObj.height * 0.5);

            activatedContainer.visible = false;
            unlockedContainer.visible = false;

            var activatedTitleObjText = createText('activatedTitleObjText', activatedObj, ' ' + languageData.activatedTitleString + ' ', new PIXI.TextStyle({
                fontFamily: 'Arial',
                fontSize: 60,
                fontStyle: 'italic',
                fontWeight: 'bold',
                fill: '#ffffff'
            }));
            activatedTitleObjText.anchor.set(0.5);
            if(characterData == undefined)
            {
                activatedTitleObjText.text = 'Invalid Data'
            } else {
                activatedTitleObjText.position.y = -20;
            }

            var activatedCodeObjText = createText('activatedCodeObjText', activatedObj, 'Serial Code', new PIXI.TextStyle({
                fontFamily: 'Arial',
                fontSize: 40,
                fontStyle: 'normal',
                fill: '#ffffff'
            }));
            activatedCodeObjText.visible = false;
            activatedCodeObjText.anchor.set(0.5);
            activatedCodeObjText.position.y = 30;

            var unlockedTitleObjText = createText('unlockedTitleObjText', unlockedObj, ' ' + languageData.unlockedTitleString + ' ', new PIXI.TextStyle({
                fontFamily: 'Arial',
                fontSize: 60,
                fontStyle: 'italic',
                fontWeight: 'bold',
                fill: '#ffffff'
            }));
            unlockedTitleObjText.visible = false;
            unlockedTitleObjText.anchor.set(0.5);
            unlockedTitleObjText.position.y = -20;

            var unlockedMessageObjText = createText('unlockedMessageObjText', unlockedObj, languageData.unlockedMessageString, new PIXI.TextStyle({
                fontFamily: 'Arial',
                fontSize: 40,
                fontStyle: 'normal',
                fontWeight: 'bold',
                fill: '#ffffff'
            }));
            unlockedMessageObjText.visible = false;
            unlockedMessageObjText.anchor.set(0.5);
            unlockedMessageObjText.position.y = 30;

            var unlockedInfoObjText = createText('unlockedInfoObjText', unlockedInfoObj, languageData.unlockedInfoString, new PIXI.TextStyle({
                fontFamily: 'Arial',
                fontSize: 30,
                fontStyle: 'normal',
                align: 'center',
                fill: '#ffffff'
            }));
            unlockedInfoObjText.visible = false;
            unlockedInfoObjText.anchor.set(0.5);
            unlockedInfoObjText.position.y = -50;

            var unlockedInfoArrowObj = createImage('unlockedInfoArrowObj', unlockedInfoObj, res['images-arrow'].texture);
            unlockedInfoArrowObj.visible = false;
            unlockedInfoArrowObj.anchor.set(0.5);
            unlockedInfoArrowObj.scale.set(0.8);
            unlockedInfoArrowObj.position.y = unlockedInfoObjText.position.y + (unlockedInfoObjText.height * 0.5) + (unlockedInfoArrowObj.height * 0.5) + 20;
            unlockedInfoArrowObj.content.y = unlockedInfoArrowObj.position.y;

            unlockedInfoArrowObj.content.show = (function() {
                this.visible = true;
                TweenMax.fromTo(this, 0.5, {alpha: 0}, {alpha: 1, ease: Power2.easeOut});
                TweenMax.fromTo(this.position, 0.5, {y: this.content.y - 20}, {y: this.content.y, ease: Power2.easeOut});
            }).bind(unlockedInfoArrowObj);

            activatedContainer.content.show = (function() {
                this.visible = true;
                TweenMax.fromTo(this, 0.5, {alpha: 0}, {alpha: 1, ease: Power2.easeOut});
                TweenMax.fromTo(this.position, 0.25, {x: -(stageManager.getDimension().canvasWidth + (activatedContainer.width * 0.5))}, {x: 0, ease: Power2.easeOut});
            }).bind(activatedContainer);

            activatedContainer.content.hide = (function() {
                this.visible = true;
                TweenMax.fromTo(this, 0.5, {alpha: 1}, {alpha: 0, ease: Power2.easeOut, onComplete: (function(){this.visible = false;}).bind(this)});
                TweenMax.fromTo(this.position, 0.25, {x: 0}, {x: stageManager.getDimension().canvasWidth + (activatedContainer.width * 0.5), ease: Power2.easeOut});
            }).bind(activatedContainer);

            activatedCodeObjText.content.show = (function() {
                this.visible = true;
                TweenMax.fromTo(this, 0.5, {alpha: 0}, {alpha: 1, ease: Power2.easeOut});
            }).bind(activatedCodeObjText);

            unlockedContainer.content.show = (function() {
                this.visible = true;
                TweenMax.fromTo(this, 0.5, {alpha: 0}, {alpha: 1, ease: Power2.easeOut});
                TweenMax.fromTo(this.scale, 0.5, {x: 1.5, y: 1.5}, {x: 1, y: 1, ease: Power2.easeOut});
            }).bind(unlockedContainer);

            unlockedContainer.content.hide = (function() {
                this.visible = true;
                TweenMax.fromTo(this, 0.5, {alpha: 1}, {alpha: 0, ease: Power2.easeOut, onComplete: (function(){this.visible = false;}).bind(this)});
                TweenMax.fromTo(this.position, 0.25, {x: 0}, {x: stageManager.getDimension().canvasWidth + (unlockedContainer.width * 0.5), ease: Power2.easeOut});
            }).bind(unlockedContainer);

            unlockedTitleObjText.content.show = (function() {
                this.visible = true;
                TweenMax.fromTo(this, 0.5, {alpha: 0}, {alpha: 1, ease: Power2.easeOut});
                TweenMax.fromTo(this.scale, 0.5, {x: 3, y: 3}, {x: 1, y: 1, ease: Power2.easeOut});
            }).bind(unlockedTitleObjText);

            unlockedMessageObjText.content.show = (function() {
                this.visible = true;
                TweenMax.fromTo(this, 0.5, {alpha: 0}, {alpha: 1, ease: Power2.easeOut});
            }).bind(unlockedMessageObjText);

            unlockedInfoObj.content.show = (function() {
                this.visible = true;
                TweenMax.fromTo(this, 0.5, {alpha: 0}, {alpha: 1, ease: Power2.easeOut});
            }).bind(unlockedInfoObj);

            unlockedInfoObjText.content.show = (function() {
                this.visible = true;
                TweenMax.fromTo(this, 0.5, {alpha: 0}, {alpha: 1, ease: Power2.easeOut});
                TweenMax.fromTo(this.position, 0.5, {y: -70}, {y: -50, ease: Power2.easeOut});
            }).bind(unlockedInfoObjText);
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
            var backgroundContainer = getElement('backgroundContainer');

            var footerContainer = createContainer('footerContainer', backgroundContainer);
            footerContainer.visible = false;
            footerContainer.content.show = (function() {
                this.visible = true;
                TweenMax.fromTo(this, 0.5, {alpha: 0}, {alpha: 1, ease: Power2.easeOut});
                TweenMax.fromTo(this.position, 0.5, {y: 450}, {y: 0, ease: Power2.easeOut});
            }).bind(footerContainer);

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

            var footerObjTopClaim = createImage('footerTopClaim', footerContainer, res['images-white'].texture);
            footerObjTopClaim.visible = false;
            footerObjTopClaim.tint = 0xfc9e19;
            footerObjTopClaim.anchor.set(0.5);
            footerObjTopClaim.width = backgroundObj.content.width;
            footerObjTopClaim.height = 80;
            footerObjTopClaim.position.y = footerObjBottom.position.y - (footerObjBottom.height * 0.5) - (footerObjTopClaim.height * 0.5);

            footerObjTopClaim.content.show = (function() {
                this.visible = true;
                TweenMax.fromTo(this, 0.5, {alpha: 0}, {alpha: 1, ease: Power2.easeOut});
                TweenMax.fromTo(this.position, 0.5, {x: -(backgroundObj.content.width)}, {x: 0, ease: Power2.easeOut});
            }).bind(footerObjTopClaim);

            var footerObjPoweredBy = createImage('footerPoweredBy', footerContainer, res['images-poweredby'].texture);
            footerObjPoweredBy.anchor.set(0.5);
            footerObjPoweredBy.position.y = (backgroundObj.content.height * 0.5) - (footerObjPoweredBy.height * 0.5) - 30;

            var iconMohawkObj = createImage('iconMohawkObj', footerContainer, res['images-icon-mohawk'].texture);
            iconMohawkObj.anchor.set(0.5);
            iconMohawkObj.scale.set(0.8);
            iconMohawkObj.position.x = -300;
            iconMohawkObj.position.y = footerObjTop.position.y - 10;

            var footerTopCollectText = createText('footerTopCollectText', footerContainer, languageData.collectString, new PIXI.TextStyle({
                fontFamily: 'Arial',
                fontSize: 36,
                fontStyle: 'normal',
                fill: '#777777'
            }));
            footerTopCollectText.visible = false;
            footerTopCollectText.anchor.y = 0.5;
            footerTopCollectText.position.x = -230;
            footerTopCollectText.position.y = footerObjTop.position.y;

            footerTopCollectText.content.show = (function() {
                this.visible = true;
                TweenMax.fromTo(this, 0.5, {alpha: 0}, {alpha: 1, ease: Power2.easeOut});
            }).bind(footerTopCollectText);

            footerTopCollectText.content.hide = (function() {
                this.visible = true;
                TweenMax.fromTo(this, 0.5, {alpha: 1}, {alpha: 0, ease: Power2.easeOut, onComplete: (function(){this.visible = false;}).bind(this)});
            }).bind(footerTopCollectText);

            var btnClaimObj = createImage('btnClaimObj', footerContainer, res['images-btn-claim-blank'].texture);
            btnClaimObj.visible = false;
            btnClaimObj.anchor.set(0.5);
            btnClaimObj.scale.set(0.65);
            btnClaimObj.position.x = 270;
            btnClaimObj.position.y = footerObjTop.position.y;
            btnClaimObj.interactive = true;

            btnClaimObj.content.show = (function() {
                this.visible = true;
                TweenMax.fromTo(this, 0.5, {alpha: 0}, {alpha: 1, ease: Power2.easeOut});
                TweenMax.fromTo(this.position, 0.5, {y: footerObjTop.position.y + 20}, {y: footerObjTop.position.y, ease: Power2.easeOut});
            }).bind(btnClaimObj);

            btnClaimObj.on('pointertap', (function(){
                if(!this.hasClicked)
                {
                    this.hasClicked = true;
                    getElement('fadeBgObj').content.show();
                    getElement('helpBackgroundObj').content.show();
                    this.hasClicked = false;
                }
            }).bind(btnClaimObj.content));

            var btnClaimContainer = createContainer('btnClaimContainer', btnClaimObj);

            var btnClaimIconObj = createImage('btnClaimIconObj', btnClaimContainer, res['images-icon-logo'].texture);
            btnClaimIconObj.anchor.set(0.5);
            btnClaimIconObj.scale.set(0.5);
            btnClaimIconObj.position.y = -30;

            var btnClaimTextObj = createText('btnClaimTextObj', btnClaimContainer, languageData.claimNowString, new PIXI.TextStyle({
                fontFamily: 'Arial',
                fontSize: 40,
                fontStyle: 'normal',
                fontWeight: 'bold',
                align: 'center',
                dropShadow: true,
                dropShadowAlpha: 0.75,
                dropShadowColor: '#ffffff',
                dropShadowDistance: 3,
                dropShadowBlur: 10,
                dropShadowAngle: Math.PI/2,
                fill: '#000000'
            }));
            btnClaimTextObj.anchor.set(0.5);
            btnClaimTextObj.position.y = 40;

            if(activate.unlockedCode != undefined)
            {
                var footerTopUnlockedCodeContainer = createContainer('footerTopUnlockedCodeContainer', footerContainer);
                footerTopUnlockedCodeContainer.visible = false;
                footerTopUnlockedCodeContainer.position.x = -60;
                footerTopUnlockedCodeContainer.position.y = footerObjTop.position.y;

                footerTopUnlockedCodeContainer.content.show = (function() {
                    this.visible = true;
                    TweenMax.fromTo(this, 0.5, {alpha: 0}, {alpha: 1, ease: Power2.easeOut});
                }).bind(footerTopUnlockedCodeContainer);

                var footerTopUnlockedCodeBgObj = createImage('footerTopUnlockedCodeBgObj', footerTopUnlockedCodeContainer, res['images-bracket-black'].texture);
                footerTopUnlockedCodeBgObj.anchor.set(0.5);
                footerTopUnlockedCodeBgObj.scale.set(0.70);

                var footerTopUnlockedCodeTitleObj = createText('footerTopUnlockedCodeTitleObj', footerTopUnlockedCodeContainer, languageData.codeTextString + ':', new PIXI.TextStyle({
                    fontFamily: 'Arial',
                    fontSize: 24,
                    fontStyle: 'normal',
                    fill: '#ffffff'
                }));
                footerTopUnlockedCodeTitleObj.anchor.set(0.5);
                footerTopUnlockedCodeTitleObj.position.x = -(footerTopUnlockedCodeBgObj.width * 0.5) + (footerTopUnlockedCodeTitleObj.width * 0.5) + 10;


                var footerTopUnlockedCodeTextObj = createText('footerTopUnlockedCodeTextObj', footerTopUnlockedCodeContainer, activate.unlockedCode, new PIXI.TextStyle({
                    fontFamily: 'Arial',
                    fontSize: 32,
                    fontStyle: 'normal',
                    fontWeight: 'bold',
                    fill: '#ffffff'
                }));
                footerTopUnlockedCodeTextObj.anchor.set(0.5);
                footerTopUnlockedCodeTextObj.position.x = footerTopUnlockedCodeTitleObj.position.x + (footerTopUnlockedCodeTitleObj.width * 0.5) + (footerTopUnlockedCodeTextObj.width * 0.5) + 15;

                var btnCopyObj = createImage('btnCopyObj', footerTopUnlockedCodeContainer, res['images-btn-copy-blank'].texture);
                btnCopyObj.visible = false;
                btnCopyObj.anchor.set(0.5);
                btnCopyObj.scale.set(0.70);
                btnCopyObj.position.x = (footerTopUnlockedCodeBgObj.width * 0.5);
                btnCopyObj.interactive = true;

                btnCopyObj.content.show = (function() {
                    this.visible = true;
                    TweenMax.fromTo(this, 0.5, {alpha: 0}, {alpha: 1, ease: Power2.easeOut});
                }).bind(btnCopyObj);

                btnCopyObj.on('pointertap', (function(){
                    copyTextToClipboard(activate.unlockedCode);
                }).bind(btnCopyObj.content));

                var btnCopyContainer = createContainer('btnCopyContainer', btnCopyObj);

                var btnCopyTextObj = createText('btnCopyTextObj', btnCopyContainer, languageData.copyTextString, new PIXI.TextStyle({
                    fontFamily: 'Arial',
                    fontSize: 34,
                    fontStyle: 'normal',
                    fontWeight: 'bold',
                    align: 'center',
                    dropShadow: true,
                    dropShadowAlpha: 0.75,
                    dropShadowColor: '#ffffff',
                    dropShadowDistance: 3,
                    dropShadowBlur: 10,
                    dropShadowAngle: Math.PI/2,
                    fill: '#000000'
                }));
                btnCopyTextObj.anchor.set(0.5);
            }

            for(var i = 0; i < slotObject.length; i++)
            {
                var slotCharacterObj = createImage('slotCharacter' + i, footerContainer, res['images-slot'].texture);
                slotCharacterObj.anchor.set(0.5);
                slotCharacterObj.content.width = slotCharacterObj.width;
                slotCharacterObj.content.height = slotCharacterObj.height;

                slotCharacterObj.scale.set(0.69);
                slotCharacterObj.position.x = -285 + ((slotCharacterObj.width + 5) * i);
                slotCharacterObj.position.y = footerObjBottom.position.y - 30;

                var container = new PIXI.Container();
                container.width = slotCharacterObj.width;
                container.height = slotCharacterObj.height;

                var textureMask = new PIXI.Sprite(res['images-slot-mask'].texture);
                textureMask.anchor.set(0.5);

                container.addChild(textureMask);

                container.mask = textureMask;
                slotCharacterObj.addChild(container);

                var iconCharacter = createImage('slotCharacterIcon' + i, container, res[slotObject[i].iconName].texture);
                iconCharacter.anchor.set(0.5);
                iconCharacter.visible = slotObject[i].isActivated;

                iconCharacter.content.show = (function() {
                    this.visible = true;
                    TweenMax.fromTo(this, 0.5, {alpha: 0}, {alpha: 1, ease: Power2.easeOut});
                    TweenMax.fromTo(this.scale, 0.5, {x: 3, y: 3}, {x: 1, y: 1, ease: Power2.easeOut});
                }).bind(iconCharacter);

                var iconQuestionMark = createText('slotQuestionMark' + i, container, '?', new PIXI.TextStyle({
                    fontFamily: 'Arial',
                    fontSize: 150,
                    fontStyle: 'normal',
                    fontWeight: 'bold',
                    fill: '#777777'
                }));
                iconQuestionMark.anchor.set(0.5);
                iconQuestionMark.visible = !slotObject[i].isActivated;

                var iconNewContainer = createContainer('iconNewContainer' + i, container);
                iconNewContainer.visible = false;

                iconNewContainer.content.show = (function() {
                    this.visible = true;
                    TweenMax.fromTo(this, 0.5, {alpha: 0}, {alpha: 1, ease: Power2.easeOut});
                    TweenMax.fromTo(this.position, 0.5, {y: 20}, {y: 0, ease: Power2.easeOut});
                }).bind(iconNewContainer);

                iconCharacter.addChild(iconNewContainer);

                var iconNew = createImage('iconNew' + i, iconNewContainer, res['images-white'].texture);
                iconNew.anchor.set(0.5);
                iconNew.tint = 0x3d9eff;
                iconNew.alpha = 0.85;
                iconNew.width = slotCharacterObj.content.width;
                iconNew.height = slotCharacterObj.content.height * 0.2;
                iconNew.position.y = (slotCharacterObj.content.height * 0.5) - (iconNew.height * 0.5);

                var iconNewText = createText('iconNewText' + i, iconNewContainer, "New!", new PIXI.TextStyle({
                    fontFamily: 'Arial',
                    fontSize: 32,
                    fontStyle: 'normal',
                    fontWeight: 'bold',
                    fill: '#ffffff'
                }));
                iconNewText.anchor.set(0.5);
                iconNewText.position.y = (slotCharacterObj.content.height * 0.5) - (iconNewText.height * 0.5) - 3;

                slotCharacterObj.content.container = container;
                slotCharacterObj.content.textureMask = textureMask;
                slotCharacterObj.content.iconCharacter = iconCharacter;
                slotCharacterObj.content.iconQuestionMark = iconQuestionMark;

            }
        }

        function initFadeBackground()
        {
            var backgroundObj = getElement('backgroundObj');
            var backgroundContainer = getElement('backgroundContainer');

            var fadeBgObj = createImage('fadeBgObj', backgroundContainer, res['images-white'].texture);
            fadeBgObj.visible = false;
            fadeBgObj.tint = 0x000000;
            fadeBgObj.alpha = 0.75;
            fadeBgObj.anchor.set(0.5);
            fadeBgObj.interactive = true;
            fadeBgObj.width = backgroundObj.content.width;
            fadeBgObj.height = backgroundObj.content.height;

            fadeBgObj.content.show = (function() {
                this.visible = true;
                TweenMax.fromTo(this, 0.5, {alpha: 0}, {alpha: 0.75, ease: Power2.easeOut});
            }).bind(fadeBgObj);

            fadeBgObj.content.hide = (function() {
                TweenMax.fromTo(this, 0.5, {alpha: 0.75}, {alpha: 0, ease: Power2.easeOut, onComplete: (function(){this.visible = false;}).bind(this)});
            }).bind(fadeBgObj);
        }

        function initHelpContent()
        {
            var backgroundObj = getElement('backgroundObj');
            var backgroundContainer = getElement('backgroundContainer');

            var helpBackgroundObj = createImage('helpBackgroundObj', backgroundContainer, res['images-bg-pop'].texture);
            helpBackgroundObj.visible = false;
            helpBackgroundObj.anchor.set(0.5);

            helpBackgroundObj.content.show = (function() {
                this.visible = true;
                TweenMax.fromTo(this, 0.5, {alpha: 0}, {alpha: 1, ease: Power2.easeOut});
                TweenMax.fromTo(this.position, 0.5, {y: 100}, {y: 0, ease: Power2.easeOut});
            }).bind(helpBackgroundObj);

            helpBackgroundObj.content.hide = (function(callback) {
                TweenMax.fromTo(this, 0.5, {alpha: 1}, {alpha: 0, ease: Power2.easeOut, onComplete: (function(){this.visible = false; callback();}).bind(this)});
                TweenMax.fromTo(this.position, 0.5, {y: 0}, {y: 100, ease: Power2.easeOut});
            }).bind(helpBackgroundObj);

            var step1BgObj = createImage('step1BgObj', helpBackgroundObj, res['images-white'].texture);
            step1BgObj.tint = 0xeaeaea;
            step1BgObj.anchor.set(0.5);
            step1BgObj.width = 600;
            step1BgObj.height = 120;
            step1BgObj.position.y = -(helpBackgroundObj.height * 0.5) + (step1BgObj.height * 0.5) + 120;

            var step2BgObj = createImage('step2BgObj', helpBackgroundObj, res['images-white'].texture);
            step2BgObj.tint = 0xeaeaea;
            step2BgObj.anchor.set(0.5);
            step2BgObj.width = 600;
            step2BgObj.height = 120;
            step2BgObj.position.y = (helpBackgroundObj.height * 0.5) - (step2BgObj.height * 0.5) - 220;

            var step1ImageObj = createImage('step1ImageObj', helpBackgroundObj, res['images-qr-wechat'].texture);
            step1ImageObj.anchor.set(0.5);
            step1ImageObj.scale.set(0.7);
            step1ImageObj.position.y = -(helpBackgroundObj.height * 0.5) + (step1ImageObj.height * 0.5) + 40;
            step1ImageObj.position.x = -(helpBackgroundObj.width * 0.5) + (step1ImageObj.width * 0.5) + 40;

            var step2ImageObj = createImage('step2ImageObj', helpBackgroundObj, res['images-phone'].texture);
            step2ImageObj.anchor.set(0.5);
            step2ImageObj.scale.set(0.85);
            step2ImageObj.position.y = (helpBackgroundObj.height * 0.5) - (step2ImageObj.height * 0.5) - 40;
            step2ImageObj.position.x = (helpBackgroundObj.width * 0.5) - (step2ImageObj.width * 0.5) - 40;

            var step1Container = createContainer('step1Container', helpBackgroundObj);
            step1Container.position.y = step1BgObj.position.y;

            var step1NumberObj = createText('step1NumberObj', step1Container, '1', new PIXI.TextStyle({
                fontFamily: 'Arial',
                fontSize: 80,
                fontStyle: 'normal',
                fontWeight: 'bold',
                fill: '#000000'
            }));
            step1NumberObj.anchor.y = 0.5;

            var step1TextObj = createText('step1TextObj', step1Container, languageData.helpText1, new PIXI.TextStyle({
                fontFamily: 'Arial',
                fontSize: 24,
                fontStyle: 'normal',
                fill: '#000000'
            }));
            step1TextObj.anchor.y = 0.5;
            step1TextObj.position.x = step1NumberObj.width + 15;

            var step2Container = createContainer('step2Container', helpBackgroundObj);
            step2Container.position.y = step2BgObj.position.y;
            step2Container.position.x = -(step2BgObj.width * 0.5) + 20;

            var step2NumberObj = createText('step2NumberObj', step2Container, '2', new PIXI.TextStyle({
                fontFamily: 'Arial',
                fontSize: 80,
                fontStyle: 'normal',
                fontWeight: 'bold',
                fill: '#000000'
            }));
            step2NumberObj.anchor.y = 0.5;

            var step2TextObj = createText('step2TextObj', step2Container, languageData.helpText2, new PIXI.TextStyle({
                fontFamily: 'Arial',
                fontSize: 24,
                fontStyle: 'normal',
                fill: '#000000'
            }));
            step2TextObj.anchor.y = 0.5;
            step2TextObj.position.x = step2NumberObj.width + 15;

            var helpCloseBtnObj = createImage('helpCloseBtnObj', helpBackgroundObj, res['images-closebtn'].texture);
            helpCloseBtnObj.anchor.set(0.5);
            helpCloseBtnObj.interactive = true;
            helpCloseBtnObj.position.y = -(helpBackgroundObj.height * 0.5) + 10;
            helpCloseBtnObj.position.x = (helpBackgroundObj.width * 0.5) - 10;

            helpCloseBtnObj.on('pointertap', (function(){
                if(!this.hasClicked)
                {
                    this.hasClicked = true;
                    getElement('fadeBgObj').content.hide();
                    getElement('helpBackgroundObj').content.hide((function(){this.hasClicked = false;}).bind(this));
                }
            }).bind(helpCloseBtnObj.content));


        }

        function initLanguage()
        {
            console.log('Initializing Language...');
            var languageCode;
            if(navigator.language !== undefined)
            {
                languageCode = navigator.language;
            } else {
                languageCode = navigator.browserLanguage;
            }

            if(activate.languageCode != undefined)
            {
                languageCode = activate.languageCode;
            }

            console.log('Language Detected: ' + languageCode);

            languageData = getLanguage(languageCode);
        }

        function initTimeLinedTween()
        {
            tl = new TimelineMax();
        }

        function initManagers()
        {
            console.log('Initializing Managers...');
            stageManager = StageManager.getInstance();
            soundManager = SoundManager.getInstance();
        }

        function initResourceData()
        {
            res =  AssetLoaderManager.getInstance().getRes();

            elements = new Array();
            characterData = getSKU(activate.sku);
            isNewActivation = !characterData.isActivated;
        }

        function copyTextToClipboard(text) {

            var contentHolder = document.createElement('div');
            contentHolder.style.fontSize = '12pt'; // Prevent zooming on iOS
            // Reset box model
            contentHolder.style.border = '0';
            contentHolder.style.padding = '0';
            contentHolder.style.margin = '0';
            // Move element out of screen
            contentHolder.style.position = 'fixed';
            contentHolder.style['right'] = '-9999px';
            contentHolder.style.top = (window.pageYOffset || document.documentElement.scrollTop) + 'px';
            // more hiding
            contentHolder.setAttribute('readonly', '');
            contentHolder.style.opacity = 0;
            contentHolder.style.pointerEvents = 'none';
            contentHolder.style.zIndex = -1;
            contentHolder.setAttribute('tabindex', '0'); // so it can be focused
            contentHolder.innerHTML = text;

            // add the element
            document.body.appendChild(contentHolder);

            function copySelection(area) {

                // We will need a range object and a selection.
                var range = document.createRange(),
                    selection = window.getSelection(),
                    success = false;

                // Clear selection from any previous data.
                selection.removeAllRanges();

                // Make the range select the entire content of the contentHolder paragraph.
                range.selectNodeContents(area);

                // Add that range to the selection.
                selection.addRange(range);

                // Copy the selection to clipboard.
                if(document.execCommand('copy'))
                {
                    success = true;
                }

                // Clear selection if you want to.
                selection.removeAllRanges();

                return success;

            }

            // function handler (event){
            //     event.preventDefault();
            //     event.clipboardData.setData('text/plain', text);
            //     document.removeEventListener('copy', handler, true);
            // }
            //
            // document.addEventListener('copy', handler, true);

            var successful = copySelection(contentHolder);
            var msg = successful ? 'successful' : 'unsuccessful';
            if(msg == 'unsuccessful')
            {
                window.prompt("Copy to clipboard: Ctrl+C, Enter", text);
            }

            document.body.removeChild(contentHolder);
        }

        function setup()
        {
            console.log('Setting up User Interface...');

            getSlotData();

            initLanguage();

            initManagers();

            initResourceData();

            initMainCanvas();

            initBackground();

            initMainContent();

            initFooter();

            initFadeBackground();

            initHelpContent();

            initHeader();

            initTimeLinedTween();

            showActivate();

            saveSlotData();

            console.log('User Interface Complete!');
        }

        function showActivate()
        {
            if(characterData !== undefined)
            {
                var activatedCharacterSpine = getElement('activatedCharacterSpine');
                tl.add(activatedCharacterSpine.content.show, "+=0");
                tl.add(playActivated, "+=0");
            }

            var activatedContainer = getElement('activatedContainer');
            tl.add(activatedContainer.content.show, "+=0.75");

            var footerContainer = getElement('footerContainer');
            tl.add(footerContainer.content.show, "+=0.25");

            var footerTopCollectText = getElement('footerTopCollectText');
            tl.add(footerTopCollectText.content.show, "+=0.5");

            if(characterData !== undefined)
            {
                var activatedCodeObjText = getElement('activatedCodeObjText');
                tl.add(activatedCodeObjText.content.show, "+=0.1");

                var slotCharacterIcon = getElement('slotCharacterIcon' + getSKUIndex(activate.sku));
                slotCharacterIcon.visible = false;
                tl.add(slotCharacterIcon.content.show, "+=0.25");

                if(isNewActivation)
                {
                    var iconNewContainer = getElement('iconNewContainer' + getSKUIndex(activate.sku));
                    tl.add(iconNewContainer.content.show, "+=0.5");
                }
            }

            var isAllActivated = slotObject.every(function(item){return item.isActivated == true});
            if(isAllActivated)
            {
                showUnlocked();
            }
        }

        function showUnlocked()
        {
            if(characterData !== undefined)
            {
                var activatedCharacterSpine = getElement('activatedCharacterSpine');
                tl.add(activatedCharacterSpine.content.hide, "+=1");
            }

            var unlockedCharacterSpine = getElement('unlockedCharacterSpine');
            tl.add(unlockedCharacterSpine.content.show, "+=0");
            tl.add(playActivated, "+=0");

            var activatedContainer = getElement('activatedContainer');
            tl.add(activatedContainer.content.hide, "+=0");

            var unlockedContainer = getElement('unlockedContainer');
            tl.add(unlockedContainer.content.show, "+=0.25");

            var unlockedTitleObjText = getElement('unlockedTitleObjText');
            tl.add(unlockedTitleObjText.content.show, "+=0.25");

            var footerTopCollectText = getElement('footerTopCollectText');
            tl.add(footerTopCollectText.content.hide, "+=0.5");

            var unlockedMessageObjText = getElement('unlockedMessageObjText');
            tl.add(unlockedMessageObjText.content.show, "+=0");

            var unlockedInfoObj = getElement('unlockedInfoObj');
            tl.add(unlockedInfoObj.content.show, "+=0.25");

            var unlockedInfoObjText = getElement('unlockedInfoObjText');
            tl.add(unlockedInfoObjText.content.show, "+=0.25");

            var unlockedInfoArrowObj = getElement('unlockedInfoArrowObj');
            tl.add(unlockedInfoArrowObj.content.show, "+=0.25");

            var footerTopClaim = getElement('footerTopClaim');
            tl.add(footerTopClaim.content.show, "+=0");

            // var footerTopClaimText = getElement('footerTopClaimText');
            // tl.add(footerTopClaimText.content.show, "+=0");

            if(activate.unlockedCode != undefined)
            {
                var footerTopUnlockedCodeContainer = getElement('footerTopUnlockedCodeContainer');
                tl.add(footerTopUnlockedCodeContainer.content.show, "+=0");

                var btnCopyObj = getElement('btnCopyObj');
                tl.add(btnCopyObj.content.show, "+=0.25");
            }

            var btnClaimObj = getElement('btnClaimObj');
            tl.add(btnClaimObj.content.show, "+=0.25");
        }

        function playActivated()
        {
            soundManager.playSound('sfx-activated', 0);
        }

        var elements;

        function getElement(id)
        {
            return elements.find(function(item){return item.content.id === id});
        }

        function compareStrings (string1, string2, ignoreCase, useLocale) {
            if (ignoreCase) {
                if (useLocale) {
                    string1 = string1.toLocaleLowerCase();
                    string2 = string2.toLocaleLowerCase();
                }
                else {
                    string1 = string1.toLowerCase();
                    string2 = string2.toLowerCase();
                }
            }

            return string1 === string2;
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
