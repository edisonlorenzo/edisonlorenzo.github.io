
    

//Create the renderer
var renderer = PIXI.autoDetectRenderer(600, 800);

renderer.view.style.width = '600px';
renderer.view.style.height = '800px';

//Add style in document head
var newStyle = document.createElement("style");
var style = "* {padding: 0; margin: 0}";
newStyle.appendChild(document.createTextNode(style));
document.head.appendChild(newStyle);


//Add the canvas to the HTML document
document.body.appendChild(renderer.view);

//Create a container object called the `stage`
var stage = new PIXI.Container();

//Tell the `renderer` to `render` the `stage`
renderer.render(stage);

scaleToWindow(renderer.view);

window.addEventListener("resize", function (event) { 
  scaleToWindow(renderer.view);
});


var assetLoader = new PIXI.loaders.Loader();
assetLoader.add('popple', 'images/spine/popple/popple.json')
.load(onAssetsLoaded);


stage.interactive = true;
stage.buttonMode = true;

function onAssetsLoaded(loader, res)
{
    var popple = new PIXI.spine.Spine(res.popple.spineData);

    // set current skin
    popple.skeleton.setSkinByName('Popple');
    popple.skeleton.setSlotsToSetupPose();

    // set the position
    popple.x = renderer.view.offsetWidth / 2;
    popple.y = (renderer.view.offsetHeight / 2) + (popple.height/2);

    popple.scale.set(1);

    // play animation
    popple.state.setAnimation(0, 'idle', true);

    stage.addChild(popple);

    stage.on('pointertap', function() {
        popple.state.setAnimation(0, 'attack', false);
        popple.state.addAnimation(0, 'idle', true, 0);
    });
    update();
}


function update (){

  //Loop this function 60 times per second
  requestAnimationFrame(update);

  //Render the stage
  renderer.render(stage);
}

