"use strict";
var ContentProfile = (function () {

    // Instance stores a reference to the Singleton
    var instance;

    function init() {

        // Singleton Init
        var isAssetLoaded;
        var isAssetPending;
        var assets = new Array();

        assets.push(new Asset('img_bg_profile', 'images/img_bg_profile.png'));
        assets.push(new Asset('img_profile_card', 'images/img_profile_card.png'));
        assets.push(new Asset('img_profile_avatar', 'images/img_profile_avatar.png'));
        assets.push(new Asset('img_bg_achievement', 'images/img_bg_achievement.png'));
        assets.push(new Asset('img_achievement01_active', 'images/achievements/img_achievement01_active.png'));
        assets.push(new Asset('img_achievement02_active', 'images/achievements/img_achievement02_active.png'));
        assets.push(new Asset('img_achievement03_active', 'images/achievements/img_achievement03_active.png'));
        assets.push(new Asset('img_achievement04_active', 'images/achievements/img_achievement04_active.png'));
        assets.push(new Asset('img_achievement05_active', 'images/achievements/img_achievement05_active.png'));
        assets.push(new Asset('img_achievement06_active', 'images/achievements/img_achievement06_active.png'));
        assets.push(new Asset('img_achievement07_active', 'images/achievements/img_achievement07_active.png'));
        assets.push(new Asset('img_achievement08_active', 'images/achievements/img_achievement08_active.png'));
        assets.push(new Asset('img_achievement01_inactive', 'images/achievements/img_achievement01_inactive.png'));
        assets.push(new Asset('img_achievement02_inactive', 'images/achievements/img_achievement02_inactive.png'));
        assets.push(new Asset('img_achievement03_inactive', 'images/achievements/img_achievement03_inactive.png'));
        assets.push(new Asset('img_achievement04_inactive', 'images/achievements/img_achievement04_inactive.png'));
        assets.push(new Asset('img_achievement05_inactive', 'images/achievements/img_achievement05_inactive.png'));
        assets.push(new Asset('img_achievement06_inactive', 'images/achievements/img_achievement06_inactive.png'));
        assets.push(new Asset('img_achievement07_inactive', 'images/achievements/img_achievement07_inactive.png'));
        assets.push(new Asset('img_achievement08_inactive', 'images/achievements/img_achievement08_inactive.png'));

        var objData =
        {
            rank : 'Agent Trainee',
            playerInfo :
            [
                {title: 'Player Name', value: 'Default'},
                {title: 'Gender', value: 'Default'},
                {title: 'Occupation', value: 'Default'},
                {title: 'Department', value: 'Default'}
            ],
            playerStatus :
            [
                {title: 'Status', value: 'Default'},
                {title: 'Mission Completed', value: 12345},
                {title: 'Clue Collected', value: 12345},
                {title: 'Reward Unlocked', value: 123242424}
            ],
            achievementList :
            [
                {imageRes: 'img_achievement01', isActive: false, title: 'An Acquired Taste', desc: 'Become an elite agent'},
                {imageRes: 'img_achievement02', isActive: false, title: 'Agent on the Move', desc: 'Complete 5 event missions'},
                {imageRes: 'img_achievement03', isActive: true, title: 'Speed Runner', desc: 'Complete a mission in 24 hours'},
                {imageRes: 'img_achievement04', isActive: false, title: 'An Eye for Success', desc: 'Complete 20 investigation cases'},
                {imageRes: 'img_achievement05', isActive: false, title: 'Peacemaker', desc: 'Make peace with the replicants'},
                {imageRes: 'img_achievement06', isActive: true, title: 'Collector', desc: 'Unlock 99 clues'},
                {imageRes: 'img_achievement07', isActive: false, title: 'Doll House', desc: 'Find all 20 dolls'},
                {imageRes: 'img_achievement08', isActive: false, title: 'False Prophecy', desc: 'Complete chapter 5'}
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

        function showContent()
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

                var profileBGContainer =  libraryManager.createContainer('profileBGContainer', contentContainer);
                var profileBG = libraryManager.createImage('profileBG', profileBGContainer, res['img_bg_profile'].texture);
                profileBGContainer.position.y = -(bodyBackgroundObj.height * 0.5) + (profileBG.height * 0.5) + 15;

                profileBG.visible = false;
                profileBG.content.show = (function() {
                    this.visible = true;
                    TweenMax.fromTo(this, 0.5, {alpha: 0}, {alpha: 1, ease: Power2.easeOut});
                    TweenMax.fromTo(this.position, 0.5, {y: -25}, {y: 0, ease: Power2.easeOut});
                }).bind(profileBG);

                var profileContainer =  libraryManager.createContainer('profileContainer', profileBG);
                profileContainer.visible = false;
                profileContainer.content.show = (function() {
                    this.visible = true;
                    TweenMax.fromTo(this, 0.5, {alpha: 0}, {alpha: 1, ease: Power2.easeOut});
                }).bind(profileContainer);

                var profileCard = libraryManager.createImage('profileCard', profileContainer, res['img_profile_card'].texture);
                profileCard.position.x = -(profileBG.width * 0.5) + (profileCard.width * 0.5) - 2;

                var profileTextRank = libraryManager.createText('profileTextRank', profileCard, 0, new PIXI.TextStyle({
                    fontFamily: 'Arial',
                    fontSize: 18,
                    fontStyle: 'bold',
                    fill: '#000000'
                }));
                profileTextRank.text = objData.rank;
                profileTextRank.position.y = -45;

                var profileAvatar = libraryManager.createImage('profileAvatar', profileCard, res['img_profile_avatar'].texture);
                profileAvatar.position.x = -(profileCard.width * 0.5) + (profileAvatar.width * 0.5) + 20;
                profileAvatar.position.y = (profileCard.height * 0.5) - (profileAvatar.height * 0.5) - 20;

                var profileInfoContainer =  libraryManager.createContainer('profileInfoContainer', profileContainer);
                profileInfoContainer.position.y = -(profileBG.height * 0.5);

                var rowPos = 25, rowHeight = 0;

                for (var i = 0; i < objData.playerInfo.length; i++)
                {
                    var profileTextInfoTitle = libraryManager.createText('profileTextInfoTitle_' + i, profileInfoContainer, 0, new PIXI.TextStyle({
                        fontFamily: 'Arial',
                        fontSize: 18,
                        fontStyle: 'bold',
                        fill: '#000000'
                    }));
                    profileTextInfoTitle.anchor.x = 0;
                    profileTextInfoTitle.text = objData.playerInfo[i].title + ": ";
                    profileTextInfoTitle.position.x = profileCard.position.x + (profileCard.width * 0.5) + 25;
                    profileTextInfoTitle.position.y = (profileTextInfoTitle.height * 0.5) + rowPos;

                    var profileTextInfoValue = libraryManager.createText('profileTextInfoValue_' + i, profileInfoContainer, 0, new PIXI.TextStyle({
                        fontFamily: 'Arial',
                        fontSize: 18,
                        fontStyle: 'normal',
                        fill: '#000000'
                    }));
                    profileTextInfoValue.anchor.x = 0;
                    profileTextInfoValue.text = objData.playerInfo[i].value;
                    profileTextInfoValue.position.x = profileTextInfoTitle.position.x + profileTextInfoTitle.width;
                    profileTextInfoValue.position.y = (profileTextInfoValue.height * 0.5) + rowPos;

                    rowHeight = profileTextInfoTitle.height;
                    rowPos = rowPos + rowHeight + 5;

                }

                rowPos = rowPos + 75;

                var profileInfoDivider = libraryManager.createImage('profileInfoDivider', profileInfoContainer, res['img_white'].texture);
                profileInfoDivider.tint = 0x000000;
                profileInfoDivider.anchor.x = 0;
                profileInfoDivider.width = 450;
                profileInfoDivider.height = 2;
                profileInfoDivider.position.x = profileCard.position.x + (profileCard.width * 0.5) + 25;
                profileInfoDivider.position.y = rowPos;


                rowPos = rowPos + 25;

                for (var i = 0; i < objData.playerStatus.length; i++)
                {
                    var profileTextInfoTitle = libraryManager.createText('profileTextInfoTitle_' + i, profileInfoContainer, 0, new PIXI.TextStyle({
                        fontFamily: 'Arial',
                        fontSize: 18,
                        fontStyle: 'bold',
                        fill: '#000000'
                    }));
                    profileTextInfoTitle.anchor.x = 0;
                    profileTextInfoTitle.text = objData.playerStatus[i].title + ": ";
                    profileTextInfoTitle.position.x = profileCard.position.x + (profileCard.width * 0.5) + 25;
                    profileTextInfoTitle.position.y = (profileTextInfoTitle.height * 0.5) + rowPos;

                    var profileTextInfoValue = libraryManager.createText('profileTextInfoValue_' + i, profileInfoContainer, 0, new PIXI.TextStyle({
                        fontFamily: 'Arial',
                        fontSize: 18,
                        fontStyle: 'normal',
                        fill: '#000000'
                    }));
                    profileTextInfoValue.anchor.x = 0;
                    profileTextInfoValue.text = objData.playerStatus[i].value;
                    profileTextInfoValue.position.x = profileTextInfoTitle.position.x + profileTextInfoTitle.width;
                    profileTextInfoValue.position.y = (profileTextInfoValue.height * 0.5) + rowPos;

                    rowHeight = profileTextInfoTitle.height;
                    rowPos = rowPos + rowHeight + 5;

                }


                profileBGContainer.content.profileBG = profileBG;
                profileBGContainer.content.profileContainer = profileContainer;

                profileBGContainer.content.load = (function() {
                    var tl = new TimelineMax();
                    tl.add(this.profileBG.content.show, "+=0");
                    tl.add(this.profileContainer.content.show, "+=0.5");
                }).bind(profileBGContainer.content);

                var achievementContainer =  libraryManager.createContainer('achievementContainer', contentContainer);
                achievementContainer.position.y = -50;

                var achievementTitle = libraryManager.createText('achievementTitle', achievementContainer, 0, new PIXI.TextStyle({
                    fontFamily: 'Arial',
                    fontSize: 18,
                    fontStyle: 'normal',
                    fill: '#ffffff'
                }));
                achievementTitle.text = 'Achievements';
                achievementTitle.visible = false;
                achievementTitle.content.show = (function() {
                    this.visible = true;
                    TweenMax.fromTo(this, 0.5, {alpha: 0}, {alpha: 1, ease: Power2.easeOut});
                }).bind(achievementTitle);

                rowPos = achievementTitle.height + 10;
                rowHeight = 0;

                for (var i = 0; i < objData.achievementList.length; i++)
                {
                    var imageResTag = objData.achievementList[i].isActive ? '_active' : '_inactive'
                    var achievementBG = libraryManager.createImage('achievementBG_' + i, achievementContainer, res['img_bg_achievement'].texture);
                    achievementBG.visible = false;
                    achievementBG.content.show = (function() {
                        this.visible = true;
                        TweenMax.fromTo(this, 0.5, {alpha: 0}, {alpha: 1, ease: Power2.easeOut});
                        TweenMax.fromTo(this.position, 0.5, {y: this.content.posY - 15}, {y: this.content.posY, ease: Power2.easeOut});
                    }).bind(achievementBG);

                    var achievementItemIcon = libraryManager.createImage('achievementItemIcon_' + i, achievementBG, res[objData.achievementList[i].imageRes + imageResTag].texture);
                    achievementItemIcon.position.x = -(achievementBG.width * 0.5) + (achievementItemIcon.width * 0.5);

                    var achievementItemTitle = libraryManager.createText('achievementItemTitle_' + i, achievementBG, 0, new PIXI.TextStyle({
                        fontFamily: 'Arial',
                        fontSize: 18,
                        fontStyle: 'normal',
                        fill: '#ffffff'
                    }));
                    achievementItemTitle.text = objData.achievementList[i].title;
                    achievementItemTitle.position.x = achievementItemIcon.position.x + (achievementItemIcon.width * 0.5) + (achievementItemTitle.width * 0.5) + 15;
                    achievementItemTitle.position.y = -(achievementItemTitle.height * 0.5);

                    var achievementItemDesc = libraryManager.createText('achievementItemDesc_' + i, achievementBG, 0, new PIXI.TextStyle({
                        fontFamily: 'Arial',
                        fontSize: 18,
                        fontStyle: 'normal',
                        fill: '#777777'
                    }));
                    achievementItemDesc.text = objData.achievementList[i].desc;
                    achievementItemDesc.position.x = achievementItemIcon.position.x + (achievementItemIcon.width * 0.5) + (achievementItemDesc.width * 0.5) + 15;
                    achievementItemDesc.position.y = (achievementItemDesc.height * 0.5);

                    rowHeight = achievementBG.height;
                    achievementBG.content.posX = (i % 2) == 0 ? -(bodyBackgroundObj.width * 0.5) + (achievementBG.width * 0.5) + 10 : (bodyBackgroundObj.width * 0.5) - (achievementBG.width * 0.5) - 10;
                    achievementBG.content.posY = rowPos + (rowHeight * 0.5) + 15;
                    achievementBG.position.x = achievementBG.content.posX;
                    achievementBG.position.y = achievementBG.content.posY;

                    rowPos = (i % 2) == 0 ? rowPos : rowPos + rowHeight + 15;


                }

            }


        }

        function loadContent()
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
                if(interfaceManager.getActiveContent() == 'profile')
                {
                    interfaceManager.getLoader().hide();
                    if(objData)
                    {

                        showContent();

                        var tl = interfaceManager.getTimeline();

                        var animateProfile = (function(){
                            var tl = new TimelineMax();
                            var profileBGContainer =  libraryManager.getElement('profileBGContainer');
                            tl.add(profileBGContainer.content.load, "+=0");
                        });

                        var animateAchievement = (function(){
                            var tl = new TimelineMax();
                            var achievementTitle = libraryManager.getElement('achievementTitle');
                            tl.add(achievementTitle.content.show, "+=0.075");
                            for (var i = 0; i < objData.achievementList.length; i++)
                            {
                                var achievementBG = libraryManager.getElement('achievementBG_' + i);
                                tl.add(achievementBG.content.show, "+=0.075");
                            }
                        });

                        tl.add(animateProfile, "+=0.1");
                        tl.add(animateAchievement, "+=0.5");

                    }
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
