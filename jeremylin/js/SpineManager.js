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



        function createSpine (spineJsonData)
        {
            var assetLoaderManager = AssetLoaderManager.getInstance();

            var spineRes = assetLoaderManager.getRes();
            var spine = new PIXI.spine.Spine(spineRes[spineJsonData.spineName].spineData);

            spine.interactive = true;
            spine.buttonMode = true;

            // set current skin
            spine.skeleton.setSkinByName(spineJsonData.skinName);
            spine.skeleton.setSlotsToSetupPose();

            // set the position
            spine.x = spineJsonData.position.x;
            spine.y = spineJsonData.position.y;

            spine.scale.set(spineJsonData.scale);

            // play animation
            spine.state.setAnimation(0, spineJsonData.animationName, spineJsonData.loop);

            spine.on('pointertap', function() {
                spine.state.setAnimation(0, spineJsonData.animationName, spineJsonData.loop);
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
