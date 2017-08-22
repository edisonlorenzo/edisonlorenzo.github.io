"use strict";
var ContentClues = (function () {

    // Instance stores a reference to the Singleton
    var instance;

    function init() {

        // Singleton Init
        var assetLoaderManager;
        var libraryManager;

        var assets = new Array();

        assets.push(new Asset('img_clue_bg1', 'images/img_clue_bg01.png'));
        assets.push(new Asset('img_clue_bg2', 'images/img_clue_bg02.png'));
        assets.push(new Asset('img_clue_bg3', 'images/img_clue_bg03.png'));
        assets.push(new Asset('img_clue_bg4', 'images/img_clue_bg04.png'));
        assets.push(new Asset('img_clue_bg5', 'images/img_clue_bg05.png'));
        assets.push(new Asset('img_clue_bg6', 'images/img_clue_bg06.png'));
        assets.push(new Asset('img_clue_bg7', 'images/img_clue_bg07.png'));
        assets.push(new Asset('img_clue_bg8', 'images/img_clue_bg08.png'));
        assets.push(new Asset('img_clue_puzzle_grid', 'images/img_clue_puzzle_grid.png'));
        assets.push(new Asset('img_clue_201', 'images/clues/img_clue_201.png'));
        assets.push(new Asset('img_clue_202', 'images/clues/img_clue_202.png'));
        assets.push(new Asset('img_clue_203', 'images/clues/img_clue_203.png'));
        assets.push(new Asset('img_clue_204', 'images/clues/img_clue_204.png'));
        assets.push(new Asset('img_clue_205', 'images/clues/img_clue_205.png'));
        assets.push(new Asset('img_clue_206', 'images/clues/img_clue_206.png'));
        assets.push(new Asset('img_clue_207', 'images/clues/img_clue_207.png'));
        assets.push(new Asset('img_clue_208', 'images/clues/img_clue_208.png'));
        assets.push(new Asset('img_clue_209', 'images/clues/img_clue_209.png'));
        assets.push(new Asset('img_clue_210', 'images/clues/img_clue_210.png'));
        assets.push(new Asset('img_clue_211', 'images/clues/img_clue_211.png'));
        assets.push(new Asset('img_clue_212', 'images/clues/img_clue_212.png'));
        assets.push(new Asset('img_clue_213', 'images/clues/img_clue_213.png'));
        assets.push(new Asset('img_clue_214', 'images/clues/img_clue_214.png'));
        assets.push(new Asset('img_clue_215', 'images/clues/img_clue_215.png'));
        assets.push(new Asset('img_clue_216', 'images/clues/img_clue_216.png'));
        assets.push(new Asset('img_clue_301', 'images/clues/img_clue_301.png'));
        assets.push(new Asset('img_clue_302', 'images/clues/img_clue_302.png'));
        assets.push(new Asset('img_clue_303', 'images/clues/img_clue_303.png'));
        assets.push(new Asset('img_clue_304', 'images/clues/img_clue_304.png'));
        assets.push(new Asset('img_clue_305', 'images/clues/img_clue_305.png'));
        assets.push(new Asset('img_clue_306', 'images/clues/img_clue_306.png'));
        assets.push(new Asset('img_clue_307', 'images/clues/img_clue_307.png'));
        assets.push(new Asset('img_clue_308', 'images/clues/img_clue_308.png'));
        assets.push(new Asset('img_clue_309', 'images/clues/img_clue_309.png'));
        assets.push(new Asset('img_clue_310', 'images/clues/img_clue_310.png'));
        assets.push(new Asset('img_clue_311', 'images/clues/img_clue_311.png'));
        assets.push(new Asset('img_clue_312', 'images/clues/img_clue_312.png'));
        assets.push(new Asset('img_clue_313', 'images/clues/img_clue_313.png'));
        assets.push(new Asset('img_clue_314', 'images/clues/img_clue_314.png'));
        assets.push(new Asset('img_clue_315', 'images/clues/img_clue_315.png'));
        assets.push(new Asset('img_clue_316', 'images/clues/img_clue_316.png'));


        var objData =
        {
            cluesList :
            [
                {
                    id: '#2342',
                    data: [
                        {cell: 1, imageRes: 'img_clue_201', isCompleted: true},
                        {cell: 2, imageRes: 'img_clue_202', isCompleted: true},
                        {cell: 3, imageRes: 'img_clue_203', isCompleted: true},
                        {cell: 4, imageRes: 'img_clue_204', isCompleted: false},
                        {cell: 5, imageRes: 'img_clue_205', isCompleted: false},
                        {cell: 6, imageRes: 'img_clue_206', isCompleted: true},
                        {cell: 7, imageRes: 'img_clue_207', isCompleted: false},
                        {cell: 8, imageRes: 'img_clue_208', isCompleted: true},
                        {cell: 9, imageRes: 'img_clue_209', isCompleted: false},
                        {cell: 10, imageRes: 'img_clue_210', isCompleted: true},
                        {cell: 11, imageRes: 'img_clue_211', isCompleted: true},
                        {cell: 12, imageRes: 'img_clue_212', isCompleted: false},
                        {cell: 13, imageRes: 'img_clue_213', isCompleted: true},
                        {cell: 14, imageRes: 'img_clue_214', isCompleted: true},
                        {cell: 15, imageRes: 'img_clue_215', isCompleted: false},
                        {cell: 16, imageRes: 'img_clue_216', isCompleted: true}
                    ]
                },
                {
                    id: '#2342',
                    data: [
                        {cell: 1, imageRes: 'img_clue_301', isCompleted: true},
                        {cell: 2, imageRes: 'img_clue_302', isCompleted: true},
                        {cell: 3, imageRes: 'img_clue_303', isCompleted: true},
                        {cell: 4, imageRes: 'img_clue_304', isCompleted: true},
                        {cell: 5, imageRes: 'img_clue_305', isCompleted: true},
                        {cell: 6, imageRes: 'img_clue_306', isCompleted: true},
                        {cell: 7, imageRes: 'img_clue_307', isCompleted: true},
                        {cell: 8, imageRes: 'img_clue_308', isCompleted: true},
                        {cell: 9, imageRes: 'img_clue_309', isCompleted: true},
                        {cell: 10, imageRes: 'img_clue_310', isCompleted: true},
                        {cell: 11, imageRes: 'img_clue_311', isCompleted: true},
                        {cell: 12, imageRes: 'img_clue_312', isCompleted: true},
                        {cell: 13, imageRes: 'img_clue_313', isCompleted: true},
                        {cell: 14, imageRes: 'img_clue_314', isCompleted: true},
                        {cell: 15, imageRes: 'img_clue_315', isCompleted: true},
                        {cell: 16, imageRes: 'img_clue_316', isCompleted: true}
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

                var bgIdx = 1;
                var maxCol = 4;

                for (var i = 0; i < objData.cluesList.length; i++)
                {
                    if(i % 4 == 0)
                    {
                        rowPos = rowPos + rowHeight + 15;
                    }

                    colPos = (i % 4) - (maxCol / 2);

                    if(bgIdx > 8)
                    {
                        bgIdx = 1;
                    }

                    var cluesBGContainer =  libraryManager.createContainer('cluesBGContainer_' + i, contentContainer);
                    cluesBGContainer.visible = false;
                    cluesBGContainer.content.show = (function() {
                        this.visible = true;
                        TweenMax.fromTo(this, 0.5, {alpha: 0}, {alpha: 1, ease: Power2.easeOut});
                        TweenMax.fromTo(this.position, 0.5, {y: -25}, {y: 0, ease: Power2.easeOut});
                    }).bind(cluesBGContainer);

                    var cluesBG = libraryManager.createImage('cluesBG_' + i, cluesBGContainer, res['img_clue_bg' + bgIdx].texture);
                    rowHeight = cluesBG.height;
                    cluesBG.content.posY = rowPos + (rowHeight * 0.5) + 15;
                    cluesBG.content.posX = (colPos * (cluesBG.width + 15)) + ((cluesBG.width + 15) * 0.5);
                    cluesBG.position.x = cluesBG.content.posX;
                    cluesBG.position.y = cluesBG.content.posY;

                    bgIdx++;

                    var cluesContentContainer =  libraryManager.createContainer('cluesContentContainer', cluesBG);
                    cluesContentContainer.visible = false;
                    cluesContentContainer.content.show = (function() {
                        this.visible = true;
                        TweenMax.fromTo(this, 0.5, {alpha: 0}, {alpha: 1, ease: Power2.easeOut});
                    }).bind(cluesContentContainer);

                    var cluesCellGridContainer =  libraryManager.createContainer('cluesCellGridContainer', cluesContentContainer);
                    var cluesCellContainer =  libraryManager.createContainer('cluesCellContainer', cluesCellGridContainer);
                    var cluesGridContainer =  libraryManager.createContainer('cluesGridContainer', cluesCellGridContainer);
                    var cluesGrid = libraryManager.createImage('cluesGrid', cluesGridContainer, res['img_clue_puzzle_grid'].texture);
                    //cluesGrid.scale.set((cluesBG.width - 20) / cluesGrid.width);
                    cluesCellGridContainer.position.y = -25;
                    cluesGrid.width = 160;
                    cluesGrid.height = 160;

                    var cluesRowPos = -(cluesGrid.height * 0.5), cluesRowHeight = 0, cluesColPos = 0;
                    var cluesMaxCol = 4, cluesPadding = 0, maxGrid = objData.cluesList[i].data.length;

                    for (var gridIdx = 0; gridIdx < maxGrid; gridIdx++)
                    {
                        if(gridIdx % 4 == 0)
                        {
                            cluesRowPos = cluesRowPos + cluesRowHeight + cluesPadding;
                        }

                        cluesColPos = (gridIdx % 4) - (cluesMaxCol / 2);

                        var cluesCellBg = libraryManager.createImage('img_clue', cluesCellContainer, res[objData.cluesList[i].data[gridIdx].imageRes].texture);
                        if(!objData.cluesList[i].data[gridIdx].isCompleted)
                        {
                            cluesCellBg.tint = 0x303030;
                        }

                        cluesCellBg.width = 40;
                        cluesCellBg.height = 40;

                        cluesRowHeight = cluesCellBg.height;

                        cluesCellBg.content.posY = cluesRowPos + (cluesRowHeight * 0.5) + cluesPadding;
                        cluesCellBg.content.posX = (cluesColPos * (cluesCellBg.width + cluesPadding)) + ((cluesCellBg.width + cluesPadding) * 0.5);
                        cluesCellBg.position.x = cluesCellBg.content.posX;
                        cluesCellBg.position.y = cluesCellBg.content.posY;

                    }

                    var caseFileLabel = libraryManager.createText('caseFileLabel', cluesContentContainer, 0, new PIXI.TextStyle({
                        fontFamily: 'Arial',
                        fontSize: 14,
                        fontStyle: 'normal',
                        fill: '#808080'
                    }));
                    caseFileLabel.text = 'Case File: ';
                    caseFileLabel.anchor.x = 0;
                    caseFileLabel.position.x = -(cluesBG.width * 0.5) + 5;
                    caseFileLabel.position.y = 65;

                    var caseFileValue = libraryManager.createText('caseFileValue', cluesContentContainer, 0, new PIXI.TextStyle({
                        fontFamily: 'Arial',
                        fontSize: 14,
                        fontStyle: 'bold',
                        fill: '#000000'
                    }));
                    caseFileValue.text = objData.cluesList[i].id;
                    caseFileValue.anchor.x = 0;
                    caseFileValue.position.x = caseFileLabel.position.x + caseFileLabel.width;
                    caseFileValue.position.y = caseFileLabel.position.y;

                    var cellCompleted = libraryManager.getElementCountFromList(objData.cluesList[i].data, 'isCompleted', true);
                    var isCaseCompleted = (cellCompleted == maxGrid);

                    var caseFileProgress = libraryManager.createText('caseFileProgress', cluesContentContainer, 0, new PIXI.TextStyle({
                        fontFamily: 'Arial',
                        fontSize: 14,
                        fontStyle: 'normal',
                        fill: '#808080'
                    }));
                    caseFileProgress.text = cellCompleted + '/' + maxGrid;
                    caseFileProgress.anchor.x = 1;
                    caseFileProgress.anchor.y = 1;
                    caseFileProgress.position.x = (cluesBG.width * 0.5) - 5;
                    caseFileProgress.position.y = (cluesBG.height * 0.5) - 5;

                    if(isCaseCompleted)
                    {
                        var caseFileStatus = libraryManager.createText('caseFileStatus', cluesContentContainer, 0, new PIXI.TextStyle({
                            fontFamily: 'Arial',
                            fontSize: 14,
                            fontStyle: 'bold',
                            fill: '#7d4046'
                        }));
                        caseFileStatus.text = 'Solved';
                        caseFileStatus.anchor.x = 0;
                        caseFileStatus.anchor.y = 1;
                        caseFileStatus.position.x = -(cluesBG.width * 0.5) + 5;
                        caseFileStatus.position.y = (cluesBG.height * 0.5) - 5;
                    }

                    cluesBGContainer.content.cluesContentContainer = cluesContentContainer;


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
