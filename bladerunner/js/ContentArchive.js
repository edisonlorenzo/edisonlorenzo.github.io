"use strict";
var ContentArchive = (function () {

    // Instance stores a reference to the Singleton
    var instance;

    function init() {

        // Singleton Init
        var isAssetLoaded;
        var isAssetPending;
        var assets = new Array();

        assets.push(new Asset('img_block04', 'images/img_block04.png'));
        assets.push(new Asset('img_archive_shading', 'images/img_archive_shading.png'));
        assets.push(new Asset('img_archive_video', 'images/archives/img_archive_video.png'));
        assets.push(new Asset('img_archive_image', 'images/archives/img_archive_image.png'));
        assets.push(new Asset('img_archive_mission', 'images/archives/img_archive_mission.png'));
        assets.push(new Asset('img_archive_dossier', 'images/archives/img_archive_dossier.png'));
        assets.push(new Asset('img_archive_header_video', 'images/archives/img_archive_header_video.png'));
        assets.push(new Asset('img_archive_header_images', 'images/archives/img_archive_header_images.png'));
        assets.push(new Asset('img_archive_header_missions', 'images/archives/img_archive_header_missions.png'));
        assets.push(new Asset('img_archive_header_dossier', 'images/archives/img_archive_header_dossier.png'));
        assets.push(new Asset('img_video01', 'images/archives/videos/img_video01.png'));
        assets.push(new Asset('img_video02', 'images/archives/videos/img_video02.png'));
        assets.push(new Asset('img_video03', 'images/archives/videos/img_video03.png'));
        assets.push(new Asset('img_video04', 'images/archives/videos/img_video04.png'));
        assets.push(new Asset('img_video05', 'images/archives/videos/img_video05.png'));
        assets.push(new Asset('img_video06', 'images/archives/videos/img_video06.png'));
        assets.push(new Asset('img_video07', 'images/archives/videos/img_video07.png'));
        assets.push(new Asset('img_video08', 'images/archives/videos/img_video08.png'));
        assets.push(new Asset('img_video09', 'images/archives/videos/img_video09.png'));
        assets.push(new Asset('img_missionpast01', 'images/archives/missions/img_missionpast01.png'));
        assets.push(new Asset('img_missionpast02', 'images/archives/missions/img_missionpast02.png'));
        assets.push(new Asset('img_missionpast03', 'images/archives/missions/img_missionpast03.png'));
        assets.push(new Asset('img_missionpast04', 'images/archives/missions/img_missionpast04.png'));
        assets.push(new Asset('img_dossier01', 'images/archives/dossier/img_dossier01.png'));
        assets.push(new Asset('img_dossier02', 'images/archives/dossier/img_dossier02.png'));
        assets.push(new Asset('img_dossier03', 'images/archives/dossier/img_dossier03.png'));
        assets.push(new Asset('img_dossier04', 'images/archives/dossier/img_dossier04.png'));
        assets.push(new Asset('img_dossier05', 'images/archives/dossier/img_dossier05.png'));
        assets.push(new Asset('img_dossier06', 'images/archives/dossier/img_dossier06.png'));

        var objData =
        {
            archiveList :
            [
                {
                    title: 'Videos',
                    imageRes: 'img_archive_video',
                    imageHeaderRes: 'img_archive_header_video',
                    data: [
                        {title: 'The City of Rain', imageRes: 'img_video01', unlocked: true},
                        {title: 'Mini Future', imageRes: 'img_video02'},
                        {title: 'Mind of a Replicant', imageRes: 'img_video03', unlocked: true},
                        {title: 'Star Runner', imageRes: 'img_video04', unlocked: true},
                        {title: 'Art of Runner', imageRes: 'img_video05', unlocked: true},
                        {title: 'Blazing Style', imageRes: 'img_video06'},
                        {title: '2017 SDCC', imageRes: 'img_video07'},
                        {title: 'Convention Runners', imageRes: 'img_video08'},
                        {title: 'Deckard Music', imageRes: 'img_video09'}
                    ]
                },
                {
                    title: 'Images',
                    imageRes: 'img_archive_image',
                    imageHeaderRes: 'img_archive_header_images'
                },
                {
                    title: 'Past Missions',
                    imageRes: 'img_archive_mission',
                    imageHeaderRes: 'img_archive_header_missions',
                    data: [
                        {title: 'Vehicle Runner', imageRes: 'img_missionpast01', unlocked: true},
                        {title: 'Gaff\'s Request', imageRes: 'img_missionpast02', unlocked: true},
                        {title: 'Detective 101', imageRes: 'img_missionpast03', unlocked: true},
                        {title: 'The Umbrella Protest', imageRes: 'img_missionpast04', unlocked: true}
                    ]
                },
                {
                    title: 'Dossier',
                    imageRes: 'img_archive_dossier',
                    imageHeaderRes: 'img_archive_header_dossier',
                    data: [
                        {title: 'Replicant Profile: Wallace', imageRes: 'img_dossier01', unlocked: true},
                        {title: 'What\'s in an Owl?', imageRes: 'img_dossier02', unlocked: true},
                        {title: 'Sebastian\'s Lab', imageRes: 'img_dossier03', unlocked: true},
                        {title: 'The Chess Game', imageRes: 'img_dossier04', unlocked: true},
                        {title: 'Corporate Spinner', imageRes: 'img_dossier05', unlocked: true},
                        {title: 'Replicant Profile: Leon', imageRes: 'img_dossier06', unlocked: true}
                    ]
                }
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
            var interfaceManager = InterfaceManager.getInstance();
            interfaceManager.clearContent();

            if(assetLoaderManager && libraryManager)
            {
                var res = assetLoaderManager.getRes();

                var bodyContainer = libraryManager.getElement('bodyContainer');
                bodyContainer.position.y = 45;

                var contentContainer = libraryManager.getElement('contentContainer');
                var bodyBackgroundObj = libraryManager.getElement('bodyBackgroundObj');

                var rowPos = -(bodyBackgroundObj.height * 0.5), rowHeight = 0, colPos = 0;

                var maxCol = 2;

                for (var i = 0; i < objData.archiveList.length; i++)
                {
                    var archiveItem = objData.archiveList[i];

                    if(i % maxCol == 0)
                    {
                        rowPos = rowPos + rowHeight + 10;
                    }

                    colPos = (i % maxCol) - (maxCol / 2);

                    var archiveItemContainer =  libraryManager.createContainer('archiveItemContainer_' + i, contentContainer);
                    archiveItemContainer.buttonMode = true;
                    archiveItemContainer.interactive = true;
                    archiveItemContainer.visible = false;
                    archiveItemContainer.content.load = (function() {
                        this.visible = true;
                        TweenMax.fromTo(this, 0.5, {alpha: 0}, {alpha: 1, ease: Power2.easeOut});
                        TweenMax.fromTo(this.position, 0.5, {y: -25}, {y: 0, ease: Power2.easeOut});
                    }).bind(archiveItemContainer);

                    archiveItemContainer.on('pointertap', (function() {
                        loadContent(this);
                    }).bind(archiveItem));

                    var archiveItemBG = libraryManager.createImage('archiveItemBG', archiveItemContainer, res['img_block04'].texture);
                    rowHeight = archiveItemBG.height;
                    archiveItemBG.content.posY = rowPos + (rowHeight * 0.5);
                    archiveItemBG.content.posX = (colPos * (archiveItemBG.width + 10)) + ((archiveItemBG.width + 10) * 0.5);
                    archiveItemBG.position.x = archiveItemBG.content.posX;
                    archiveItemBG.position.y = archiveItemBG.content.posY;

                    var contentImage = libraryManager.createImage('contentImage', archiveItemBG, res[archiveItem.imageRes].texture);
                    contentImage.visible = false;
                    contentImage.content.show = (function() {
                        this.visible = true;
                        TweenMax.fromTo(this, 0.5, {alpha: 0}, {alpha: 1, ease: Power2.easeOut});
                    }).bind(contentImage);
                    archiveItemContainer.content.contentImage = contentImage;

                    var contentImageShadingContainer =  libraryManager.createContainer('contentImageShadingContainer', contentImage);
                    contentImageShadingContainer.visible = false;
                    contentImageShadingContainer.content.show = (function() {
                        this.visible = true;
                        TweenMax.fromTo(this, 0.5, {alpha: 0}, {alpha: 1, ease: Power2.easeOut});
                    }).bind(contentImageShadingContainer);
                    archiveItemContainer.content.contentImageShadingContainer = contentImageShadingContainer;

                    var contentImageShading = libraryManager.createImage('contentImageShading', contentImageShadingContainer, res['img_archive_shading'].texture);
                    contentImageShading.width = contentImage.width;

                    contentImageShadingContainer.position.y = (contentImage.height * 0.5) - (contentImageShading.height * 0.5);

                    var contentTitle = libraryManager.createText('contentTitle', contentImageShadingContainer, 0, new PIXI.TextStyle({
                        fontFamily: 'Arial',
                        fontSize: 20,
                        fontStyle: 'italic',
                        fontWeight: 'bold',
                        fill: '#ffffff'
                    }));
                    contentTitle.scale.set(1);
                    contentTitle.text = archiveItem.title;
                    contentTitle.anchor.x = 0;
                    contentTitle.anchor.y = 0;
                    contentTitle.position.x = -(contentImageShading.width * 0.5) + 6;
                    contentTitle.position.y = -(contentImageShading.height * 0.5) + 5;

                    archiveItemContainer.content.show = (function() {

                        var tl = new TimelineMax();
                        if(this.contentImage)
                        {
                            tl.add(this.contentImage.content.show, "+=0.1");
                        }

                        if(this.contentImageShadingContainer)
                        {
                            tl.add(this.contentImageShadingContainer.content.show, "+=0.2");
                        }

                    }).bind(archiveItemContainer.content);

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
                if(interfaceManager.getActiveContent() == 'archive')
                {
                    interfaceManager.getLoader().hide();

                    if(objData)
                    {

                        showCategory();

                        var tl = interfaceManager.getTimeline();

                        var animateLoad = (function(){
                            var tl = new TimelineMax();
                            for (var i = 0; i < objData.archiveList.length; i++)
                            {
                                var itemContainer = libraryManager.getElement('archiveItemContainer_' + i);
                                tl.add(itemContainer.content.load, "+=0.05");
                            }
                        });

                        var animateShow = (function(){
                            var tl = new TimelineMax();
                            for (var i = 0; i < objData.archiveList.length; i++)
                            {
                                var itemContainer = libraryManager.getElement('archiveItemContainer_' + i);
                                tl.add(itemContainer.content.show, "+=0");
                            }
                        });

                        tl.add(animateLoad, "+=0.1");
                        tl.add(animateShow, "+=0.5");

                    }
                }
            }

        }

        function loadContent(item)
        {

            var libraryManager = LibraryManager.getInstance();
            var interfaceManager = InterfaceManager.getInstance();
            interfaceManager.clearContent();

            if(item)
            {

                showContent(item);

                var tl = interfaceManager.getTimeline();

                var headerContainer = libraryManager.getElement('contentHeaderContainer');
                tl.add(headerContainer.content.load, "+=0.05");

                if(item.data)
                {
                    var animateLoad = (function(){
                        var tl = new TimelineMax();
                        for (var i = 0; i < item.data.length; i++)
                        {
                            var itemContainer = libraryManager.getElement('archiveItemContainer_' + i);
                            tl.add(itemContainer.content.load, "+=0.05");
                        }
                    });

                    var animateShow = (function(){
                        var tl = new TimelineMax();
                        for (var i = 0; i < item.data.length; i++)
                        {
                            var itemContainer = libraryManager.getElement('archiveItemContainer_' + i);
                            tl.add(itemContainer.content.show, "+=0");
                        }
                    });

                    tl.add(animateLoad, "+=0.1");
                    tl.add(animateShow, "+=0.5");
                }
            }

        }

        function showContent(item)
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
                var contentNavContainer =  libraryManager.createContainer('contentNavContainer', contentContainer);
                var contentHeaderContainer =  libraryManager.createContainer('contentHeaderContainer', contentContainer);
                contentHeaderContainer.visible = false;
                contentHeaderContainer.content.load = (function() {
                    this.visible = true;
                    TweenMax.fromTo(this, 0.5, {alpha: 0}, {alpha: 1, ease: Power2.easeOut});
                }).bind(contentHeaderContainer);

                if(item.imageHeaderRes)
                {
                    var backButtonImage = libraryManager.createImageButton('backButton', contentNavContainer, res['btn_arrow_left'].texture);
                    backButtonImage.tint = 0x777777;
                    backButtonImage.anchor.x = 0;
                    backButtonImage.position.x = -(bodyBackgroundObj.width * 0.5) + 15;

                    backButtonImage.on('pointertap', function() {
                        loadCategory();
                    });

                    var backButtonLabel = libraryManager.createText('contentTitle', backButtonImage, 0, new PIXI.TextStyle({
                        fontFamily: 'Arial',
                        fontSize: 22,
                        fontStyle: 'normal',
                        fill: '#999999'
                    }));
                    backButtonLabel.text = 'Back to Archive Menu';
                    backButtonLabel.anchor.x = 0;
                    backButtonLabel.position.x = backButtonImage.width + 10;

                    var contentHeaderImage = libraryManager.createImage('contentHeaderImage', contentHeaderContainer, res[item.imageHeaderRes].texture);
                    contentNavContainer.position.y = -(bodyBackgroundObj.height * 0.5) + (backButtonImage.height * 0.5) + 15;
                    contentHeaderContainer.position.y = contentNavContainer.position.y + (backButtonImage.height * 0.5) + (contentHeaderImage.height * 0.5) + 15;
                    contentBodyContainer.position.y = contentHeaderContainer.position.y + (contentHeaderImage.height * 0.5);
                }

                if(item.data)
                {

                    var rowPos = 0, rowHeight = 0, colPos = 0;

                    var maxCol = 3;

                    for (var i = 0; i < item.data.length; i++)
                    {
                        var archiveItem = item.data[i];

                        if(i % maxCol == 0)
                        {
                            rowPos = rowPos + rowHeight + 15;
                        }

                        colPos = (i % maxCol) - (maxCol / 2);

                        var archiveItemContainer =  libraryManager.createContainer('archiveItemContainer_' + i, contentBodyContainer);
                        archiveItemContainer.visible = false;
                        archiveItemContainer.content.load = (function() {
                            this.visible = true;
                            TweenMax.fromTo(this, 0.5, {alpha: 0}, {alpha: 1, ease: Power2.easeOut});
                            TweenMax.fromTo(this.position, 0.5, {y: -25}, {y: 0, ease: Power2.easeOut});
                        }).bind(archiveItemContainer);

                        var contentImage = libraryManager.createImage('contentImage', archiveItemContainer, res[archiveItem.imageRes].texture);
                        rowHeight = contentImage.height;
                        contentImage.content.posY = rowPos + (rowHeight * 0.5);
                        contentImage.content.posX = (colPos * (contentImage.width + 15)) + ((contentImage.width + 15) * 0.5);
                        contentImage.position.x = contentImage.content.posX;
                        contentImage.position.y = contentImage.content.posY;

                        if(!archiveItem.unlocked)
                        {
                            var contentImageFade = libraryManager.createImage('contentImageFade', contentImage, res['img_white'].texture);
                            contentImageFade.tint = 0x000000;
                            contentImageFade.alpha = 0.75;
                            contentImageFade.width = contentImage.width;
                            contentImageFade.height = contentImage.height;

                            var contentImageLocked = libraryManager.createImage('contentImageLocked', contentImage, res['icon_lock'].texture);
                            contentImageLocked.position.y = -15;
                        }

                        var contentImageShadingContainer =  libraryManager.createContainer('contentImageShadingContainer', contentImage);
                        contentImageShadingContainer.visible = false;
                        contentImageShadingContainer.content.show = (function() {
                            this.visible = true;
                            TweenMax.fromTo(this, 0.5, {alpha: 0}, {alpha: 1, ease: Power2.easeOut});
                        }).bind(contentImageShadingContainer);
                        archiveItemContainer.content.contentImageShadingContainer = contentImageShadingContainer;

                        var contentImageShading = libraryManager.createImage('contentImageShading', contentImageShadingContainer, res['img_archive_shading'].texture);
                        contentImageShading.width = contentImage.width;

                        contentImageShadingContainer.position.y = (contentImage.height * 0.5) - (contentImageShading.height * 0.5);

                        var contentTitle = libraryManager.createText('contentTitle', contentImageShadingContainer, 0, new PIXI.TextStyle({
                            fontFamily: 'Arial',
                            fontSize: 18,
                            fontStyle: 'normal',
                            fill: '#999999'
                        }));
                        contentTitle.text = archiveItem.title;
                        contentTitle.anchor.x = 0;
                        contentTitle.position.x = -(contentImageShading.width * 0.5) + 6;
                        contentTitle.position.y = 2;


                        archiveItemContainer.content.show = (function() {

                            var tl = new TimelineMax();

                            if(this.contentImageShadingContainer)
                            {
                                tl.add(this.contentImageShadingContainer.content.show, "+=0.2");
                            }

                        }).bind(archiveItemContainer.content);

                    }

                }
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
