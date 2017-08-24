"use strict";
var LibraryManager = (function () {

    // Instance stores a reference to the Singleton
    var instance;

    function init() {

        // Singleton Init

        var elements = new Array();

        function getElement(id)
        {
            return elements.find(function(item){return item.content.id === id});
        }

        function removeElement(id)
        {
            elements = elements.filter(function(item){return item.content.id !== id});
        }

        function getElementFromList(list, ref, value)
        {
            return list.find(function(item){return item[ref] === value});
        }

        function getElementCountFromList(list, ref, value)
        {
            return list.filter(function(item){return item[ref] === value}).length;
        }

        function compareStrings (string1, string2, ignoreCase, useLocale) {
            if (ignoreCase) {
                if (useLocale) {
                    string1 = string1.toLocaleLowerCase();
                    string2 = string2.toLocaleLowerCase();
                }
                else {
                    string1 = string1.toLowerCase();
                    string2 = string2.toLowerCase();
                }
            }

            return string1 === string2;
        }

        function createImage(id, container, imageRes)
        {
            var image = new PIXI.Sprite(imageRes);
            container.addChild(image);

            image.anchor.set(0.5);

            var content = {};
            content.id = id;
            content.hasClicked = false;

            image.content = content;

            removeElement(id);
            elements.push(image);

            return image;
        }

        function createImageButton(id, container, imageResDefault, imageResHighlight)
        {
            var image = new PIXI.Sprite(imageResDefault);
            container.addChild(image);
            image.anchor.set(0.5);

            image.interactive = true;
            image.buttonMode = true;

            var content = {};
            content.id = id;
            content.hasClicked = false;

            if(imageResHighlight)
            {
                var imageHighlight = new PIXI.Sprite(imageResHighlight);
                image.addChild(imageHighlight);

                imageHighlight.anchor.set(0.5);

                imageHighlight.alpha = 0;
                imageHighlight.visible = false;

                content.isSelected = false;
                content.imageHighlight = imageHighlight;

                content.setSelected = (function(value){
                    this.isSelected = value;
                    if(value)
                    {
                        this.imageHighlight.visible = true;
                        TweenMax.to(this.imageHighlight, 0.5, {alpha: 1, ease: Power2.easeOut});
                    } else {
                        TweenMax.to(this.imageHighlight, 0.5, {alpha: 0, ease: Power2.easeOut, onComplete: (function(){this.imageHighlight.visible = false;}).bind(this)});
                    }
                }).bind(content);
            }

            image.content = content;

            removeElement(id);
            elements.push(image);

            return image;
        }

        function createContainer(id, parent)
        {
            var container = new PIXI.Container();
            parent.addChild(container);

            var content = {};
            content.id = id;

            container.content = content;

            removeElement(id);
            elements.push(container);

            return container;
        }

        function createText(id, container, text, style)
        {
            var richText = new PIXI.Text(text, style);
            richText.anchor.set(0.5);

            container.addChild(richText);

            var content = {};
            content.id = id;

            richText.content = content;

            removeElement(id);
            elements.push(richText);

            return richText;
        }

        function createGraphic(id, container, width, height, color)
        {
            var graphic = new PIXI.Graphics();
            graphic
            .beginFill(color)
            .drawRect(0, 0, width, height)
            .endFill();

            container.addChild(graphic);

            var content = {};
            content.id = id;

            graphic.content = content;

            removeElement(id);
            elements.push(graphic);

            return graphic;
        }

        function createVideo(id, container, videoTexture)
        {
            var image = new PIXI.Sprite(videoTexture);
            container.addChild(image);

            image.anchor.set(0.5);

            var content = {};
            content.id = id;

            image.content = content;

            removeElement(id);
            elements.push(image);

            return image;
        }

        function createScrollContainer(id, container, width, height)
        {
            var sc = new ScrollContainer(width, height);
            container.addChild(sc.po);

            sc.po.position.x = -(width * 0.5);

            var content = {};
            content.id = id;

            sc.content = content;

            removeElement(id);
            elements.push(sc);

            return sc;

        }

        function ScrollContainer(width, height)
        {
            this.po = new PIXI.DisplayObjectContainer();
            this.scrollContainer = new PIXI.DisplayObjectContainer();
            this.po.addChild(this.scrollContainer);
            this.items = [];

            this.mask = new PIXI.Graphics();
            this.mask
            .beginFill(0xFFFFFF)
            .drawRect(0, 0, width, height)
            .endFill();

            this.po.addChild(this.mask);
            this.scrollContainer.mask = this.mask;

            var itemHeight = 1;

            var _this = this;

            var mousedown = false;
            var isMoving = false;
            var lastPos = null;
            var lastDiff = null;
            var scrollTween = null;
            var maxVel = 0;

            this.setItemHeight = setItemHeight;
            this.isMoving = getScrollMovement;

            function setItemHeight(value)
            {
                itemHeight = value;
            }

            function getScrollMovement()
            {
                return isMoving;
            }

            function onmousemove(e)
            {
                var clientY = !e.data.originalEvent.touches ? e.data.originalEvent.clientY : e.data.originalEvent.touches[0].clientY;

                if (mousedown) {
                    lastDiff = clientY - lastPos.y;
                    lastDiff = lastDiff == 0 ? 1 : lastDiff;
                    if(Math.abs(lastDiff) > 10 * window.devicePixelRatio)
                    {
                        isMoving = true;
                    }

                    if(isMoving)
                    {
                        lastPos.y = clientY;

                        if (-_this.scrollContainer.y < 0) {
                        _this.scrollContainer.y += lastDiff/2;
                        }else{
                        _this.scrollContainer.y += lastDiff/2;
                        }
                    }

                }
            }

            function onmousedown(e)
            {
                var clientY = !e.data.originalEvent.touches ? e.data.originalEvent.clientY : e.data.originalEvent.touches[0].clientY;
                mousedown = true;
                if (scrollTween) scrollTween.kill();
                lastPos = {
                    y: clientY
                }
            }

            function onmouseup(e)
            {
                if(mousedown)
                {
                    if (lastDiff) {
                        var goY = _this.scrollContainer.y + lastDiff * 10;
                        var ease = Quad.easeOut;
                        var time = 0.1 + Math.abs(lastDiff / 150);

                        if (goY < -_this.items.length * itemHeight + height) {
                            goY = -_this.items.length * itemHeight + height;
                            ease = Back.easeOut;
                            time = 0.1 + Math.abs(lastDiff / 1500);
                        }
                        if (goY > 0)  {
                            goY = 0;
                            ease = Back.easeOut;
                            time = 0.1 + Math.abs(lastDiff / 1500);
                        }

                        if (_this.scrollContainer.y > 0) {
                            //time = 1 + _this.scrollContainer.y / 5000;
                            time = 0.5 + Math.abs(lastDiff / 1500);
                            ease = Elastic.easeOut;
                        }
                        if (_this.scrollContainer.y < -_this.items.length * itemHeight + height) {
                            time = 0.5 + Math.abs(lastDiff / 1500);
                            //time = 1 + (_this.items.length * itemHeight + height + _this.scrollContainer.y) / 5000;
                            ease = Elastic.easeOut;
                        }

                        scrollTween = TweenMax.to(_this.scrollContainer, time, {
                            y: goY,
                            ease: ease
                        });
                    }

                    isMoving = false;
                    mousedown = false;
                    lastPos = null;
                    lastDiff = null;
                }
            }

            this.po.interactive = true;
            this.po.mousemove = onmousemove;
            this.po.mousedown = onmousedown;
            this.po.mouseup = onmouseup;
            this.po.touchmove = onmousemove;
            this.po.touchstart = onmousedown;
            this.po.touchend = onmouseup;
            this.po.touchendoutside = onmouseup;
            this.po.mouseleave = onmouseup;
            this.po.mouseout = onmouseup;

            this.hideOffscreenElements = function() {
                var startIndex = Math.floor(-_this.scrollContainer.y / itemHeight);
                var endIndex = Math.floor(startIndex + (height / itemHeight));

                for (var i = 0; i < _this.items.length; i++) {
                    var item = _this.items[i];
                    item.visible = false;
                    if (i >= startIndex && i <= endIndex + 1) {
                        item.visible = true;
                    }
                }
            }

        }

        return {
            compareStrings: compareStrings,
            getElementCountFromList: getElementCountFromList,
            getElementFromList: getElementFromList,
            getElement: getElement,
            removeElement: removeElement,
            createImage: createImage,
            createContainer: createContainer,
            createText: createText,
            createGraphic: createGraphic,
            createImageButton: createImageButton,
            createVideo: createVideo,
            createScrollContainer: createScrollContainer
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
