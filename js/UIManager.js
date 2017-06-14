var UIManager = (function () {

    // Instance stores a reference to the Singleton
    var instance;

    function init() {

        // Singleton Init

        var stageManager = StageManager.getInstance();
        var spineManager = SpineManager.getInstance();
        var assetLoaderManager = AssetLoaderManager.getInstance();

        var assets = new Array();
        assets.push(new Asset('panel-650x400', 'images/ui/panel-650x400.png'));
        assets.push(new Asset('panel-650x400-mask', 'images/ui/panel-650x400-mask.png'));
        assets.push(new Asset('orange-btn', 'images/ui/orange-btn.png'));
        assets.push(new Asset('powercore-bg', 'images/ui/powercore-bg.png'));
        assets.push(new Asset('fadebg', 'images/ui/fadebg.png'));
        
        var res;
        
        function Asset(resName, resPath)
        {
            this.resName = resName;
            this.resPath = resPath;
        }

        function getAsset()
        {
            return assets;
        }
        
        function createOverlay(id)
        {
            var texture = new PIXI.Sprite(res['fadebg'].texture);
            texture.anchor.set(0.5);
            texture.alpha = .5;
//            texture.width = stageManager.getDimension().width;
//            texture.height = stageManager.getDimension().height;
//            texture.x = stageManager.getDimension().width / 2;
//            texture.y = stageManager.getDimension().height / 2;
            
            resize();
            
            function resize()
            {
                texture.width = stageManager.getDimension().width;
                texture.height = stageManager.getDimension().height;
                texture.x = stageManager.getDimension().width / 2;
                texture.y = stageManager.getDimension().height / 2;
            }
            
            this.texture = texture;
            this.texture.id = id;
            this.texture.resize = resize;
            elements.push(this.texture);
            
            return this.texture;
        }
        
        function createBackground(id)
        {
            var texture = new PIXI.Sprite(res['powercore-bg'].texture);
            texture.anchor.set(0.5);
//            texture.x = stageManager.getDimension().width / 2;
//            texture.y = stageManager.getDimension().height / 2;
//            texture.scale.x = texture.scale.y = stageManager.getDimension().calculateRatioBoth('width', texture.width, texture.height, 1, 1);
            resize();
            
            function resize()
            {
                texture.scale.x = texture.scale.y = 1;
                texture.scale.x = texture.scale.y = stageManager.getDimension().calculateRatioBoth('width', texture.width, texture.height, 1, 1);
                texture.x = stageManager.getDimension().width / 2;
                texture.y = stageManager.getDimension().height / 2;
            }
            
            this.texture = texture;
            this.texture.id = id;
            this.texture.resize = resize;
            elements.push(this.texture);
            
            return this.texture;
        }
        
        function createDialog(id)
        {
            var texture = new PIXI.Sprite(res['panel-650x400'].texture);
            var textureMask = new PIXI.Sprite(res['panel-650x400-mask'].texture);
            texture.anchor.set(0.5);
            
            var dimension = {};
            dimension.width = texture.width;
            dimension.height = texture.height;
            
            var container = new PIXI.Container();
            container.width = texture.width;
            container.height = texture.height;
            container.x = -(texture.width / 2);
            container.y = -(texture.height / 2);
            textureMask.x=0;
            textureMask.y=0;
            container.addChild(textureMask);
            container.mask = textureMask;
            texture.addChild(container);
            
//            texture.scale.x = texture.scale.y = stageManager.getDimension().calculateRatioBoth('height', texture.width, texture.height, .9, .6);
            
            resize();
            
            function resize()
            {

                
                texture.scale.x = texture.scale.y = 1;
                texture.scale.x = texture.scale.y = stageManager.getDimension().calculateRatioBoth('height', texture.width, texture.height, .9, .6);
                
                texture.position.x = stageManager.getDimension().width / 2;
                texture.position.y = stageManager.getDimension().height / 2;
                
                texture.currentScale = texture.scale.x;
            }
            
            this.texture = texture;
            this.texture.id = id;
            this.texture.container = container;
            this.texture.dimension = dimension;
            this.texture.currentScale = texture.scale.x;
            this.texture.resize = resize;
            
            elements.push(this.texture);
            
            return this.texture;
        }
        
        function createButton(id)
        {
            var texture = new PIXI.Sprite(res['orange-btn'].texture);
            texture.anchor.set(0.5);
            
            texture.interactive = true;
            texture.buttonMode = true;
            
            var style = new PIXI.TextStyle({
                fontFamily: 'Arial',
                fontSize: 25,
                fontStyle: 'normal',
                fontWeight: 'bold',
                fill: ['#ffffff', '#ffffff'], // gradient
                stroke: '#000000',
                strokeThickness: 2,
                dropShadow: true,
                dropShadowColor: '#000000',
                dropShadowBlur: 4,
                dropShadowAngle: Math.PI / 6,
                dropShadowDistance: 2,
                wordWrap: false,
                wordWrapWidth: 100
            });

            var buttonText = new PIXI.Text('', style);
            buttonText.anchor.set(0.5);
            buttonText.x = 0;
            buttonText.y = 0;
        
            texture.addChild(buttonText);
            
            this.texture = texture;
            this.texture.PIXIText = buttonText;
            this.texture.id = id;
            this.texture.hasClicked = false;
            this.texture.currentScale = texture.scale.x;
            elements.push(this.texture);
            
            return this.texture;
        }
        
        var elements = new Array();
        
        function getElement(id)
        {
            return elements.find(item => item.id == id);
        }
        
        function setupUI(callback)
        {
            res = assetLoaderManager.getRes();
            var bg = createBackground('bg');
            var dialog = createDialog('dialogSpine');
            var button = createButton('buttonNext');
            var fadeBg = getElement('fadeBg');
            
            button.PIXIText.text = 'Next';
            button.x = (dialog.dimension.width * .75);
            button.y = (dialog.dimension.height * .80);

            button.on('pointertap', function () {
                if(!button.hasClicked)
                {
                    button.hasClicked = true;
                    var targetX = -(dialog.width / 2);
                    var targetScaleTo = dialog.currentScale * .75;
                    
                    TweenMax.killTweensOf(fadeBg);
                    TweenMax.killTweensOf(dialog);
                    
                    TweenMax.to(fadeBg, .5, {alpha: 0, ease: Power2.easeIn});
                    
                    TweenMax.to(dialog.position, .5, {x: targetX, y: dialog.position.y, ease: Power2.easeIn, onComplete:completeHandler}).delay(.25);
                    TweenMax.to(dialog.scale, .5, {x: targetScaleTo, y: targetScaleTo, ease: Power2.easeIn});
                    
                    function completeHandler(){
                        dialog.visible = false;
                        button.hasClicked = false;
                        showDialog();
                    };
                }
            });
            
            button.on('pointerover', function () {
                TweenMax.to(button.scale, 0.25, {x: 1, y: 1, ease: Back.easeOut});
            });
            
            button.on('pointerout', function () {
                TweenMax.to(button.scale, 0.25, {x: 1, y: 1, ease: Back.easeIn});
            });
            
            button.on('pointerup', function () {
                TweenMax.to(button.scale, 0.25, {x: 1, y: 1, ease: Back.easeIn});
            });
            
            button.on('pointerupoutside', function () {
                TweenMax.to(button.scale, 0.25, {x: 1, y: 1, ease: Back.easeIn});
            });
            
            button.on('pointerdown', function () {
                TweenMax.to(button.scale, 0.25, {x: .9, y: .9, ease: Back.easeOut});
            });

//            var style = new PIXI.TextStyle({
//                fontFamily: 'Arial',
//                fontSize: 40,
//                fontStyle: 'normal',
//                fontWeight: 'bold',
//                fill: ['#ffffff', '#ffffff'], // gradient
//                stroke: '#000000',
//                strokeThickness: 2,
//                dropShadow: true,
//                dropShadowColor: '#000000',
//                dropShadowBlur: 4,
//                dropShadowAngle: Math.PI / 6,
//                dropShadowDistance: 2,
//                wordWrap: true,
//                wordWrapWidth: 100
//            });
//
//            var buttonText = new PIXI.Text('Next', style);
//            buttonText.anchor.set(0.5);
//            buttonText.x = 0;
//            buttonText.y = 0;
//        
//            button.addChild(buttonText);

            
            
            var btnFullscreen = createButton('btnFullscreen');
            btnFullscreen.PIXIText.text = 'Fullscreen';
            btnFullscreen.x = stageManager.getDimension().width * .5;
            btnFullscreen.y = stageManager.getDimension().height + btnFullscreen.height;
            btnFullscreen.scale.x = btnFullscreen.scale.y = stageManager.getDimension().calculateRatioBoth('height', btnFullscreen.width, btnFullscreen.height, .4, .1);
            btnFullscreen.currentScale = btnFullscreen.scale.x;
            function checkFullscreen()
            {
                requestAnimationFrame(checkFullscreen);
//                btnFullscreen.visible = !(screenfull.isFullscreen);
                if(screenfull.isFullscreen)
                {
                    btnFullscreen.PIXIText.text = 'Exit Fullscreen';
                    btnFullscreen.PIXIText.fontSize = 20;
                }
                else
                {
                    btnFullscreen.PIXIText.text = 'Fullscreen';
                    btnFullscreen.PIXIText.fontSize = 30;
                }
            }
            
            requestAnimationFrame(checkFullscreen);
            
            btnFullscreen.on('pointertap', function () {
                if(!btnFullscreen.hasClicked)
                {
                    if ( screenfull ) {
                        screenfull.toggle();
                    }
                }
            });
            
            btnFullscreen.on('pointerover', function () {
                TweenMax.to(btnFullscreen.scale, 0.25, {x: btnFullscreen.currentScale * 1, y: btnFullscreen.currentScale * 1, ease: Back.easeOut});
            });
            
            btnFullscreen.on('pointerout', function () {
                TweenMax.to(btnFullscreen.scale, 0.25, {x: btnFullscreen.currentScale * 1, y: btnFullscreen.currentScale * 1, ease: Back.easeIn});
            });
            
            btnFullscreen.on('pointerup', function () {
                TweenMax.to(btnFullscreen.scale, 0.25, {x: btnFullscreen.currentScale * 1, y: btnFullscreen.currentScale * 1, ease: Back.easeIn});
            });
            
            btnFullscreen.on('pointerupoutside', function () {
                TweenMax.to(btnFullscreen.scale, 0.25, {x: btnFullscreen.currentScale * 1, y: btnFullscreen.currentScale * 1, ease: Back.easeIn});
            });
            
            btnFullscreen.on('pointerdown', function () {
                TweenMax.to(btnFullscreen.scale, 0.25, {x: btnFullscreen.currentScale * .9, y: btnFullscreen.currentScale * .9, ease: Back.easeOut});
            });
            
            dialog.container.addChild(button);
            
            stageManager.getContainer().addChild(bg);

            
            var fadeBg = createOverlay('fadeBg');
            stageManager.getContainer().addChild(fadeBg);
            
            stageManager.getContainer().addChild(btnFullscreen);
            
            stageManager.getContainer().addChild(dialog);
            
            window.addEventListener("resize", function(event){ 
                stageManager.resize();
                bg.resize();
                fadeBg.resize();
                dialog.resize();
                btnFullscreen.x = stageManager.getDimension().width * .5;
                btnFullscreen.y = stageManager.getDimension().height * .9;
                btnFullscreen.scale.x = btnFullscreen.scale.y = 1;
                btnFullscreen.scale.x = btnFullscreen.scale.y = stageManager.getDimension().calculateRatioBoth('height', btnFullscreen.width, btnFullscreen.height, .4, .1);
                btnFullscreen.currentScale = btnFullscreen.scale.x;
            });
            
//            var btnFullscreen = getElement('btnFullscreen');
            var targetY = stageManager.getDimension().height * .9;
            TweenMax.to(btnFullscreen.position, .5, {x: btnFullscreen.position.x, y: targetY, ease: Power2.easeOut}).delay(.75);
            
            callback();
        }
        
        var currentCharIndex = 0;
        var spineCharacters = [
            {spineName:'powercore_male', skinName:'Edison'},
            {spineName:'powercore_male', skinName:'Jia'},
            {spineName:'powercore_male', skinName:'Jian'},
            {spineName:'popple', skinName:'Popple'},
            {spineName:'popple', skinName:'Pico'}
        ];
        var spineCharacterObjects = new Array();
        
        function showDialog()
        {
            var dialog = getElement('dialogSpine');
            var fadeBg = getElement('fadeBg');
            
            if(spineCharacterObjects.length == 0)
            {
                for(var i = 0; i < spineCharacters.length; i++)
                {
                    spineCharacterObjects.push(spineManager.createSpine(spineCharacters[i].spineName, spineCharacters[i].skinName, (dialog.dimension.width * .3), (dialog.dimension.height * .85), 0.75));
                }
            }

            dialog.position.x = stageManager.getDimension().width + (dialog.width / 2);
            dialog.position.y = stageManager.getDimension().height / 2;
            dialog.visible = true;
            
            for(var i = 0; i < spineCharacters.length; i++)
            {
                  dialog.container.removeChild(spineCharacterObjects[i]);
            }

            dialog.container.addChild(spineCharacterObjects[currentCharIndex]);

            currentCharIndex ++;
            currentCharIndex = currentCharIndex >= spineCharacterObjects.length ? 0 : currentCharIndex; 

            var targetX = stageManager.getDimension().width / 2;
            var targetScaleFrom = dialog.currentScale * .75;
            
            TweenMax.fromTo(fadeBg, .5, {alpha: 0}, {alpha: .5, ease: Power2.easeOut}).delay(.25);
            
            TweenMax.to(dialog.position, .5, {x: targetX, y: dialog.position.y, ease: Power2.easeOut});
            TweenMax.fromTo(dialog.scale, .5, {x: targetScaleFrom, y: targetScaleFrom}, {x: dialog.currentScale, y: dialog.currentScale, ease: Power2.easeOut}).delay(.25);
            
            
        }

        return {
            getElement: getElement,
            getAsset: getAsset,
            setupUI: setupUI,
            showDialog: showDialog
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

