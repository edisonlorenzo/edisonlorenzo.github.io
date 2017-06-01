
    

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

PIXI.loader
    .add('powercore_male_characters', 'images/spine/powercore/team_powercore.json')
    .load(onAssetsLoaded);

stage.interactive = true;
stage.buttonMode = true;

function onAssetsLoaded(loader, res)
{
    var powercore_male = new PIXI.spine.Spine(res.powercore_male_characters.spineData);

    // set current skin
    powercore_male.skeleton.setSkinByName('edison');
    powercore_male.skeleton.setSlotsToSetupPose();

    // set the position
    powercore_male.x = 400;
    powercore_male.y = 600;

    powercore_male.scale.set(1.5);

    // play animation
    powercore_male.state.setAnimation(0, 'idle', true);

    stage.addChild(powercore_male);

    stage.on('pointertap', function() {
        powercore_male.state.setAnimation(0, 'attack', false);
        powercore_male.state.addAnimation(0, 'attack', false, 0);
    });
    update();
}


function update (){

  //Loop this function 60 times per second
  requestAnimationFrame(update);

  //Render the stage
  renderer.render(stage);
}

