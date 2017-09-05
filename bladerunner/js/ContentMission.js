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
        assets.push(new Asset('img_event02_sub01', 'images/missions/img_event02_sub01.png'));
        assets.push(new Asset('img_event02_sub02', 'images/missions/img_event02_sub02.png'));
        assets.push(new Asset('img_event02_sub03', 'images/missions/img_event02_sub03.png'));

        assets.push(new Asset('img_clue_101', 'images/clues/img_clue_101.png'));
        assets.push(new Asset('img_clue_102', 'images/clues/img_clue_102.png'));
        assets.push(new Asset('img_clue_103', 'images/clues/img_clue_103.png'));
        assets.push(new Asset('img_clue_104', 'images/clues/img_clue_104.png'));
        assets.push(new Asset('img_clue_105', 'images/clues/img_clue_105.png'));
        assets.push(new Asset('img_clue_106', 'images/clues/img_clue_106.png'));
        assets.push(new Asset('img_clue_107', 'images/clues/img_clue_107.png'));
        assets.push(new Asset('img_clue_108', 'images/clues/img_clue_108.png'));
        assets.push(new Asset('img_clue_109', 'images/clues/img_clue_109.png'));
        assets.push(new Asset('img_clue_110', 'images/clues/img_clue_110.png'));
        assets.push(new Asset('img_clue_111', 'images/clues/img_clue_111.png'));
        assets.push(new Asset('img_clue_112', 'images/clues/img_clue_112.png'));
        assets.push(new Asset('img_clue_113', 'images/clues/img_clue_113.png'));
        assets.push(new Asset('img_clue_114', 'images/clues/img_clue_114.png'));
        assets.push(new Asset('img_clue_115', 'images/clues/img_clue_115.png'));
        assets.push(new Asset('img_clue_116', 'images/clues/img_clue_116.png'));


        var rewardObjData =
        {
            cluePointReward :
            [
                {id: 'cluePoint01', rewardPoints: 500000},
                {id: 'cluePoint02', rewardPoints: 100000},
                {id: 'cluePoint03', rewardPoints: 200000}
            ],
            cluePieceReward :
            [
                {id: 'cluePiece_1111_01', caseId: '#1111', rewardPiece: 1},
                {id: 'cluePiece_1111_02', caseId: '#1111', rewardPiece: 2},
                {id: 'cluePiece_1111_03', caseId: '#1111', rewardPiece: 3},
                {id: 'cluePiece_1111_04', caseId: '#1111', rewardPiece: 4},
                {id: 'cluePiece_1111_05', caseId: '#1111', rewardPiece: 5},
                {id: 'cluePiece_1111_06', caseId: '#1111', rewardPiece: 6},
                {id: 'cluePiece_1111_07', caseId: '#1111', rewardPiece: 7},
                {id: 'cluePiece_1111_08', caseId: '#1111', rewardPiece: 8},
                {id: 'cluePiece_1111_09', caseId: '#1111', rewardPiece: 9},
                {id: 'cluePiece_1111_10', caseId: '#1111', rewardPiece: 10},
                {id: 'cluePiece_1111_11', caseId: '#1111', rewardPiece: 11},
                {id: 'cluePiece_1111_12', caseId: '#1111', rewardPiece: 12},
                {id: 'cluePiece_1111_13', caseId: '#1111', rewardPiece: 13},
                {id: 'cluePiece_1111_14', caseId: '#1111', rewardPiece: 14},
                {id: 'cluePiece_1111_15', caseId: '#1111', rewardPiece: 15},
                {id: 'cluePiece_1111_16', caseId: '#1111', rewardPiece: 16}
            ]
        }

        var objData =
        {
            missionList :
            [
                {
                    data:
                    [
                        {id: 'm1', type: 'eventcell', title: 'Special Event Mission', desc: 'Street Investigation', imageRes: 'img_event01', iconRes: 'icon_event', hasStartButton: true},
                        {id: 'm2', type: 'eventcell', title: 'Special Event Mission', desc: 'Android Detention', imageRes: 'img_event02', iconRes: 'icon_game', hasStartButton: true,
                            gameData: [
                                {imageRes: 'img_event02_sub01'},
                                {imageRes: 'img_event02_sub02'},
                                {imageRes: 'img_event02_sub03', isCompleted: true}
                            ]
                        }
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
                        {id: 'm3', type: 'onecell', title: 'Mission', desc: 'The Rick Deckard Report 01', imageRes: 'img_mission01', iconRes: 'icon_video', videoURL: 'https://www.youtube.com/watch?v=qJA48WZ9bis', cluePointRewardId: 'cluePoint01', cluePieceRewardId: 'cluePiece_1111_01'},
                        {id: 'm4', type: 'onecell', title: 'Mission', desc: 'Tyrell Operation', imageRes: 'img_mission02', iconRes: 'icon_book'},
                        {id: 'm5', type: 'onecell', title: 'Mission', desc: 'The Origami Mystery', imageRes: 'img_mission03', iconRes: 'icon_game', isLocked: true, lockDesc: 'Unlock with 99999 Clue Points'}
                    ]
                },
                {
                    data:
                    [
                        {id: 'm6', type: 'twocell', title: 'Event', desc: 'The Hidden Soundtrack', imageRes: 'img_mission04', iconRes: 'icon_music', videoURL: 'https://www.youtube.com/watch?v=UgsS3nhRRzQ', cluePointRewardId: 'cluePoint03', cluePieceRewardId: 'cluePiece_1111_05'},
                        {id: 'm7', type: 'onecell', title: 'Mission', desc: 'Target Practice', imageRes: 'img_mission05', iconRes: 'icon_comic', videoURL: 'https://www.youtube.com/watch?v=Dgank1Rk32E', cluePointRewardId: 'cluePoint02', cluePieceRewardId: 'cluePiece_1111_06'}
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
                        if(missionItem.cluePointRewardId)
                        {
                            missionItem.cluePointReward = libraryManager.getElementFromList(rewardObjData.cluePointReward, 'id', missionItem.cluePointRewardId);
                        }

                        if(missionItem.cluePieceRewardId)
                        {
                            missionItem.cluePieceReward = libraryManager.getElementFromList(rewardObjData.cluePieceReward, 'id', missionItem.cluePieceRewardId);
                        }

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

                                if(missionItem.gameData)
                                {
                                    missionItemContainer.buttonMode = true;
                                    missionItemContainer.interactive = true;
                                    missionItemContainer.on('pointertap', (function() {
                                        if(!sc.isMoving())
                                        {
                                            showPopupContentGames(this);
                                        }
                                    }).bind(missionItem));
                                }

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
                                    missionItem.contentTitle = contentTitle;

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

                                checkMissionComplete(missionItem);

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

                        videoElement.src = 'https://www.youtube.com/embed/' + youtubeId + '?autoplay=1&rel=0&disablekb=1&showinfo=0&controls=1&enablejsapi=1';
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
                                //event.target.playVideo();
                                showPlayer();
                            }


                            function onPlayerStateChange(event) {

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

            checkMissionReward(missionItem);
            checkMissionComplete(missionItem);
        }

        function checkMissionReward(missionItem)
        {
            if(missionItem.hasWatched && !missionItem.rewardReceived)
            {
                missionItem.notificationReward = new Array();
                if(missionItem.cluePointReward)
                {
                    missionItem.notificationReward.push(missionItem.cluePointReward);
                }

                if(missionItem.cluePieceReward)
                {
                    missionItem.notificationReward.push(missionItem.cluePieceReward);
                }

                showNotification(missionItem);
            }
        }

        function showNotification(missionItem)
        {
            var assetLoaderManager = AssetLoaderManager.getInstance();
            var libraryManager = LibraryManager.getInstance();
            var stageManager = StageManager.getInstance();
            var interfaceManager = InterfaceManager.getInstance();

            if(assetLoaderManager && libraryManager && stageManager && interfaceManager)
            {

                var res = assetLoaderManager.getRes();

                var foregroundContainer = libraryManager.getElement('foregroundContainer');

                var notificationContainer =  libraryManager.createContainer('notificationContainer', foregroundContainer);
                notificationContainer.visible = false;
                notificationContainer.interactive = true;
                notificationContainer.on('pointertap', function() {
                    closeNotification(missionItem);
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


                if(missionItem.notificationReward.length > 0)
                {
                    missionItem.rewardReceived = true;
                    var reward = missionItem.notificationReward.shift();

                    switch (reward) {
                        case missionItem.cluePointReward:
                            showMissionComplete(reward);
                            break;
                        case missionItem.cluePieceReward:
                            showPieceUnlock(reward);
                            break;
                        default:

                    }
                }

                function showMissionComplete(reward)
                {
                    notificationContainer.visible = true;

                    var hasReward = reward ? true : false;
                    var rewardPoints = hasReward ? reward.rewardPoints : 0;

                    var notificationTitle = libraryManager.createImage('notificationTitle', notificationBG, res['txt_mission_completed'].texture);
                    notificationTitle.content.offsetX = -(notificationBG.width * 0.5) - (notificationTitle.width * 0.5);
                    notificationTitle.position.y = -40;
                    notificationTitle.visible = false;
                    notificationTitle.content.show = (function() {
                        this.visible = true;
                        TweenMax.fromTo(this, 0.5, {alpha: 0}, {alpha: 1, ease: Power2.easeOut});
                        TweenMax.fromTo(this.position, 0.5, {x: this.content.offsetX}, {x: 0, ease: Power2.easeOut});
                    }).bind(notificationTitle);

                    var notificationMessageContainer =  libraryManager.createContainer('notificationMessageContainer', notificationBG);

                    var notificationMessage1 = libraryManager.createText('notificationMessage1', notificationMessageContainer, 0, new PIXI.TextStyle({
                        fontFamily: 'Arial',
                        fontSize: 24,
                        fontStyle: 'normal',
                        fill: '#ffffff'
                    }));
                    notificationMessage1.text = 'You\'ve Earned ';
                    notificationMessage1.anchor.x = 0;

                    var notificationMessage2 = libraryManager.createText('notificationMessage2', notificationMessageContainer, 0, new PIXI.TextStyle({
                        fontFamily: 'Arial',
                        fontSize: 24,
                        fontStyle: 'normal',
                        fill: '#4fcd17'
                    }));
                    notificationMessage2.text = rewardPoints;
                    notificationMessage2.anchor.x = 0;

                    var notificationMessage3 = libraryManager.createText('notificationMessage3', notificationMessageContainer, 0, new PIXI.TextStyle({
                        fontFamily: 'Arial',
                        fontSize: 24,
                        fontStyle: 'normal',
                        fill: '#ffffff'
                    }));
                    notificationMessage3.text = ' Clue Points';
                    notificationMessage3.anchor.x = 0;

                    var width = notificationMessage1.width + notificationMessage2.width + notificationMessage3.width;

                    notificationMessage1.position.x = -(width * 0.5);
                    notificationMessage2.position.x = notificationMessage1.position.x + notificationMessage1.width;
                    notificationMessage3.position.x = notificationMessage2.position.x + notificationMessage2.width;

                    notificationMessageContainer.position.y = 40;
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

                        if(hasReward)
                        {
                            interfaceManager.highlightCluePoint(true);
                            tl.add(addReward, "+=0.25");
                            function addReward()
                            {
                                interfaceManager.addCluePoints(rewardPoints);
                            }
                        }

                    }).bind(notificationBG.content);

                    notificationBG.content.load();
                }

                function showPieceUnlock(reward)
                {

                    var hasReward = reward ? true : false;
                    var rewardPiece = hasReward ? reward.rewardPiece : null;
                    var rewardCaseId = hasReward ? reward.caseId : null;

                    var cluesObjData = interfaceManager.getContents().clues.getObjData();
                    var clueCaseData = libraryManager.getElementFromList(cluesObjData.cluesList, 'id', rewardCaseId);

                    if(!clueCaseData)
                        return;

                    var cluePieceData = libraryManager.getElementFromList(clueCaseData.data, 'cell', rewardPiece);

                    if(!cluePieceData)
                        return;

                    notificationContainer.visible = true;
                    cluePieceData.isCompleted = true;
                    var notificationItem = {id: clueCaseData.id, cell: cluePieceData.cell};
                    cluesObjData.notificationList.push(notificationItem);
                    interfaceManager.getContents().clues.checkNotification();

                    var clueIcon = libraryManager.createImage('clueIcon', notificationBG, res[cluePieceData.imageRes].texture);
                    clueIcon.content.offsetX = -(notificationBG.width * 0.5) - (clueIcon.width * 0.5);
                    clueIcon.position.y = -30;
                    clueIcon.visible = false;
                    clueIcon.content.show = (function() {
                        this.visible = true;
                        TweenMax.fromTo(this, 0.5, {alpha: 0}, {alpha: 1, ease: Power2.easeOut});
                        TweenMax.fromTo(this.scale, 0.5, {x: 0, y: 0}, {x: 1, y: 1, ease: Back.easeOut});
                    }).bind(clueIcon);

                    var clueIconHighlight = libraryManager.createImage('clueIconHighlight', clueIcon, res['img_clue_highlight'].texture);
                    TweenMax.fromTo(clueIconHighlight, 0.75, {alpha: 0.5}, {alpha: 1, ease: Quad.easeOut, repeat: -1, yoyo: true});

                    var notificationMessageContainer =  libraryManager.createContainer('notificationMessageContainer', notificationBG);

                    var notificationMessage1 = libraryManager.createText('notificationMessage1', notificationMessageContainer, 0, new PIXI.TextStyle({
                        fontFamily: 'Arial',
                        fontSize: 24,
                        fontStyle: 'normal',
                        fill: '#ffffff'
                    }));
                    notificationMessage1.text = 'Clue Piece ';
                    notificationMessage1.anchor.x = 0;

                    var notificationMessage2 = libraryManager.createText('notificationMessage2', notificationMessageContainer, 0, new PIXI.TextStyle({
                        fontFamily: 'Arial',
                        fontSize: 24,
                        fontStyle: 'normal',
                        fill: '#ff3437'
                    }));
                    notificationMessage2.text = 'Unlocked';
                    notificationMessage2.anchor.x = 0;

                    var width = notificationMessage1.width + notificationMessage2.width;

                    notificationMessage1.position.x = -(width * 0.5);
                    notificationMessage2.position.x = notificationMessage1.position.x + notificationMessage1.width;

                    notificationMessageContainer.position.y = 60;
                    notificationMessageContainer.visible = false;
                    notificationMessageContainer.content.show = (function() {
                        this.visible = true;
                        TweenMax.fromTo(this, 0.5, {alpha: 0}, {alpha: 1, ease: Power2.easeOut});
                    }).bind(notificationMessageContainer);

                    notificationBG.content.clueIcon = clueIcon;
                    notificationBG.content.notificationMessageContainer = notificationMessageContainer;
                    notificationBG.content.load = (function() {
                        var tl = new TimelineMax();
                        this.show();
                        if(this.clueIcon)
                        {
                            tl.add(this.clueIcon.content.show, "+=0.5");
                        }
                        if(this.notificationMessageContainer)
                        {
                            tl.add(this.notificationMessageContainer.content.show, "+=0.5");
                        }


                    }).bind(notificationBG.content);

                    notificationBG.content.load();
                }

            }
        }

        function closeNotification(missionItem)
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

                    var interfaceManager = InterfaceManager.getInstance();
                    interfaceManager.highlightCluePoint(false);
                }

            }

            showNotification(missionItem);

        }

        function showPopupContentGames(item)
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

                var popupContainer =  libraryManager.createContainer('popupContainer', contentContainer);
                popupContainer.position.y = -100;
                popupContainer.interactive = true;

                var popupBGFade = libraryManager.createImage('popupBGFade', popupContainer, res['img_white'].texture);
                popupBGFade.tint = 0x000000;
                popupBGFade.alpha = 0.75;
                popupBGFade.width = bodyBackgroundObj.width;
                popupBGFade.height = bodyBackgroundObj.height;

                var popupBG = libraryManager.createImage('popupBG', popupContainer, res['img_bg_pop'].texture);
                popupBG.visible = false;
                popupBG.content.load = (function() {
                    this.visible = true;
                    TweenMax.fromTo(this, 0.5, {alpha: 0}, {alpha: 1, ease: Power2.easeOut});
                    TweenMax.fromTo(this.position, 0.5, {y: -25}, {y: 0, ease: Power2.easeOut});
                }).bind(popupBG);

                var popupBGBar = libraryManager.createImage('popupBGBar', popupBG, res['img_bg_pop_bar'].texture);
                popupBGBar.position.y = -(popupBG.height * 0.5) + (popupBGBar.height * 0.5);

                var popupBGBarTitle = libraryManager.createText('popupBGBarTitle', popupBGBar, 0, new PIXI.TextStyle({
                    fontFamily: 'Arial',
                    fontSize: 20,
                    fontStyle: 'italic',
                    fontWeight: 'bold',
                    fill: '#ffffff'
                }));
                popupBGBarTitle.text = item.title;

                var buttonCloseImage = libraryManager.createImageButton('buttonCloseImage', popupBG, res['btn_close'].texture);
                buttonCloseImage.position.x = (popupBG.width * 0.5) - 15;
                buttonCloseImage.position.y = -(popupBG.height * 0.5) + 15;

                buttonCloseImage.on('pointertap', function() {
                    closePopupContentGames();
                });

                var popupImage = libraryManager.createImage('popupImage', popupBG, res[item.imageRes].texture);
                popupImage.position.x = -(popupBG.width * 0.5) + (popupImage.width * 0.5) + 10;
                popupImage.position.y = -(popupBG.height * 0.5) + (popupImage.height * 0.5) + 70;

                var popupImageIcon = libraryManager.createImage('popupImageIcon', popupImage, res[item.iconRes].texture);
                popupImageIcon.position.x = (popupImage.width * 0.5) - (popupImageIcon.width * 0.5) - 5;
                popupImageIcon.position.y = -(popupImage.height * 0.5) + (popupImageIcon.height * 0.5) + 5;

                var popupImageTitle = libraryManager.createText('popupImageTitle', popupBG, 0, new PIXI.TextStyle({
                    fontFamily: 'Arial',
                    fontSize: 18,
                    fontStyle: 'normal',
                    fill: '#909090'
                }));
                popupImageTitle.text = item.desc;
                popupImageTitle.anchor.x = 0;
                popupImageTitle.position.x = popupImage.position.x + (popupImage.width * 0.5) + 20;
                popupImageTitle.position.y = -(popupBG.height * 0.5) + (popupImageTitle.height * 0.5) + 70;

                var popupImageTimeLeft = libraryManager.createText('popupImageTimeLeft', popupBG, 0, new PIXI.TextStyle({
                    fontFamily: 'Arial',
                    fontSize: 18,
                    fontStyle: 'normal',
                    fill: '#909090'
                }));
                popupImageTimeLeft.text = 'Time Left: ';
                popupImageTimeLeft.anchor.x = 0;
                popupImageTimeLeft.position.x = popupImageTitle.position.x;
                popupImageTimeLeft.position.y = popupImageTitle.position.y + (popupImageTitle.height * 0.5) + 20;

                var popupImageTimeLeftValue = libraryManager.createText('popupImageTimeLeftValue', popupBG, 0, new PIXI.TextStyle({
                    fontFamily: 'Arial',
                    fontSize: 18,
                    fontStyle: 'normal',
                    fontWeight: 'bold',
                    fill: '#ffffff'
                }));
                popupImageTimeLeftValue.text = '09:30:53';
                popupImageTimeLeftValue.anchor.x = 0;
                popupImageTimeLeftValue.position.x = popupImageTimeLeft.position.x + popupImageTimeLeft.width;
                popupImageTimeLeftValue.position.y = popupImageTimeLeft.position.y;

                var popupImageProgress = libraryManager.createText('popupImageProgress', popupBG, 0, new PIXI.TextStyle({
                    fontFamily: 'Arial',
                    fontSize: 18,
                    fontStyle: 'normal',
                    fill: '#909090'
                }));
                popupImageProgress.text = 'Progress: ';
                popupImageProgress.anchor.x = 0;
                popupImageProgress.position.x = popupImageTimeLeft.position.x;
                popupImageProgress.position.y = popupImageTimeLeft.position.y + (popupImageTimeLeft.height * 0.5) + 20;

                var popupImageProgressValue = libraryManager.createText('popupImageProgressValue', popupBG, 0, new PIXI.TextStyle({
                    fontFamily: 'Arial',
                    fontSize: 18,
                    fontStyle: 'normal',
                    fontWeight: 'bold',
                    fill: '#ffffff'
                }));
                popupImageProgressValue.anchor.x = 0;
                popupImageProgressValue.position.x = popupImageProgress.position.x + popupImageProgress.width;
                popupImageProgressValue.position.y = popupImageProgress.position.y;

                var popupImageDesc = libraryManager.createText('popupImageDesc', popupBG, 0, new PIXI.TextStyle({
                    fontFamily: 'Arial',
                    fontSize: 18,
                    fontStyle: 'normal',
                    fill: '#909090',
                    wordWrapWidth: popupBG.width - 50,
                    wordWrap : true
                }));
                popupImageDesc.text = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce vel enim nec arcu tristique convallis quis at urna. Donec tellus ipsum, porttitor id ultrices eu, aliquet in risus. Aenean nunc erat, accumsan sit amet odio id, faucibus tristique sem. Sed in ex dapibus, efficitur est at, venenatis sapien. Sed elementum mi vitae mauris accumsan, ac aliquet ligula fermentum.';
                popupImageDesc.anchor.x = 0;
                popupImageDesc.anchor.y = 0;
                popupImageDesc.position.x = popupImage.position.x - (popupImage.width * 0.5);
                popupImageDesc.position.y = popupImage.position.y + (popupImage.height * 0.5) + 20;

                var colPos = 0;
                var maxCol = 3;

                for (var i = 0; i < item.gameData.length; i++)
                {
                    var gameData = item.gameData[i];

                    colPos = (i % maxCol) - (maxCol / 2);

                    var popupGameDataImage = libraryManager.createImage('popupGameDataImage_' + i, popupBG, res[gameData.imageRes].texture);
                    popupGameDataImage.position.x = (colPos * (popupGameDataImage.width + 20)) + ((popupGameDataImage.width + 20) * 0.5);
                    popupGameDataImage.position.y = popupImageDesc.position.y + popupImageDesc.height + (popupGameDataImage.height * 0.5) + 20;

                    var contentStart = libraryManager.createImageButton('contentStart', popupGameDataImage, res['btn_start'].texture);
                    contentStart.position.x = (popupGameDataImage.width * 0.5) - (contentStart.width * 0.5);
                    contentStart.position.y = (popupGameDataImage.height * 0.5) - (contentStart.height * 0.5);
                    contentStart.on('pointertap', (function() {
                        this.isCompleted = true;
                        checkProgress();
                    }).bind(gameData));

                    var popupGameDataImageFade = libraryManager.createImage('popupBGFade', popupGameDataImage, res['img_white'].texture);
                    popupGameDataImageFade.visible = false;
                    popupGameDataImageFade.tint = 0x000000;
                    popupGameDataImageFade.alpha = 0.75;
                    popupGameDataImageFade.width = popupGameDataImage.width;
                    popupGameDataImageFade.height = popupGameDataImage.height;

                    var popupGameDataImageText = libraryManager.createText('popupGameDataImageText', popupGameDataImage, 0, new PIXI.TextStyle({
                        fontFamily: 'Arial',
                        fontSize: 18,
                        fontStyle: 'normal',
                        fill: '#ff3437'
                    }));
                    popupGameDataImageText.visible = false;
                    popupGameDataImageText.text = 'Solved';

                    gameData.contentStart = contentStart;
                    gameData.popupGameDataImageFade = popupGameDataImageFade;
                    gameData.popupGameDataImageText = popupGameDataImageText;

                }

                checkProgress();

                function checkProgress()
                {
                    var progressCount =  libraryManager.getElementCountFromList(item.gameData, 'isCompleted', true);
                    popupImageProgressValue.text = progressCount + '/' + item.gameData.length;

                    for (var i = 0; i < item.gameData.length; i++)
                    {
                        var gameData = item.gameData[i];
                        var visible = gameData.isCompleted == true;
                        gameData.contentStart.visible = !visible;
                        gameData.popupGameDataImageFade.visible = visible;
                        gameData.popupGameDataImageText.visible = visible;
                    }
                }

                popupBG.content.load();

            }

        }

        function closePopupContentGames()
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

                var popupContainer =  libraryManager.getElement('popupContainer');
                if(popupContainer)
                {
                    libraryManager.removeElement(popupContainer.content.id);
                    contentContainer.removeChild(popupContainer);
                }

            }

        }

        function checkMissionComplete(missionItem)
        {
            var isComplete = missionItem.rewardReceived ? true : false;
            missionItem.contentTitle.text = missionItem.rewardReceived ? missionItem.title + ' Complete' : missionItem.title;
            setDesaturate(missionItem.contentImage, isComplete);
        }

        function setDesaturate(contentImage, value)
        {
            let colorMatrix = new PIXI.filters.ColorMatrixFilter();
            if(value)
            {
                contentImage.filters = [colorMatrix];
                colorMatrix.desaturate();
            } else {
                contentImage.filters = [];
            }
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
