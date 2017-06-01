
    

//Create the renderer
var renderer = PIXI.autoDetectRenderer(600, 800);

renderer.view.style.width = '600px';
renderer.view.style.height = '800px';

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

window.addEventListener("resize", function(event){ 
  scaleToWindow(renderer.view);
});

PIXI.loader
  .add("images/bunny.png")
  .load(setup);

var padding = 100;
var bounds = new PIXI.Rectangle(
    -padding,
    -padding, 
    renderer.width + padding * 2, 
    renderer.height + padding * 2
);
var bunnies = [];

function setup() {

	for (var i = 0; i < 50; i++)
	{
	    var bunny =  PIXI.Sprite.fromImage("images/bunny.png");
	    bunny.anchor.set(0.5);
	    stage.addChild(bunny);
	
	    bunny.direction = Math.random() * Math.PI * 2;
	    bunny.speed = 1;
	    bunny.turnSpeed = Math.random() - 0.8;

	    bunny.x = Math.random() * bounds.width;
	    bunny.y = Math.random() * bounds.height;

	    bunny.scale.set(1 + Math.random() * 0.3);
	    bunny.original = new PIXI.Point();
	    bunny.original.copy(bunny.scale);
    	    bunnies.push(bunny);

	}
  	update();
}

var count = 0;
var ticker = new PIXI.ticker.Ticker();
ticker.add(function() {
    
    count += 0.05;

    for (var i = 0; i < bunnies.length; i++) {
        var bunny = bunnies[i];

        bunny.direction += bunny.turnSpeed * 0.01;
        bunny.x += Math.sin(bunny.direction) * bunny.speed;
        bunny.y += Math.cos(bunny.direction) * bunny.speed;

        bunny.rotation =- bunny.direction - Math.PI/2;
        bunny.scale.x = bunny.original.x + Math.sin(count) * 0.2;

        // wrap the bunnys around as the crawl
        if (bunny.x < bounds.x) {
            bunny.x += bounds.width;
        }
        else if (bunny.x > bounds.x + bounds.width) {
            bunny.x -= bounds.width;
        }

        if (bunny.y < bounds.y) {
            bunny.y += bounds.height;
        }
        else if (bunny.y > bounds.y + bounds.height) {
            bunny.y -= bounds.height;
        }
    }
});
ticker.start();

function update(){

  //Loop this function 60 times per second
  requestAnimationFrame(update);

  //Render the stage
  renderer.render(stage);
}

