var SoundManager = (function () {

    // Instance stores a reference to the Singleton
    var instance;

    function init() {

        // Singleton Init

        var stageManager = StageManager.getInstance();
        var assetLoaderManager = AssetLoaderManager.getInstance();

        var assets = new Array();
        assets.push(new Asset('voice1', 'sounds/voice1.mp3'));
        assets.push(new Asset('hit1', 'sounds/hit1.mp3'));
        assets.push(new Asset('hit2', 'sounds/hit2.mp3'));
        assets.push(new Asset('hit3', 'sounds/hit3.mp3'));
        assets.push(new Asset('hit4', 'sounds/hit4.mp3'));
        assets.push(new Asset('pain1', 'sounds/pain1.wav'));
        assets.push(new Asset('pain2', 'sounds/pain2.wav'));
        assets.push(new Asset('pain3', 'sounds/pain3.wav'));
        assets.push(new Asset('pain4', 'sounds/pain4.wav'));
        assets.push(new Asset('pain5', 'sounds/pain5.wav'));
        assets.push(new Asset('pain6', 'sounds/pain6.wav'));
        

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

