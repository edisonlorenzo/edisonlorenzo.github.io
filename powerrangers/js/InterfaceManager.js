"use strict";
var InterfaceManager = (function () {

    // Instance stores a reference to the Singleton
    var instance;

    function init() {

        // Singleton Init

        var assetLoaderManager;
        var libraryManager;
        var stageManager;

        var contents = {
            archive: ContentArchive.getInstance()
        };

        var activeContent;

        var camera;
        var loadingCircle;
        var backgroundObj;
        var backgroundContainer;
        var foregroundContainer;
        var topContainer;
        var res;
        var tl;

        var cluesValueObj = {};

        var footerButtonObjList;

        var assets = new Array();

        // assets.push(new Asset('icon_lock', 'images/icon_lock.png'));
        // assets.push(new Asset('img_header', 'images/img_header.png'));
        // assets.push(new Asset('img_header_neon', 'images/img_header_neon.png'));
        // assets.push(new Asset('img_footer', 'images/img_footer.png'));
        // assets.push(new Asset('img_bg_pop', 'images/img_bg_pop.png'));
        // assets.push(new Asset('img_bg_pop_bar', 'images/img_bg_pop_bar.png'));
        // assets.push(new Asset('img_bg_notification', 'images/img_bg_notification.png'));
        assets.push(new Asset('img_loading_circle', 'images/img_loading_circle.png'));
        assets.push(new Asset('img_bg_globe', 'images/img_bg_globe.png'));
        // assets.push(new Asset('img_navigation_dot', 'images/img_navigation_dot.png'));
        // assets.push(new Asset('img_navigation_dot_highlight', 'images/img_navigation_dot_highlight.png'));
        // assets.push(new Asset('btn_arrow_left', 'images/btn_arrow_left.png'));
        // assets.push(new Asset('btn_arrow_right', 'images/btn_arrow_right.png'));
        // assets.push(new Asset('btn_arrow_left_highlight', 'images/btn_arrow_left_highlight.png'));
        // assets.push(new Asset('btn_arrow_right_highlight', 'images/btn_arrow_right_highlight.png'));
        // assets.push(new Asset('btn_close', 'images/btn_close.png'));
        // assets.push(new Asset('btn_activate_default', 'images/btn_activate_default.png'));
        // assets.push(new Asset('btn_activate_highlight', 'images/btn_activate_highlight.png'));
        // assets.push(new Asset('btn_archive_default', 'images/btn_archive_default.png'));
        // assets.push(new Asset('btn_archive_highlight', 'images/btn_archive_highlight.png'));
        // assets.push(new Asset('btn_missions_default', 'images/btn_missions_default.png'));
        // assets.push(new Asset('btn_missions_highlight', 'images/btn_missions_highlight.png'));
        // assets.push(new Asset('btn_clues_default', 'images/btn_clues_default.png'));
        // assets.push(new Asset('btn_clues_highlight', 'images/btn_clues_highlight.png'));
        // assets.push(new Asset('btn_profile_default', 'images/btn_profile_default.png'));
        // assets.push(new Asset('btn_profile_highlight', 'images/btn_profile_highlight.png'));
        // assets.push(new Asset('img_header_base_left', 'images/img_header_base_left.png'));
        // assets.push(new Asset('img_header_base_right', 'images/img_header_base_right.png'));
        // assets.push(new Asset('img_bar_neutrality', 'images/img_bar_neutrality.png'));
        // assets.push(new Asset('img_red_highlight', 'images/img_red_highlight.png'));
        // assets.push(new Asset('img_header_bar_green', 'images/img_header_bar_green.png'));
        // assets.push(new Asset('img_camerabg_mask', 'images/img_camerabg_mask.png'));
        // assets.push(new Asset('img_cameramarker', 'images/img_cameramarker.png'));
        // assets.push(new Asset('img_clue_highlight', 'images/img_clue_highlight.png'));
        // assets.push(new Asset('icon_clue_pop', 'images/icon_clue_pop.png'));

        function Asset(resName, resPath)
        {
            this.resName = resName;
            this.resPath = resPath;
        }

        function getAsset()
        {
            return assets;
        }

        function getTimeline()
        {
            return tl;
        }

        function getLoader()
        {
            return loadingCircle;
        }

        function getActiveContent()
        {
            return activeContent;
        }

        function getContents()
        {
            return contents;
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
            topContainer = libraryManager.getElement('topContainer');
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

            bodyBackgroundObj.alpha = 0;
            bodyBackgroundObj.width = 768;
            bodyBackgroundObj.height = backgroundObj.content.height;

            var contentBackground = libraryManager.createImage('contentBackground', contentContainer, res['img_bg_globe'].texture);
            contentBackground.position.y = -(bodyBackgroundObj.height * 0.5) + (contentBackground.height * 0.5);
        }

        function initLoadingCircle()
        {

            loadingCircle = function ()
            {
                var circleImage;

                var assetLoaderManager = AssetLoaderManager.getInstance();
                var libraryManager = LibraryManager.getInstance();

                var res = assetLoaderManager.getRes();

                var bodyContainer = libraryManager.getElement('bodyContainer');
                bodyContainer.position.y = 0;

                var contentContainer = libraryManager.getElement('contentContainer');
                var bodyBackgroundObj = libraryManager.getElement('bodyBackgroundObj');

                function show()
                {
                    circleImage = libraryManager.createImage('circleImage', contentContainer, res['img_loading_circle'].texture);
                    TweenMax.fromTo(circleImage, 1, {rotation: 0}, {rotation: Math.PI * 2, ease: Linear.easeNone, repeat: -1});
                }

                function hide()
                {
                    circleImage = libraryManager.getElement('circleImage');
                    if(circleImage)
                    {
                        libraryManager.removeElement(circleImage.content.id);
                        contentContainer.removeChild(circleImage);
                    }
                }

                return {
                    show: show,
                    hide: hide
                }
            }();

        }



        function setup()
        {

            initManagers();

            initResourceData();

            initContainer();

            initBody();

        }

        return {
            getAsset: getAsset,
            getTimeline: getTimeline,
            getLoader: getLoader,
            getActiveContent: getActiveContent,
            getContents: getContents,
            setup: setup

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
