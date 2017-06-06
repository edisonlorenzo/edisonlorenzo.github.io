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
        
        function createDialog(id)
        {
            var texture = new PIXI.Sprite(res['panel-650x400'].texture);
            var textureMask = new PIXI.Sprite(res['panel-650x400-mask'].texture);
            texture.anchor.set(0.5);
            
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
            
            this.texture = texture;
            this.texture.id = id;
            this.texture.container = container;
            
            elements.push(this.texture);
            
            return this.texture;
        }
        
        function createButton(id)
        {
            var texture = new PIXI.Sprite(res['orange-btn'].texture);
            texture.anchor.set(0.5);
            
            texture.interactive = true;
            texture.buttonMode = true;
            
            this.texture = texture;
            this.texture.id = id;
            
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
           
            var dialog = createDialog('dialogSpine');
            var button = createButton('buttonNext');
            button.x = (dialog.width * .75);
            button.y = (dialog.height * .80);

            button.on('pointertap', function () {
                if(!hasClicked)
                {
                    hasClicked = true;
                    var targetX = -(dialog.width * .5) - stageManager.getRenderer().width ;
                    TweenMax.to(dialog.position, 1, {x: targetX, y: dialog.position.y, ease: Back.easeIn, onComplete:completeHandler});
                    
                    function completeHandler(){
                        dialog.visible = false;
                        hasClicked = false;
                        showDialog();
                    };
                }
            });
            
            button.on('pointerover', function () {
                TweenMax.to(button.scale, 0.25, {x: 1.1, y: 1.1, ease: Back.easeOut});
            });
            
            button.on('pointerout', function () {
                TweenMax.to(button.scale, 0.25, {x: 1, y: 1, ease: Back.easeIn});
            });
            
            button.on('pointerup', function () {
                TweenMax.to(button.scale, 0.25, {x: 1.1, y: 1.1, ease: Back.easeIn});
            });
            
            button.on('pointerdown', function () {
                TweenMax.to(button.scale, 0.25, {x: .9, y: .9, ease: Back.easeOut});
            });

            var style = new PIXI.TextStyle({
                fontFamily: 'Arial',
                fontSize: 40,
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
                wordWrap: true,
                wordWrapWidth: 100
            });

            var buttonText = new PIXI.Text('Next', style);
            buttonText.anchor.set(0.5);
            buttonText.x = 0;
            buttonText.y = 0;
        
            button.addChild(buttonText);
            dialog.container.addChild(button);
            
            stageManager.getStage().addChild(dialog);
            
            callback();
        }
        
        var currentCharIndex = 0;
        var hasClicked;
        var spineCharacters = [
            {spineName:'powercore_male', skinName:'Edison'},
            {spineName:'powercore_male', skinName:'Jia'},
            {spineName:'powercore_male', skinName:'Jian'},
            {spineName:'popple', skinName:'Popple'},
            {spineName:'popple', skinName:'Pico'}
        ];
        var spineCharacterObjects = new Array();
        var charEdison;
        var charJia;
        var charJian;
        
        function showDialog()
        {
            var dialog = getElement('dialogSpine');
            
            if(spineCharacterObjects.length == 0)
            {
                for(var i = 0; i < spineCharacters.length; i++)
                {
                    spineCharacterObjects.push(spineManager.createSpine(spineCharacters[i].spineName, spineCharacters[i].skinName, (dialog.width * .3), (dialog.height * .85), 0.75));
                    
                }
            }

            dialog.position.x = stageManager.getRenderer().width + (dialog.width / 2);
            dialog.position.y = stageManager.getRenderer().height / 2;
            dialog.visible = true;
            
            for(var i = 0; i < spineCharacters.length; i++)
            {
                  dialog.container.removeChild(spineCharacterObjects[i]);
            }

            dialog.container.addChild(spineCharacterObjects[currentCharIndex]);

            currentCharIndex ++;
            currentCharIndex = currentCharIndex >= spineCharacterObjects.length ? 0 : currentCharIndex; 
            
            var targetX = stageManager.getRenderer().width / 2;
            TweenMax.to(dialog.position, 1, {x: targetX, y: dialog.position.y, ease: Back.easeOut});
        }

        return {
            getElement:getElement,
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

