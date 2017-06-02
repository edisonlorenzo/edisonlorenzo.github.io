var SpineManager = (function () {

  // Instance stores a reference to the Singleton
  var instance;

  function init() {

    // Singleton Init

    var stageManager = StageManager.getInstance();
      
    var assetLoader = new PIXI.loaders.Loader();
    assetLoader.add('popple', 'images/spine/popple/popple.json');
    assetLoader.add('powercore_male', 'images/spine/powercore/team_powercore.json');
    assetLoader.add('powercore_female', 'images/spine/powercore/team_powercore_female.json');
    assetLoader.load(onAssetsLoaded);
    
    var onReadyCallback;
    function onReady(callback)
    {
        onReadyCallback = callback;
    }
    
    var spineRes;  
    function onAssetsLoaded(loader, res)
    {
        spineRes = res;
        onReadyCallback();
    }
      
    function createSpine (spineName, skinName, x, y, scale)
    {
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

        stageManager.stage.addChild(spine);

        spine.on('pointertap', function() {
            var animation = ['attack', 'summon', 'hit'];
            var randomValue = Math.floor(Math.random() * animation.length);
            spine.state.setAnimation(0, animation[randomValue], false);
            spine.state.addAnimation(0, 'idle', true, 0);
        });

    }
      
    return {
        onReady: onReady,
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

