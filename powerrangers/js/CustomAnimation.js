"use strict";
var isScriptLoaded = false;
var ScriptLoader = (function ()
{
    function ScriptLoader(files, sender)
    {
        var _this = this;
        this.log = function (t)
        {
            console.log("ScriptLoader: " + t);
        };
        this.logError = function (t)
        {
            console.error("Script Error: " + t);
        };
        this.onReady = function (callback)
        {
            _this.onReadyCallback = callback;
        };
        this.loadScript = function (i)
        {
            var script = document.createElement('script');
            script.type = 'text/javascript';
            script.src = _this.js_files[i];
            var loadNextScript = function ()
            {
                if (i + 1 < _this.js_files.length)
                {
                    _this.loadScript(i + 1);
                }
                else
                {
                    if(_this.hasError)
                    {
                        sender.showContainer();
                    }
                    else
                    {
                        _this.onReadyCallback();
                    }

                }
            };
            script.onload = function ()
            {
                _this.log('Loaded script "' + _this.js_files[i] + '".');
                loadNextScript();
            };
            script.onerror = function ()
            {
                _this.logError('Error loading script "' + _this.js_files[i] + '".');
                _this.hasError = true;
                loadNextScript();
            };
            _this.log('Loading script "' + _this.js_files[i] + '".');
            _this.head.appendChild(script);
        };
        this.loadFiles = function ()
        {
            _this.loadScript(0);
        };
        this.js_files = [];
        this.head = document.getElementsByTagName("head")[0];

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
                this.js_files.push(files[i]);
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
        var scriptLoader = new ScriptLoader(["js/gsap/TweenMax.min.js", "js/gsap/TimelineMax.min.js"], this);
        var _this = this;
        var animationObject;
        this.log = function (t)
        {
            console.log("CustomAnimation: " + t);
        };
        this.logError = function (t)
        {
            console.error("Script Error: " + t);
        };
        this.config = function(value)
        {
            animationObject = value;
        };
        this.onReady = function(callback)
        {
            scriptLoader.onReady(callback);
        };

        function removeProperty(element, property)
        {
            element.style.removeProperty(property);
        }

        function setElementOpacity(id, value)
        {
            if(id)
            {
                var elem = document.getElementById(id);
                if(elem)
                {
                    elem.style.opacity = value;
                }
                else
                {
                    _this.logError("Invalid containerId : \"" + id + "\" using " + (value == 0 ? "hideContainer" : "showContainer") + "(id) function.");
                }
            }
        }

        this.hideContainer = function()
        {
            setElementOpacity(_this.containerId, 0);
        };

        this.showContainer = function()
        {
            setElementOpacity(_this.containerId, 1);
        };

        this.init = function ()
        {
            _this.log("Initializing...");

            if(!isScriptLoaded)
            {
                _this.log("Loading Dependency Scripts...");
                isScriptLoaded = true;
                scriptLoader.loadFiles();
            }

            window.addEventListener("DOMContentLoaded", function(event) {
                _this.log("DOM Elements Loaded!");
                _this.hideContainer();
            });
        };

        this.start = function()
        {
            window.addEventListener("load", function(event) {
                _this.log("All resources finished loading!");
                _this.showContainer();
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

                    function slideIn(element, config, direction)
                    {
                        var duration = config && config.duration ? config.duration : 0.5;
                        var offset = config && config.offset ? Math.abs(config.offset) : 20;
                        var easeType = config && config.ease ? config.ease : Linear.easeNone;

                        var offsetValue = (direction == "fromTop" || direction == "fromLeft") ? -(offset) : offset;
                        var currentPos = (direction == "fromTop" || direction == "fromBottom") ? element.style.top : element.style.left;

                        element.currentPos = currentPos;
                        element.from = {};
                        element.to = {ease: easeType};
                        if(direction == "fromTop" || direction == "fromBottom")
                        {
                            element.from.top = addPercent(element.currentPos, offsetValue);
                            element.to.top = element.currentPos;
                        }
                        else
                        {
                            element.from.left = addPercent(element.currentPos, offsetValue);
                            element.to.left = element.currentPos;
                        }
                        TweenMax.fromTo(element.style, duration, element.from, element.to);
                    }

                    function zoomIn(element, config)
                    {
                        var duration = config && config.duration ? config.duration : 0.5;
                        var from = config && config.from ? config.from : 0;
                        var to = config && config.to ? config.to : 1;
                        var easeType = config && config.ease ? config.ease : Linear.easeNone;
                        TweenMax.fromTo(element, duration, {scale: from}, {scale: to, ease: easeType, onComplete: removeProperty(element, 'transform')});
                    }

                    function zoomOut(element, config)
                    {
                        var duration = config && config.duration ? config.duration : 0.5;
                        var from = config && config.from ? config.from : 2;
                        var to = config && config.to ? config.to : 1;
                        var easeType = config && config.ease ? config.ease : Linear.easeNone;
                        TweenMax.fromTo(element, duration, {scale: from}, {scale: to, ease: easeType, onComplete: removeProperty(element, 'transform')});
                    }

                    function rotate(element, config, direction)
                    {
                        var duration = config && config.duration ? config.duration : 0.5;
                        var degree = config && config.degree ? Math.abs(config.degree) : 360;
                        var easeType = config && config.ease ? config.ease : Linear.easeNone;

                        degree = direction == "CCW" ? -(degree) : degree;
                        TweenMax.fromTo(element, duration, {rotation: 0}, {rotation: degree, ease: easeType, onComplete: removeProperty(element, 'transform')});
                    }

                    function wipeIn(element, config, direction)
                    {
                        var width = element.width + "px";
                        var height = element.height + "px";
                        var easeType = config && config.ease ? config.ease : Linear.easeNone;
                        var fromRect = "rect(0px 0px 0px 0px)";

                        switch (direction) {
                            case "fromLeft":
                                fromRect = "rect(0px 0px " + height + " 0px)";
                                break;
                            case "fromRight":
                                fromRect = "rect(0px " + width + " " + height + " " + width + ")";
                                break;
                            case "fromTop":
                                fromRect = "rect(0px " + width + " 0px 0px)";
                                break;
                            case "fromBottom":
                                fromRect = "rect(" + height + " " + width + " " + height + " 0px)";
                                break;
                            default:
                                break;
                        }

                        TweenMax.fromTo(element, 0.5, {clip: fromRect}, {clip: "rect(0px " + width + " " + height + " 0px)", ease: easeType, onComplete: removeProperty(element, 'clip')});
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
                                    slideIn(element, animation.config, "fromTop");
                                    break;
                                case "slideInFromBottom":
                                    slideIn(element, animation.config, "fromBottom");
                                    break;
                                case "slideInFromLeft":
                                    slideIn(element, animation.config, "fromLeft");
                                    break;
                                case "slideInFromRight":
                                    slideIn(element, animation.config, "fromRight");
                                    break;
                                case "zoomIn":
                                    zoomIn(element, animation.config);
                                    break;
                                case "zoomOut":
                                    zoomOut(element, animation.config);
                                    break;
                                case "wipeFromLeft":
                                    wipeIn(element, animation.config, "fromLeft");
                                    break;
                                case "wipeFromRight":
                                    wipeIn(element, animation.config, "fromRight");
                                    break;
                                case "wipeFromTop":
                                    wipeIn(element, animation.config, "fromTop");
                                    break;
                                case "wipeFromBottom":
                                    wipeIn(element, animation.config, "fromBottom");
                                    break;
                                case "rotateCW":
                                    rotate(element, animation.config, "CW");
                                    break;
                                case "rotateCCW":
                                    rotate(element, animation.config, "CCW");
                                    break;
                                default:
                            }
                        }

                    }

                    for(var i = 0; i < animationObject.length; i++)
                    {
                        var id = animationObject[i].id;
                        if(id)
                        {
                            var elem = document.getElementById(id);
                            if(elem)
                            {
                                var animation = animationObject[i].animation;
                                animation = animation ? animation : [{id:"fadeIn"}];

                                elem.animation = animation;
                                elem.style.visibility = "hidden";
                                elem.show = (function() {
                                    this.style.visibility = "visible";
                                    checkAnimation(this);
                                }).bind(elem);

                                var timing = animationObject[i].timing;
                                timing = timing ? timing : 0;

                                tl.add(elem.show, "+=" + timing);
                            }
                        }
                    }
                }
            });
        };
    }

    return CustomAnimation;
})();
