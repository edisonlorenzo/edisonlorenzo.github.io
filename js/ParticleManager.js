var ParticleManager = (function () {

    // Instance stores a reference to the Singleton
    var instance;

    function init() {

        // Singleton Init
        
        var assetLoaderManager = AssetLoaderManager.getInstance();

        var assets = new Array();
        assets.push(new Asset('particle-star', 'images/texture/particle-star.png'));
        assets.push(new Asset('particle-circle', 'images/texture/particle-circle.png'));
        
        var emitter;
        
        function Asset(resName, resPath)
        {
            this.resName = resName;
            this.resPath = resPath;
        }

        function getAsset()
        {
            return assets;
        }
        
        var elapsed = Date.now();
        function update ()
        {
            //Loop this function 60 times per second
            requestAnimationFrame(update);
            
            var now = Date.now();
            var diff = (now - elapsed) * 0.001;
            if(!window.errormode) {
                if(emitter != undefined)
                {
                    emitter.update(diff);
                }
            }
            elapsed = now;
        }
        
        requestAnimationFrame(update);

        function setEmitter(_emitter)
        {
            emitter = _emitter;
        }

        return {
            getAsset: getAsset,
            setEmitter: setEmitter,
            update: update
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

