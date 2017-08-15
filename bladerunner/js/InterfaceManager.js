"use strict";
var InterfaceManager = (function () {

    // Instance stores a reference to the Singleton
    var instance;

    function init() {

        // Singleton Init
        var assetLoaderManager;
        var libraryManager;
        var stageManager;

        var camera;
        var backgroundObj;
        var backgroundContainer;
        var foregroundContainer;
        var res;
        var tl;

        var footerButtonObjList;

        var assets = new Array();

        assets.push(new Asset('img_header', 'images/img_header.png'));
        assets.push(new Asset('img_header_neon', 'images/img_header_neon.png'));
        assets.push(new Asset('img_footer', 'images/img_footer.png'));
        assets.push(new Asset('btn_activate_default', 'images/btn_activate_default.png'));
        assets.push(new Asset('btn_activate_highlight', 'images/btn_activate_highlight.png'));
        assets.push(new Asset('btn_archive_default', 'images/btn_archive_default.png'));
        assets.push(new Asset('btn_archive_highlight', 'images/btn_archive_highlight.png'));
        assets.push(new Asset('btn_missions_default', 'images/btn_missions_default.png'));
        assets.push(new Asset('btn_missions_highlight', 'images/btn_missions_highlight.png'));
        assets.push(new Asset('btn_clues_default', 'images/btn_clues_default.png'));
        assets.push(new Asset('btn_clues_highlight', 'images/btn_clues_highlight.png'));
        assets.push(new Asset('btn_profile_default', 'images/btn_profile_default.png'));
        assets.push(new Asset('btn_profile_highlight', 'images/btn_profile_highlight.png'));
        assets.push(new Asset('img_header_base_left', 'images/img_header_base_left.png'));
        assets.push(new Asset('img_header_base_right', 'images/img_header_base_right.png'));
        assets.push(new Asset('img_bar_neutrality', 'images/img_bar_neutrality.png'));
        assets.push(new Asset('img_red_highlight', 'images/img_red_highlight.png'));
        assets.push(new Asset('img_header_bar_green', 'images/img_header_bar_green.png'));
        assets.push(new Asset('img_block01', 'images/img_block01.png'));
        assets.push(new Asset('img_block02', 'images/img_block02.png'));
        assets.push(new Asset('img_divider', 'images/img_divider.png'));
        assets.push(new Asset('btn_start', 'images/btn_start.png'));
        assets.push(new Asset('icon_book', 'images/icon_book.png'));
        assets.push(new Asset('icon_event', 'images/icon_event.png'));
        assets.push(new Asset('icon_game', 'images/icon_game.png'));
        assets.push(new Asset('icon_video', 'images/icon_video.png'));
        assets.push(new Asset('img_event01', 'images/img_event01.png'));
        assets.push(new Asset('img_event02', 'images/img_event02.png'));
        assets.push(new Asset('img_mission01', 'images/img_mission01.png'));
        assets.push(new Asset('img_mission02', 'images/img_mission02.png'));
        assets.push(new Asset('img_mission03', 'images/img_mission03.png'));
        assets.push(new Asset('img_camerabg_mask', 'images/img_camerabg_mask.png'));
        assets.push(new Asset('img_cameramarker', 'images/img_cameramarker.png'));

        var missionDataObj =
        [
            {
                data:
                [
                    {type: 'twocell', imageRes: 'img_event01', iconRes: 'icon_event', hasStartButton: true},
                    {type: 'twocell', imageRes: 'img_event02', iconRes: 'icon_game', hasStartButton: true}
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
                    {type: 'onecell', imageRes: 'img_mission01', iconRes: 'icon_video'},
                    {type: 'onecell', imageRes: 'img_mission02', iconRes: 'icon_book'},
                    {type: 'onecell', imageRes: 'img_mission03', iconRes: 'icon_game'}
                ]
            }
        ];
        var typeDataObj =
        [
            {type: 'divider', imageRes: 'img_divider'},
            {type: 'onecell', imageRes: 'img_block02'},
            {type: 'twocell', imageRes: 'img_block01'}
        ];

        function getTypeDataObj(type)
        {
            return typeDataObj.find(function(item){return item.type === type});
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

        function initResourceData()
        {
            res =  assetLoaderManager.getRes();
        }

        function initTimeLinedTween()
        {
            tl = new TimelineMax();
        }

        function initContainer()
        {
            backgroundObj = libraryManager.getElement('backgroundObj');
            backgroundContainer = libraryManager.getElement('backgroundContainer');
            foregroundContainer = libraryManager.getElement('foregroundContainer');
        }

        function initManagers()
        {
            assetLoaderManager = AssetLoaderManager.getInstance();
            libraryManager = LibraryManager.getInstance();
            stageManager = StageManager.getInstance();
        }

        function initBody()
        {

            var bodyContainer = libraryManager.createContainer('bodyContainer', backgroundContainer);
            var bodyBackgroundObj = libraryManager.createImage('bodyBackgroundObj', bodyContainer, res['img_white'].texture);

            var contentContainer = libraryManager.createContainer('contentContainer', bodyContainer);

            var headerObj = libraryManager.getElement('headerObj');
            var footerObj = libraryManager.getElement('footerObj');

            bodyBackgroundObj.alpha = 0;
            bodyBackgroundObj.width = 768;
            bodyBackgroundObj.height = backgroundObj.content.height - headerObj.height - (footerObj.height * 0.4);
            //bodyContainer.position.y = 45;

        }

        function initMissions()
        {
            var bodyContainer = libraryManager.getElement('bodyContainer');
            bodyContainer.position.y = 45;

            var contentContainer = libraryManager.getElement('contentContainer');
            var bodyBackgroundObj = libraryManager.getElement('bodyBackgroundObj');

            var rowPos = -(bodyBackgroundObj.height * 0.5);
            var rowHeight = 0;
            for (var row = 0; row < missionDataObj.length; row++)
            {
                for (var i = 0; i < missionDataObj[row].data.length; i++)
                {
                    var typeObj = getTypeDataObj(missionDataObj[row].data[i].type);
                    if(typeObj)
                    {
                        var cellBlock = libraryManager.createImage(missionDataObj[row].data[i].type + '_' + row + '_' + i, contentContainer, res[typeObj.imageRes].texture);
                        cellBlock.visible = false;
                        rowHeight = cellBlock.height;

                        if(missionDataObj[row].data[i].type == 'divider')
                        {

                            cellBlock.content.posX = 0;
                            var cellMask = libraryManager.createImage('cellMask', cellBlock, res['img_white'].texture);
                            cellMask.width = 0;
                            cellMask.height = 50;
                            cellBlock.mask = cellMask;
                            cellMask.content.width = cellBlock.width;

                            cellMask.content.load = (function() {
                                TweenMax.to(this, 1, {width: 50 , ease: Back.easeOut});
                            }).bind(cellMask);

                            cellMask.content.show = (function() {
                                TweenMax.to(this, 0.5, {width: this.content.width , ease: Power2.easeOut});
                            }).bind(cellMask);
                            cellBlock.content.cellMask = cellMask;

                        } else {

                            cellBlock.content.posX = ((i * cellBlock.width) + ((i+1)*8)) - (bodyBackgroundObj.width * 0.5) + (cellBlock.width * 0.5);
                            var contentImage = libraryManager.createImage('contentImage', cellBlock, res[missionDataObj[row].data[i].imageRes].texture);
                            contentImage.visible = false;
                            contentImage.content.show = (function() {
                                this.visible = true;
                                TweenMax.fromTo(this, 0.5, {alpha: 0}, {alpha: 1, ease: Power2.easeOut});
                            }).bind(contentImage);
                            cellBlock.content.contentImage = contentImage;

                            var contentImageHighlight = libraryManager.createImage('contentImageHighlight', cellBlock, res['img_red_highlight'].texture);
                            if(missionDataObj[row].data[i].type == 'twocell')
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
                            cellBlock.content.contentImageHighlight = contentImageHighlight;

                            if(missionDataObj[row].data[i].iconRes)
                            {
                                var contentIcon = libraryManager.createImage('contentIcon', cellBlock, res[missionDataObj[row].data[i].iconRes].texture);
                                contentIcon.position.x = (contentImage.width * 0.5) - (contentIcon.width * 0.5) - 5;
                                contentIcon.position.y = -(contentImage.height * 0.5) + (contentIcon.height * 0.5) + 5;
                                contentIcon.visible = false;
                                contentIcon.content.show = (function() {
                                    this.visible = true;
                                    TweenMax.fromTo(this, 0.5, {alpha: 0}, {alpha: 1, ease: Power2.easeOut});
                                }).bind(contentIcon);
                                cellBlock.content.contentIcon = contentIcon;
                            }

                            if(missionDataObj[row].data[i].hasStartButton)
                            {
                                var contentStart = libraryManager.createImageButton('contentStart', cellBlock, res['btn_start'].texture);
                                contentStart.position.x = (contentImage.width * 0.5) - (contentStart.width * 0.5) - 10;
                                contentStart.position.y = (contentImage.height * 0.5) - (contentStart.height * 0.5) - 24;
                                contentStart.visible = false;
                                contentStart.content.show = (function() {
                                    this.visible = true;
                                    TweenMax.fromTo(this, 0.5, {alpha: 0}, {alpha: 1, ease: Power2.easeOut});
                                }).bind(contentStart);
                                cellBlock.content.contentStart = contentStart;
                            }

                        }

                        cellBlock.content.posY = rowPos + (rowHeight * 0.5) + 15;
                        cellBlock.position.x = cellBlock.content.posX;
                        cellBlock.position.y = cellBlock.content.posY;
                        cellBlock.content.load = (function() {
                            this.visible = true;
                            TweenMax.fromTo(this, 0.5, {alpha: 0}, {alpha: 1, ease: Power2.easeOut});
                            TweenMax.fromTo(this.position, 0.5, {y: this.content.posY - 10}, {y: this.content.posY, ease: Power2.easeOut});
                        }).bind(cellBlock);

                        cellBlock.content.show = (function() {
                            var cellTimeLine = new TimelineMax();
                            if(this.contentImage)
                            {
                                cellTimeLine.add(this.contentImage.content.show, "+=0.5");
                            }

                            if(this.contentImageHighlight)
                            {
                                cellTimeLine.add(this.contentImageHighlight.content.show, "+=1");
                            }

                            if(this.contentIcon)
                            {
                                cellTimeLine.add(this.contentIcon.content.show, "+=1");
                            }

                            if(this.contentStart)
                            {
                                cellTimeLine.add(this.contentStart.content.show, "+=0");
                            }
                        }).bind(cellBlock.content);
                    }
                }
                rowPos = rowPos + rowHeight + 15;
            }

        }

        function initCamera()
        {

            var contentContainer = libraryManager.getElement('contentContainer');
            var backgroundObj = libraryManager.getElement('backgroundObj');

            camera = function ()
            {
                var cameraContainer;
                var videoElement;
                var snapshotSquare;

                const snapshotCanvas = document.getElementById('snapshot');
                const snapshotContext = snapshotCanvas.getContext('2d');

                const qrcodeWorker = new Worker("js/qrcode_worker.js");
                qrcodeWorker.postMessage({cmd: 'init'});
                qrcodeWorker.addEventListener('message', showResult);

                var isPlaying;
                var videoTexture;

                function initVideoStream () {

                    var bodyContainer = libraryManager.getElement('bodyContainer');
                    bodyContainer.position.y = 0;

                    videoElement = document.getElementById('camera');

                    var currentDeviceId;

                    var config = {
                        audio: false,
                        video: {}
                    };
                    config.video = currentDeviceId ? {deviceId: currentDeviceId} : {facingMode: "environment"};

                    if(navigator.mediaDevices)
                    {

                        var cameraMessage = 'Initializing Camera';
                        console.log(cameraMessage);
                        var cameraStatusText = libraryManager.createText('cameraStatusText', contentContainer, 0, new PIXI.TextStyle({
                            fontFamily: 'Arial',
                            fontSize: 28,
                            fontStyle: 'normal',
                            fill: '#4cb54a'
                        }));
                        cameraStatusText.text = cameraMessage;

                        navigator.mediaDevices.enumerateDevices()
                        .then(function(devices) {
                            devices = devices.filter(function (device) {
                                return device.kind === 'videoinput';
                            });

                            if (devices.length > 1) {
                                currentDeviceId = devices[0].deviceId;
                            }
                        });

                        navigator.mediaDevices.getUserMedia(config).then(function (stream) {

                            if (stream) {

                                cameraContainer = libraryManager.createContainer('cameraContainer', contentContainer);

                                var markerMaskContainer = libraryManager.createContainer('markerMaskContainer', contentContainer);
                                var markerContainer = libraryManager.createContainer('markerContainer', contentContainer);

                                videoElement.srcObject = stream;
                                isPlaying = true;

                                videoElement.oncanplay = function() {
                                    if(isPlaying)
                                    {

                                        console.log('QR Code Scanning...');
                                        cameraStatusText.visible = false;

                                        var markerBG = libraryManager.createImage('markerBG', markerMaskContainer, res['img_white'].texture);
                                        markerBG.tint = 0x000000;
                                        markerBG.alpha = 0.65;
                                        markerBG.width = backgroundObj.content.width;
                                        markerBG.height = backgroundObj.content.height;

                                        var markerMask = libraryManager.createImage('markerMask', markerMaskContainer, res['img_camerabg_mask'].texture);
                                        markerMaskContainer.mask = markerMask;

                                        var cameraMarker = libraryManager.createImage('cameraMarker', markerContainer, res['img_cameramarker'].texture);

                                        videoTexture = PIXI.Texture.fromVideo(videoElement);

                                        var cameraSprite = libraryManager.createVideo('cameraSprite', cameraContainer, null);
                                        cameraSprite.visible = false;

                                        cameraSprite.texture = videoTexture;
                                        cameraSprite.scale.set(1);
                                        var height = cameraSprite.height;
                                        var ratio = (height > backgroundObj.content.height) ? (height / backgroundObj.content.height) : (backgroundObj.content.height / height);
                                        cameraSprite.scale.set(ratio);
                                        cameraSprite.visible = true;

                                        calculateSquare();
                                        scanCode();

                                    }
                                }

                            }



                        }).catch(function (error) {
                            alert(error.name + ": " + error.message);
                        });

                    } else {
                        var cameraMessage = 'Camera Feature is not supported by your browser';
                        console.log(cameraMessage);
                        var cameraStatusText = libraryManager.createText('cameraStatusText', contentContainer, 0, new PIXI.TextStyle({
                            fontFamily: 'Arial',
                            fontSize: 28,
                            fontStyle: 'normal',
                            fill: '#4cb54a'
                        }));
                        cameraStatusText.text = cameraMessage;
                    }

                }

                function stopStream() {
                    if (isPlaying) {

                        console.log('Turning Camera Off');

                        videoElement.pause();
                        videoElement.src = "";

                        let tracks = videoElement.srcObject.getTracks();
                        tracks.forEach(function(track) {

                            track.stop();
                        });

                        isPlaying = false;
                        if(videoTexture)
                        {
                            videoTexture.destroy(true);
                        }
                        cameraContainer = null;
                    }
                }

                function startStream() {
                    if(!isPlaying)
                    {
                        console.log('Turning Camera On');
                        initVideoStream();
                    }


                }

                function calculateSquare() {
                    var snapshotSize = 160;
                    snapshotSquare = {
                        'x': ~~((videoElement.videoWidth - snapshotSize)/2),
                        'y': ~~((videoElement.videoHeight - snapshotSize)/2),
                        'size': ~~(snapshotSize)
                    };

                    snapshotCanvas.width = snapshotSquare.size;
                    snapshotCanvas.height = snapshotSquare.size;
                }

                function showResult (e) {
                    const resultData = e.data;
                    if (resultData !== false) {
                        navigator.vibrate(200);
                        showActivateResult(resultData);
                    } else {
                        scanCode();
                    }
                }

                function scanCode() {
                    setTimeout(function() {
                        if(cameraContainer != null)
                        {
                            snapshotContext.drawImage(videoElement, snapshotSquare.x, snapshotSquare.y, snapshotSquare.size, snapshotSquare.size, 0, 0, snapshotSquare.size, snapshotSquare.size);
                            const imageData = snapshotContext.getImageData(0, 0, snapshotSquare.size, snapshotSquare.size);

                            qrcodeWorker.postMessage({
                                cmd: 'process',
                                width: snapshotSquare.size,
                                height: snapshotSquare.size,
                                imageData: imageData
                            });
                        }
                    }, 120);
                }

                document.addEventListener("visibilitychange", function() {

                    var activateButtonObj = libraryManager.getElement('activateButtonObj');

                    if(activateButtonObj.content.isSelected)
                    {
                        if (document.hidden) {
                            stopStream();
                        } else {
                            startStream();
                        }
                    }
                });

                return {
                    initVideoStream: initVideoStream,
                    stopStream: stopStream,
                    startStream: startStream
                }

            }();

        }

        function initHeader()
        {
            var headerContainer = libraryManager.createContainer('headerContainer', foregroundContainer);
            headerContainer.visible = false;
            headerContainer.content.show = (function() {
                this.visible = true;
                TweenMax.fromTo(this, 0.5, {alpha: 0}, {alpha: 1, ease: Power2.easeOut});
                TweenMax.fromTo(this.position, 0.5, {y: -450}, {y: 0, ease: Power2.easeOut});
            }).bind(headerContainer);

            headerContainer.content.hide = (function() {
                this.visible = true;
                TweenMax.to(this, 0.5, {alpha: 0, ease: Power2.easeOut});
                TweenMax.to(this.position, 0.5, {y: -450, ease: Power2.easeOut, onComplete: (function(){this.visible = false;}).bind(this)});
            }).bind(headerContainer);

            var headerObj = libraryManager.createImage('headerObj', headerContainer, res['img_header'].texture);
            headerObj.position.y = -(backgroundObj.content.height * 0.5) + (headerObj.height * 0.5);

            var headerNeonObj = libraryManager.createImage('headerNeonObj', headerContainer, res['img_header_neon'].texture);
            headerNeonObj.position.y = -(backgroundObj.content.height * 0.5) + (headerNeonObj.height * 0.5);
            headerNeonObj.visible = false;
            headerNeonObj.content.show = (function() {
                this.visible = true;
                var intensity;
                var isFlick;
                var flick = (function()
                {
                    intensity = isFlick ? Math.random() * 0.8 + 0.2 : 0;
                    this.alpha = isFlick ? 1 : 0;
                    isFlick = !isFlick;
                    TweenMax.to(this, Math.random() * 2, {alpha: intensity, ease:RoughEase.ease.config({template: Power4.easeOut, points:20, strength:3, randomize: true, clamp:true}), onComplete: flick});
                }).bind(this);
                flick();
            }).bind(headerNeonObj);

            var headerStatusContainer = libraryManager.createContainer('headerStatusContainer', headerContainer);
            headerStatusContainer.position.y = headerObj.position.y;

            var headerStatusLeftObj = libraryManager.createImage('headerStatusLeftObj', headerStatusContainer, res['img_header_base_left'].texture);
            headerStatusLeftObj.position.x = -(headerObj.width * 0.5) + (headerStatusLeftObj.width * 0.5);
            headerStatusLeftObj.position.y = (headerObj.height * 0.5) - (headerStatusLeftObj.height * 0.5) - 2;

            var headerStatusRightObj = libraryManager.createImage('headerStatusRightObj', headerStatusContainer, res['img_header_base_right'].texture);
            headerStatusRightObj.position.x = (headerObj.width * 0.5) - (headerStatusRightObj.width * 0.5);
            headerStatusRightObj.position.y = (headerObj.height * 0.5) - (headerStatusRightObj.height * 0.5) - 2;

            var headerStatusLeftObjContainer = libraryManager.createContainer('headerStatusLeftObjContainer', headerStatusLeftObj);
            var headerStatusLeftImage = libraryManager.createImage('headerStatusLeftImage', headerStatusLeftObjContainer, res['img_header_bar_green'].texture);
            headerStatusLeftImage.anchor.x = 0;
            headerStatusLeftImage.position.x = -86;
            headerStatusLeftImage.position.y = 14;

            var headerStatusLeftImageMask = libraryManager.createImage('headerStatusLeftImageMask', headerStatusLeftImage, res['img_white'].texture);
            headerStatusLeftImageMask.anchor.x = 0;
            headerStatusLeftImageMask.position.x = -2;
            headerStatusLeftImageMask.width = 0;

            headerStatusLeftImage.mask = headerStatusLeftImageMask;
            var cluesValue = 3837856, cluesMax = 9999999;
            var widthValue = headerStatusLeftImage.width + 2;
            var finalWidthValue = Math.ceil(widthValue * (cluesValue / cluesMax));

            headerStatusLeftImageMask.content.finalWidthValue = finalWidthValue;
            headerStatusLeftImage.content.show = (function() {
                this.visible = true;
                TweenMax.to(this, 1, {width: this.content.finalWidthValue, ease: Back.easeOut});
            }).bind(headerStatusLeftImageMask);

            var headerStatusCluesValueText = libraryManager.createText('headerStatusCluesValueText', headerStatusLeftObjContainer, 0, new PIXI.TextStyle({
                fontFamily: 'Arial',
                fontSize: 18,
                fontStyle: 'normal',
                fill: '#4cb54a'
            }));
            headerStatusCluesValueText.anchor.x = 0;
            headerStatusCluesValueText.position.x = 15;
            headerStatusCluesValueText.position.y = -9;

            function setText()
            {
                headerStatusCluesValueText.text = cluesValueObj.value;
            }

            var cluesValueObj = {value: 0, cluesValue: cluesValue, setText: setText};
            headerStatusCluesValueText.content.show = (function() {
                TweenMax.to(this, 1, {value: "+="+this.cluesValue, roundProps:"value", ease: Back.easeOut, onUpdate: this.setText});
            }).bind(cluesValueObj);

            headerStatusLeftObjContainer.content.headerStatusLeftImage = headerStatusLeftImage;
            headerStatusLeftObjContainer.content.headerStatusCluesValueText = headerStatusCluesValueText;

            var headerStatusRightObjContainer = libraryManager.createContainer('headerStatusRightObjContainer', headerStatusRightObj);
            var headerStatusRightImage = libraryManager.createImage('headerStatusRightImage', headerStatusRightObjContainer, res['img_bar_neutrality'].texture);
            headerStatusRightImage.visible = false;
            headerStatusRightImage.anchor.x = 0;
            headerStatusRightImage.position.x = -40;
            headerStatusRightImage.position.y = 3;
            headerStatusRightImage.scale.x = 0;

            headerStatusRightImage.content.show = (function() {
                this.visible = true;
                TweenMax.fromTo(this.scale, 1, {x: 0}, {x: 1, ease: Power2.easeOut});
            }).bind(headerStatusRightImage);

            headerStatusRightObjContainer.content.headerStatusRightImage = headerStatusRightImage;

            headerStatusLeftObjContainer.content.show = (function() {
                this.headerStatusLeftImage.content.show();
                this.headerStatusCluesValueText.content.show();
            }).bind(headerStatusLeftObjContainer.content);

            headerStatusRightObjContainer.content.show = (function() {
                this.headerStatusRightImage.content.show();
            }).bind(headerStatusRightObjContainer.content);

        }

        function initFooter()
        {
            var footerContainer = libraryManager.createContainer('footerContainer', foregroundContainer);
            footerContainer.visible = false;
            footerContainer.content.show = (function() {
                this.visible = true;
                TweenMax.fromTo(this, 0.5, {alpha: 0}, {alpha: 1, ease: Power2.easeOut});
                TweenMax.fromTo(this.position, 0.5, {y: 450}, {y: 0, ease: Power2.easeOut});
            }).bind(footerContainer);

            var footerObj = libraryManager.createImage('footerObj', footerContainer, res['img_footer'].texture);
            footerObj.position.y = (backgroundObj.content.height * 0.5) - (footerObj.height * 0.5);

            var footerButtonContainer = libraryManager.createContainer('footerButtonContainer', footerContainer);
            footerButtonContainer.position.y = footerObj.position.y;

            footerButtonObjList = new Array();

            var activateButtonObj = libraryManager.createImageButton('activateButtonObj', footerButtonContainer, res['btn_activate_default'].texture, res['btn_activate_highlight'].texture);
            footerButtonObjList.push(activateButtonObj);
            activateButtonObj.position.y = 10;

            var profileButtonObj = libraryManager.createImageButton('profileButtonObj', footerButtonContainer, res['btn_profile_default'].texture, res['btn_profile_highlight'].texture);
            footerButtonObjList.push(profileButtonObj);
            profileButtonObj.position.x = -(footerObj.width * 0.5) + (profileButtonObj.width * 0.5) + 20;
            profileButtonObj.position.y = (footerObj.height * 0.5) - (profileButtonObj.height * 0.5) - 20;

            var missionsButtonObj = libraryManager.createImageButton('missionsButtonObj', footerButtonContainer, res['btn_missions_default'].texture, res['btn_missions_highlight'].texture);
            footerButtonObjList.push(missionsButtonObj);
            missionsButtonObj.position.x = -(footerObj.width * 0.25) + 20;
            missionsButtonObj.position.y = (footerObj.height * 0.5) - (missionsButtonObj.height * 0.5) - 20;

            var cluesButtonObj = libraryManager.createImageButton('cluesButtonObj', footerButtonContainer, res['btn_clues_default'].texture, res['btn_clues_highlight'].texture);
            footerButtonObjList.push(cluesButtonObj);
            cluesButtonObj.position.x = (footerObj.width * 0.25) - 20;
            cluesButtonObj.position.y = (footerObj.height * 0.5) - (cluesButtonObj.height * 0.5) - 20;

            var archiveButtonObj = libraryManager.createImageButton('archiveButtonObj', footerButtonContainer, res['btn_archive_default'].texture, res['btn_archive_highlight'].texture);
            footerButtonObjList.push(archiveButtonObj);
            archiveButtonObj.position.x = (footerObj.width * 0.5) - (archiveButtonObj.width * 0.5) - 20;
            archiveButtonObj.position.y = (footerObj.height * 0.5) - (archiveButtonObj.height * 0.5) - 20;

            activateButtonObj.on('pointertap', function() {
                showActivate();
            });

            profileButtonObj.on('pointertap', function() {
                showProfile();
            });

            missionsButtonObj.on('pointertap', function() {
                showMission();
            });

            cluesButtonObj.on('pointertap', function() {
                showClues();
            });

            archiveButtonObj.on('pointertap', function() {
                showArchive();
            });

        }

        function setButtonSelected(selectedButtonObj)
        {
            for(var i = 0; i < footerButtonObjList.length; i++)
            {
                if(selectedButtonObj != footerButtonObjList[i] && footerButtonObjList[i].content.isSelected)
                {
                    footerButtonObjList[i].content.setSelected(false);
                }
            }

            if(selectedButtonObj != null && !selectedButtonObj.content.isSelected)
            {
                selectedButtonObj.content.setSelected(true);
            }
        }

        function showMission()
        {
            var buttonObj = libraryManager.getElement('missionsButtonObj');
            setButtonSelected(buttonObj);

            clearContent();

            initMissions();

            var animateBlock = (function(){
                var tl = new TimelineMax();
                for (var row = 0; row < missionDataObj.length; row++)
                {
                    for (var i = 0; i < missionDataObj[row].data.length; i++)
                    {
                        var cellBlock = libraryManager.getElement(missionDataObj[row].data[i].type + '_' + row + '_' + i);
                        if(missionDataObj[row].data[i].type == 'divider')
                        {
                            var cellMask = cellBlock.content.cellMask;
                            tl.add(cellMask.content.load, "+=0.075");
                        }
                        tl.add(cellBlock.content.load, "+=0.075");
                    }
                }
            });

            var animateDivider = (function(){
                var tl = new TimelineMax();
                for (var row = 0; row < missionDataObj.length; row++)
                {
                    for (var i = 0; i < missionDataObj[row].data.length; i++)
                    {
                        var cellBlock = libraryManager.getElement(missionDataObj[row].data[i].type + '_' + row + '_' + i);
                        if(missionDataObj[row].data[i].type == 'divider')
                        {
                            var cellMask = cellBlock.content.cellMask;
                            tl.add(cellMask.content.show, "+=0");
                        }

                    }
                }
            });

            var showBlockContent = (function(){
                var tl = new TimelineMax();
                for (var row = 0; row < missionDataObj.length; row++)
                {
                    for (var i = 0; i < missionDataObj[row].data.length; i++)
                    {
                        var cellBlock = libraryManager.getElement(missionDataObj[row].data[i].type + '_' + row + '_' + i);
                        tl.add(cellBlock.content.show, "+=0");
                    }
                }
            });

            tl.add(animateBlock, "+=0");
            tl.add(animateDivider, "+=1");
            tl.add(showBlockContent, "+=0");

        }

        function showProfile()
        {
            var buttonObj = libraryManager.getElement('profileButtonObj');
            setButtonSelected(buttonObj);

            clearContent();

        }

        function showClues()
        {
            var buttonObj = libraryManager.getElement('cluesButtonObj');
            setButtonSelected(buttonObj);

            clearContent();

        }

        function showArchive()
        {
            var buttonObj = libraryManager.getElement('archiveButtonObj');
            setButtonSelected(buttonObj);

            clearContent();

        }

        function showActivate()
        {
            var buttonObj = libraryManager.getElement('activateButtonObj');
            setButtonSelected(buttonObj);

            clearContent();

            camera.startStream();

        }

        function showActivateResult(resultData)
        {
            setButtonSelected(null);

            clearContent();

            var contentContainer = libraryManager.getElement('contentContainer');

            var cameraStatusText = libraryManager.createText('cameraStatusText', contentContainer, 0, new PIXI.TextStyle({
                fontFamily: 'Arial',
                fontSize: 28,
                fontStyle: 'normal',
                fill: '#4cb54a'
            }));

            cameraStatusText.text = resultData;
        }

        function clearContent()
        {
            camera.stopStream();

            tl.clear();
            var contentContainer = libraryManager.getElement('contentContainer');
            for(var i = contentContainer.children.length - 1; i >= 0; i--)
            {
                if(contentContainer.children[i].content)
                {
                    libraryManager.removeElement(contentContainer.children[i].content.id);
                }
                contentContainer.removeChild(contentContainer.children[i]);
            }
        }


        function setup()
        {

            initManagers();

            initResourceData();

            initContainer();

            initHeader();

            initFooter();

            initBody();

            initCamera();

            initTimeLinedTween();

        }

        function showHeader()
        {
            var headerContainer = libraryManager.getElement('headerContainer');
            headerContainer.content.show();
        }

        function showFooter()
        {
            var footerContainer = libraryManager.getElement('footerContainer');
            footerContainer.content.show();
        }

        function showHeaderStatus()
        {
            var headerStatusLeftObjContainer = libraryManager.getElement('headerStatusLeftObjContainer');
            headerStatusLeftObjContainer.content.show();

            var headerStatusRightObjContainer = libraryManager.getElement('headerStatusRightObjContainer');
            headerStatusRightObjContainer.content.show();
        }

        function showHeaderFlicker()
        {
            var headerNeonObj = libraryManager.getElement('headerNeonObj');
            headerNeonObj.content.show();
        }

        return {
            getAsset: getAsset,
            setup: setup,
            showHeader: showHeader,
            showFooter: showFooter,
            showMission: showMission,
            showHeaderStatus: showHeaderStatus,
            showHeaderFlicker: showHeaderFlicker
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
