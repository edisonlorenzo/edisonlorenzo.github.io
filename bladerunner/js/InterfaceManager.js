"use strict";
var InterfaceManager = (function () {

    // Instance stores a reference to the Singleton
    var instance;

    function init() {

        // Singleton Init
        var assetLoaderManager;
        var libraryManager;

        var backgroundObj;
        var backgroundContainer;
        var foregroundContainer;
        var res;
        var tl;

        var footerButtonObjList;

        var assets = new Array();

        assets.push(new Asset('img_header', 'images/img_header.png'));
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
        }

        function initBody()
        {

            var bodyContainer = libraryManager.createContainer('bodyContainer', backgroundContainer);
            var bodyBackgroundObj = libraryManager.createImage('bodyBackgroundObj', bodyContainer, res['img_white'].texture);

            var headerObj = libraryManager.getElement('headerObj');
            var footerObj = libraryManager.getElement('footerObj');

            bodyBackgroundObj.alpha = 0;
            bodyBackgroundObj.width = 768;
            bodyBackgroundObj.height = backgroundObj.content.height - headerObj.height - (footerObj.height * 0.4);
            bodyContainer.position.y = 45;

            var rowPos = -(bodyBackgroundObj.height * 0.5);
            var rowHeight;
            for (var row = 0; row < missionDataObj.length; row++)
            {
                for (var i = 0; i < missionDataObj[row].data.length; i++)
                {
                    var typeObj = getTypeDataObj(missionDataObj[row].data[i].type);
                    if(typeObj)
                    {
                        var cellBlock = libraryManager.createImage(missionDataObj[row].data[i].type + '_' + row + '_' + i, bodyContainer, res[typeObj.imageRes].texture);
                        cellBlock.visible = false;
                        rowHeight = cellBlock.height;

                        if(missionDataObj[row].data[i].type == 'divider')
                        {
                            cellBlock.content.posX = 0;
                        } else {
                            cellBlock.content.posX = ((i * cellBlock.width) + ((i+1)*8)) - (bodyBackgroundObj.width * 0.5) + (cellBlock.width * 0.5);
                            var contentImage = libraryManager.createImage('contentImage', cellBlock, res[missionDataObj[row].data[i].imageRes].texture);
                            contentImage.visible = false;
                            contentImage.content.show = (function() {
                                this.visible = true;
                                TweenMax.fromTo(this, 0.5, {alpha: 0}, {alpha: 1, ease: Power2.easeOut});
                            }).bind(contentImage);
                            cellBlock.content.contentImage = contentImage;

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

        function initHeader()
        {
            var headerContainer = libraryManager.createContainer('headerContainer', foregroundContainer);
            headerContainer.visible = false;
            headerContainer.content.show = (function() {
                this.visible = true;
                TweenMax.fromTo(this, 0.5, {alpha: 0}, {alpha: 1, ease: Power2.easeOut});
                TweenMax.fromTo(this.position, 0.5, {y: -450}, {y: 0, ease: Power2.easeOut});
            }).bind(headerContainer);

            var headerObj = libraryManager.createImage('headerObj', headerContainer, res['img_header'].texture);
            headerObj.position.y = -(backgroundObj.content.height * 0.5) + (headerObj.height * 0.5);

            var headerStatusContainer = libraryManager.createContainer('headerStatusContainer', headerContainer);
            headerStatusContainer.position.y = headerObj.position.y;

            var headerStatusLeftObj = libraryManager.createImage('headerStatusLeftObj', headerStatusContainer, res['img_header_base_left'].texture);
            headerStatusLeftObj.position.x = -(headerObj.width * 0.5) + (headerStatusLeftObj.width * 0.5);
            headerStatusLeftObj.position.y = (headerObj.height * 0.5) - (headerStatusLeftObj.height * 0.5) - 2;

            var headerStatusRightObj = libraryManager.createImage('headerStatusRightObj', headerStatusContainer, res['img_header_base_right'].texture);
            headerStatusRightObj.position.x = (headerObj.width * 0.5) - (headerStatusRightObj.width * 0.5);
            headerStatusRightObj.position.y = (headerObj.height * 0.5) - (headerStatusRightObj.height * 0.5) - 2;

            var headerStatusRightObjContainer = libraryManager.createContainer('headerStatusRightObjContainer', headerStatusRightObj);
            var headerStatusRightImage = libraryManager.createImage('headerStatusRightImage', headerStatusRightObjContainer, res['img_bar_neutrality'].texture);
            headerStatusRightImage.visible = false;
            headerStatusRightImage.anchor.x = 0;
            headerStatusRightImage.position.x = -40;
            headerStatusRightImage.position.y = 3;
            headerStatusRightImage.scale.x = 0;

            headerStatusRightImage.content.show = (function() {
                this.visible = true;
                TweenMax.fromTo(this.scale, 0.5, {x: 0}, {x: 1, ease: Power2.easeOut});
            }).bind(headerStatusRightImage);

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
            cluesButtonObj.position.x = (footerObj.width * 0.5) - (cluesButtonObj.width * 0.5) - 20;
            cluesButtonObj.position.y = (footerObj.height * 0.5) - (cluesButtonObj.height * 0.5) - 20;

            var archiveButtonObj = libraryManager.createImageButton('archiveButtonObj', footerButtonContainer, res['btn_archive_default'].texture, res['btn_archive_highlight'].texture);
            footerButtonObjList.push(archiveButtonObj);
            archiveButtonObj.position.x = (footerObj.width * 0.25) - 20;
            archiveButtonObj.position.y = (footerObj.height * 0.5) - (archiveButtonObj.height * 0.5) - 20;

            activateButtonObj.on('pointertap', function() {
                setButtonSelected(this);
            });

            profileButtonObj.on('pointertap', function() {
                setButtonSelected(this);
            });

            missionsButtonObj.on('pointertap', function() {
                setButtonSelected(this);
            });

            cluesButtonObj.on('pointertap', function() {
                setButtonSelected(this);
            });

            archiveButtonObj.on('pointertap', function() {
                setButtonSelected(this);
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

            if(!selectedButtonObj.content.isSelected)
            {
                selectedButtonObj.content.setSelected(true);
            }
        }

        function showMission()
        {
            var missionsButtonObj = libraryManager.getElement('missionsButtonObj');
            setButtonSelected(missionsButtonObj);

            for (var row = 0; row < missionDataObj.length; row++)
            {
                for (var i = 0; i < missionDataObj[row].data.length; i++)
                {
                    var cellBlock = libraryManager.getElement(missionDataObj[row].data[i].type + '_' + row + '_' + i);
                    tl.add(cellBlock.content.load, "+=0.05");
                }
            }

            for (var row = 0; row < missionDataObj.length; row++)
            {
                for (var i = 0; i < missionDataObj[row].data.length; i++)
                {
                    var cellBlock = libraryManager.getElement(missionDataObj[row].data[i].type + '_' + row + '_' + i);
                    tl.add(cellBlock.content.show, "+=0");
                }
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
            var headerStatusRightImage = libraryManager.getElement('headerStatusRightImage');
            headerStatusRightImage.content.show();
        }

        return {
            getAsset: getAsset,
            setup: setup,
            showHeader: showHeader,
            showFooter: showFooter,
            showMission: showMission,
            showHeaderStatus: showHeaderStatus
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
