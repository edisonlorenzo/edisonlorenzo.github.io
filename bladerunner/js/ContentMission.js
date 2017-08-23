"use strict";
var ContentMission = (function () {

    // Instance stores a reference to the Singleton
    var instance;

    function init() {

        // Singleton Init
        var assetLoaderManager;
        var libraryManager;

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

        var objData =
        {
            missionList :
            [
                {
                    data:
                    [
                        {type: 'eventcell', title: 'Special Event Mission', desc: 'Street Investigation', imageRes: 'img_event01', iconRes: 'icon_event', hasStartButton: true},
                        {type: 'eventcell', title: 'Special Event Mission', desc: 'Android Detention', imageRes: 'img_event02', iconRes: 'icon_game', hasStartButton: true}
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
                        {type: 'onecell', title: 'Mission', desc: 'The Rick Deckard Report 01', imageRes: 'img_mission01', iconRes: 'icon_video'},
                        {type: 'onecell', title: 'Mission', desc: 'Tyrell Operation', imageRes: 'img_mission02', iconRes: 'icon_book'},
                        {type: 'onecell', title: 'Mission', desc: 'The Origami Mystery', imageRes: 'img_mission03', iconRes: 'icon_game', isLocked: true, lockDesc: 'Unlock with 99999 Clue Points'}
                    ]
                },
                {
                    data:
                    [
                        {type: 'twocell', title: 'Event', desc: 'The Hidden Soundtrack', imageRes: 'img_mission04', iconRes: 'icon_music'},
                        {type: 'onecell', title: 'Mission', desc: 'Target Practice', imageRes: 'img_mission05', iconRes: 'icon_comic'}
                    ]
                },
                {
                    data:
                    [
                        {type: 'onecell', title: 'Mission', desc: 'The Nexus 6 Creation Part 1', imageRes: 'img_mission06', iconRes: 'icon_news'},
                        {type: 'onecell', title: 'Mission', desc: 'The Blueprint', imageRes: 'img_mission07', iconRes: 'icon_toy'},
                        {type: 'onecell', title: 'Mission', desc: 'Food for Thought', imageRes: 'img_mission08', iconRes: 'icon_food'}
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

        function loadContent()
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

                var rowPos = -(bodyBackgroundObj.height * 0.5), rowHeight = 0;

                for (var row = 0; row < objData.missionList.length; row++)
                {
                    var posX = -(bodyBackgroundObj.width * 0.5) + 5;
                    for (var i = 0; i < objData.missionList[row].data.length; i++)
                    {
                        var missionItem = objData.missionList[row].data[i];
                        var missionType = libraryManager.getElementFromList(objData.missionType, 'type', missionItem.type);
                        if(missionType)
                        {
                            var cellBlock = libraryManager.createImage(missionItem.type + '_' + row + '_' + i, contentContainer, res[missionType.imageRes].texture);
                            cellBlock.visible = false;

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
                                cellBlock.content.dividerMask = dividerMask;

                            } else {

                                //cellBlock.content.posX = ((i * cellBlock.width) + ((i+1)*8)) - (bodyBackgroundObj.width * 0.5) + (cellBlock.width * 0.5);
                                cellBlock.content.posX = posX + (cellBlock.width * 0.5) + 5;
                                posX = cellBlock.content.posX + (cellBlock.width * 0.5);
                                var contentImage = libraryManager.createImage('contentImage', cellBlock, res[missionItem.imageRes].texture);
                                contentImage.visible = false;
                                contentImage.content.show = (function() {
                                    this.visible = true;
                                    TweenMax.fromTo(this, 0.5, {alpha: 0}, {alpha: 1, ease: Power2.easeOut});
                                }).bind(contentImage);
                                cellBlock.content.contentImage = contentImage;

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
                                    var contentImageShading = libraryManager.createImage('contentImageShading', contentImage, res[missionType.imageShading].texture);
                                    contentImageShading.width = contentImage.width;
                                    contentImageShading.position.y = (contentImage.height * 0.5) - (contentImageShading.height * 0.5);
                                    contentImageShading.visible = false;
                                    contentImageShading.content.show = (function() {
                                        this.visible = true;
                                        TweenMax.fromTo(this, 0.5, {alpha: 0}, {alpha: 1, ease: Power2.easeOut});
                                    }).bind(contentImageShading);
                                    cellBlock.content.contentImageShading = contentImageShading;

                                    var contentImageShadingContainer =  libraryManager.createContainer('contentImageShadingContainer', contentImage);
                                    contentImageShadingContainer.position.x = contentImageShading.position.x;
                                    contentImageShadingContainer.position.y = contentImageShading.position.y;

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
                                        fill: '#777777'
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
                                    cellBlock.content.contentImageHighlight = contentImageHighlight;

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
                                    cellBlock.content.contentIcon = contentIcon;
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
                                var tl = new TimelineMax();
                                if(this.contentImage)
                                {
                                    tl.add(this.contentImage.content.show, "+=0.1");
                                }

                                if(this.dividerMask)
                                {
                                    tl.add(this.dividerMask.content.show, "+=0");
                                }

                                if(this.contentImageShading)
                                {
                                    tl.add(this.contentImageShading.content.show, "+=0.2");
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
                            }).bind(cellBlock.content);
                        }
                    }
                    rowPos = rowPos + rowHeight + 15;
                }

            }


        }

        return {
            getAsset: getAsset,
            getObjData: getObjData,
            loadContent: loadContent
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
