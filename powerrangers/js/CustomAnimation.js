"use strict";

window.onload = function(){
    console.log('Loaded');
    init();
}

function init()
{
    if(animationObject)
    {
        var tl = new TimelineMax();

        function addPercent(percent, value)
        {
            var pctValue = parseFloat(percent);
            return (pctValue + value) + "%";
        }

        function fadeIn(element)
        {

            TweenMax.fromTo(element, 0.5, {alpha: 0}, {alpha: 1, ease: Power2.easeOut});
        }

        function slideIn(element, direction)
        {
            var offsetValue = (direction == "fromTop" || direction == "fromLeft") ? -20 : 20;
            var currentPos = (direction == "fromTop" || direction == "fromBottom") ? element.style.top : element.style.left;

            element.currentPos = currentPos;
            if(direction == "fromTop" || direction == "fromBottom")
            {
                TweenMax.fromTo(element.style, 0.5, {top: addPercent(element.currentPos, offsetValue)}, {top: element.currentPos, ease: Power2.easeOut});
            }
            else if(direction == "fromLeft" || direction == "fromRight")
            {
                TweenMax.fromTo(element.style, 0.5, {left: addPercent(element.currentPos, offsetValue)}, {left: element.currentPos, ease: Power2.easeOut});
            }
        }

        function zoomIn(element)
        {
            TweenMax.fromTo(element, 0.5, {scale: 0}, {scale: 1, ease: Back.easeOut, onComplete:function(){this.style.removeProperty('transform');}.bind(element)});
        }

        function zoomOut(element)
        {
            TweenMax.fromTo(element, 0.5, {scale: 2}, {scale: 1, ease: Back.easeOut, onComplete:function(){this.style.removeProperty('transform');}.bind(element)});
        }

        function wipeIn(element, direction)
        {
            var width = element.width + "px";
            var height = element.height + "px";

            switch (direction) {
                case "fromLeft":
                    TweenMax.fromTo(element, 0.5, {clip:"rect(0px 0px " + height + " 0px)"}, {clip:"rect(0px " + width + " " + height + " 0px)", ease: Power2.easeOut, onComplete:function(){this.style.removeProperty('clip');}.bind(element)});
                    break;
                case "fromRight":
                    TweenMax.fromTo(element, 0.5, {clip:"rect(0px " + width + " " + height + " " + width + ")"}, {clip:"rect(0px " + width + " " + height + " 0px)", ease: Power2.easeOut, onComplete:function(){this.style.removeProperty('clip');}.bind(element)});
                    break;
                case "fromTop":
                    TweenMax.fromTo(element, 0.5, {clip:"rect(0px " + width + " 0px 0px)"}, {clip:"rect(0px " + width + " " + height + " 0px)", ease: Power2.easeOut, onComplete:function(){this.style.removeProperty('clip');}.bind(element)});
                    break;
                default:

            }

        }

        function checkAnimation(element)
        {
            for(var i = 0; i < element.animation.length; i++)
            {
                switch (element.animation[i].id) {
                    case "fadeIn":
                        fadeIn(element);
                        break;
                    case "slideInFromTop":
                        slideIn(element, "fromTop");
                        break;
                    case "slideInFromBottom":
                        slideIn(element, "fromBottom");
                        break;
                    case "slideInFromLeft":
                        slideIn(element, "fromLeft");
                        break;
                    case "slideInFromRight":
                        slideIn(element, "fromRight");
                        break;
                    case "zoomIn":
                        zoomIn(element);
                        break;
                    case "zoomOut":
                        zoomOut(element);
                        break;
                    case "wipeFromLeft":
                        wipeIn(element, "fromLeft");
                        break;
                    case "wipeFromRight":
                        wipeIn(element, "fromRight");
                        break;
                    case "wipeFromTop":
                        wipeIn(element, "fromTop");
                        break;
                    default:
                }
            }

        }

        for(var i = 0; i < animationObject.length; i++)
        {
            var elem = document.getElementById(animationObject[i].id);
            elem.animation = animationObject[i].animation;
            elem.style.visibility = "hidden";
            elem.show = (function() {
                this.style.visibility = "visible";
                checkAnimation(this);
            }).bind(elem);

            tl.add(elem.show, "+=" + animationObject[i].timing);
        }
    }

}
