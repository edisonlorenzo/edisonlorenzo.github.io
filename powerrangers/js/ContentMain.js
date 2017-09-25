"use strict";
var ContentMain = (function () {

    // Instance stores a reference to the Singleton
    var instance;

    function init() {

        // Singleton Init
        var isAssetLoaded;
        var isAssetPending;
        var assets = new Array();

        assets.push(new Asset('img_bg_globe', 'images/img_bg_globe.png'));
        assets.push(new Asset('img_bg_globe_logo_placeholder', 'images/img_bg_globe_logo_placeholder.png'));
        // assets.push(new Asset('img_archive_shading', 'images/img_archive_shading.png'));
        // assets.push(new Asset('img_archive_video', 'images/archives/img_archive_video.png'));
        // assets.push(new Asset('img_archive_image', 'images/archives/img_archive_image.png'));
        // assets.push(new Asset('img_archive_mission', 'images/archives/img_archive_mission.png'));
        // assets.push(new Asset('img_archive_dossier', 'images/archives/img_archive_dossier.png'));
        // assets.push(new Asset('img_archive_header_video', 'images/archives/img_archive_header_video.png'));
        // assets.push(new Asset('img_archive_header_images', 'images/archives/img_archive_header_images.png'));
        // assets.push(new Asset('img_archive_header_missions', 'images/archives/img_archive_header_missions.png'));
        // assets.push(new Asset('img_archive_header_dossier', 'images/archives/img_archive_header_dossier.png'));
        // assets.push(new Asset('img_video01', 'images/archives/videos/img_video01.png'));
        // assets.push(new Asset('img_video02', 'images/archives/videos/img_video02.png'));
        // assets.push(new Asset('img_video03', 'images/archives/videos/img_video03.png'));
        // assets.push(new Asset('img_video04', 'images/archives/videos/img_video04.png'));
        // assets.push(new Asset('img_video05', 'images/archives/videos/img_video05.png'));
        // assets.push(new Asset('img_video06', 'images/archives/videos/img_video06.png'));
        // assets.push(new Asset('img_video07', 'images/archives/videos/img_video07.png'));
        // assets.push(new Asset('img_video08', 'images/archives/videos/img_video08.png'));
        // assets.push(new Asset('img_video09', 'images/archives/videos/img_video09.png'));
        // assets.push(new Asset('img_missionpast01', 'images/archives/missions/img_missionpast01.png'));
        // assets.push(new Asset('img_missionpast02', 'images/archives/missions/img_missionpast02.png'));
        // assets.push(new Asset('img_missionpast03', 'images/archives/missions/img_missionpast03.png'));
        // assets.push(new Asset('img_missionpast04', 'images/archives/missions/img_missionpast04.png'));
        // assets.push(new Asset('img_dossier01', 'images/archives/dossier/img_dossier01.png'));
        // assets.push(new Asset('img_dossier02', 'images/archives/dossier/img_dossier02.png'));
        // assets.push(new Asset('img_dossier03', 'images/archives/dossier/img_dossier03.png'));
        // assets.push(new Asset('img_dossier04', 'images/archives/dossier/img_dossier04.png'));
        // assets.push(new Asset('img_dossier05', 'images/archives/dossier/img_dossier05.png'));
        // assets.push(new Asset('img_dossier06', 'images/archives/dossier/img_dossier06.png'));
        // assets.push(new Asset('img_images01', 'images/archives/images/img_images01.png'));
        // assets.push(new Asset('img_images02', 'images/archives/images/img_images02.png'));
        // assets.push(new Asset('img_images03', 'images/archives/images/img_images03.png'));
        // assets.push(new Asset('img_images04', 'images/archives/images/img_images04.png'));
        // assets.push(new Asset('img_images05', 'images/archives/images/img_images05.png'));
        // assets.push(new Asset('img_images06', 'images/archives/images/img_images06.png'));

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
                    imageHeaderRes: 'img_archive_header_images',
                    data: [
                        {imageRes: 'img_images01', unlocked: true},
                        {imageRes: 'img_images02', unlocked: true},
                        {imageRes: 'img_images03', unlocked: true},
                        {imageRes: 'img_images04', unlocked: true},
                        {imageRes: 'img_images05', unlocked: true},
                        {imageRes: 'img_images06', unlocked: true}
                    ]
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

        function showContent()
        {
            var assetLoaderManager = AssetLoaderManager.getInstance();
            var libraryManager = LibraryManager.getInstance();
            var interfaceManager = InterfaceManager.getInstance();
            interfaceManager.clearContent();

            if(assetLoaderManager && libraryManager)
            {
                var res = assetLoaderManager.getRes();

                var contentContainer = libraryManager.getElement('contentContainer');
                var bodyBackgroundObj = libraryManager.getElement('bodyBackgroundObj');

                var contentBodyContainer =  libraryManager.createContainer('contentBodyContainer', contentContainer);
                contentBodyContainer.position.y = -(bodyBackgroundObj.height * 0.5);

                var rowPos = 0, rowHeight = 0, totalHeight = 0, rowSpacing = 15;
                var sc = libraryManager.createScrollContainer('contentScrollContainer', contentBodyContainer, bodyBackgroundObj.width, bodyBackgroundObj.height);
                var rowContainer;

                function addRowContainer()
                {
                    rowContainer = new PIXI.Container();
                    rowContainer.position.x = (bodyBackgroundObj.width * 0.5);
                    sc.scrollContainer.addChild(rowContainer);
                    sc.items.push(rowContainer);
                }

                function addRowHeight(height)
                {
                    rowHeight = height;
                    totalHeight = totalHeight + rowHeight + rowSpacing;
                    rowPos = rowPos + rowHeight + rowSpacing;
                }

                addRowContainer();

                var rowItemContainer =  libraryManager.createContainer('rowItemContainer', rowContainer);

                var contentBackground = libraryManager.createImage('contentBackground', rowItemContainer, res['img_bg_globe'].texture);
                contentBackground.position.y = (contentBackground.height * 0.5);

                var contentLogo = libraryManager.createImage('contentLogo', rowItemContainer, res['img_bg_globe_logo_placeholder'].texture);
                contentLogo.position.y = (contentBackground.height * 0.5);

                rowContainer.position.y = rowPos;

                addRowHeight(contentBackground.height);




                // totalHeight = totalHeight + rowHeight + rowSpacing;
                // rowPos = rowPos + rowHeight + rowSpacing;

                totalHeight += 100;

                if(sc.items.length > 0)
                {
                    var itemHeight = totalHeight / sc.items.length
                    sc.setItemHeight(itemHeight);
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
                if(interfaceManager.getActiveContent() == 'main')
                {
                    interfaceManager.getLoader().hide();

                    if(objData)
                    {

                        showContent();

                        // var tl = interfaceManager.getTimeline();
                        //
                        // var animateLoad = (function(){
                        //     var tl = new TimelineMax();
                        //     for (var i = 0; i < objData.archiveList.length; i++)
                        //     {
                        //         var itemContainer = libraryManager.getElement('archiveItemContainer_' + i);
                        //         tl.add(itemContainer.content.load, "+=0.05");
                        //     }
                        // });
                        //
                        // var animateShow = (function(){
                        //     var tl = new TimelineMax();
                        //     for (var i = 0; i < objData.archiveList.length; i++)
                        //     {
                        //         var itemContainer = libraryManager.getElement('archiveItemContainer_' + i);
                        //         tl.add(itemContainer.content.show, "+=0");
                        //     }
                        // });
                        //
                        // tl.add(animateLoad, "+=0.1");
                        // tl.add(animateShow, "+=0.5");

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
