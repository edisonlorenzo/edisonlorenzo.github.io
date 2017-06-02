var SpineManager = (function () {

    // Instance stores a reference to the Singleton
    var instance;

    function init() {

        // Singleton Init

        var stageManager = StageManager.getInstance();
        var soundManager = SoundManager.getInstance();
        var assetLoaderManager = AssetLoaderManager.getInstance();

        var assets = new Array();
        assets.push(new Asset('popple', 'images/spine/popple/popple.json'));
        assets.push(new Asset('powercore_male', 'images/spine/powercore/team_powercore.json'));
        assets.push(new Asset('powercore_female', 'images/spine/powercore/team_powercore_female.json'));

        function Asset(resName, resPath)
        {
            this.resName = resName;
            this.resPath = resPath;
        }

        function getAsset()
        {
            return assets;
        }

        function createSpine (spineName, skinName, x, y, scale)
        {
            var spineRes = assetLoaderManager.getRes();
            var spine = new PIXI.spine.Spine(spineRes[spineName].spineData);

            spine.interactive = true;
            spine.buttonMode = true;

            // set current skin
            spine.skeleton.setSkinByName(skinName);
            spine.skeleton.setSlotsToSetupPose();

            // set the position
            spine.x = x;
            spine.y = y;

            spine.scale.set(scale);

            // play animation
            spine.state.setAnimation(0, 'idle', true);

            stageManager.getStage().addChild(spine);

            spine.on('pointertap', function() {
                var animationData = new Array();
                animationData.push(new AnimationData('attack', ['hit1','hit2','hit3','hit4'], 0.35));
                animationData.push(new AnimationData('summon', ['voice1'], 0));
                animationData.push(new AnimationData('hit', ['pain1','pain2','pain3','pain4','pain5','pain6'], 0));
                
                var randomValue = Math.floor(Math.random() * animationData.length);
                
                console.log(animationData[randomValue].animationName);
                console.log(animationData[randomValue].getRandomSound());
                
                spine.state.setAnimation(0, animationData[randomValue].animationName, false);
                spine.state.addAnimation(0, 'idle', true, 0);
                
                soundManager.playSound(animationData[randomValue].getRandomSound(), animationData[randomValue].soundDelay);
            });
            
            function AnimationData(animationName, soundName, soundDelay)
            {
                this.animationName = animationName;
                this.soundName = soundName;
                this.soundDelay = soundDelay;
                this.getRandomSound = function(){
                    var randomValue = Math.floor(Math.random() * soundName.length);
                    return soundName[randomValue];
                };
            }

        }

        return {
            getAsset: getAsset,
            createSpine: createSpine
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

