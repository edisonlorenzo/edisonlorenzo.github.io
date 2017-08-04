"use strict";
var SoundManager = (function () {

    // Instance stores a reference to the Singleton
    var instance;

    function init() {

        // Singleton Init

        var assets = new Array();
        assets.push(new Asset('sfx-activated', 'sounds/sfx_activated.mp3'));

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
            var res = AssetLoaderManager.getInstance().getRes();

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
