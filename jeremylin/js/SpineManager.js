var SpineManager = (function () {

    // Instance stores a reference to the Singleton
    var instance;

    function init() {

        // Singleton Init

        var assets = new Array();
        assets.push(new Asset('jlin', 'spines/jlin.json'));
        assets.push(new Asset('jlin-logo', 'spines/jlin_logo.json'));

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
            var assetLoaderManager = AssetLoaderManager.getInstance();

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
            spine.state.setAnimation(0, 'summon_appear', false);

            spine.on('pointertap', function() {
                spine.state.setAnimation(0, 'summon_appear', false);
            });

            return spine;
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
