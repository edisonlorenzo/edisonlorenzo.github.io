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

            elements.push(container);

            return container;
        }

        function createText(id, container, text, style)
        {
            var richText = new PIXI.Text(text, style);

            container.addChild(richText);

            var content = {};
            content.id = id;

            richText.content = content;

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

            elements.push(graphic);

            return graphic;
        }

        return {
            compareStrings: compareStrings,
            getElement: getElement,
            removeElement: removeElement,
            createImage: createImage,
            createContainer: createContainer,
            createText: createText,
            createGraphic: createGraphic,
            createImageButton: createImageButton
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
