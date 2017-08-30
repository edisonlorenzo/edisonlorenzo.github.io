"use strict";
var ContentMission = (function () {

    // Instance stores a reference to the Singleton
    var instance;

    function init() {

        // Singleton Init
        var isAssetLoaded;
        var isAssetPending;

        var isYtApiSuccess;
        var player;
        var isVideoLoading;

        var assets = new Array();

        assets.push(new Asset('img_event_shading', 'images/img_event_shading.png'));
        assets.push(new Asset('img_mission_shading', 'images/img_mission_shading.png'));
        assets.push(new Asset('img_block01', 'images/img_block01.png'));
        assets.push(new Asset('img_block02', 'images/img_block02.png'));
        assets.push(new Asset('img_block03', 'images/img_block03.png'));
        assets.push(new Asset('img_divider', 'images/img_divider.png'));
        assets.push(new Asset('btn_start', 'images/btn_start.png'));
        assets.push(new Asset('icon_lock', 'images/icon_lock.png'));
        assets.push(new Asset('icon_book', 'images/icon_book.png'));
        assets.push(new Asset('icon_event', 'images/icon_event.png'));
        assets.push(new Asset('icon_game', 'images/icon_game.png'));
        assets.push(new Asset('icon_video', 'images/icon_video.png'));
        assets.push(new Asset('icon_music', 'images/icon_music.png'));
        assets.push(new Asset('icon_comic', 'images/icon_comic.png'));
        assets.push(new Asset('icon_food', 'images/icon_food.png'));
        assets.push(new Asset('icon_toy', 'images/icon_toy.png'));
        assets.push(new Asset('icon_news', 'images/icon_news.png'));
        assets.push(new Asset('img_event01', 'images/missions/img_event01.png'));
        assets.push(new Asset('img_event02', 'images/missions/img_event02.png'));
        assets.push(new Asset('img_mission01', 'images/missions/img_mission01.png'));
        assets.push(new Asset('img_mission02', 'images/missions/img_mission02.png'));
        assets.push(new Asset('img_mission03', 'images/missions/img_mission03.png'));
        assets.push(new Asset('img_mission04', 'images/missions/img_mission04.png'));
        assets.push(new Asset('img_mission05', 'images/missions/img_mission05.png'));
        assets.push(new Asset('img_mission06', 'images/missions/img_mission06.png'));
        assets.push(new Asset('img_mission07', 'images/missions/img_mission07.png'));
        assets.push(new Asset('img_mission08', 'images/missions/img_mission08.png'));
        assets.push(new Asset('img_mission09', 'images/missions/img_mission09.png'));
        assets.push(new Asset('img_mission10', 'images/missions/img_mission10.png'));
        assets.push(new Asset('img_mission11', 'images/missions/img_mission11.png'));
        assets.push(new Asset('img_mission12', 'images/missions/img_mission12.png'));
        assets.push(new Asset('img_mission13', 'images/missions/img_mission13.png'));
        assets.push(new Asset('img_mission14', 'images/missions/img_mission14.png'));
        assets.push(new Asset('txt_mission_completed', 'images/txt_mission_completed.png'));

        var objData =
        {
            missionList :
            [
                {
                    data:
                    [
                        {id: 'm1', type: 'eventcell', title: 'Special Event Mission', desc: 'Street Investigation', imageRes: 'img_event01', iconRes: 'icon_event', hasStartButton: true},
                        {id: 'm2', type: 'eventcell', title: 'Special Event Mission', desc: 'Android Detention', imageRes: 'img_event02', iconRes: 'icon_game', hasStartButton: true}
                    ]
                },
                {
                    data:
                    [
                        {type: 'divider'}
                    ]
                },
                {
                    data:
                    [
                        {id: 'm3', type: 'onecell', title: 'Mission', desc: 'The Rick Deckard Report 01', imageRes: 'img_mission01', iconRes: 'icon_video', videoURL: 'https://www.youtube.com/watch?v=qJA48WZ9bis', rewardPoints: 5000},
                        {id: 'm4', type: 'onecell', title: 'Mission', desc: 'Tyrell Operation', imageRes: 'img_mission02', iconRes: 'icon_book'},
                        {id: 'm5', type: 'onecell', title: 'Mission', desc: 'The Origami Mystery', imageRes: 'img_mission03', iconRes: 'icon_game', isLocked: true, lockDesc: 'Unlock with 99999 Clue Points'}
                    ]
                },
                {
                    data:
                    [
                        {id: 'm6', type: 'twocell', title: 'Event', desc: 'The Hidden Soundtrack', imageRes: 'img_mission04', iconRes: 'icon_music'},
                        {id: 'm7', type: 'onecell', title: 'Mission', desc: 'Target Practice', imageRes: 'img_mission05', iconRes: 'icon_comic'}
                    ]
                },
                {
                    data:
                    [
                        {id: 'm8', type: 'onecell', title: 'Mission', desc: 'The Nexus 6 Creation Part 1', imageRes: 'img_mission06', iconRes: 'icon_news'},
                        {id: 'm9', type: 'onecell', title: 'Mission', desc: 'The Blueprint', imageRes: 'img_mission07', iconRes: 'icon_toy'},
                        {id: 'm10', type: 'onecell', title: 'Mission', desc: 'Food for Thought', imageRes: 'img_mission08', iconRes: 'icon_food'}
                    ]
                },
                {
                    data:
                    [
                        {id: 'm11', type: 'onecell', title: 'Mission', desc: 'Mobile Runner', imageRes: 'img_mission09', iconRes: 'icon_news'},
                        {id: 'm12', type: 'onecell', title: 'Mission', desc: 'Inside of Movie Preview', imageRes: 'img_mission10', iconRes: 'icon_news'},
                        {id: 'm13', type: 'onecell', title: 'Mission', desc: 'First Person Blade Runner', imageRes: 'img_mission11', iconRes: 'icon_news'}
                    ]
                },
                {
                    data:
                    [
                        {id: 'm14', type: 'onecell', title: 'Mission', desc: 'Art of Cinema', imageRes: 'img_mission12', iconRes: 'icon_news'},
                        {id: 'm15', type: 'onecell', title: 'Mission', desc: 'LAPD 2019 Blaster', imageRes: 'img_mission13', iconRes: 'icon_news'},
                        {id: 'm16', type: 'onecell', title: 'Mission', desc: 'Blade Fashion', imageRes: 'img_mission14', iconRes: 'icon_news'}
                    ]
                }
            ],
            missionType :
            [
                {type: 'divider', imageRes: 'img_divider'},
                {type: 'eventcell', imageRes: 'img_block01', imageShading: 'img_event_shading'},
                {type: 'onecell', imageRes: 'img_block02', imageShading: 'img_mission_shading'},
                {type: 'twocell', imageRes: 'img_block03', imageShading: 'img_mission_shading'}
            ]
        }

        function Asset(resName, resPath)
        {
            this.resName = resName;
            this.resPath = resPath;
        }

        function getAsset()
        {
            return assets;
        }

        function getObjData()
        {
            return objData;
        }

        function loadAssets(callback)
        {
            if(!isAssetPending)
            {
                isAssetPending = true;
                var assetLoaderManager = AssetLoaderManager.getInstance();
                var assetLoader = new PIXI.loaders.Loader();
                var assets = getAsset();

                for(var i = 0; i<assets.length; i++)
                {
                    assetLoader.add(assets[i].resName, assets[i].resPath);
                }
                assetLoader.load(assetReady);

                function assetReady(loader, res)
                {
                    assetLoaderManager.setRes(res);
                    isAssetLoaded = true;
                    callback();
                }
            }
        }

        function showCategory()
        {
            var assetLoaderManager = AssetLoaderManager.getInstance();
            var libraryManager = LibraryManager.getInstance();

            if(assetLoaderManager && libraryManager)
            {
                var res = assetLoaderManager.getRes();

                var bodyContainer = libraryManager.getElement('bodyContainer');
                bodyContainer.position.y = 45;

                var contentContainer = libraryManager.getElement('contentContainer');
                var bodyBackgroundObj = libraryManager.getElement('bodyBackgroundObj');

                var contentBodyContainer =  libraryManager.createContainer('contentBodyContainer', contentContainer);
                contentBodyContainer.position.y = -(bodyBackgroundObj.height * 0.5);

                var rowPos = 0, rowHeight = 0;
                var sc = libraryManager.createScrollContainer('contentScrollContainer', contentBodyContainer, bodyBackgroundObj.width, bodyBackgroundObj.height);
                var rowContainer;

                for (var row = 0; row < objData.missionList.length; row++)
                {
                    var posX = -(bodyBackgroundObj.width * 0.5) + 5;
                    rowContainer = new PIXI.Container();
                    rowContainer.position.x = (bodyBackgroundObj.width * 0.5);
                    sc.scrollContainer.addChild(rowContainer);
                    sc.items.push(rowContainer);

                    for (var i = 0; i < objData.missionList[row].data.length; i++)
                    {
                        var missionItem = objData.missionList[row].data[i];
                        var missionType = libraryManager.getElementFromList(objData.missionType, 'type', missionItem.type);
                        if(missionType)
                        {
                            var missionItemContainer =  libraryManager.createContainer('missionItemContainer_' + row + '_' + i, rowContainer);
                            missionItemContainer.visible = false;
                            missionItemContainer.content.load = (function() {
                                this.visible = true;
                                TweenMax.fromTo(this, 0.5, {alpha: 0}, {alpha: 1, ease: Power2.easeOut});
                                TweenMax.fromTo(this.position, 0.5, {y: -25}, {y: 0, ease: Power2.easeOut});
                            }).bind(missionItemContainer);

                            var cellBlock = libraryManager.createImage(missionItem.type + '_' + row + '_' + i, missionItemContainer, res[missionType.imageRes].texture);

                            rowHeight = cellBlock.height;

                            if(missionType.type == 'divider')
                            {

                                cellBlock.content.posX = 0;
                                var dividerMask = libraryManager.createImage('dividerMask', cellBlock, res['img_white'].texture);
                                dividerMask.width = 0;
                                dividerMask.height = 50;
                                cellBlock.mask = dividerMask;
                                dividerMask.content.width = cellBlock.width;

                                dividerMask.content.load = (function() {
                                    TweenMax.to(this, 1, {width: 50 , ease: Back.easeOut});
                                }).bind(dividerMask);

                                dividerMask.content.show = (function() {
                                    TweenMax.to(this, 0.5, {width: this.content.width , ease: Power2.easeOut});
                                }).bind(dividerMask);
                                missionItemContainer.content.dividerMask = dividerMask;

                            } else {

                                if(missionItem.videoURL)
                                {
                                    missionItemContainer.buttonMode = true;
                                    missionItemContainer.interactive = true;
                                    missionItemContainer.on('pointertap', (function() {
                                        if(!sc.isMoving())
                                        {
                                            showPopupVideo(this);
                                        }
                                    }).bind(missionItem));
                                }

                                cellBlock.content.posX = posX + (cellBlock.width * 0.5) + 5;
                                posX = cellBlock.content.posX + (cellBlock.width * 0.5);
                                var contentImage = libraryManager.createImage('contentImage', cellBlock, res[missionItem.imageRes].texture);
                                contentImage.visible = false;
                                contentImage.content.show = (function() {
                                    this.visible = true;
                                    TweenMax.fromTo(this, 0.5, {alpha: 0}, {alpha: 1, ease: Power2.easeOut});
                                }).bind(contentImage);
                                missionItemContainer.content.contentImage = contentImage;
                                missionItem.contentImage = contentImage;

                                if(missionItem.rewardReceived)
                                {
                                    setDesaturate(contentImage);
                                }

                                if(missionItem.isLocked)
                                {
                                    var contentImageFade = libraryManager.createImage('contentImageFade', contentImage, res['img_white'].texture);
                                    contentImageFade.tint = 0x000000;
                                    contentImageFade.alpha = 0.75;
                                    contentImageFade.width = contentImage.width;
                                    contentImageFade.height = contentImage.height;

                                    var contentImageLocked = libraryManager.createImage('contentImageLocked', contentImage, res['icon_lock'].texture);
                                    contentImageLocked.position.y = -15;

                                    var contentLockedDesc = libraryManager.createText('contentLockedDesc', contentImage, 0, new PIXI.TextStyle({
                                        fontFamily: 'Arial',
                                        fontSize: 16,
                                        fontStyle: 'normal',
                                        fill: '#777777'
                                    }));
                                    contentLockedDesc.text = missionItem.lockDesc;
                                    contentLockedDesc.anchor.y = 0;
                                    contentLockedDesc.position.y = -(contentImage.height * 0.5) + 5;
                                }


                                if(missionType.imageShading)
                                {
                                    var contentImageShadingContainer =  libraryManager.createContainer('contentImageShadingContainer', contentImage);
                                    contentImageShadingContainer.visible = false;
                                    contentImageShadingContainer.content.show = (function() {
                                        this.visible = true;
                                        TweenMax.fromTo(this, 0.5, {alpha: 0}, {alpha: 1, ease: Power2.easeOut});
                                    }).bind(contentImageShadingContainer);
                                    missionItemContainer.content.contentImageShadingContainer = contentImageShadingContainer;

                                    var contentImageShading = libraryManager.createImage('contentImageShading', contentImageShadingContainer, res[missionType.imageShading].texture);
                                    contentImageShading.width = contentImage.width;

                                    contentImageShadingContainer.position.y = (contentImage.height * 0.5) - (contentImageShading.height * 0.5);

                                    var contentTitle = libraryManager.createText('contentTitle', contentImageShadingContainer, 0, new PIXI.TextStyle({
                                        fontFamily: 'Arial',
                                        fontSize: 20,
                                        fontStyle: 'italic',
                                        fontWeight: 'bold',
                                        fill: '#ffffff'
                                    }));
                                    contentTitle.text = missionItem.title;
                                    contentTitle.anchor.x = 0;
                                    contentTitle.anchor.y = 0;
                                    contentTitle.position.x = -(contentImageShading.width * 0.5) + 6;
                                    contentTitle.position.y = -(contentImageShading.height * 0.5);

                                    var contentDesc = libraryManager.createText('contentDesc', contentImageShadingContainer, 0, new PIXI.TextStyle({
                                        fontFamily: 'Arial',
                                        fontSize: 16,
                                        fontStyle: 'normal',
                                        fill: '#ffffff'
                                    }));
                                    contentDesc.text = missionItem.desc;
                                    contentDesc.anchor.x = 0;
                                    contentDesc.anchor.y = 1;
                                    contentDesc.position.x = -(contentImageShading.width * 0.5) + 6;
                                    contentDesc.position.y = (contentImageShading.height * 0.5) - 5;


                                    var contentImageHighlight = libraryManager.createImage('contentImageHighlight', contentImage, res['img_red_highlight'].texture);
                                    if(missionItem.type == 'eventcell')
                                    {
                                        contentImageHighlight.position.y = 62;
                                    } else {
                                        contentImageHighlight.position.y = 77;
                                    }

                                    contentImageHighlight.visible = false;
                                    contentImageHighlight.content.baseWidth = contentImage.width;
                                    contentImageHighlight.content.show = (function() {
                                        this.visible = true;
                                        //TweenMax.fromTo(this, 0.5, {alpha: 0}, {alpha: 1, ease: Power2.easeOut});
                                        TweenMax.fromTo(this, 0.5, {width: 0}, {width: this.content.baseWidth, ease: Quad.easeInOut, repeat: 1, yoyo: true});
                                        TweenMax.fromTo(this.position, 1, {x: -(this.content.baseWidth * 0.5)}, {x: (this.content.baseWidth * 0.5), ease: Quad.easeInOut});
                                    }).bind(contentImageHighlight);
                                    missionItemContainer.content.contentImageHighlight = contentImageHighlight;

                                }

                                if(missionItem.iconRes && !missionItem.isLocked)
                                {
                                    var contentIcon = libraryManager.createImage('contentIcon', cellBlock, res[missionItem.iconRes].texture);
                                    contentIcon.position.x = (contentImage.width * 0.5) - (contentIcon.width * 0.5) - 5;
                                    contentIcon.position.y = -(contentImage.height * 0.5) + (contentIcon.height * 0.5) + 5;
                                    contentIcon.visible = false;
                                    contentIcon.content.show = (function() {
                                        this.visible = true;
                                        TweenMax.fromTo(this, 0.5, {alpha: 0}, {alpha: 1, ease: Power2.easeOut});
                                    }).bind(contentIcon);
                                    missionItemContainer.content.contentIcon = contentIcon;
                                }

                                if(missionItem.hasStartButton)
                                {
                                    var contentStart = libraryManager.createImageButton('contentStart', cellBlock, res['btn_start'].texture);
                                    contentStart.position.x = (contentImage.width * 0.5) - (contentStart.width * 0.5) - 10;
                                    contentStart.position.y = (contentImage.height * 0.5) - (contentStart.height * 0.5) - 24;
                                    contentStart.visible = false;
                                    contentStart.content.show = (function() {
                                        this.visible = true;
                                        TweenMax.fromTo(this, 0.5, {alpha: 0}, {alpha: 1, ease: Power2.easeOut});
                                    }).bind(contentStart);
                                    missionItemContainer.content.contentStart = contentStart;
                                }

                            }

                            cellBlock.content.posY = rowPos + (rowHeight * 0.5) + 15;
                            cellBlock.position.x = cellBlock.content.posX;
                            cellBlock.position.y = cellBlock.content.posY;

                            missionItemContainer.content.show = (function() {
                                var tl = new TimelineMax();
                                if(this.contentImage)
                                {
                                    tl.add(this.contentImage.content.show, "+=0.1");
                                }

                                if(this.dividerMask)
                                {
                                    tl.add(this.dividerMask.content.show, "+=0");
                                }

                                if(this.contentImageShadingContainer)
                                {
                                    tl.add(this.contentImageShadingContainer.content.show, "+=0.2");
                                }

                                if(this.contentImageHighlight)
                                {
                                    tl.add(this.contentImageHighlight.content.show, "+=0.5");
                                }

                                if(this.contentIcon)
                                {
                                    tl.add(this.contentIcon.content.show, "+=0.5");
                                }

                                if(this.contentStart)
                                {
                                    tl.add(this.contentStart.content.show, "+=0");
                                }
                            }).bind(missionItemContainer.content);
                        }
                    }
                    sc.setItemHeight(rowHeight);
                    rowPos = rowPos + rowHeight + 15;
                }

            }


        }

        function loadCategory()
        {

            var libraryManager = LibraryManager.getInstance();
            var interfaceManager = InterfaceManager.getInstance();
            interfaceManager.clearContent();

            if(!isAssetLoaded)
            {
                interfaceManager.getLoader().show();
                loadAssets(isReady);
            } else {
                isReady();
            }

            function isReady()
            {
                if(interfaceManager.getActiveContent() == 'mission')
                {
                    interfaceManager.getLoader().hide();

                    if(objData)
                    {

                        showCategory();

                        var tl = interfaceManager.getTimeline();

                        var animateLoad = (function(){
                            var tl = new TimelineMax();
                            for (var row = 0; row < objData.missionList.length; row++)
                            {
                                for (var i = 0; i < objData.missionList[row].data.length; i++)
                                {
                                    var item = objData.missionList[row].data[i];
                                    var itemContainer = libraryManager.getElement('missionItemContainer_' + row + '_' + i);
                                    tl.add(itemContainer.content.load, "+=0.05");
                                    if(item.type == 'divider')
                                    {
                                        var dividerMask = itemContainer.content.dividerMask;
                                        tl.add(dividerMask.content.load, "+=0.05");
                                    }
                                }
                            }
                        });

                        var animateShow = (function(){
                            var tl = new TimelineMax();
                            for (var row = 0; row < objData.missionList.length; row++)
                            {
                                for (var i = 0; i < objData.missionList[row].data.length; i++)
                                {
                                    var item = objData.missionList[row].data[i];
                                    var itemContainer = libraryManager.getElement('missionItemContainer_' + row + '_' + i);
                                    tl.add(itemContainer.content.show, "+=0");
                                }
                            }
                        });

                        tl.add(animateLoad, "+=0.1");
                        tl.add(animateShow, "+=0.75");
                    }
                }
            }

        }

        function showPopupVideo(missionItem)
        {
            isVideoLoading = true;
            var url = missionItem.videoURL;
            if(url)
            {
                var libraryManager = LibraryManager.getInstance();
                var youtubeId = libraryManager.getYoutubeID(url);

                if(youtubeId)
                {

                    var modal = document.getElementById('myModal');
                    var cssLoader = document.getElementById('cssLoader');
                    var contentFrame = document.getElementById('contentFrame');
                    if(!modal)
                    {
                        modal = document.createElement('div');
                        modal.setAttribute("id", "myModal");
                        modal.setAttribute("class", "modal");
                        modal.style.display = "none";
                        document.body.appendChild(modal);

                        window.onclick = function(event) {
                            if (event.target == modal) {
                                closePopupVideo(missionItem);
                            }
                        }

                        var modalContent = document.createElement('div');
                        modalContent.setAttribute("id", "modalContent");
                        modalContent.setAttribute("class", "modal-content");
                        modal.appendChild(modalContent);

                        var closeBtn = document.createElement("span");
                        closeBtn.setAttribute("class", "close");
                        closeBtn.innerHTML = '&times;';
                        modalContent.appendChild(closeBtn);

                        closeBtn.onclick = function() {
                            closePopupVideo(missionItem);
                        }

                        var contentFrame = document.createElement("div");
                        contentFrame.setAttribute("id", "contentFrame");
                        contentFrame.style.display = "inherit";
                        contentFrame.style.clear = "both";
                        modalContent.appendChild(contentFrame);

                        var loaderCode = '<div class="sk-circle1 sk-child"></div>'+
                                          '<div class="sk-circle2 sk-child"></div>'+
                                          '<div class="sk-circle3 sk-child"></div>'+
                                          '<div class="sk-circle4 sk-child"></div>'+
                                          '<div class="sk-circle5 sk-child"></div>'+
                                          '<div class="sk-circle6 sk-child"></div>'+
                                          '<div class="sk-circle7 sk-child"></div>'+
                                          '<div class="sk-circle8 sk-child"></div>'+
                                          '<div class="sk-circle9 sk-child"></div>'+
                                          '<div class="sk-circle10 sk-child"></div>'+
                                          '<div class="sk-circle11 sk-child"></div>'+
                                          '<div class="sk-circle12 sk-child"></div>';

                        var cssLoader = document.createElement('div');
                        cssLoader.setAttribute("id", "cssLoader");
                        cssLoader.setAttribute("class", "sk-circle");
                        cssLoader.innerHTML = loaderCode;
                        contentFrame.appendChild(cssLoader);

                    }

                    function makeYoutubeIframe(callback)
                    {
                        videoElement = document.getElementById('videoFrame');
                        if(!videoElement)
                        {
                            videoElement = document.createElement('iframe');
                            contentFrame.appendChild(videoElement);
                            videoElement.setAttribute("id", "videoFrame");
                            videoElement.setAttribute("frameborder", "0");
                            videoElement.setAttribute("allowfullscreen", "");
                            videoElement.style.display = "inherit";
                            videoElement.style.clear = "both";
                            videoElement.addEventListener("load", callback);

                            var width = window.innerWidth;
                            var height = window.innerHeight;

                            if(window.innerWidth > window.innerHeight)
                            {
                                width = window.innerHeight;
                                height = window.innerWidth;
                            }

                            var ratio = (width / height) * 0.50;
                            videoElement.height = height * ratio;
                            videoElement.width = width * 0.85 + 20;
                        }

                        cssLoader.style.display = "block";
                        videoElement.style.visibility = "hidden";
                        modal.style.display = "block";

                        videoElement.src = 'https://www.youtube.com/embed/' + youtubeId + '?rel=0&disablekb=1&showinfo=0&controls=1&enablejsapi=1';
                    }

                    var videoElement;

                    makeYoutubeIframe(initYoutubeAPI);

                    function initYoutubeAPI()
                    {
                        var ytApi = document.getElementById('ytApi');

                        if(!isYtApiSuccess)
                        {
                            if(ytApi)
                            {
                                console.log('failed');
                                document.head.removeChild(ytApi);
                                ytApi = null;
                            }
                        }

                        if(!ytApi)
                        {
                            ytApi = document.createElement('script');
                            ytApi.src = "https://www.youtube.com/iframe_api";
                            ytApi.setAttribute("id", "ytApi");
                            var firstScriptTag = document.getElementsByTagName('script')[0];
                            firstScriptTag.parentNode.insertBefore(ytApi, firstScriptTag);
                        }

                        var ytApiReady = document.getElementById('ytApiReady');
                        if(!ytApiReady)
                        {
                            ytApiReady = document.createElement('script');
                            ytApiReady.setAttribute("id", "ytApiReady");
                            document.body.appendChild(ytApiReady);
                            document.addEventListener('initYoutubeEvent', initYoutubeEvent);
                        }
                        else {
                            if(isYtApiSuccess)
                            {
                                initYoutubeEvent();
                            }
                        }

                        var ytCode = (
                            function onYouTubeIframeAPIReady()
                            {
                                console.log('Youtube Player is ready');
                                var event = new CustomEvent("initYoutubeEvent");
                                document.dispatchEvent(event);
                            }
                        );

                        ytApiReady.innerHTML = ytCode;
                    }

                    function initYoutubeEvent()
                    {
                        isYtApiSuccess = true;
                        console.log('init event');

                        if(isVideoLoading)
                        {
                            player = new YT.Player('videoFrame', {
                                events: {
                                    'onReady' : onReady,
                                    'onStateChange': onPlayerStateChange
                                }
                            });

                            function onReady(event)
                            {
                                event.target.playVideo();
                                showPlayer();
                            }


                            function onPlayerStateChange(event) {
                                console.log(event);

                                switch(event.data) {
                                    case 1:
                                        showPlayer();
                                        break;
                                    case 0:
                                        videoEnded();
                                        break;
                                    default:
                                        break;
                                }

                            }

                            function showPlayer()
                            {
                                cssLoader.style.display = "none";
                                videoElement.style.visibility = "visible";
                            }

                            function videoEnded()
                            {
                                console.log('Video Ended');
                                missionItem.hasWatched = true;
                                closePopupVideo(missionItem);
                            }
                        }

                    }

                }
            }
        }

        function closePopupVideo(missionItem)
        {
            isVideoLoading = false;

            var contentFrame = document.getElementById('contentFrame');
            if(contentFrame)
            {
                var videoElement = document.getElementById('videoFrame');
                if(videoElement)
                {
                    contentFrame.removeChild(videoElement);
                }
            }

            var modal = document.getElementById('myModal');
            if(modal)
            {
                modal.style.display = "none";
            }

            if(missionItem.hasWatched && !missionItem.rewardReceived)
            {
                showNotification(missionItem);
                missionItem.rewardReceived = true;
                setDesaturate(missionItem.contentImage);
            }
        }

        function showNotification(missionItem)
        {
            var assetLoaderManager = AssetLoaderManager.getInstance();
            var libraryManager = LibraryManager.getInstance();
            var stageManager = StageManager.getInstance();

            if(assetLoaderManager && libraryManager && stageManager)
            {
                var res = assetLoaderManager.getRes();

                var foregroundContainer = libraryManager.getElement('foregroundContainer');

                var notificationContainer =  libraryManager.createContainer('notificationContainer', foregroundContainer);
                notificationContainer.interactive = true;
                notificationContainer.on('pointertap', function() {
                    closeNotification();
                });

                var notificationBGFade = libraryManager.createImage('notificationBGFade', notificationContainer, res['img_white'].texture);
                notificationBGFade.tint = 0x000000;
                notificationBGFade.alpha = 0.75;
                notificationBGFade.width = stageManager.getDimension().width;
                notificationBGFade.height = stageManager.getDimension().height;

                var notificationBG = libraryManager.createImage('notificationBG', notificationContainer, res['img_bg_notification'].texture);
                notificationBG.visible = false;
                notificationBG.content.show = (function() {
                    this.visible = true;
                    TweenMax.fromTo(this, 0.5, {alpha: 0}, {alpha: 1, ease: Power2.easeOut});
                    TweenMax.fromTo(this.scale, 0.5, {y: 0}, {y: 1, ease: Power2.easeOut});
                }).bind(notificationBG);

                var notificationTitle = libraryManager.createImage('notificationTitle', notificationBG, res['txt_mission_completed'].texture);
                notificationTitle.content.offsetX = -(notificationBG.width * 0.5) - (notificationTitle.width * 0.5);
                notificationTitle.position.y = -45;
                notificationTitle.visible = false;
                notificationTitle.content.show = (function() {
                    this.visible = true;
                    TweenMax.fromTo(this, 0.5, {alpha: 0}, {alpha: 1, ease: Power2.easeOut});
                    TweenMax.fromTo(this.position, 0.5, {x: this.content.offsetX}, {x: 0, ease: Power2.easeOut});
                }).bind(notificationTitle);

                var notificationMessageContainer =  libraryManager.createContainer('notificationMessageContainer', notificationBG);

                var notificationMessage1 = libraryManager.createText('notificationMessage1', notificationMessageContainer, 0, new PIXI.TextStyle({
                    fontFamily: 'Arial',
                    fontSize: 18,
                    fontStyle: 'normal',
                    fill: '#ffffff'
                }));
                notificationMessage1.text = 'You\'ve Earned ';
                notificationMessage1.anchor.x = 0;

                var notificationMessage2 = libraryManager.createText('notificationMessage2', notificationMessageContainer, 0, new PIXI.TextStyle({
                    fontFamily: 'Arial',
                    fontSize: 18,
                    fontStyle: 'normal',
                    fill: '#4fcd17'
                }));
                notificationMessage2.text = missionItem.rewardPoints ? missionItem.rewardPoints : 0;
                notificationMessage2.anchor.x = 0;

                var notificationMessage3 = libraryManager.createText('notificationMessage3', notificationMessageContainer, 0, new PIXI.TextStyle({
                    fontFamily: 'Arial',
                    fontSize: 18,
                    fontStyle: 'normal',
                    fill: '#ffffff'
                }));
                notificationMessage3.text = ' Clue Points';
                notificationMessage3.anchor.x = 0;

                var width = notificationMessage1.width + notificationMessage2.width + notificationMessage3.width;

                notificationMessage1.position.x = -(width * 0.5);
                notificationMessage2.position.x = notificationMessage1.position.x + notificationMessage1.width;
                notificationMessage3.position.x = notificationMessage2.position.x + notificationMessage2.width;

                notificationMessageContainer.position.y = 45;
                notificationMessageContainer.visible = false;
                notificationMessageContainer.content.show = (function() {
                    this.visible = true;
                    TweenMax.fromTo(this, 0.5, {alpha: 0}, {alpha: 1, ease: Power2.easeOut});
                }).bind(notificationMessageContainer);

                notificationBG.content.notificationTitle = notificationTitle;
                notificationBG.content.notificationMessageContainer = notificationMessageContainer;
                notificationBG.content.load = (function() {
                    var tl = new TimelineMax();
                    this.show();
                    if(this.notificationTitle)
                    {
                        tl.add(this.notificationTitle.content.show, "+=0.5");
                    }
                    if(this.notificationMessageContainer)
                    {
                        tl.add(this.notificationMessageContainer.content.show, "+=0.5");
                    }

                    if(missionItem.rewardPoints)
                    {
                        tl.add(addReward, "+=0.5");
                        function addReward()
                        {
                            var interfaceManager = InterfaceManager.getInstance();
                            interfaceManager.addCluePoints(missionItem.rewardPoints);
                        }
                    }



                }).bind(notificationBG.content);

                notificationBG.content.load();



            }
        }

        function closeNotification()
        {
            var libraryManager = LibraryManager.getInstance();

            if(libraryManager)
            {
                var foregroundContainer = libraryManager.getElement('foregroundContainer');
                var notificationContainer =  libraryManager.getElement('notificationContainer');

                if(notificationContainer)
                {
                    libraryManager.removeElement(notificationContainer.content.id);
                    foregroundContainer.removeChild(notificationContainer);
                }

            }

        }

        function setDesaturate(contentImage)
        {
            let colorMatrix = new PIXI.filters.ColorMatrixFilter();
            contentImage.filters = [colorMatrix];
            colorMatrix.desaturate();
        }

        return {
            getAsset: getAsset,
            getObjData: getObjData,
            loadCategory: loadCategory
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
