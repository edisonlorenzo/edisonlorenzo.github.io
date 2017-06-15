var GameManager = (function () {

    // Instance stores a reference to the Singleton
    var instance;

    function init() {

        // Singleton Init
        
        var stageManager = StageManager.getInstance();
        var res;

        var pipeContainer
        var pipeArray
        var state;
        
        var floor = 'floor';
        var bg = 'bg';
        var pipetop = 'pipetop';
        var pipebottom = 'pipebottom';
        var tapstart = 'tapstart';
        var fadebg = 'fadebg';
        
        var assets = new Array();
        
        assets.push(new Asset(bg, 'images/bg.png'));
        assets.push(new Asset(floor, 'images/floor.png'));
        assets.push(new Asset(pipetop, 'images/pipetop.png'));
        assets.push(new Asset(pipebottom, 'images/pipebottom.png'));
        assets.push(new Asset(tapstart, 'images/tapstart.png'));
        assets.push(new Asset(fadebg, 'images/fadebg.png'));
        
        assets.push(new Asset('bird1', 'images/bird1.png'));
        assets.push(new Asset('bird2', 'images/bird2.png'));
        assets.push(new Asset('bird3', 'images/bird3.png'));
        
        function Asset(resName, resPath)
        {
            this.resName = resName;
            this.resPath = resPath;
        }

        function getAsset()
        {
            return assets;
        }
        
        function moveImage(image, speed, pos, loop)
        {
            TweenMax.to(image.position, speed, {x: pos, y: image.y, ease: Linear.easeNone, repeat:loop ? -1 : 0, onComplete:completeHandler});
            function completeHandler()
            {
                if(!loop)
                {
                    stageManager.getContainer().removeChild(image);
                    image.destroy();
                    console.log(stageManager.getContainer());
                }
            }
        }
        
        function createBackground(imageRes, speed)
        {
            var image1 = new PIXI.Sprite(imageRes);
            var image2 = new PIXI.Sprite(imageRes);
            
            image1.scale.x = image1.scale.y = stageManager.getDimension().calculateRatioBoth('height', image1.width, image1.height, 1, 1);
            image2.scale.x = image2.scale.y = stageManager.getDimension().calculateRatioBoth('height', image2.width, image2.height, 1, 1);
            
            image1.position.x = 0;
            image2.position.x = image1.width;
            
            stageManager.getContainer().addChild(image1);
            stageManager.getContainer().addChild(image2);
            
            this.play = play;
            
            play();
            
            function play()
            {
                moveImage(image1, speed, image1.position.x-image1.width, true);
                moveImage(image2, speed, image2.position.x-image2.width, true);  
            }
            
            return this;
        }
        
        function createFloor(imageRes, speed)
        {
            var image1 = new PIXI.Sprite(imageRes);
            var image2 = new PIXI.Sprite(imageRes);
            
            image1.scale.x = image1.scale.y = stageManager.getDimension().calculateRatioByWidth(image1.width, 1);
            image2.scale.x = image2.scale.y = stageManager.getDimension().calculateRatioByWidth(image2.width, 1);
            
            image1.position.x = 0;
            image2.position.x = image1.width;
            
            image1.position.y = stageManager.getDimension().height - image1.height;
            image2.position.y = stageManager.getDimension().height - image2.height;
            
            stageManager.getContainer().addChild(image1);
            stageManager.getContainer().addChild(image2);
            
            this.id = floor;
            this.height = image1.height;
            this.play = play;
            
            play();
            
            function play()
            {
                moveImage(image1, speed, image1.position.x-image1.width, true);
                moveImage(image2, speed, image2.position.x-image2.width, true); 
            }
            
            return this;
        }
        
        function createPipe(num, pipeTopRes, pipeBottomRes, speed, clearance)
        {
            var active = true;
            var pipeTop = new PIXI.Sprite(pipeTopRes);
            var pipeBottom = new PIXI.Sprite(pipeBottomRes);
            var floorObj = getElement(floor);
            pipeTop.scale.x = pipeTop.scale.y = stageManager.getDimension().calculateRatioByHeight(pipeTop.height, .75);
            pipeBottom.scale.x = pipeBottom.scale.y = stageManager.getDimension().calculateRatioByHeight(pipeBottom.height, .75);
            
            pipeTop.position.x = stageManager.getDimension().width;
            pipeBottom.position.x = stageManager.getDimension().width;
            
            pipeTop.id = 'id'+num;
            pipeBottom.id = 'id'+num;
            
            pipeTop.destroy = destroy;
            pipeBottom.destroy = destroy;
            
            var randomValue = Math.floor(Math.random() * (pipeBottom.height * .65)) + 50; 

            pipeBottom.position.y = stageManager.getDimension().height - floorObj.height - randomValue;
            pipeTop.position.y = pipeBottom.position.y - clearance - pipeTop.height
            
            pipeContainer.addChild(pipeTop);
            pipeContainer.addChild(pipeBottom);
            
            moveImage(pipeTop, speed, -pipeTop.width, false);
            moveImage(pipeBottom, speed, -pipeBottom.width, false);
            
            requestAnimationFrame(update);
            function update()
            {
//                console.log(pipeTop.id + ' : ' + checkCollision(pipeTop));
                if(checkCollision(pipeTop) || checkCollision(pipeBottom))
                {
                    state = 'hit';
                    active = false;
                    TweenMax.killAll();
                }
                
                if(active)
                {
                    requestAnimationFrame(update);
                }
                
            }
            
            function destroy()
            {
                active = false;
                delete this;
            }
            
            function checkCollision(pipe)
            {
                var a = getElement('flyingBird');
                var b = pipe;
                var ab = a.getBounds();
                var bb = b.getBounds();
                
                if(ab.x < bb.x + bb.width &&
                    ab.x + ab.width > bb.x &&
                    ab.y < bb.y + bb.height &&
                    ab.height + ab.y > bb.y)
                {
                    return true;
                }
                else
                {
                    return false;
                }
                
            }
        }
        
        function createImage(id, imageRes, scale, posX, posY)
        {
            var image = new PIXI.Sprite(imageRes);
            image.anchor.set(0.5);
            image.scale.x = image.scale.y = stageManager.getDimension().calculateRatioByHeight(image.height, scale);
            
            image.position.x = posX;
            image.position.y = posY;
            
            stageManager.getContainer().addChild(image);
            
            this.image = image;
            this.image.id = id;
            this.image.hasClicked = false;
            return this.image;
        }
        
        function createBird(id, scale, posX, posY)
        {
            var frames = ['bird1', 'bird2', 'bird3', 'bird2'];
            var floorObj = getElement(floor);
            
            var image = new PIXI.Sprite(res[frames[0]].texture);
            
            image.anchor.set(0.5);
            image.scale.x = image.scale.y = stageManager.getDimension().calculateRatioByWidth(image.width, scale);
            
            image.position.x = posX;
            image.position.y = posY;
            
            var num = 0;
            var frame = 0;
            var speed = 12;
            var gravity = 0;
            var useGravity = false;
            
            function update()
            {
                frame++;
                image.texture = res[frames[num]].texture;
                if(frame >= speed)
                {
                    frame = 0;
                    num++;
                    if(num >= frames.length)
                    {
                        num = 0;
                    }
                }
                
                if(useGravity)
                {
                    if(image.position.y < stageManager.getDimension().height - floorObj.height - (image.height / 2))
                    {
                        image.position.y = image.position.y - gravity;
                        gravity = gravity - 0.3;
                    }
                    else
                    {
                        useGravity = false;
                        state = 'gameover';
                        TweenMax.killAll();
                    }
                }
                
   
                
                requestAnimationFrame(update);
            }
            
            function flap()
            {
                useGravity = true;
                gravity = 7;
            }
            
            requestAnimationFrame(update);
            
            stageManager.getContainer().addChild(image);
            
            this.image = image;
            this.image.id = id;
            this.image.flap = flap;
            
            return this.image;
        }
        
        function setup()
        {
            elements = new Array();
            pipeContainer = new PIXI.Container();
            pipeArray = new Array();
            
            state = 'menu';
            
            res =  AssetLoaderManager.getInstance().getRes();

            var backgroundObj = createBackground(res[bg].texture, 15);
            
            var floorObj = createFloor(res[floor].texture, 5);
            elements.push(floorObj);
            
            var screenBtn = createImage(fadebg, res[fadebg].texture, 1, stageManager.getDimension().width / 2, stageManager.getDimension().height / 2);
            var tapStartImage = createImage(tapstart, res[tapstart].texture, 0.2, stageManager.getDimension().width / 2, (stageManager.getDimension().height / 2) + 50);
            var flyingBird = createBird('flyingBird', 0.1, stageManager.getDimension().width / 2, (stageManager.getDimension().height / 2) - 100);

            elements.push(tapStartImage);
            elements.push(screenBtn);
            elements.push(flyingBird);
            
            stageManager.getContainer().addChildAt(pipeContainer, 2);
            
            screenBtn.alpha = 0;
            screenBtn.interactive = true;
            screenBtn.on('pointertap', function () {
                switch(state)
                {
                    case 'menu':
                        tapStartImage.visible = false;
                        startGame();
                        break;
                    case 'playing':
                        flyingBird.flap();
                        break;
                    case 'gameover':
                        for (var i = pipeContainer.children.length - 1; i >= 0; i--) {pipeContainer.removeChild(pipeContainer.children[i]);};
                        for (var i = stageManager.getContainer().children.length - 1; i >= 0; i--) {stageManager.getContainer().removeChild(stageManager.getContainer().children[i]);};
                        console.log(stageManager.getContainer());
                        setup();
                        break;
                }
                
            });
        }
        
        function startGame()
        {
            state = 'playing';
            
            var flyingBird = getElement('flyingBird');
            flyingBird.flap();
            
            
            requestAnimationFrame(updatePipe);
            
            var count = 0;
            var pipeNum = 0;
            function updatePipe()
            {
                count++;
                
                if(count == 200)
                {
                    count = 0;
                    pipeArray.push(createPipe(pipeNum, res[pipetop].texture, res[pipebottom].texture, 6.31, 150));
                    pipeNum++;
                }
                
                if(state == 'playing')
                {
                    requestAnimationFrame(updatePipe);
                }
                
            }
        }
        
        var elements;
        
        function getElement(id)
        {
            return elements.find(item => item.id == id);
        }
        
        return {
            getAsset: getAsset,
            setup: setup
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

