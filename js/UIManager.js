var UIManager = (function () {

    // Instance stores a reference to the Singleton
    var instance;

    function init() {

        // Singleton Init

        var stageManager = StageManager.getInstance();
        var spineManager = SpineManager.getInstance();
        var assetLoaderManager = AssetLoaderManager.getInstance();

        var assets = new Array();
        assets.push(new Asset('panel', 'images/ui/panel-650x400.png'));
        assets.push(new Asset('button', 'images/ui/orange-btn.png'));
        
        function Asset(resName, resPath)
        {
            this.resName = resName;
            this.resPath = resPath;
        }

        function getAsset()
        {
            return assets;
        }
        
        
        var dialog1JSON = {
            id: 'dialog1',
            component: 'Window',
            image: 'images/ui/panel-650x400.png',
            padding: 4,
            position: { x: 0, y: 0 },
            width: 400,
            height: 300
        };
        
        function setupUI(callback)
        {
            EZGUI.Theme.load(['images/themes/metalworks-theme/metalworks-theme.json'], function () {
        
        
                EZGUI.themes['metalworks'];
                var dlg1 = EZGUI.create(dialog1JSON, "metalworks");
                dlg1.visible = false;
                
                var textureButton = PIXI.Texture.fromImage('images/ui/orange-btn.png');
                var button = new PIXI.Sprite(textureButton);
                button.buttonMode = true;

                button.anchor.set(0.5);
                button.x = 300;
                button.y = 220;
                button.width = 120;
                button.height = 60;

                // make the button interactive...
                button.interactive = true;
                button.buttonMode = true;

                button
                    .on('pointertap', function () {
                    if(!hasClicked)
                    {
                        console.log("CLICK");
                        hasClicked = true;
                        var targetX = -20 - stageManager.getRenderer().width;
                        dlg1.animatePosTo(targetX, dlg1.position.y, 800, EZGUI.Easing.Back.In, function () {
                            dlg1.visible = false;
                            hasClicked = false;
                            showDialog(currentCharIndex);
                        });	
                    }
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
                dlg1.addChild(button);

                stageManager.getStage().addChild(dlg1);
                
                callback();
            });
        }
        
        var currentCharIndex = 0;
        var hasClicked;
        var charEdison;
        var charJia;
        var charJian;
        
        function showDialog(index)
        {
            if(charEdison == undefined)
                charEdison = spineManager.createSpine("powercore_male", "Edison", 100, 250, 0.5);
            
            if(charJia == undefined)
                charJia = spineManager.createSpine("powercore_male", "Jia", 100, 250, 0.5);
            
            if(charJian == undefined)
                charJian = spineManager.createSpine("powercore_male", "Jian", 100, 250, 0.5);
            
            currentCharIndex = index + 1;
            var dlg = EZGUI.components.dialog1;
            dlg.position.x = 20 + dlg.width;
            dlg.position.y = (stageManager.getRenderer().height - dlg.height) / 2;
            var targetX = (stageManager.getRenderer().width - dlg.width) / 2;
            dlg.visible = true;
            dlg.removeChild(charEdison);
            dlg.removeChild(charJia);
            dlg.removeChild(charJian);
            switch(index)
            {
                case 0: 
                    dlg.addChild(charEdison);
                    break;
                case 1: 
                    dlg.addChild(charJia);
                    break;
                case 2: 
                    dlg.addChild(charJian);
                    currentCharIndex = 0;
                    break;
                default:
                    break;
            }
            
            dlg.animatePosTo(targetX, dlg.position.y, 800, EZGUI.Easing.Back.Out);  
            
        }

        return {
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

