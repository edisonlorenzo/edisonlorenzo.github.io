"use strict";
var ContentClues = (function () {

    // Instance stores a reference to the Singleton
    var instance;

    function init() {

        // Singleton Init
        var isAssetLoaded;
        var isAssetPending;
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
        // assets.push(new Asset('img_clue_101', 'images/clues/img_clue_101.png'));
        // assets.push(new Asset('img_clue_102', 'images/clues/img_clue_102.png'));
        // assets.push(new Asset('img_clue_103', 'images/clues/img_clue_103.png'));
        // assets.push(new Asset('img_clue_104', 'images/clues/img_clue_104.png'));
        // assets.push(new Asset('img_clue_105', 'images/clues/img_clue_105.png'));
        // assets.push(new Asset('img_clue_106', 'images/clues/img_clue_106.png'));
        // assets.push(new Asset('img_clue_107', 'images/clues/img_clue_107.png'));
        // assets.push(new Asset('img_clue_108', 'images/clues/img_clue_108.png'));
        // assets.push(new Asset('img_clue_109', 'images/clues/img_clue_109.png'));
        // assets.push(new Asset('img_clue_110', 'images/clues/img_clue_110.png'));
        // assets.push(new Asset('img_clue_111', 'images/clues/img_clue_111.png'));
        // assets.push(new Asset('img_clue_112', 'images/clues/img_clue_112.png'));
        // assets.push(new Asset('img_clue_113', 'images/clues/img_clue_113.png'));
        // assets.push(new Asset('img_clue_114', 'images/clues/img_clue_114.png'));
        // assets.push(new Asset('img_clue_115', 'images/clues/img_clue_115.png'));
        // assets.push(new Asset('img_clue_116', 'images/clues/img_clue_116.png'));
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
        assets.push(new Asset('img_clue_401', 'images/clues/img_clue_401.png'));
        assets.push(new Asset('img_clue_402', 'images/clues/img_clue_402.png'));
        assets.push(new Asset('img_clue_403', 'images/clues/img_clue_403.png'));
        assets.push(new Asset('img_clue_404', 'images/clues/img_clue_404.png'));
        assets.push(new Asset('img_clue_405', 'images/clues/img_clue_405.png'));
        assets.push(new Asset('img_clue_406', 'images/clues/img_clue_406.png'));
        assets.push(new Asset('img_clue_407', 'images/clues/img_clue_407.png'));
        assets.push(new Asset('img_clue_408', 'images/clues/img_clue_408.png'));
        assets.push(new Asset('img_clue_409', 'images/clues/img_clue_409.png'));
        assets.push(new Asset('img_clue_410', 'images/clues/img_clue_410.png'));
        assets.push(new Asset('img_clue_411', 'images/clues/img_clue_411.png'));
        assets.push(new Asset('img_clue_412', 'images/clues/img_clue_412.png'));
        assets.push(new Asset('img_clue_413', 'images/clues/img_clue_413.png'));
        assets.push(new Asset('img_clue_414', 'images/clues/img_clue_414.png'));
        assets.push(new Asset('img_clue_415', 'images/clues/img_clue_415.png'));
        assets.push(new Asset('img_clue_416', 'images/clues/img_clue_416.png'));
        assets.push(new Asset('img_clue_501', 'images/clues/img_clue_501.png'));
        assets.push(new Asset('img_clue_502', 'images/clues/img_clue_502.png'));
        assets.push(new Asset('img_clue_503', 'images/clues/img_clue_503.png'));
        assets.push(new Asset('img_clue_504', 'images/clues/img_clue_504.png'));
        assets.push(new Asset('img_clue_505', 'images/clues/img_clue_505.png'));
        assets.push(new Asset('img_clue_506', 'images/clues/img_clue_506.png'));
        assets.push(new Asset('img_clue_507', 'images/clues/img_clue_507.png'));
        assets.push(new Asset('img_clue_508', 'images/clues/img_clue_508.png'));
        assets.push(new Asset('img_clue_509', 'images/clues/img_clue_509.png'));
        assets.push(new Asset('img_clue_510', 'images/clues/img_clue_510.png'));
        assets.push(new Asset('img_clue_511', 'images/clues/img_clue_511.png'));
        assets.push(new Asset('img_clue_512', 'images/clues/img_clue_512.png'));
        assets.push(new Asset('img_clue_513', 'images/clues/img_clue_513.png'));
        assets.push(new Asset('img_clue_514', 'images/clues/img_clue_514.png'));
        assets.push(new Asset('img_clue_515', 'images/clues/img_clue_515.png'));
        assets.push(new Asset('img_clue_516', 'images/clues/img_clue_516.png'));
        assets.push(new Asset('img_clue_601', 'images/clues/img_clue_601.png'));
        assets.push(new Asset('img_clue_602', 'images/clues/img_clue_602.png'));
        assets.push(new Asset('img_clue_603', 'images/clues/img_clue_603.png'));
        assets.push(new Asset('img_clue_604', 'images/clues/img_clue_604.png'));
        assets.push(new Asset('img_clue_605', 'images/clues/img_clue_605.png'));
        assets.push(new Asset('img_clue_606', 'images/clues/img_clue_606.png'));
        assets.push(new Asset('img_clue_607', 'images/clues/img_clue_607.png'));
        assets.push(new Asset('img_clue_608', 'images/clues/img_clue_608.png'));
        assets.push(new Asset('img_clue_609', 'images/clues/img_clue_609.png'));
        assets.push(new Asset('img_clue_610', 'images/clues/img_clue_610.png'));
        assets.push(new Asset('img_clue_611', 'images/clues/img_clue_611.png'));
        assets.push(new Asset('img_clue_612', 'images/clues/img_clue_612.png'));
        assets.push(new Asset('img_clue_613', 'images/clues/img_clue_613.png'));
        assets.push(new Asset('img_clue_614', 'images/clues/img_clue_614.png'));
        assets.push(new Asset('img_clue_615', 'images/clues/img_clue_615.png'));
        assets.push(new Asset('img_clue_616', 'images/clues/img_clue_616.png'));
        assets.push(new Asset('img_clue_701', 'images/clues/img_clue_701.png'));
        assets.push(new Asset('img_clue_702', 'images/clues/img_clue_702.png'));
        assets.push(new Asset('img_clue_703', 'images/clues/img_clue_703.png'));
        assets.push(new Asset('img_clue_704', 'images/clues/img_clue_704.png'));
        assets.push(new Asset('img_clue_705', 'images/clues/img_clue_705.png'));
        assets.push(new Asset('img_clue_706', 'images/clues/img_clue_706.png'));
        assets.push(new Asset('img_clue_707', 'images/clues/img_clue_707.png'));
        assets.push(new Asset('img_clue_708', 'images/clues/img_clue_708.png'));
        assets.push(new Asset('img_clue_709', 'images/clues/img_clue_709.png'));
        assets.push(new Asset('img_clue_710', 'images/clues/img_clue_710.png'));
        assets.push(new Asset('img_clue_711', 'images/clues/img_clue_711.png'));
        assets.push(new Asset('img_clue_712', 'images/clues/img_clue_712.png'));
        assets.push(new Asset('img_clue_713', 'images/clues/img_clue_713.png'));
        assets.push(new Asset('img_clue_714', 'images/clues/img_clue_714.png'));
        assets.push(new Asset('img_clue_715', 'images/clues/img_clue_715.png'));
        assets.push(new Asset('img_clue_716', 'images/clues/img_clue_716.png'));
        assets.push(new Asset('img_clue_801', 'images/clues/img_clue_801.png'));
        assets.push(new Asset('img_clue_802', 'images/clues/img_clue_802.png'));
        assets.push(new Asset('img_clue_803', 'images/clues/img_clue_803.png'));
        assets.push(new Asset('img_clue_804', 'images/clues/img_clue_804.png'));
        assets.push(new Asset('img_clue_805', 'images/clues/img_clue_805.png'));
        assets.push(new Asset('img_clue_806', 'images/clues/img_clue_806.png'));
        assets.push(new Asset('img_clue_807', 'images/clues/img_clue_807.png'));
        assets.push(new Asset('img_clue_808', 'images/clues/img_clue_808.png'));
        assets.push(new Asset('img_clue_809', 'images/clues/img_clue_809.png'));
        assets.push(new Asset('img_clue_810', 'images/clues/img_clue_810.png'));
        assets.push(new Asset('img_clue_811', 'images/clues/img_clue_811.png'));
        assets.push(new Asset('img_clue_812', 'images/clues/img_clue_812.png'));
        assets.push(new Asset('img_clue_813', 'images/clues/img_clue_813.png'));
        assets.push(new Asset('img_clue_814', 'images/clues/img_clue_814.png'));
        assets.push(new Asset('img_clue_815', 'images/clues/img_clue_815.png'));
        assets.push(new Asset('img_clue_816', 'images/clues/img_clue_816.png'));



        var objData =
        {
            cluesList :
            [
                {
                    id: '#1111',
                    data: [
                        {cell: 1, imageRes: 'img_clue_101', isCompleted: false},
                        {cell: 2, imageRes: 'img_clue_102', isCompleted: false},
                        {cell: 3, imageRes: 'img_clue_103', isCompleted: false},
                        {cell: 4, imageRes: 'img_clue_104', isCompleted: false},
                        {cell: 5, imageRes: 'img_clue_105', isCompleted: false},
                        {cell: 6, imageRes: 'img_clue_106', isCompleted: false},
                        {cell: 7, imageRes: 'img_clue_107', isCompleted: false},
                        {cell: 8, imageRes: 'img_clue_108', isCompleted: false},
                        {cell: 9, imageRes: 'img_clue_109', isCompleted: false},
                        {cell: 10, imageRes: 'img_clue_110', isCompleted: false},
                        {cell: 11, imageRes: 'img_clue_111', isCompleted: false},
                        {cell: 12, imageRes: 'img_clue_112', isCompleted: false},
                        {cell: 13, imageRes: 'img_clue_113', isCompleted: false},
                        {cell: 14, imageRes: 'img_clue_114', isCompleted: false},
                        {cell: 15, imageRes: 'img_clue_115', isCompleted: false},
                        {cell: 16, imageRes: 'img_clue_116', isCompleted: false}
                    ]
                },
                {
                    id: '#2222',
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
                    id: '#3333',
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
                },
                {
                    id: '#4444',
                    data: [
                        {cell: 1, imageRes: 'img_clue_401', isCompleted: true},
                        {cell: 2, imageRes: 'img_clue_402', isCompleted: false},
                        {cell: 3, imageRes: 'img_clue_403', isCompleted: true},
                        {cell: 4, imageRes: 'img_clue_404', isCompleted: true},
                        {cell: 5, imageRes: 'img_clue_405', isCompleted: false},
                        {cell: 6, imageRes: 'img_clue_406', isCompleted: true},
                        {cell: 7, imageRes: 'img_clue_407', isCompleted: false},
                        {cell: 8, imageRes: 'img_clue_408', isCompleted: false},
                        {cell: 9, imageRes: 'img_clue_409', isCompleted: true},
                        {cell: 10, imageRes: 'img_clue_410', isCompleted: false},
                        {cell: 11, imageRes: 'img_clue_411', isCompleted: true},
                        {cell: 12, imageRes: 'img_clue_412', isCompleted: true},
                        {cell: 13, imageRes: 'img_clue_413', isCompleted: false},
                        {cell: 14, imageRes: 'img_clue_414', isCompleted: true},
                        {cell: 15, imageRes: 'img_clue_415', isCompleted: false},
                        {cell: 16, imageRes: 'img_clue_416', isCompleted: false}
                    ]
                },
                {
                    id: '#5555',
                    data: [
                        {cell: 1, imageRes: 'img_clue_501', isCompleted: true},
                        {cell: 2, imageRes: 'img_clue_502', isCompleted: true},
                        {cell: 3, imageRes: 'img_clue_503', isCompleted: true},
                        {cell: 4, imageRes: 'img_clue_504', isCompleted: true},
                        {cell: 5, imageRes: 'img_clue_505', isCompleted: true},
                        {cell: 6, imageRes: 'img_clue_506', isCompleted: true},
                        {cell: 7, imageRes: 'img_clue_507', isCompleted: true},
                        {cell: 8, imageRes: 'img_clue_508', isCompleted: true},
                        {cell: 9, imageRes: 'img_clue_509', isCompleted: true},
                        {cell: 10, imageRes: 'img_clue_510', isCompleted: true},
                        {cell: 11, imageRes: 'img_clue_511', isCompleted: true},
                        {cell: 12, imageRes: 'img_clue_512', isCompleted: true},
                        {cell: 13, imageRes: 'img_clue_513', isCompleted: true},
                        {cell: 14, imageRes: 'img_clue_514', isCompleted: true},
                        {cell: 15, imageRes: 'img_clue_515', isCompleted: true},
                        {cell: 16, imageRes: 'img_clue_516', isCompleted: true}
                    ]
                },
                {
                    id: '#6666',
                    data: [
                        {cell: 1, imageRes: 'img_clue_601', isCompleted: false},
                        {cell: 2, imageRes: 'img_clue_602', isCompleted: false},
                        {cell: 3, imageRes: 'img_clue_603', isCompleted: false},
                        {cell: 4, imageRes: 'img_clue_604', isCompleted: false},
                        {cell: 5, imageRes: 'img_clue_605', isCompleted: false},
                        {cell: 6, imageRes: 'img_clue_606', isCompleted: false},
                        {cell: 7, imageRes: 'img_clue_607', isCompleted: false},
                        {cell: 8, imageRes: 'img_clue_608', isCompleted: false},
                        {cell: 9, imageRes: 'img_clue_609', isCompleted: false},
                        {cell: 10, imageRes: 'img_clue_610', isCompleted: false},
                        {cell: 11, imageRes: 'img_clue_611', isCompleted: false},
                        {cell: 12, imageRes: 'img_clue_612', isCompleted: false},
                        {cell: 13, imageRes: 'img_clue_613', isCompleted: false},
                        {cell: 14, imageRes: 'img_clue_614', isCompleted: false},
                        {cell: 15, imageRes: 'img_clue_615', isCompleted: false},
                        {cell: 16, imageRes: 'img_clue_616', isCompleted: false}
                    ]
                },
                {
                    id: '#7777',
                    data: [
                        {cell: 1, imageRes: 'img_clue_701', isCompleted: true},
                        {cell: 2, imageRes: 'img_clue_702', isCompleted: false},
                        {cell: 3, imageRes: 'img_clue_703', isCompleted: false},
                        {cell: 4, imageRes: 'img_clue_704', isCompleted: false},
                        {cell: 5, imageRes: 'img_clue_705', isCompleted: false},
                        {cell: 6, imageRes: 'img_clue_706', isCompleted: false},
                        {cell: 7, imageRes: 'img_clue_707', isCompleted: true},
                        {cell: 8, imageRes: 'img_clue_708', isCompleted: false},
                        {cell: 9, imageRes: 'img_clue_709', isCompleted: false},
                        {cell: 10, imageRes: 'img_clue_710', isCompleted: false},
                        {cell: 11, imageRes: 'img_clue_711', isCompleted: false},
                        {cell: 12, imageRes: 'img_clue_712', isCompleted: false},
                        {cell: 13, imageRes: 'img_clue_713', isCompleted: false},
                        {cell: 14, imageRes: 'img_clue_714', isCompleted: false},
                        {cell: 15, imageRes: 'img_clue_715', isCompleted: false},
                        {cell: 16, imageRes: 'img_clue_716', isCompleted: true}
                    ]
                },
                {
                    id: '#8888',
                    data: [
                        {cell: 1, imageRes: 'img_clue_801', isCompleted: true},
                        {cell: 2, imageRes: 'img_clue_802', isCompleted: true},
                        {cell: 3, imageRes: 'img_clue_803', isCompleted: true},
                        {cell: 4, imageRes: 'img_clue_804', isCompleted: true},
                        {cell: 5, imageRes: 'img_clue_805', isCompleted: false},
                        {cell: 6, imageRes: 'img_clue_806', isCompleted: true},
                        {cell: 7, imageRes: 'img_clue_807', isCompleted: true},
                        {cell: 8, imageRes: 'img_clue_808', isCompleted: false},
                        {cell: 9, imageRes: 'img_clue_809', isCompleted: true},
                        {cell: 10, imageRes: 'img_clue_810', isCompleted: true},
                        {cell: 11, imageRes: 'img_clue_811', isCompleted: true},
                        {cell: 12, imageRes: 'img_clue_812', isCompleted: true},
                        {cell: 13, imageRes: 'img_clue_813', isCompleted: true},
                        {cell: 14, imageRes: 'img_clue_814', isCompleted: true},
                        {cell: 15, imageRes: 'img_clue_815', isCompleted: true},
                        {cell: 16, imageRes: 'img_clue_816', isCompleted: true}
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

            if(assetLoaderManager && libraryManager)
            {
                var res = assetLoaderManager.getRes();

                var bodyContainer = libraryManager.getElement('bodyContainer');
                bodyContainer.position.y = 45;

                var contentContainer = libraryManager.getElement('contentContainer');
                var bodyBackgroundObj = libraryManager.getElement('bodyBackgroundObj');

                var contentBodyContainer =  libraryManager.createContainer('contentBodyContainer', contentContainer);
                contentBodyContainer.position.y = -(bodyBackgroundObj.height * 0.5);

                var rowPos = 0, rowHeight = 0, colPos = 0;

                var bgIdx = 1;
                var maxCol = 4;

                var sc = libraryManager.createScrollContainer('contentScrollContainer', contentBodyContainer, bodyBackgroundObj.width, bodyBackgroundObj.height);
                var rowContainer;

                for (var i = 0; i < objData.cluesList.length; i++)
                {
                    if(i % maxCol == 0)
                    {
                        rowContainer = new PIXI.Container();
                        rowContainer.position.x = (bodyBackgroundObj.width * 0.5);
                        sc.scrollContainer.addChild(rowContainer);
                        sc.items.push(rowContainer);
                        sc.setItemHeight(rowHeight + 20);
                        rowPos = rowPos + rowHeight + 20;

                    }

                    colPos = (i % maxCol) - (maxCol / 2);

                    if(bgIdx > 8)
                    {
                        bgIdx = 1;
                    }

                    var cluesItem = objData.cluesList[i];

                    var cluesItemContainer = libraryManager.createContainer('cluesItemContainer_' + i, rowContainer);
                    cluesItemContainer.buttonMode = true;
                    cluesItemContainer.interactive = true;
                    cluesItemContainer.visible = false;
                    cluesItemContainer.content.load = (function() {
                        this.visible = true;
                        TweenMax.fromTo(this, 0.5, {alpha: 0}, {alpha: 1, ease: Power2.easeOut});
                        TweenMax.fromTo(this.position, 0.5, {y: -25}, {y: 0, ease: Power2.easeOut});
                    }).bind(cluesItemContainer);

                    cluesItemContainer.on('pointertap', (function() {
                        if(!sc.isMoving())
                        {
                            showPopupContent(this);
                        }
                    }).bind(cluesItem));

                    var cluesBG = libraryManager.createImage('cluesBG_' + i, cluesItemContainer, res['img_clue_bg' + bgIdx].texture);
                    rowHeight = cluesBG.height;
                    cluesBG.content.posY = rowPos + (rowHeight * 0.5);
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

                    cluesCellGridContainer.position.y = -25;
                    cluesGrid.width = 160;
                    cluesGrid.height = 160;

                    var cluesRowPos = -(cluesGrid.height * 0.5), cluesCellHeight = 0, cluesCellWidth = 0, cluesColPos = 0;
                    var cluesMaxCol = 4, cluesPadding = 0, maxGrid = cluesItem.data.length;

                    for (var gridIdx = 0; gridIdx < maxGrid; gridIdx++)
                    {
                        if(gridIdx % cluesMaxCol == 0)
                        {
                            cluesRowPos = cluesRowPos + cluesCellHeight;
                        }

                        var cluesCellBg = libraryManager.createImage('img_clue', cluesCellContainer, res[cluesItem.data[gridIdx].imageRes].texture);
                        if(!cluesItem.data[gridIdx].isCompleted)
                        {
                            cluesCellBg.tint = 0x303030;
                        }

                        cluesCellBg.width = 40;
                        cluesCellBg.height = 40;

                        cluesCellHeight = cluesCellBg.height + cluesPadding;
                        cluesCellWidth = cluesCellBg.width + cluesPadding;

                        cluesColPos = ((gridIdx % cluesMaxCol) - Math.ceil(cluesMaxCol * 0.5)) * cluesCellWidth;

                        cluesCellBg.content.posY = cluesRowPos + (cluesCellHeight * 0.5);
                        cluesCellBg.content.posX = cluesColPos + (cluesCellWidth * 0.5);
                        cluesCellBg.position.x = cluesCellBg.content.posX;
                        cluesCellBg.position.y = cluesCellBg.content.posY;

                    }

                    var caseFileLabel = libraryManager.createText('caseFileLabel', cluesContentContainer, 0, new PIXI.TextStyle({
                        fontFamily: 'Arial',
                        fontSize: 14,
                        fontStyle: 'normal',
                        fontWeight: 'bold',
                        fill: '#333333'
                    }));
                    caseFileLabel.text = 'Case File: ';
                    caseFileLabel.anchor.x = 0;
                    caseFileLabel.position.x = -(cluesBG.width * 0.5) + 5;
                    caseFileLabel.position.y = 65;

                    var caseFileValue = libraryManager.createText('caseFileValue', cluesContentContainer, 0, new PIXI.TextStyle({
                        fontFamily: 'Arial',
                        fontSize: 14,
                        fontStyle: 'normal',
                        fontWeight: 'bold',
                        fill: '#000000'
                    }));
                    caseFileValue.text = cluesItem.id;
                    caseFileValue.anchor.x = 0;
                    caseFileValue.position.x = caseFileLabel.position.x + caseFileLabel.width;
                    caseFileValue.position.y = caseFileLabel.position.y;

                    var cellCompleted = libraryManager.getElementCountFromList(cluesItem.data, 'isCompleted', true);
                    var isCaseCompleted = (cellCompleted == maxGrid);

                    var caseFileProgress = libraryManager.createText('caseFileProgress', cluesContentContainer, 0, new PIXI.TextStyle({
                        fontFamily: 'Arial',
                        fontSize: 14,
                        fontStyle: 'normal',
                        fontWeight: 'bold',
                        fill: '#333333'
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
                            fontStyle: 'normal',
                            fontWeight: 'bold',
                            fill: '#7d4046'
                        }));
                        caseFileStatus.text = 'Solved';
                        caseFileStatus.anchor.x = 0;
                        caseFileStatus.anchor.y = 1;
                        caseFileStatus.position.x = -(cluesBG.width * 0.5) + 5;
                        caseFileStatus.position.y = (cluesBG.height * 0.5) - 5;
                    }

                    cluesItemContainer.content.cluesContentContainer = cluesContentContainer;

                    cluesItemContainer.content.show = (function() {

                        var tl1 = new TimelineMax();
                        if(this.cluesContentContainer)
                        {
                            tl1.add(this.cluesContentContainer.content.show, "+=0.1");
                        }

                    }).bind(cluesItemContainer.content);

                }

                sc.setItemHeight(rowHeight + 35);

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
                if(interfaceManager.getActiveContent() == 'clues')
                {
                    interfaceManager.getLoader().hide();

                    if(objData)
                    {

                        showContent();

                        var tl = interfaceManager.getTimeline();

                        var animateLoad = (function(){
                            var tl = new TimelineMax();
                            for (var i = 0; i < objData.cluesList.length; i++)
                            {
                                var itemContainer = libraryManager.getElement('cluesItemContainer_' + i);
                                tl.add(itemContainer.content.load, "+=0.05");
                            }
                        });

                        var animateShow = (function(){
                            var tl = new TimelineMax();
                            for (var i = 0; i < objData.cluesList.length; i++)
                            {
                                var itemContainer = libraryManager.getElement('cluesItemContainer_' + i);
                                tl.add(itemContainer.content.show, "+=0");
                            }
                        });

                        tl.add(animateLoad, "+=0.1");
                        tl.add(animateShow, "+=0.5");

                    }
                }
            }

        }

        function showPopupContent(item)
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

                var buttonCloseImage = libraryManager.createImageButton('buttonCloseImage', popupBG, res['btn_close'].texture);
                buttonCloseImage.position.x = (popupBG.width * 0.5) - 15;
                buttonCloseImage.position.y = -(popupBG.height * 0.5) + 15;

                buttonCloseImage.on('pointertap', function() {
                    closePopupContent();
                });

                var cluesCellGridContainer =  libraryManager.createContainer('cluesCellGridContainer', popupBG);
                var cluesCellContainer =  libraryManager.createContainer('cluesCellContainer', cluesCellGridContainer);
                var cluesGridContainer =  libraryManager.createContainer('cluesGridContainer', cluesCellGridContainer);
                var cluesGrid = libraryManager.createImage('cluesGrid', cluesGridContainer, res['img_clue_puzzle_grid'].texture);

                cluesCellGridContainer.position.x = -(popupBG.width * 0.5) + (cluesGrid.width * 0.5) + 15;
                cluesCellGridContainer.position.y = -(popupBG.height * 0.5) + (cluesGrid.height * 0.5) + 15;

                var cluesRowPos = -(cluesGrid.height * 0.5), cluesCellHeight = 0, cluesCellWidth = 0, cluesColPos = 0;
                var cluesMaxCol = 4, cluesPadding = 1, maxGrid = item.data.length;

                for (var gridIdx = 0; gridIdx < maxGrid; gridIdx++)
                {
                    if(gridIdx % cluesMaxCol == 0)
                    {
                        cluesRowPos = cluesRowPos + cluesCellHeight;
                    }

                    var cluesCellBg = libraryManager.createImage('img_clue', cluesCellContainer, res[item.data[gridIdx].imageRes].texture);
                    if(!item.data[gridIdx].isCompleted)
                    {
                        cluesCellBg.tint = 0x303030;
                    }

                    cluesCellHeight = cluesCellBg.height + cluesPadding;
                    cluesCellWidth = cluesCellBg.width + cluesPadding;

                    cluesColPos = ((gridIdx % cluesMaxCol) - Math.ceil(cluesMaxCol * 0.5)) * cluesCellWidth;

                    cluesCellBg.content.posY = cluesRowPos + (cluesCellHeight * 0.5);
                    cluesCellBg.content.posX = cluesColPos + (cluesCellWidth * 0.5);
                    cluesCellBg.position.x = cluesCellBg.content.posX;
                    cluesCellBg.position.y = cluesCellBg.content.posY;

                }

                var caseFileLabel = libraryManager.createText('caseFileLabel', popupBG, 0, new PIXI.TextStyle({
                    fontFamily: 'Arial',
                    fontSize: 16,
                    fontStyle: 'normal',
                    fill: '#808080'
                }));
                caseFileLabel.text = 'Case File: ';
                caseFileLabel.anchor.x = 0;
                caseFileLabel.anchor.y = 0;
                caseFileLabel.position.x = cluesCellGridContainer.position.x + (cluesGrid.width * 0.5) + 5;
                caseFileLabel.position.y = -(popupBG.height * 0.5) + 15;

                var caseFileValue = libraryManager.createText('caseFileValue', popupBG, 0, new PIXI.TextStyle({
                    fontFamily: 'Arial',
                    fontSize: 16,
                    fontStyle: 'normal',
                    fill: '#ffffff'
                }));
                caseFileValue.text = item.id;
                caseFileValue.anchor.x = 0;
                caseFileValue.anchor.y = 0;
                caseFileValue.position.x = caseFileLabel.position.x + caseFileLabel.width;
                caseFileValue.position.y = caseFileLabel.position.y;

                var cellCompleted = libraryManager.getElementCountFromList(item.data, 'isCompleted', true);
                var isCaseCompleted = (cellCompleted == maxGrid);

                var caseFileProgress = libraryManager.createText('caseFileProgress', popupBG, 0, new PIXI.TextStyle({
                    fontFamily: 'Arial',
                    fontSize: 16,
                    fontStyle: 'normal',
                    fill: '#808080'
                }));
                caseFileProgress.text = cellCompleted + '/' + maxGrid;
                caseFileProgress.anchor.x = 0;
                caseFileProgress.anchor.y = 0;
                caseFileProgress.position.x = caseFileLabel.position.x;
                caseFileProgress.position.y = caseFileLabel.position.y + caseFileLabel.height + 2;

                if(isCaseCompleted)
                {
                    var caseFileStatus = libraryManager.createText('caseFileStatus', popupBG, 0, new PIXI.TextStyle({
                        fontFamily: 'Arial',
                        fontSize: 16,
                        fontStyle: 'bold',
                        fill: '#7d4046'
                    }));
                    caseFileStatus.text = 'Solved';
                    caseFileStatus.anchor.x = 0;
                    caseFileStatus.anchor.y = 0;
                    caseFileStatus.position.x = caseFileProgress.position.x;
                    caseFileStatus.position.y = caseFileProgress.position.y + caseFileProgress.height + 2;
                }

                var caseFileDesc = libraryManager.createText('caseFileDesc', popupBG, 0, new PIXI.TextStyle({
                    fontFamily: 'Arial',
                    fontSize: 18,
                    fontStyle: 'normal',
                    fill: '#808080',
                    wordWrapWidth: 360,
                    wordWrap : true
                }));
                caseFileDesc.text = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce vel enim nec arcu tristique convallis quis at urna. Donec tellus ipsum, porttitor id ultrices eu, aliquet in risus. Aenean nunc erat, accumsan sit amet odio id, faucibus tristique sem. Sed in ex dapibus, efficitur est at, venenatis sapien. Sed elementum mi vitae mauris accumsan, ac aliquet ligula fermentum.';
                caseFileDesc.anchor.x = 0;
                caseFileDesc.anchor.y = 0;
                caseFileDesc.position.x = caseFileLabel.position.x;
                caseFileDesc.position.y = caseFileLabel.position.y + caseFileLabel.height + 50;

                popupBG.content.load();

            }

        }

        function closePopupContent()
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
