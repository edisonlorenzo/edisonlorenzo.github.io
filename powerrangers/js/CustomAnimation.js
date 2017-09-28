"use strict";

var ScriptLoader = (function ()
{
    function ScriptLoader(files)
    {
        var _this = this;
        this.log = function (t)
        {
            console.log("ScriptLoader: " + t);
        };
        this.onReady = function (callback)
        {
            _this.onReadyCallback = callback;
        };
        this.loadScript = function (i)
        {
            var script = document.createElement('script');
            script.type = 'text/javascript';
            script.src = _this.m_js_files[i];
            var loadNextScript = function ()
            {
                if (i + 1 < _this.m_js_files.length)
                {
                    _this.loadScript(i + 1);
                }
                else
                {
                    _this.onReadyCallback();
                }
            };
            script.onload = function ()
            {
                _this.log('Loaded script "' + _this.m_js_files[i] + '".');
                loadNextScript();
            };
            script.onerror = function ()
            {
                _this.log('Error loading script "' + _this.m_js_files[i] + '".');
                loadNextScript();
            };
            _this.log('Loading script "' + _this.m_js_files[i] + '".');
            _this.m_head.appendChild(script);
        };
        this.loadFiles = function ()
        {
            _this.loadScript(0);
        };
        this.m_js_files = [];
        this.m_head = document.getElementsByTagName("head")[0];

        function endsWith(str, suffix)
        {
            if (str === null || suffix === null)
                return false;
            return str.indexOf(suffix, str.length - suffix.length) !== -1;
        }
        for (var i = 0; i < files.length; ++i)
        {
            if (endsWith(files[i], ".js"))
            {
                this.m_js_files.push(files[i]);
            }
            else
                this.log('Error unknown filetype "' + files[i] + '".');
        }
    }
    return ScriptLoader;
})();


var CustomAnimation = (function ()
{
    function CustomAnimation()
    {
        var scriptLoader = new ScriptLoader(["js/gsap/TweenMax.min.js", "js/gsap/TimelineMax.min.js"]);
        var _this = this;
        this.log = function (t)
        {
            console.log("CustomAnimation: " + t);
        };
        this.onReady = function (callback)
        {
            scriptLoader.onReady(callback);
        };

        this.hideContainer = function(id)
        {
            var elem = document.getElementById(id);
            elem.style.opacity = 0;
        };

        this.showContainer = function(id)
        {
            var elem = document.getElementById(id);
            elem.style.opacity = 1;
        };

        this.init = function ()
        {
            _this.log("Initializing...");
            scriptLoader.loadFiles();

            window.addEventListener("DOMContentLoaded", function(event) {
                _this.log("DOM Elements Loaded!");
                _this.hideContainer(_this.containerId);
            });
        }

        this.start = function (animationObject)
        {
            window.addEventListener("load", function(event) {
                _this.log("All resources finished loading!");
                _this.showContainer(_this.containerId);
                if(animationObject)
                {
                    _this.log("Starting Animation...");
                    var tl = new TimelineMax();

                    function addPercent(percent, value)
                    {
                        var pctValue = parseFloat(percent);
                        return (pctValue + value) + "%";
                    }

                    function fadeIn(element, config)
                    {
                        var duration = config && config.duration ? config.duration : 0.5;
                        var from = config && config.from ? config.from : 0;
                        var to = config && config.to ? config.to : 1;
                        var easeType = config && config.ease ? config.ease : Power2.easeOut;
                        TweenMax.fromTo(element, duration, {alpha: from}, {alpha: to, ease: easeType});
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

                    function zoomIn(element, config)
                    {
                        var duration = config && config.duration ? config.duration : 0.5;
                        var from = config && config.from ? config.from : 0;
                        var to = config && config.to ? config.to : 1;
                        var easeType = config && config.ease ? config.ease : Linear.easeNone;
                        TweenMax.fromTo(element, duration, {scale: from}, {scale: to, ease: easeType, onComplete:function(){this.style.removeProperty('transform');}.bind(element)});
                    }

                    function zoomOut(element, config)
                    {
                        var duration = config && config.duration ? config.duration : 0.5;
                        var from = config && config.from ? config.from : 2;
                        var to = config && config.to ? config.to : 1;
                        var easeType = config && config.ease ? config.ease : Linear.easeNone;
                        TweenMax.fromTo(element, duration, {scale: from}, {scale: to, ease: easeType, onComplete:function(){this.style.removeProperty('transform');}.bind(element)});
                    }

                    function rotate(element, config)
                    {
                        var duration = config && config.duration ? config.duration : 0.5;
                        var degree = config && config.degree ? config.degree : 360;
                        var easeType = config && config.ease ? config.ease : Linear.easeNone;
                        TweenMax.fromTo(element, duration, {rotation: 0}, {rotation: degree, ease: easeType, onComplete:function(){this.style.removeProperty('transform');}.bind(element)});
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
                            var animation = element.animation[i];
                            switch (animation.id) {
                                case "fadeIn":
                                    fadeIn(element, animation.config);
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
                                    zoomIn(element, animation.config);
                                    break;
                                case "zoomOut":
                                    zoomOut(element, animation.config);
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
                                case "rotate":
                                    rotate(element, animation.config);
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
            });
        };
    }

    return CustomAnimation;
})();
