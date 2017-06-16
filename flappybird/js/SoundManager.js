var SoundManager = (function () {

    // Instance stores a reference to the Singleton
    var instance;

    function init() {

        // Singleton Init

        var stageManager = StageManager.getInstance();
        var assetLoaderManager = AssetLoaderManager.getInstance();

        var assets = new Array();
        assets.push(new Asset('wing', 'sounds/sfx_wing.wav'));
        assets.push(new Asset('die', 'sounds/sfx_die.wav'));
        assets.push(new Asset('hit', 'sounds/sfx_hit.wav'));
        assets.push(new Asset('point', 'sounds/sfx_point.wav'));
        assets.push(new Asset('swoosh', 'sounds/sfx_swooshing.wav'));

        

        function Asset(resName, resPath)
        {
            this.resName = resName;
            this.resPath = resPath;
        }

        function getAsset()
        {
            return assets;
        }

        function playSound (soundName, delay)
        {
            var res = assetLoaderManager.getRes();
            
            setTimeout(play, delay*1000);

            function play() {
               res[soundName].sound.play();
            }
        }

        return {
            getAsset: getAsset,
            playSound: playSound
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

