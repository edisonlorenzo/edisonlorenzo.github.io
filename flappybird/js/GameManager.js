var GameManager = (function () {

    // Instance stores a reference to the Singleton
    var instance;

    function init() {

        // Singleton Init
        
        var stageManager = StageManager.getInstance();
        var soundManager = SoundManager.getInstance();
        var res;

        var pipeContainer
        var pipeArray
        var state;
        
        var floor = 'floor';
        var bg = 'bg';
        var pipetop = 'pipetop';
        var pipebottom = 'pipebottom';
        var tapstart = 'tapstart';
        
        var assets = new Array();
        
        assets.push(new Asset(bg, 'images/bg.png'));
        assets.push(new Asset(floor, 'images/floor.png'));
        assets.push(new Asset(pipetop, 'images/pipetop.png'));
        assets.push(new Asset(pipebottom, 'images/pipebottom.png'));
        assets.push(new Asset(tapstart, 'images/tapstart.png'));
        
        assets.push(new Asset('black', 'images/fadebg.png'));
        assets.push(new Asset('white', 'images/white.png'));
        
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
//            TweenMax.to(image.position, speed, {x: pos, y: image.y, ease: Linear.easeNone, repeat:loop ? -1 : 0, onComplete:completeHandler});
//            function completeHandler()
//            {
//                if(!loop)
//                {
//                    stageManager.getContainer().removeChild(image);
//                    image.destroy();
//                    console.log(stageManager.getContainer());
//                }
//            }
            
            var cancel = false;
            var currentPos = image.position.x;
            requestAnimationFrame(update);
            function update()
            {
                if(!cancel && state != 'hit' && state != 'gameover')
                {
                    image.position.x -= (0.1 * speed);
                    
                    if(image.position.x <= pos)
                    {
                        if(loop)
                        {
                            image.position.x = currentPos; 
                            requestAnimationFrame(update);
                        }
                        else
                        {
                            cancel = true;
                        }
                    }
                    else
                    {
                        requestAnimationFrame(update);
                    }
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
            var pipeClearance = new PIXI.Sprite(res['black'].texture);
            var floorObj = getElement(floor);
            var flyingBird = getElement('flyingBird');
            
            pipeTop.scale.x = pipeTop.scale.y = stageManager.getDimension().calculateRatioByHeight(pipeTop.height, .75);
            pipeBottom.scale.x = pipeBottom.scale.y = stageManager.getDimension().calculateRatioByHeight(pipeBottom.height, .75);
            
            pipeClearance.width = 10;
            pipeClearance.height = clearance;
            pipeClearance.anchor.x = 0.5;
            pipeClearance.alpha = 0;
            
            pipeTop.position.x = stageManager.getDimension().width;
            pipeBottom.position.x = stageManager.getDimension().width;
            pipeClearance.position.x = stageManager.getDimension().width + (pipeTop.width / 2);
            
            pipeTop.id = 'id'+num;
            pipeBottom.id = 'id'+num;
            
            pipeTop.destroy = destroy;
            pipeBottom.destroy = destroy;
            
            pipeClearance.hit = false;
            
            var randomValue = Math.floor(Math.random() * (pipeBottom.height * .65)) + 50; 

            pipeBottom.position.y = stageManager.getDimension().height - floorObj.height - randomValue;
            pipeClearance.position.y = pipeBottom.position.y - pipeClearance.height;
            pipeTop.position.y = pipeClearance.position.y - pipeTop.height
            
            pipeContainer.addChild(pipeClearance);
            pipeContainer.addChild(pipeTop);
            pipeContainer.addChild(pipeBottom);
            
            moveImage(pipeTop, speed, -pipeTop.width, false);
            moveImage(pipeBottom, speed, -pipeBottom.width, false);
            moveImage(pipeClearance, speed, -pipeClearance.width, false);
            
            requestAnimationFrame(update);
            function update()
            {
//                console.log(pipeTop.id + ' : ' + checkCollision(pipeTop));
                if(checkCollision(pipeClearance) && !pipeClearance.hit)
                {
                    pipeClearance.hit = true;
                    soundManager.playSound('point', 0);
                    var scoreObj = getElement('score');
                    scoreObj.setScore(1);
                }
                
                if(checkCollision(pipeTop) || checkCollision(pipeBottom))
                {
                    flashScreen();
                    soundManager.playSound('hit', 0);
                    state = 'hit';
                    active = false;
                    flyingBird.die();
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
                var a = flyingBird;
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
        
        function createScore(id)
        {
            var style = new PIXI.TextStyle({
                fontFamily: 'Arial',
                fontSize: 26,
                fontStyle: 'normal',
                fontWeight: 'bold',
                fill: ['#ffffff', '#ffffff'], // gradient
                stroke: '#000000',
                strokeThickness: 4,
                dropShadow: false,
                dropShadowColor: '#000000',
                dropShadowBlur: 0,
                dropShadowAngle: Math.PI / 6,
                dropShadowDistance: 0,
                wordWrap: false,
                wordWrapWidth: 600
            });

            var richText = new PIXI.Text('0', style);
            richText.anchor.set(0.5);
            richText.x = stageManager.getDimension().width / 2;
            richText.y = richText.height;
            
            stageManager.getContainer().addChild(richText);
            
            function setScore(value)
            {
                richText.text = parseInt(richText.text) + value;
            }
            
            
            this.richText = richText;
            this.richText.id = id;
            this.richText.setScore = setScore;
            return this.richText;
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
            var useAnimation = true;
            
            function update()
            {
                if(useAnimation)
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
                }
                
                if(useGravity)
                {
                    if(image.position.y < stageManager.getDimension().height - floorObj.height - (image.height / 2))
                    {
                        image.position.y = image.position.y - gravity;
                        image.rotation = image.rotation < 1.5 ? image.rotation + 0.04 : 1.5;
                        gravity = gravity - 0.3;
                    }
                    else
                    {
                        die();
                        useGravity = false;
                        state = 'gameover';
                    }
                }
                
                requestAnimationFrame(update);
            }
            
            function die()
            {
                soundManager.playSound('die', 0);
                useAnimation = false;
            }
            
            function flap()
            {
                soundManager.playSound('wing', 0);
                useGravity = true;
                image.rotation = -1;
                gravity = 6.5;
            }
            
            requestAnimationFrame(update);
            
            stageManager.getContainer().addChild(image);
            
            this.image = image;
            this.image.id = id;
            this.image.flap = flap;
            this.image.die = die;
            
            return this.image;
        }
        
        function flashScreen()
        {
            var screenObj = getElement('screen');
            screenObj.alpha = 1;
            
            requestAnimationFrame(update);
            function update()
            {
                if(screenObj.alpha > 0)
                {
                    screenObj.alpha -= 0.1;
                    requestAnimationFrame(update);
                }
            }
        }
        
        function setup()
        {
            elements = new Array();
            pipeContainer = new PIXI.Container();
            pipeArray = new Array();
            
            state = 'menu';
            
            res =  AssetLoaderManager.getInstance().getRes();

            var backgroundObj = createBackground(res[bg].texture, 5);
            
            var floorObj = createFloor(res[floor].texture, 15);
            elements.push(floorObj);
            
            var tapStartImage = createImage(tapstart, res[tapstart].texture, 0.2, stageManager.getDimension().width / 2, (stageManager.getDimension().height / 2) + 50);
            var flyingBird = createBird('flyingBird', 0.1, stageManager.getDimension().width / 2, (stageManager.getDimension().height / 2) - 100);
            var screenBtn = createImage('screen', res['white'].texture, 1, stageManager.getDimension().width / 2, stageManager.getDimension().height / 2);
            
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
                        setup();
                        break;
                }
                
            });
            
            var scoreObj = createScore('score'); 
            elements.push(scoreObj);
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
                    pipeArray.push(createPipe(pipeNum, res[pipetop].texture, res[pipebottom].texture, 15, 150));
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

