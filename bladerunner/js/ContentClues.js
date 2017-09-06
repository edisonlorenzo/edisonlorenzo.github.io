"use strict";
var ContentClues = (function () {

    // Instance stores a reference to the Singleton
    var instance;

    function init() {

        // Singleton Init
        var isAssetLoaded;
        var isAssetPending;
        var assets = new Array();

        assets.push(new Asset('img_clue_reward01', 'images/img_clue_reward01.png'));
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
            notificationList:
            [
            ],
            cluesList :
            [
                {
                    id: '#1111',
                    reward: {
                        imageRes: 'img_clue_reward01',
                        desc: 'Behind the Scene with Officer K'
                    },
                    data: [
                        {cell: 1, imageRes: 'img_clue_101', lockedDesc: 'Unlock with 1000 points', unlockedDesc: 'A benefit or a hazard'},
                        {cell: 2, imageRes: 'img_clue_102', lockedDesc: 'Unlock with 1000 points', unlockedDesc: 'That\'s what it is to be a slave'},
                        {cell: 3, imageRes: 'img_clue_103', lockedDesc: 'Unlock with 1000 points', unlockedDesc: 'But then again who does?'},
                        {cell: 4, imageRes: 'img_clue_104', lockedDesc: 'Unlock with 1000 points', unlockedDesc: 'I\'ve done questionable things'},
                        {cell: 5, imageRes: 'img_clue_105', lockedDesc: 'Unlock with 1000 points', unlockedDesc: 'An itch you can never scratch!'},
                        {cell: 6, imageRes: 'img_clue_106', lockedDesc: 'Unlock with 1000 points', unlockedDesc: 'Like our owl?'},
                        {cell: 7, imageRes: 'img_clue_107', lockedDesc: 'Unlock with 1000 points', unlockedDesc: 'No Description'},
                        {cell: 8, imageRes: 'img_clue_108', lockedDesc: 'Unlock with 1000 points', unlockedDesc: 'No Description'},
                        {cell: 9, imageRes: 'img_clue_109', lockedDesc: 'Unlock with 1000 points', unlockedDesc: 'No Description'},
                        {cell: 10, imageRes: 'img_clue_110', lockedDesc: 'Unlock with 1000 points', unlockedDesc: 'No Description'},
                        {cell: 11, imageRes: 'img_clue_111', lockedDesc: 'Unlock with 1000 points', unlockedDesc: 'No Description'},
                        {cell: 12, imageRes: 'img_clue_112', lockedDesc: 'Unlock with 1000 points', unlockedDesc: 'No Description'},
                        {cell: 13, imageRes: 'img_clue_113', lockedDesc: 'Unlock with 1000 points', unlockedDesc: 'No Description'},
                        {cell: 14, imageRes: 'img_clue_114', lockedDesc: 'Unlock with 1000 points', unlockedDesc: 'No Description'},
                        {cell: 15, imageRes: 'img_clue_115', lockedDesc: 'Unlock with 1000 points', unlockedDesc: 'No Description'},
                        {cell: 16, imageRes: 'img_clue_116', lockedDesc: 'Unlock with 1000 points', unlockedDesc: 'No Description'}
                    ]
                },
                {
                    id: '#2222',
                    reward: {
                        imageRes: 'img_clue_reward01',
                        desc: 'Behind the Scene with Officer K'
                    },
                    data: [
                        {cell: 1, imageRes: 'img_clue_201', lockedDesc: 'Unlock with 1000 points', unlockedDesc: 'No Description'},
                        {cell: 2, imageRes: 'img_clue_202', lockedDesc: 'Unlock with 1000 points', unlockedDesc: 'No Description'},
                        {cell: 3, imageRes: 'img_clue_203', lockedDesc: 'Unlock with 1000 points', unlockedDesc: 'No Description'},
                        {cell: 4, imageRes: 'img_clue_204', lockedDesc: 'Unlock with 1000 points', unlockedDesc: 'No Description'},
                        {cell: 5, imageRes: 'img_clue_205', lockedDesc: 'Unlock with 1000 points', unlockedDesc: 'No Description'},
                        {cell: 6, imageRes: 'img_clue_206', lockedDesc: 'Unlock with 1000 points', unlockedDesc: 'No Description'},
                        {cell: 7, imageRes: 'img_clue_207', lockedDesc: 'Unlock with 1000 points', unlockedDesc: 'No Description'},
                        {cell: 8, imageRes: 'img_clue_208', lockedDesc: 'Unlock with 1000 points', unlockedDesc: 'No Description'},
                        {cell: 9, imageRes: 'img_clue_209', lockedDesc: 'Unlock with 1000 points', unlockedDesc: 'No Description'},
                        {cell: 10, imageRes: 'img_clue_210', lockedDesc: 'Unlock with 1000 points', unlockedDesc: 'No Description'},
                        {cell: 11, imageRes: 'img_clue_211', lockedDesc: 'Unlock with 1000 points', unlockedDesc: 'No Description'},
                        {cell: 12, imageRes: 'img_clue_212', lockedDesc: 'Unlock with 1000 points', unlockedDesc: 'No Description'},
                        {cell: 13, imageRes: 'img_clue_213', lockedDesc: 'Unlock with 1000 points', unlockedDesc: 'No Description'},
                        {cell: 14, imageRes: 'img_clue_214', lockedDesc: 'Unlock with 1000 points', unlockedDesc: 'No Description'},
                        {cell: 15, imageRes: 'img_clue_215', lockedDesc: 'Unlock with 1000 points', unlockedDesc: 'No Description'},
                        {cell: 16, imageRes: 'img_clue_216', lockedDesc: 'Unlock with 1000 points', unlockedDesc: 'No Description'}
                    ]
                },
                {
                    id: '#3333',
                    reward: {
                        imageRes: 'img_clue_reward01',
                        desc: 'Behind the Scene with Officer K'
                    },
                    data: [
                        {cell: 1, imageRes: 'img_clue_301', isCompleted: true, lockedDesc: 'Unlock with 1000 points', unlockedDesc: 'Description Text'},
                        {cell: 2, imageRes: 'img_clue_302', isCompleted: true, lockedDesc: 'Unlock with 1000 points', unlockedDesc: 'Description Text'},
                        {cell: 3, imageRes: 'img_clue_303', isCompleted: true, lockedDesc: 'Unlock with 1000 points', unlockedDesc: 'Description Text'},
                        {cell: 4, imageRes: 'img_clue_304', isCompleted: true, lockedDesc: 'Unlock with 1000 points', unlockedDesc: 'Description Text'},
                        {cell: 5, imageRes: 'img_clue_305', isCompleted: true, lockedDesc: 'Unlock with 1000 points', unlockedDesc: 'Description Text'},
                        {cell: 6, imageRes: 'img_clue_306', isCompleted: true, lockedDesc: 'Unlock with 1000 points', unlockedDesc: 'Description Text'},
                        {cell: 7, imageRes: 'img_clue_307', isCompleted: true, lockedDesc: 'Unlock with 1000 points', unlockedDesc: 'Description Text'},
                        {cell: 8, imageRes: 'img_clue_308', isCompleted: true, lockedDesc: 'Unlock with 1000 points', unlockedDesc: 'Description Text'},
                        {cell: 9, imageRes: 'img_clue_309', isCompleted: true, lockedDesc: 'Unlock with 1000 points', unlockedDesc: 'Description Text'},
                        {cell: 10, imageRes: 'img_clue_310', isCompleted: true, lockedDesc: 'Unlock with 1000 points', unlockedDesc: 'Description Text'},
                        {cell: 11, imageRes: 'img_clue_311', isCompleted: true, lockedDesc: 'Unlock with 1000 points', unlockedDesc: 'Description Text'},
                        {cell: 12, imageRes: 'img_clue_312', isCompleted: true, lockedDesc: 'Unlock with 1000 points', unlockedDesc: 'Description Text'},
                        {cell: 13, imageRes: 'img_clue_313', isCompleted: true, lockedDesc: 'Unlock with 1000 points', unlockedDesc: 'Description Text'},
                        {cell: 14, imageRes: 'img_clue_314', isCompleted: true, lockedDesc: 'Unlock with 1000 points', unlockedDesc: 'Description Text'},
                        {cell: 15, imageRes: 'img_clue_315', isCompleted: true, lockedDesc: 'Unlock with 1000 points', unlockedDesc: 'Description Text'},
                        {cell: 16, imageRes: 'img_clue_316', isCompleted: true, lockedDesc: 'Unlock with 1000 points', unlockedDesc: 'Description Text'}
                    ]
                },
                {
                    id: '#4444',
                    reward: {
                        imageRes: 'img_clue_reward01',
                        desc: 'Behind the Scene with Officer K'
                    },
                    data: [
                        {cell: 1, imageRes: 'img_clue_401', isCompleted: true, lockedDesc: 'Unlock with 1000 points', unlockedDesc: 'Description Text'},
                        {cell: 2, imageRes: 'img_clue_402', isCompleted: true, lockedDesc: 'Unlock with 1000 points', unlockedDesc: 'Description Text'},
                        {cell: 3, imageRes: 'img_clue_403', isCompleted: true, lockedDesc: 'Unlock with 1000 points', unlockedDesc: 'Description Text'},
                        {cell: 4, imageRes: 'img_clue_404', isCompleted: true, lockedDesc: 'Unlock with 1000 points', unlockedDesc: 'Description Text'},
                        {cell: 5, imageRes: 'img_clue_405', isCompleted: true, lockedDesc: 'Unlock with 1000 points', unlockedDesc: 'Description Text'},
                        {cell: 6, imageRes: 'img_clue_406', isCompleted: true, lockedDesc: 'Unlock with 1000 points', unlockedDesc: 'Description Text'},
                        {cell: 7, imageRes: 'img_clue_407', isCompleted: true, lockedDesc: 'Unlock with 1000 points', unlockedDesc: 'Description Text'},
                        {cell: 8, imageRes: 'img_clue_408', isCompleted: true, lockedDesc: 'Unlock with 1000 points', unlockedDesc: 'Description Text'},
                        {cell: 9, imageRes: 'img_clue_409', isCompleted: true, lockedDesc: 'Unlock with 1000 points', unlockedDesc: 'Description Text'},
                        {cell: 10, imageRes: 'img_clue_410', isCompleted: true, lockedDesc: 'Unlock with 1000 points', unlockedDesc: 'Description Text'},
                        {cell: 11, imageRes: 'img_clue_411', isCompleted: true, lockedDesc: 'Unlock with 1000 points', unlockedDesc: 'Description Text'},
                        {cell: 12, imageRes: 'img_clue_412', isCompleted: true, lockedDesc: 'Unlock with 1000 points', unlockedDesc: 'Description Text'},
                        {cell: 13, imageRes: 'img_clue_413', isCompleted: true, lockedDesc: 'Unlock with 1000 points', unlockedDesc: 'Description Text'},
                        {cell: 14, imageRes: 'img_clue_414', isCompleted: true, lockedDesc: 'Unlock with 1000 points', unlockedDesc: 'Description Text'},
                        {cell: 15, imageRes: 'img_clue_415', isCompleted: true, lockedDesc: 'Unlock with 1000 points', unlockedDesc: 'Description Text'},
                        {cell: 16, imageRes: 'img_clue_416', isCompleted: true, lockedDesc: 'Unlock with 1000 points', unlockedDesc: 'Description Text'}
                    ]
                },
                {
                    id: '#5555',
                    reward: {
                        imageRes: 'img_clue_reward01',
                        desc: 'Behind the Scene with Officer K'
                    },
                    data: [
                        {cell: 1, imageRes: 'img_clue_501', isCompleted: true, lockedDesc: 'Unlock with 1000 points', unlockedDesc: 'Description Text'},
                        {cell: 2, imageRes: 'img_clue_502', isCompleted: false, lockedDesc: 'Unlock with 1000 points', unlockedDesc: 'Description Text'},
                        {cell: 3, imageRes: 'img_clue_503', isCompleted: true, lockedDesc: 'Unlock with 1000 points', unlockedDesc: 'Description Text'},
                        {cell: 4, imageRes: 'img_clue_504', isCompleted: false, lockedDesc: 'Unlock with 1000 points', unlockedDesc: 'Description Text'},
                        {cell: 5, imageRes: 'img_clue_505', isCompleted: false, lockedDesc: 'Unlock with 1000 points', unlockedDesc: 'Description Text'},
                        {cell: 6, imageRes: 'img_clue_506', isCompleted: true, lockedDesc: 'Unlock with 1000 points', unlockedDesc: 'Description Text'},
                        {cell: 7, imageRes: 'img_clue_507', isCompleted: false, lockedDesc: 'Unlock with 1000 points', unlockedDesc: 'Description Text'},
                        {cell: 8, imageRes: 'img_clue_508', isCompleted: true, lockedDesc: 'Unlock with 1000 points', unlockedDesc: 'Description Text'},
                        {cell: 9, imageRes: 'img_clue_509', isCompleted: true, lockedDesc: 'Unlock with 1000 points', unlockedDesc: 'Description Text'},
                        {cell: 10, imageRes: 'img_clue_510', isCompleted: false, lockedDesc: 'Unlock with 1000 points', unlockedDesc: 'Description Text'},
                        {cell: 11, imageRes: 'img_clue_511', isCompleted: true, lockedDesc: 'Unlock with 1000 points', unlockedDesc: 'Description Text'},
                        {cell: 12, imageRes: 'img_clue_512', isCompleted: false, lockedDesc: 'Unlock with 1000 points', unlockedDesc: 'Description Text'},
                        {cell: 13, imageRes: 'img_clue_513', isCompleted: false, lockedDesc: 'Unlock with 1000 points', unlockedDesc: 'Description Text'},
                        {cell: 14, imageRes: 'img_clue_514', isCompleted: true, lockedDesc: 'Unlock with 1000 points', unlockedDesc: 'Description Text'},
                        {cell: 15, imageRes: 'img_clue_515', isCompleted: false, lockedDesc: 'Unlock with 1000 points', unlockedDesc: 'Description Text'},
                        {cell: 16, imageRes: 'img_clue_516', isCompleted: true, lockedDesc: 'Unlock with 1000 points', unlockedDesc: 'Description Text'}
                    ]
                },
                {
                    id: '#6666',
                    reward: {
                        imageRes: 'img_clue_reward01',
                        desc: 'Behind the Scene with Officer K'
                    },
                    data: [
                        {cell: 1, imageRes: 'img_clue_601', isCompleted: true, lockedDesc: 'Unlock with 1000 points', unlockedDesc: 'Description Text'},
                        {cell: 2, imageRes: 'img_clue_602', isCompleted: true, lockedDesc: 'Unlock with 1000 points', unlockedDesc: 'Description Text'},
                        {cell: 3, imageRes: 'img_clue_603', isCompleted: true, lockedDesc: 'Unlock with 1000 points', unlockedDesc: 'Description Text'},
                        {cell: 4, imageRes: 'img_clue_604', isCompleted: true, lockedDesc: 'Unlock with 1000 points', unlockedDesc: 'Description Text'},
                        {cell: 5, imageRes: 'img_clue_605', isCompleted: false, lockedDesc: 'Unlock with 1000 points', unlockedDesc: 'Description Text'},
                        {cell: 6, imageRes: 'img_clue_606', isCompleted: false, lockedDesc: 'Unlock with 1000 points', unlockedDesc: 'Description Text'},
                        {cell: 7, imageRes: 'img_clue_607', isCompleted: false, lockedDesc: 'Unlock with 1000 points', unlockedDesc: 'Description Text'},
                        {cell: 8, imageRes: 'img_clue_608', isCompleted: false, lockedDesc: 'Unlock with 1000 points', unlockedDesc: 'Description Text'},
                        {cell: 9, imageRes: 'img_clue_609', isCompleted: true, lockedDesc: 'Unlock with 1000 points', unlockedDesc: 'Description Text'},
                        {cell: 10, imageRes: 'img_clue_610', isCompleted: true, lockedDesc: 'Unlock with 1000 points', unlockedDesc: 'Description Text'},
                        {cell: 11, imageRes: 'img_clue_611', isCompleted: true, lockedDesc: 'Unlock with 1000 points', unlockedDesc: 'Description Text'},
                        {cell: 12, imageRes: 'img_clue_612', isCompleted: true, lockedDesc: 'Unlock with 1000 points', unlockedDesc: 'Description Text'},
                        {cell: 13, imageRes: 'img_clue_613', isCompleted: false, lockedDesc: 'Unlock with 1000 points', unlockedDesc: 'Description Text'},
                        {cell: 14, imageRes: 'img_clue_614', isCompleted: false, lockedDesc: 'Unlock with 1000 points', unlockedDesc: 'Description Text'},
                        {cell: 15, imageRes: 'img_clue_615', isCompleted: false, lockedDesc: 'Unlock with 1000 points', unlockedDesc: 'Description Text'},
                        {cell: 16, imageRes: 'img_clue_616', isCompleted: false, lockedDesc: 'Unlock with 1000 points', unlockedDesc: 'Description Text'}
                    ]
                },
                {
                    id: '#7777',
                    reward: {
                        imageRes: 'img_clue_reward01',
                        desc: 'Behind the Scene with Officer K'
                    },
                    data: [
                        {cell: 1, imageRes: 'img_clue_701', isCompleted: false, lockedDesc: 'Unlock with 1000 points', unlockedDesc: 'Description Text'},
                        {cell: 2, imageRes: 'img_clue_702', isCompleted: false, lockedDesc: 'Unlock with 1000 points', unlockedDesc: 'Description Text'},
                        {cell: 3, imageRes: 'img_clue_703', isCompleted: true, lockedDesc: 'Unlock with 1000 points', unlockedDesc: 'Description Text'},
                        {cell: 4, imageRes: 'img_clue_704', isCompleted: true, lockedDesc: 'Unlock with 1000 points', unlockedDesc: 'Description Text'},
                        {cell: 5, imageRes: 'img_clue_705', isCompleted: true, lockedDesc: 'Unlock with 1000 points', unlockedDesc: 'Description Text'},
                        {cell: 6, imageRes: 'img_clue_706', isCompleted: true, lockedDesc: 'Unlock with 1000 points', unlockedDesc: 'Description Text'},
                        {cell: 7, imageRes: 'img_clue_707', isCompleted: true, lockedDesc: 'Unlock with 1000 points', unlockedDesc: 'Description Text'},
                        {cell: 8, imageRes: 'img_clue_708', isCompleted: false, lockedDesc: 'Unlock with 1000 points', unlockedDesc: 'Description Text'},
                        {cell: 9, imageRes: 'img_clue_709', isCompleted: false, lockedDesc: 'Unlock with 1000 points', unlockedDesc: 'Description Text'},
                        {cell: 10, imageRes: 'img_clue_710', isCompleted: true, lockedDesc: 'Unlock with 1000 points', unlockedDesc: 'Description Text'},
                        {cell: 11, imageRes: 'img_clue_711', isCompleted: true, lockedDesc: 'Unlock with 1000 points', unlockedDesc: 'Description Text'},
                        {cell: 12, imageRes: 'img_clue_712', isCompleted: true, lockedDesc: 'Unlock with 1000 points', unlockedDesc: 'Description Text'},
                        {cell: 13, imageRes: 'img_clue_713', isCompleted: false, lockedDesc: 'Unlock with 1000 points', unlockedDesc: 'Description Text'},
                        {cell: 14, imageRes: 'img_clue_714', isCompleted: false, lockedDesc: 'Unlock with 1000 points', unlockedDesc: 'Description Text'},
                        {cell: 15, imageRes: 'img_clue_715', isCompleted: true, lockedDesc: 'Unlock with 1000 points', unlockedDesc: 'Description Text'},
                        {cell: 16, imageRes: 'img_clue_716', isCompleted: true, lockedDesc: 'Unlock with 1000 points', unlockedDesc: 'Description Text'}
                    ]
                },
                {
                    id: '#8888',
                    reward: {
                        imageRes: 'img_clue_reward01',
                        desc: 'Behind the Scene with Officer K'
                    },
                    data: [
                        {cell: 1, imageRes: 'img_clue_801', isCompleted: true, lockedDesc: 'Unlock with 1000 points', unlockedDesc: 'Description Text'},
                        {cell: 2, imageRes: 'img_clue_802', isCompleted: true, lockedDesc: 'Unlock with 1000 points', unlockedDesc: 'Description Text'},
                        {cell: 3, imageRes: 'img_clue_803', isCompleted: false, lockedDesc: 'Unlock with 1000 points', unlockedDesc: 'Description Text'},
                        {cell: 4, imageRes: 'img_clue_804', isCompleted: false, lockedDesc: 'Unlock with 1000 points', unlockedDesc: 'Description Text'},
                        {cell: 5, imageRes: 'img_clue_805', isCompleted: true, lockedDesc: 'Unlock with 1000 points', unlockedDesc: 'Description Text'},
                        {cell: 6, imageRes: 'img_clue_806', isCompleted: true, lockedDesc: 'Unlock with 1000 points', unlockedDesc: 'Description Text'},
                        {cell: 7, imageRes: 'img_clue_807', isCompleted: false, lockedDesc: 'Unlock with 1000 points', unlockedDesc: 'Description Text'},
                        {cell: 8, imageRes: 'img_clue_808', isCompleted: false, lockedDesc: 'Unlock with 1000 points', unlockedDesc: 'Description Text'},
                        {cell: 9, imageRes: 'img_clue_809', isCompleted: false, lockedDesc: 'Unlock with 1000 points', unlockedDesc: 'Description Text'},
                        {cell: 10, imageRes: 'img_clue_810', isCompleted: true, lockedDesc: 'Unlock with 1000 points', unlockedDesc: 'Description Text'},
                        {cell: 11, imageRes: 'img_clue_811', isCompleted: true, lockedDesc: 'Unlock with 1000 points', unlockedDesc: 'Description Text'},
                        {cell: 12, imageRes: 'img_clue_812', isCompleted: true, lockedDesc: 'Unlock with 1000 points', unlockedDesc: 'Description Text'},
                        {cell: 13, imageRes: 'img_clue_813', isCompleted: false, lockedDesc: 'Unlock with 1000 points', unlockedDesc: 'Description Text'},
                        {cell: 14, imageRes: 'img_clue_814', isCompleted: true, lockedDesc: 'Unlock with 1000 points', unlockedDesc: 'Description Text'},
                        {cell: 15, imageRes: 'img_clue_815', isCompleted: false, lockedDesc: 'Unlock with 1000 points', unlockedDesc: 'Description Text'},
                        {cell: 16, imageRes: 'img_clue_816', isCompleted: true, lockedDesc: 'Unlock with 1000 points', unlockedDesc: 'Description Text'}
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

        function checkNotification()
        {
            var libraryManager = LibraryManager.getInstance();
            var notificationCount = objData.notificationList.length;
            if(objData.notificationList.length > 0)
            {
                var cluesButtonObj = libraryManager.getElement('cluesButtonObj');
                cluesButtonObj.content.showNotification(notificationCount);
            }
        }

        function clearNotification()
        {
            var libraryManager = LibraryManager.getInstance();
            objData.notificationList = new Array();
            var cluesButtonObj = libraryManager.getElement('cluesButtonObj');
            cluesButtonObj.content.hideNotification();
        }

        function showContent()
        {
            var assetLoaderManager = AssetLoaderManager.getInstance();
            var libraryManager = LibraryManager.getInstance();
            var interfaceManager = InterfaceManager.getInstance();

            if(assetLoaderManager && libraryManager)
            {
                var res = assetLoaderManager.getRes();

                var bodyContainer = libraryManager.getElement('bodyContainer');
                bodyContainer.position.y = 45;

                var contentContainer = libraryManager.getElement('contentContainer');
                var bodyBackgroundObj = libraryManager.getElement('bodyBackgroundObj');

                var contentBodyContainer =  libraryManager.createContainer('contentBodyContainer', contentContainer);
                contentBodyContainer.position.y = -(bodyBackgroundObj.height * 0.5);

                var rowPos = 0, rowHeight = 0, totalHeight = 0, rowSpacing = 20, colPos = 0;

                var bgIdx = 1;
                var maxCol = 3;

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
                        rowPos = rowPos + rowHeight + rowSpacing;
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
                    cluesBG.content.width = cluesBG.width;
                    cluesBG.content.height = cluesBG.height;
                    cluesBG.scale.set(1.35);

                    rowHeight = cluesBG.height;
                    totalHeight = (i % maxCol == 0) ? totalHeight + rowHeight + rowSpacing : totalHeight;

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

                        cluesItem.data[gridIdx].clueCell = cluesCellBg;
                    }

                    var caseFileLabel = libraryManager.createText('caseFileLabel', cluesContentContainer, 0, new PIXI.TextStyle({
                        fontFamily: 'Arial',
                        fontSize: 16,
                        fontStyle: 'normal',
                        fontWeight: 'bold',
                        fill: '#333333'
                    }));
                    caseFileLabel.text = 'Case File: ';
                    caseFileLabel.anchor.x = 0;
                    caseFileLabel.position.x = -(cluesBG.content.width * 0.5) + 5;
                    caseFileLabel.position.y = 65;

                    var caseFileValue = libraryManager.createText('caseFileValue', cluesContentContainer, 0, new PIXI.TextStyle({
                        fontFamily: 'Arial',
                        fontSize: 16,
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
                        fontSize: 16,
                        fontStyle: 'normal',
                        fontWeight: 'bold',
                        fill: '#333333'
                    }));
                    caseFileProgress.text = cellCompleted + '/' + maxGrid;
                    caseFileProgress.anchor.x = 1;
                    caseFileProgress.anchor.y = 1;
                    caseFileProgress.position.x = (cluesBG.content.width * 0.5) - 5;
                    caseFileProgress.position.y = (cluesBG.content.height * 0.5) - 5;

                    if(isCaseCompleted)
                    {
                        var caseFileStatus = libraryManager.createText('caseFileStatus', cluesContentContainer, 0, new PIXI.TextStyle({
                            fontFamily: 'Arial',
                            fontSize: 16,
                            fontStyle: 'normal',
                            fontWeight: 'bold',
                            fill: '#7d4046'
                        }));
                        caseFileStatus.text = 'Solved';
                        caseFileStatus.anchor.x = 0;
                        caseFileStatus.anchor.y = 1;
                        caseFileStatus.position.x = -(cluesBG.content.width * 0.5) + 5;
                        caseFileStatus.position.y = (cluesBG.content.height * 0.5) - 5;
                    }

                    var newPieceList = libraryManager.getElementsFromList(objData.notificationList, 'id', cluesItem.id);
                    if(newPieceList.length > 0)
                    {
                        for(var idx = 0; idx < newPieceList.length; idx++)
                        {
                            var clueCase = libraryManager.getElementFromList(objData.cluesList, 'id', newPieceList[idx].id);
                            if(!clueCase) break;

                            var clueItem = libraryManager.getElementFromList(clueCase.data, 'cell', newPieceList[idx].cell);
                            if(!clueItem) break;

                            var clueIconHighlight = libraryManager.createImage('clueIconHighlight', cluesCellContainer, res['img_clue_highlight'].texture);
                            clueIconHighlight.position = clueItem.clueCell.position;
                            clueIconHighlight.scale = clueItem.clueCell.scale;
                            TweenMax.fromTo(clueIconHighlight, 0.75, {alpha: 0.5}, {alpha: 1, ease: Quad.easeOut, repeat: -1, yoyo: true});
                        }


                        var cluesNewPieceContainer =  libraryManager.createContainer('cluesNewPieceContainer', cluesContentContainer);
                        TweenMax.fromTo(cluesNewPieceContainer, 0.75, {alpha: 0}, {alpha: 1, ease: Quad.easeOut, repeat: -1, yoyo: true});

                        var cluesNewPiece = libraryManager.createImage('cluesNewPiece', cluesNewPieceContainer, res['img_white'].texture);
                        cluesNewPiece.tint = 0xdd2525;
                        cluesNewPiece.width = 100;
                        cluesNewPiece.height = 25;


                        var cluesNewPieceText = libraryManager.createText('cluesNewPieceText', cluesNewPieceContainer, 0, new PIXI.TextStyle({
                            fontFamily: 'Arial',
                            fontSize: 18,
                            fontStyle: 'normal',
                            fill: '#ffffff'
                        }));
                        cluesNewPieceText.text = 'New Piece';

                        cluesNewPieceContainer.position.x = -(cluesBG.content.width * 0.5) + (cluesNewPiece.width * 0.5);
                        cluesNewPieceContainer.position.y = (cluesBG.content.height * 0.5) - (cluesNewPiece.height * 0.5) - 5;
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

                totalHeight += 80;

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
                        tl.add(clearNotification, "+=0.5");
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

                cluesCellGridContainer.position.x = -(popupBG.width * 0.5) + (cluesGrid.width * 0.5) + 20;
                cluesCellGridContainer.position.y = -(popupBG.height * 0.5) + (cluesGrid.height * 0.5) + 20;

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
                    fontSize: 24,
                    fontStyle: 'normal',
                    fill: '#808080'
                }));
                caseFileLabel.text = 'Case File: ';
                caseFileLabel.anchor.x = 0;
                caseFileLabel.anchor.y = 0;
                caseFileLabel.position.x = cluesCellGridContainer.position.x + (cluesGrid.width * 0.5) + 10;
                caseFileLabel.position.y = -(popupBG.height * 0.5) + 20;

                var caseFileValue = libraryManager.createText('caseFileValue', popupBG, 0, new PIXI.TextStyle({
                    fontFamily: 'Arial',
                    fontSize: 24,
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
                    fontSize: 24,
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
                        fontSize: 24,
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
                    fontSize: 24,
                    fontStyle: 'normal',
                    fill: '#808080',
                    wordWrapWidth: 350,
                    wordWrap : true
                }));
                caseFileDesc.text = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce vel enim nec arcu tristique convallis quis at urna. Donec tellus ipsum, porttitor id ultrices eu, aliquet in risus.';
                caseFileDesc.anchor.x = 0;
                caseFileDesc.anchor.y = 0;
                caseFileDesc.position.x = caseFileLabel.position.x;
                caseFileDesc.position.y = caseFileLabel.position.y + caseFileLabel.height + 80;

                if(item.reward)
                {
                    var cluesRewardBG = libraryManager.createImage('cluesRewardBG', popupBG, res[item.reward.imageRes].texture);
                    cluesRewardBG.position.y = cluesCellGridContainer.position.y + (cluesGrid.height * 0.5) + (cluesRewardBG.height * 0.5) + 15;

                    if(!isCaseCompleted)
                    {
                        libraryManager.setDesaturate(cluesRewardBG, true);
                    }

                    var cluesRewardTitle = libraryManager.createText('cluesRewardTitle', cluesRewardBG, 0, new PIXI.TextStyle({
                        fontFamily: 'Arial',
                        fontSize: 20,
                        fontStyle: 'normal',
                        fill: '#ffffff'
                    }));
                    cluesRewardTitle.text = 'Completion Reward';
                    cluesRewardTitle.anchor.x = 0;
                    cluesRewardTitle.position.x = -(cluesRewardBG.width * 0.5) + 10;

                    var cluesRewardDesc = libraryManager.createText('cluesRewardDesc', cluesRewardBG, 0, new PIXI.TextStyle({
                        fontFamily: 'Arial',
                        fontSize: 20,
                        fontStyle: 'normal',
                        fill: '#808080'
                    }));
                    cluesRewardDesc.text = item.reward.desc;
                    cluesRewardDesc.anchor.x = 0;
                    cluesRewardDesc.position.x = cluesRewardTitle.position.x;
                    cluesRewardDesc.position.y = cluesRewardTitle.position.y + (cluesRewardTitle.height * 0.5) + (cluesRewardDesc.height * 0.5) + 2;

                    var pageNav = {currentPage: 1, maxPage: 3};

                    var btn_arrow_left_texture = res['btn_arrow_left'].texture;
                    var btn_arrow_right_texture = res['btn_arrow_right'].texture;
                    var img_navigation_dot_texture = res['img_navigation_dot'].texture;
                    var btn_arrow_left_highlight_texture = res['btn_arrow_left_highlight'].texture;
                    var btn_arrow_right_highlight_texture = res['btn_arrow_right_highlight'].texture;
                    var img_navigation_dot_highlight_texture = res['img_navigation_dot_highlight'].texture;


                    var cluesNavLeftButton = libraryManager.createImage('cluesNavRightButton', popupBG, btn_arrow_left_texture);
                    cluesNavLeftButton.buttonMode = true;
                    cluesNavLeftButton.interactive = true;
                    cluesNavLeftButton.position.x = -(popupBG.width * 0.5) + (cluesNavLeftButton.width * 0.5) + 20;
                    cluesNavLeftButton.position.y = (popupBG.height * 0.5) - (cluesNavLeftButton.height * 0.5) - 20;
                    cluesNavLeftButton.on('pointertap', (function() {
                        this.currentPage = this.currentPage > 1 ? this.currentPage - 1 : 1;
                        showClueItems(this.currentPage);
                    }).bind(pageNav));

                    var cluesNavRightButton = libraryManager.createImage('cluesNavRightButton', popupBG, btn_arrow_right_texture);
                    cluesNavRightButton.buttonMode = true;
                    cluesNavRightButton.interactive = true;
                    cluesNavRightButton.position.x = (popupBG.width * 0.5) - (cluesNavRightButton.width * 0.5) - 20;
                    cluesNavRightButton.position.y = (popupBG.height * 0.5) - (cluesNavRightButton.height * 0.5) - 20;
                    cluesNavRightButton.on('pointertap', (function() {
                        this.currentPage = this.currentPage < this.maxPage ? this.currentPage + 1 : this.maxPage;
                        showClueItems(this.currentPage);
                    }).bind(pageNav));

                    pageNav.dot = new Array();
                    var dotPosX = 0;
                    var cluesNavDotContainer = libraryManager.createContainer('cluesNavDotContainer', popupBG);
                    for(var i = 0; i < 3; i++)
                    {

                        if(i > 0)
                        {
                            dotPosX += cluesNavDot.width + 10;
                        }

                        var cluesNavDot = libraryManager.createImage('cluesNavDot', cluesNavDotContainer, img_navigation_dot_texture);
                        cluesNavDot.position.x = dotPosX;
                        cluesNavDot.position.y = (popupBG.height * 0.5) - (cluesNavDot.height * 0.5) - 20;

                        pageNav.dot.push(cluesNavDot);

                    }
                    cluesNavDotContainer.position.x = -(dotPosX * 0.5);

                    function checkNavIndicator()
                    {
                        for(var i = 0; i < pageNav.dot.length; i++)
                        {
                            pageNav.dot[i].texture = img_navigation_dot_texture;
                        }

                        cluesNavLeftButton.tint = 0xffffff;
                        cluesNavRightButton.tint = 0xffffff;
                        cluesNavLeftButton.texture = btn_arrow_left_highlight_texture;
                        cluesNavRightButton.texture = btn_arrow_right_highlight_texture;

                        pageNav.dot[pageNav.currentPage - 1].texture = img_navigation_dot_highlight_texture;

                        if(pageNav.currentPage == 1)
                        {
                            cluesNavLeftButton.tint = 0x000000;
                            cluesNavLeftButton.texture = btn_arrow_left_texture;
                        }

                        if(pageNav.currentPage == pageNav.maxPage)
                        {
                            cluesNavRightButton.tint = 0x000000;
                            cluesNavRightButton.texture = btn_arrow_right_texture;
                        }
                    }

                    showClueItems(pageNav.currentPage);

                    var cluesCellItemNavContainer;

                    function showClueItems(page)
                    {
                        checkNavIndicator();

                        cluesCellItemNavContainer = libraryManager.getElement('cluesCellItemNavContainer');
                        if(cluesCellItemNavContainer)
                        {
                            popupBG.removeChild(cluesCellItemNavContainer);
                        }

                        cluesCellItemNavContainer = libraryManager.createContainer('cluesCellItemNavContainer', popupBG);

                        var rowPos = 0, cluesCellPosY = 0, cluesCellPosX = 0;

                        var startIdx = (page - 1) * 6;
                        var endIdx = page * 6;

                        endIdx = endIdx > item.data.length ? item.data.length : endIdx;

                        for(var i = startIdx; i < endIdx; i++)
                        {
                            var cluesCellItemContainer =  libraryManager.createContainer('cluesCellItemContainer', cluesCellItemNavContainer);
                            if(item.data[i].isCompleted)
                            {
                                var cluesCellItemNameBG = libraryManager.createImage('cluesCellItemNameBG', cluesCellItemContainer, res['img_white'].texture);
                                cluesCellItemNameBG.tint = 0x111111;
                                cluesCellItemNameBG.height = 35;
                                cluesCellItemNameBG.width = 65;

                                cluesCellPosX = i % 2 == 0 ? -(popupBG.width * 0.5) + (cluesCellItemNameBG.width * 0.5) + 20 : (cluesCellItemNameBG.width * 0.5) + 5;
                                cluesCellPosY = cluesRewardBG.position.y + (cluesRewardBG.height * 0.5) + 15 + (rowPos * (cluesCellItemNameBG.height + 10));
                                cluesCellItemNameBG.position.x = cluesCellPosX;
                                cluesCellItemNameBG.position.y = cluesCellPosY + (cluesCellItemNameBG.height * 0.5);

                                var cluesCellItemDescBG = libraryManager.createImage('cluesCellItemDescBG', cluesCellItemContainer, res['img_white'].texture);
                                cluesCellItemDescBG.tint = 0x000000;
                                cluesCellItemDescBG.height = 35;
                                cluesCellItemDescBG.width = 255;
                                cluesCellItemDescBG.position.x = cluesCellItemNameBG.position.x + (cluesCellItemNameBG.width * 0.5) + (cluesCellItemDescBG.width * 0.5);
                                cluesCellItemDescBG.position.y = cluesCellItemNameBG.position.y;

                                var cluesCellItemName = libraryManager.createText('cluesCellItemName', cluesCellItemContainer, 0, new PIXI.TextStyle({
                                    fontFamily: 'Arial',
                                    fontSize: 16,
                                    fontStyle: 'normal',
                                    fill: '#808080'
                                }));
                                cluesCellItemName.text = 'Clue ' + item.data[i].cell;
                                cluesCellItemName.position = cluesCellItemNameBG.position;

                                var cluesCellItemDesc = libraryManager.createText('cluesCellItemDesc', cluesCellItemContainer, 0, new PIXI.TextStyle({
                                    fontFamily: 'Arial',
                                    fontSize: 16,
                                    fontStyle: 'normal',
                                    fill: '#808080'
                                }));
                                cluesCellItemDesc.text = item.data[i].unlockedDesc;
                                cluesCellItemDesc.position.x = cluesCellItemDescBG.position.x - (cluesCellItemDescBG.width * 0.5) + (cluesCellItemDesc.width * 0.5) + 10;
                                cluesCellItemDesc.position.y = cluesCellItemDescBG.position.y;
                            }
                            else
                            {
                                var cluesCellItemLockedBG = libraryManager.createImage('cluesCellItemLockedBG', cluesCellItemContainer, res['img_white'].texture);
                                cluesCellItemLockedBG.tint = 0x303030;
                                cluesCellItemLockedBG.height = 35;
                                cluesCellItemLockedBG.width = 320;

                                cluesCellPosX = i % 2 == 0 ? -(popupBG.width * 0.5) + (cluesCellItemLockedBG.width * 0.5) + 20 : (cluesCellItemLockedBG.width * 0.5) + 5;
                                cluesCellPosY = cluesRewardBG.position.y + (cluesRewardBG.height * 0.5) + 15 + (rowPos * (cluesCellItemLockedBG.height + 10));
                                cluesCellItemLockedBG.position.x = cluesCellPosX;
                                cluesCellItemLockedBG.position.y = cluesCellPosY + (cluesCellItemLockedBG.height * 0.5);

                                var cluesCellItemLockedIcon = libraryManager.createImage('cluesCellItemLockedIcon', cluesCellItemContainer, res['icon_lock'].texture);
                                cluesCellItemLockedIcon.scale.set(0.2);
                                cluesCellItemLockedIcon.position.y = cluesCellItemLockedBG.position.y;

                                var cluesCellItemLockedDesc = libraryManager.createText('cluesCellItemLockedDesc', cluesCellItemContainer, 0, new PIXI.TextStyle({
                                    fontFamily: 'Arial',
                                    fontSize: 16,
                                    fontStyle: 'normal',
                                    fill: '#808080'
                                }));
                                cluesCellItemLockedDesc.text = item.data[i].lockedDesc;
                                cluesCellItemLockedDesc.position.y = cluesCellItemLockedBG.position.y;

                                var totalWidth = cluesCellItemLockedIcon.width + cluesCellItemLockedDesc.width + 10;
                                cluesCellItemLockedIcon.position.x = cluesCellItemLockedBG.position.x - (totalWidth * 0.5);
                                cluesCellItemLockedDesc.position.x = cluesCellItemLockedIcon.position.x + (cluesCellItemLockedIcon.width * 0.5) + (cluesCellItemLockedDesc.width * 0.5) + 10;
                            }


                            rowPos = i % 2 == 1 ? rowPos + 1: rowPos;
                        }
                    }



                }



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
            loadContent: loadContent,
            checkNotification: checkNotification
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
