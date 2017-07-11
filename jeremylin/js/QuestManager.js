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
            {language: 'chinese', activatedTitleString: '激活成功!', collectString: '集齐五枚胸章即可解锁隐藏版胸章!', unlockedTitleString: '解锁成功', secretPinString: '隐藏版胸章', unlockedString: '隐藏版胸章由此去', newString: '新入手!', claimNowString: '立即获取!'},
            {language: 'english', activatedTitleString: 'Activated!', collectString: 'Collect 5 Pins to Unlock the 6th!', unlockedTitleString: 'You\'ve Unlocked', secretPinString: 'the Secret Pin', unlockedString: 'Get Your Secret Pin', newString: 'New!', claimNowString: 'CLAIM\nNOW'}
        ];

        var languageObject = [
            {tags: ['zh', 'zh-cn', 'zh-hk', 'zh-sg', 'zh-tw'], language: 'chinese'},
            {tags: ['default'], language: 'english'}
        ];

        var languageData;
        var characterData;

        var slotObject = new Array();

        // var slotObject = [
        //     {sku: 'braid', spineName:'jlin', skinName:'braid', isActivated: true, scale: 1, iconName: 'images-icon-braid'},
        //     {sku: 'buzz', spineName:'jlin', skinName:'buzz', isActivated: true, scale: 1, iconName: 'images-icon-buzz'},
        //     {sku: 'logo', spineName:'jlin-logo', skinName:'logo', isActivated: true, scale: 1, iconName: 'images-icon-logo'},
        //     {sku: 'bun', spineName:'jlin', skinName:'bun', isActivated: false, scale: 1, iconName: 'images-icon-bun'},
        //     {sku: 'slickback', spineName:'jlin', skinName:'slickback', isActivated: true, scale: 1, iconName: 'images-icon-slick'}
        // ];

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
                console.log('saving data...');
                localStorage.setItem("slotData-" + activate.saveId, JSON.stringify(slotObject));
            } else {
                console.log('saving data failed...');
            }
        }

        function getSlotData()
        {
            console.log('Checking Storage...');
            if (typeof(Storage) !== undefined) {
                console.log('has Local Storage');
                var slotData = (localStorage.getItem("slotData-" + activate.saveId));
                if(slotData !== null)
                {
                    console.log('getting data...');
                    slotObject = JSON.parse(slotData);
                } else {
                    console.log('setting data...');
                    slotObject = [
                        {sku: 'braid', spineName:'jlin', skinName:'braid', isActivated: false, scale: 1, iconName: 'images-icon-braid'},
                        {sku: 'buzz', spineName:'jlin', skinName:'buzz', isActivated: false, scale: 1, iconName: 'images-icon-buzz'},
                        {sku: 'logo', spineName:'jlin-logo', skinName:'logo', isActivated: false, scale: 1, iconName: 'images-icon-logo'},
                        {sku: 'bun', spineName:'jlin', skinName:'bun', isActivated: false, scale: 1, iconName: 'images-icon-bun'},
                        {sku: 'slickback', spineName:'jlin', skinName:'slickback', isActivated: false, scale: 1, iconName: 'images-icon-slick'}
                    ];
                }
            } else {
                console.log('no Local Storage');
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

            var backgroundContainerMask = new PIXI.Graphics();
            backgroundContainerMask
            .beginFill(0xFFFFFF)
            .drawRect(-(backgroundObj.content.width * 0.5), -(backgroundObj.content.height * 0.5), backgroundObj.content.width + 1, backgroundObj.content.height + 1)
            .endFill();
            backgroundContainer.addChild(backgroundContainerMask);
            backgroundContainer.mask = backgroundContainerMask;

            if(characterData !== undefined)
            {
                characterData.isActivated = true;

                var activatedSpineJsonData = {spineName: characterData.spineName, skinName: characterData.skinName, position:{x: 0, y:0}, scale: 1, animationName: 'summon_appear', loop: false};
                var spineActivatedCharacterObj = createSpine('activatedCharacterSpine', backgroundContainer, activatedSpineJsonData);
                spineActivatedCharacterObj.visible = false;
                spineActivatedCharacterObj.content.spineJsonData = activatedSpineJsonData;

                spineActivatedCharacterObj.content.show = (function() {
                    this.visible = true;
                    this.state.setAnimation(0, this.content.spineJsonData.animationName, this.content.spineJsonData.loop);
                    TweenMax.fromTo(this, 0.5, {alpha: 0}, {alpha: 1, ease: Power2.easeOut});
                    TweenMax.fromTo(this.scale, 0.5, {x: 3, y: 3}, {x: 1, y: 1, ease: Linear.none});
                }).bind(spineActivatedCharacterObj);

                spineActivatedCharacterObj.content.hide = (function() {
                    this.visible = true;
                    TweenMax.fromTo(this, 0.5, {alpha: 1}, {alpha: 0, ease: Power2.easeOut, onComplete: function(){this.visible = false;}});
                    TweenMax.fromTo(this.scale, 0.5, {x: 1, y: 1}, {x: 0.8, y: 0.8, ease: Power2.easeOut});
                }).bind(spineActivatedCharacterObj);
            }

            var unlockedSpineJsonData = {spineName: finalPin.spineName, skinName: finalPin.skinName, position:{x: 0, y:0}, scale: 1, animationName: 'summon_appear', loop: false};
            var unlockedCharacterSpineObj = createSpine('unlockedCharacterSpine', backgroundContainer, unlockedSpineJsonData);
            unlockedCharacterSpineObj.visible = false;
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
            unlockedTitleObjText.anchor.set(0.5);
            unlockedTitleObjText.position.y = -20;

            var unlockedCodeObjText = createText('unlockedCodeObjText', unlockedObj, languageData.secretPinString, new PIXI.TextStyle({
                fontFamily: 'Arial',
                fontSize: 40,
                fontStyle: 'normal',
                fill: '#ffffff'
            }));
            unlockedCodeObjText.visible = false;
            unlockedCodeObjText.anchor.set(0.5);
            unlockedCodeObjText.position.y = 30;

            activatedContainer.content.show = (function() {
                this.visible = true;
                TweenMax.fromTo(this, 0.5, {alpha: 0}, {alpha: 1, ease: Power2.easeOut});
                TweenMax.fromTo(this.position, 0.25, {x: -(stageManager.getDimension().canvasWidth + (activatedContainer.width * 0.5))}, {x: 0, ease: Power2.easeOut});
            }).bind(activatedContainer);

            activatedContainer.content.hide = (function() {
                this.visible = true;
                TweenMax.fromTo(this, 0.5, {alpha: 1}, {alpha: 0, ease: Power2.easeOut, onComplete: function(){this.visible = false;}});
                TweenMax.fromTo(this.position, 0.25, {x: 0}, {x: stageManager.getDimension().canvasWidth + (activatedContainer.width * 0.5), ease: Power2.easeOut});
            }).bind(activatedContainer);

            activatedCodeObjText.content.show = (function() {
                this.visible = true;
                TweenMax.fromTo(this, 0.5, {alpha: 0}, {alpha: 1, ease: Power2.easeOut});
            }).bind(activatedCodeObjText);

            unlockedContainer.content.show = (function() {
                this.visible = true;
                TweenMax.fromTo(this, 0.5, {alpha: 0}, {alpha: 1, ease: Power2.easeOut});
                TweenMax.fromTo(this.position, 0.25, {x: -(stageManager.getDimension().canvasWidth + (unlockedContainer.width * 0.5))}, {x: 0, ease: Power2.easeOut});
            }).bind(unlockedContainer);

            unlockedContainer.content.hide = (function() {
                this.visible = true;
                TweenMax.fromTo(this, 0.5, {alpha: 1}, {alpha: 0, ease: Power2.easeOut, onComplete: function(){this.visible = false;}});
                TweenMax.fromTo(this.position, 0.25, {x: 0}, {x: stageManager.getDimension().canvasWidth + (unlockedContainer.width * 0.5), ease: Power2.easeOut});
            }).bind(unlockedContainer);

            unlockedCodeObjText.content.show = (function() {
                this.visible = true;
                TweenMax.fromTo(this, 0.5, {alpha: 0}, {alpha: 1, ease: Power2.easeOut});
            }).bind(unlockedCodeObjText);
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
            iconMohawkObj.position.x = -300;
            iconMohawkObj.position.y = footerObjTop.position.y - 30;

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
                TweenMax.fromTo(this, 0.5, {alpha: 1}, {alpha: 0, ease: Power2.easeOut, onComplete: function(){this.visible = false;}});
            }).bind(footerTopCollectText);

            var btnClaimObj = createImage('btnClaimObj', footerContainer, res['images-btn-claim-blank'].texture);
            btnClaimObj.visible = false;
            btnClaimObj.anchor.set(0.5);
            btnClaimObj.scale.set(0.8);
            btnClaimObj.position.x = 255;
            btnClaimObj.position.y = footerObjTop.position.y;

            btnClaimObj.content.show = (function() {
                this.visible = true;
                TweenMax.fromTo(this, 0.5, {alpha: 0}, {alpha: 1, ease: Power2.easeOut});
                TweenMax.fromTo(this.position, 0.5, {y: footerObjTop.position.y + 20}, {y: footerObjTop.position.y, ease: Power2.easeOut});
            }).bind(btnClaimObj);

            var btnClaimContainer = createContainer('btnClaimContainer', btnClaimObj);

            var btnClaimTextObj = createText('btnClaimTextObj', btnClaimContainer, languageData.claimNowString, new PIXI.TextStyle({
                fontFamily: 'Arial',
                fontSize: 46,
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


            var footerTopClaimText = createText('footerTopClaimText', footerContainer, languageData.unlockedString + ' >>', new PIXI.TextStyle({
                fontFamily: 'Arial',
                fontSize: 36,
                fontStyle: 'normal',
                fill: '#ffffff'
            }));
            footerTopClaimText.visible = false;
            footerTopClaimText.anchor.y = 0.5;
            footerTopClaimText.position.x = -230;
            footerTopClaimText.position.y = footerObjTop.position.y;

            footerTopClaimText.content.show = (function() {
                this.visible = true;
                TweenMax.fromTo(this, 0.5, {alpha: 0}, {alpha: 1, ease: Power2.easeOut});
            }).bind(footerTopClaimText);

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

                var iconNewText = createText('iconNewText' + i, iconNewContainer, languageData.newString, new PIXI.TextStyle({
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

            initHeader();

            initFooter();

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

                var iconNewContainer = getElement('iconNewContainer' + getSKUIndex(activate.sku));
                tl.add(iconNewContainer.content.show, "+=0.5");
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
            tl.add(unlockedContainer.content.show, "+=0.75");

            var footerTopCollectText = getElement('footerTopCollectText');
            tl.add(footerTopCollectText.content.hide, "+=0.5");

            var unlockedCodeObjText = getElement('unlockedCodeObjText');
            tl.add(unlockedCodeObjText.content.show, "+=0");

            var footerTopClaimText = getElement('footerTopClaimText');
            tl.add(footerTopClaimText.content.show, "+=0");

            var footerTopClaim = getElement('footerTopClaim');
            tl.add(footerTopClaim.content.show, "+=0");

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
