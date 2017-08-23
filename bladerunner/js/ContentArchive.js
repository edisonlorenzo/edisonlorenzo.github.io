"use strict";
var ContentArchive = (function () {

    // Instance stores a reference to the Singleton
    var instance;

    function init() {

        // Singleton Init
        var assetLoaderManager;
        var libraryManager;

        var assets = new Array();

        assets.push(new Asset('img_block04', 'images/img_block04.png'));
        assets.push(new Asset('img_archive_shading', 'images/img_archive_shading.png'));
        assets.push(new Asset('img_archive_video', 'images/archives/img_archive_video.png'));
        assets.push(new Asset('img_archive_image', 'images/archives/img_archive_image.png'));
        assets.push(new Asset('img_archive_mission', 'images/archives/img_archive_mission.png'));
        assets.push(new Asset('img_archive_dossier', 'images/archives/img_archive_dossier.png'));



        var objData =
        {
            archiveList :
            [
                {
                    title: 'Videos',
                    imageRes: 'img_archive_video'
                },
                {
                    title: 'Images',
                    imageRes: 'img_archive_image'
                },
                {
                    title: 'Past Missions',
                    imageRes: 'img_archive_mission'
                },
                {
                    title: 'Dossier',
                    imageRes: 'img_archive_dossier'
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

                var rowPos = -(bodyBackgroundObj.height * 0.5), rowHeight = 0, colPos = 0;

                var maxCol = 2;

                for (var i = 0; i < objData.archiveList.length; i++)
                {
                    var archiveItem = objData.archiveList[i];

                    if(i % maxCol == 0)
                    {
                        rowPos = rowPos + rowHeight + 15;
                    }

                    colPos = (i % maxCol) - (maxCol / 2);

                    var archiveItemContainer =  libraryManager.createContainer('archiveItemContainer_' + i, contentContainer);
                    archiveItemContainer.visible = false;
                    archiveItemContainer.content.load = (function() {
                        this.visible = true;
                        TweenMax.fromTo(this, 0.5, {alpha: 0}, {alpha: 1, ease: Power2.easeOut});
                        TweenMax.fromTo(this.position, 0.5, {y: -25}, {y: 0, ease: Power2.easeOut});
                    }).bind(archiveItemContainer);

                    var archiveItemBG = libraryManager.createImage('archiveItemBG', archiveItemContainer, res['img_block04'].texture);
                    rowHeight = archiveItemBG.height;
                    archiveItemBG.content.posY = rowPos + (rowHeight * 0.5) + 15;
                    archiveItemBG.content.posX = (colPos * (archiveItemBG.width + 15)) + ((archiveItemBG.width + 15) * 0.5);
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
