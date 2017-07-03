"use strict";
var QuestManager = (function () {
    
    // Instance stores a reference to the Singleton
    var instance;

    function init() {

        // Singleton Init
        var jsonString = "{\"AH0AX89DCC\":{\"quest_id\":\"toyconuk2017\",\"order\":\"1\",\"type\":\"item\",\"card_thumbnail_url\":\"https://s3-us-west-1.amazonaws.com/assets-collector-powercore-io/lgMedallion-01-GiantTcon.png\",\"thumbnail_url\":\"https://s3-us-west-1.amazonaws.com/assets-collector-powercore-io/smMedallion-01-Tcon.png\",\"card_clue_background_url\":\"https://s3-us-west-1.amazonaws.com/assets-collector-powercore-io/bg-clue.png\",\"card_activated_background_url\":\"https://s3-us-west-1.amazonaws.com/assets-collector-powercore-io/bg-activated.png\",\"title\":\"Toyconosaurus\",\"description\":\"\u201CT-con\u201D was born as the ToyCon UK mascot. The vinyl toy version is made by UNBOX and debuted in 2013 and this  \u201Clife-size\u201D version made its debut at ToyCon UK 2016.\",\"clue_title\":\"Clue Number One\",\"clue\":\"This little Kaiju made his debut at the very first ToyCon UK and  can be spotted at many places around the show but you must find the biggest one in the room!\",\"tag\":\"ToyCon UK 2017 - Quest - 01 - Giant T-Con\",\"sku\":\"toyconuk2017quest_giant_tcon\"},\"KKWABR9DCC\":{\"quest_id\":\"toyconuk2017\",\"order\":\"2\",\"type\":\"item\",\"card_thumbnail_url\":\"https://s3-us-west-1.amazonaws.com/assets-collector-powercore-io/lgMedallion-02-CaptainSturnham.png\",\"thumbnail_url\":\"https://s3-us-west-1.amazonaws.com/assets-collector-powercore-io/smMedallion-02-CaptainSturnham.png\",\"card_clue_background_url\":\"https://s3-us-west-1.amazonaws.com/assets-collector-powercore-io/bg-clue.png\",\"card_activated_background_url\":\"https://s3-us-west-1.amazonaws.com/assets-collector-powercore-io/bg-activated.png\",\"title\":\"Captain Sturnbrau\",\"description\":\"Captain Sturnbrau was one of ToyCon regular Jon Paul Kaiser's first toys and lives on in his logo!\",\"clue_title\":\"Clue Number Two\",\"clue\":\"\u201CShiver me timbers!\u201D Seek out the reknowned U.K. artist who is famous for his monochromatic custom paints.\",\"tag\":\"ToyCon UK 2017 - Quest - 02 - Jon Paul Kaiser\",\"sku\":\"toyconuk2017quest_jon_paul_kaiser\"},\"PZXYNQ9DDJ\":{\"quest_id\":\"toyconuk2017\",\"order\":\"3\",\"type\":\"item\",\"card_thumbnail_url\":\"https://s3-us-west-1.amazonaws.com/assets-collector-powercore-io/lgMedallion-03-Baldwin.png\",\"thumbnail_url\":\"https://s3-us-west-1.amazonaws.com/assets-collector-powercore-io/smMedallion-03-Baldwin.png\",\"card_clue_background_url\":\"https://s3-us-west-1.amazonaws.com/assets-collector-powercore-io/bg-clue.png\",\"card_activated_background_url\":\"https://s3-us-west-1.amazonaws.com/assets-collector-powercore-io/bg-activated.png\",\"title\":\"Baldwin\",\"description\":\"Baldwin is one of the many popular characters from Dolly Oblong. Dolly has been a regular exhibitor at ToyCon from her native Holland.\",\"clue_title\":\"Clue Number Three\",\"clue\":\"To find this medallion hunt for this plucky long-eared character who is a regular visitor to ToyCon from Holland.\",\"tag\":\"ToyCon UK 2017 - Quest - 03 - Dolly Oblong\",\"sku\":\"toyconuk2017quest_dolly_oblong\"},\"VFVK0S9DB6\":{\"quest_id\":\"toyconuk2017\",\"order\":\"4\",\"type\":\"item\",\"card_thumbnail_url\":\"https://s3-us-west-1.amazonaws.com/assets-collector-powercore-io/lgMedallion-04-Mechatorians.png\",\"thumbnail_url\":\"https://s3-us-west-1.amazonaws.com/assets-collector-powercore-io/smMedallion-04-Mechatorians.png\",\"card_clue_background_url\":\"https://s3-us-west-1.amazonaws.com/assets-collector-powercore-io/bg-clue.png\",\"card_activated_background_url\":\"https://s3-us-west-1.amazonaws.com/assets-collector-powercore-io/bg-activated.png\",\"title\":\"Mechatorians\",\"description\":\"Doktor A and his amazing Mechtorians have been a constant fixture at ToyCon since its inception.\",\"clue_title\":\"Clue Number Four\",\"clue\":\"Take a trip to Retropolis,  a society of retrobotic characters from all walks of life to find this medallion.\",\"tag\":\"ToyCon UK 2017 - Quest - 04 - Doktor A\",\"sku\":\"toyconuk2017quest_doktor_a\"},\"X6NW649DCA\":{\"quest_id\":\"toyconuk2017\",\"order\":\"5\",\"type\":\"item\",\"card_thumbnail_url\":\"https://s3-us-west-1.amazonaws.com/assets-collector-powercore-io/lgMedallion-05-MechatroWeGo.png\",\"thumbnail_url\":\"https://s3-us-west-1.amazonaws.com/assets-collector-powercore-io/smMedallion-05-MechatroWeGo.png\",\"card_clue_background_url\":\"https://s3-us-west-1.amazonaws.com/assets-collector-powercore-io/bg-clue.png\",\"card_activated_background_url\":\"https://s3-us-west-1.amazonaws.com/assets-collector-powercore-io/bg-activated.png\",\"title\":\"WeGo Custom Show\",\"description\":\"The Mechatro WeGo was created by Kazushi Kobayashi. The Mechatro WeGo Global Custom Show makes its first stop of 2017 at ToyCon UK.\",\"clue_title\":\"Clue Number Five\",\"clue\":\"Customs shows are big part of the Designer Toy scene and this cute robot from Japan gets the royal treatment. Check out the show!\",\"tag\":\"ToyCon UK 2017 - Quest - 05 - WeGo Custom Show\",\"sku\":\"toyconuk2017quest_wego_custom_show\"},\"R58Z949DD1\":{\"quest_id\":\"toyconuk2017\",\"order\":\"6\",\"type\":\"item\",\"card_thumbnail_url\":\"https://s3-us-west-1.amazonaws.com/assets-collector-powercore-io/lgMedallion-06-TheBar.png\",\"thumbnail_url\":\"https://s3-us-west-1.amazonaws.com/assets-collector-powercore-io/smMedallion-06-TheBar.png\",\"card_clue_background_url\":\"https://s3-us-west-1.amazonaws.com/assets-collector-powercore-io/bg-clue.png\",\"card_activated_background_url\":\"https://s3-us-west-1.amazonaws.com/assets-collector-powercore-io/bg-activated.png\",\"title\":\"The Bar\",\"description\":\"Feeling refreshed? Make sure you check the schedule of interesting panels and live painting sessions happening all weekend.\",\"clue_title\":\"Clue Number Six\",\"clue\":\"After a hard day of chasing toys we all need some refreshment. Hint: this is also where the talk show & live painting sessions happen.\",\"tag\":\"ToyCon UK 2017 - Quest - 06 - Talk Show Session\",\"sku\":\"toyconuk2017quest_talk_show_session\"},\"YGVDD19DDB\":{\"quest_id\":\"toyconuk2017\",\"order\":\"7\",\"type\":\"item\",\"card_thumbnail_url\":\"https://s3-us-west-1.amazonaws.com/assets-collector-powercore-io/lgMedallion-07-KoreKore.png\",\"thumbnail_url\":\"https://s3-us-west-1.amazonaws.com/assets-collector-powercore-io/smMedallion-07-KoreKore.png\",\"card_clue_background_url\":\"https://s3-us-west-1.amazonaws.com/assets-collector-powercore-io/bg-clue.png\",\"card_activated_background_url\":\"https://s3-us-west-1.amazonaws.com/assets-collector-powercore-io/bg-activated.png\",\"title\":\"Ben Hart (Kore Kore)\",\"description\":\"Ben has been one the key folks behind ToyCon UK since it started in 2013. He and Blair run Kore Kore an online retail shop that features the best designer toys coming out of Asia.\",\"clue_title\":\"Clue Number Seven\",\"clue\":\"To find this medallion you must find the man behind ToyCon UK. He may be on the move or at the booth for his online retail shop known for Asian vinyl.\",\"tag\":\"ToyCon UK 2017 - Quest - 07 - Ben Hart (Kore Kore)\",\"sku\":\"toyconuk2017quest_ben_hart_kore_kore\"},\"2HZK7Z9DE0\":{\"quest_id\":\"toyconuk2017\",\"order\":\"8\",\"type\":\"item\",\"card_thumbnail_url\":\"https://s3-us-west-1.amazonaws.com/assets-collector-powercore-io/lgMedallion-08-ToyChronicle.png\",\"thumbnail_url\":\"https://s3-us-west-1.amazonaws.com/assets-collector-powercore-io/smMedallion-08-ToyChronicle.png\",\"card_clue_background_url\":\"https://s3-us-west-1.amazonaws.com/assets-collector-powercore-io/bg-clue.png\",\"card_activated_background_url\":\"https://s3-us-west-1.amazonaws.com/assets-collector-powercore-io/bg-activated.png\",\"title\":\"Toy Chronicle\",\"description\":\"This award-winning newsite is the Number One UK Vinyl Designer Toy Blog. Bet you already knew that!\",\"clue_title\":\"Clue Number Eight\",\"clue\":\"The Designer Toy scene has a deep hunger to be in the know about the latest and greatest releases. These guys go above and beyond to keep us all abreast of the newest news.\",\"tag\":\"ToyCon UK 2017 - Quest - 08 - Toy Chronicle\",\"sku\":\"toyconuk2017quest_toy_chronicle\"},\"EMSRM89DE9\":{\"quest_id\":\"toyconuk2017\",\"order\":\"9\",\"type\":\"item\",\"card_thumbnail_url\":\"https://s3-us-west-1.amazonaws.com/assets-collector-powercore-io/lgMedallion-09-Wananeko.png\",\"thumbnail_url\":\"https://s3-us-west-1.amazonaws.com/assets-collector-powercore-io/smMedallion-09-Wananeko.png\",\"card_clue_background_url\":\"https://s3-us-west-1.amazonaws.com/assets-collector-powercore-io/bg-clue.png\",\"card_activated_background_url\":\"https://s3-us-west-1.amazonaws.com/assets-collector-powercore-io/bg-activated.png\",\"title\":\"Wananeko\",\"description\":\"Wananeko - created by Javier Jimenez -  is a Yokai Cat that takes vengeance by shape-shifting into a basket of meowing kittens on porches of the unsuspecting!\",\"clue_title\":\"Clue Number Nine\",\"clue\":\"Scared of ghosts? Seek out this spooky cat by a Spanish Artist if you dare!\",\"tag\":\"ToyCon UK 2017 - Quest - 09 - PowerCore\",\"sku\":\"toyconuk2017quest_powercore\"},\"T2T0H99DEB\":{\"quest_id\":\"toyconuk2017\",\"order\":\"10\",\"type\":\"prize\",\"card_thumbnail_url\":\"https://s3-us-west-1.amazonaws.com/assets-collector-powercore-io/lgMedallion-01-GiantTcon.png\",\"thumbnail_url\":\"https://s3-us-west-1.amazonaws.com/assets-collector-powercore-io/smMedallion-01-Tcon.png\",\"card_clue_background_url\":\"https://s3-us-west-1.amazonaws.com/assets-collector-powercore-io/bg-clue.png\",\"card_activated_background_url\":\"https://s3-us-west-1.amazonaws.com/assets-collector-powercore-io/bg-activated.png\",\"title\":\"Quest Finished\",\"description\":\"Quest Finished description\",\"clue_title\":\"Quest Not Finished\",\"clue\":\"Please finish the quest then visit the PowerCore Booth\",\"tag\":\"ToyCon UK 2017 - Quest - 10 - Quest Finished\",\"sku\":\"toyconuk2017quest_finished\"},\"AAAAAAAAAA\":{\"quest_id\":\"sdcc2017\",\"order\":\"1\",\"type\":\"item\",\"card_thumbnail_url\":\"https://s3-us-west-1.amazonaws.com/assets-collector-powercore-io/lgMedallion-01-GiantTcon.png\",\"thumbnail_url\":\"https://s3-us-west-1.amazonaws.com/assets-collector-powercore-io/smMedallion-01-Tcon.png\",\"card_clue_background_url\":\"https://s3-us-west-1.amazonaws.com/assets-collector-powercore-io/bg-clue.png\",\"card_activated_background_url\":\"https://s3-us-west-1.amazonaws.com/assets-collector-powercore-io/bg-activated.png\",\"title\":\"Toyconosaurus\",\"description\":\"\u201CT-con\u201D was born as the ToyCon UK mascot. The vinyl toy version is made by UNBOX and debuted in 2013 and this  \u201Clife-size\u201D version made its debut at ToyCon UK 2016.\",\"clue_title\":\"Clue Number One\",\"clue\":\"This little Kaiju made his debut at the very first ToyCon UK and  can be spotted at many places around the show but you must find the biggest one in the room!\",\"tag\":\"ToyCon UK 2017 - Quest - 01 - Giant T-Con\",\"sku\":\"sdcc2017quest_giant_tcon\"},\"BBBBBBBBBB\":{\"quest_id\":\"sdcc2017\",\"order\":\"2\",\"type\":\"item\",\"card_thumbnail_url\":\"https://s3-us-west-1.amazonaws.com/assets-collector-powercore-io/lgMedallion-02-CaptainSturnham.png\",\"thumbnail_url\":\"https://s3-us-west-1.amazonaws.com/assets-collector-powercore-io/smMedallion-02-CaptainSturnham.png\",\"card_clue_background_url\":\"https://s3-us-west-1.amazonaws.com/assets-collector-powercore-io/bg-clue.png\",\"card_activated_background_url\":\"https://s3-us-west-1.amazonaws.com/assets-collector-powercore-io/bg-activated.png\",\"title\":\"Captain Sturnbrau\",\"description\":\"Captain Sturnbrau was one of ToyCon regular Jon Paul Kaiser's first toys and lives on in his logo!\",\"clue_title\":\"Clue Number Two\",\"clue\":\"\u201CShiver me timbers!\u201D Seek out the reknowned U.K. artist who is famous for his monochromatic custom paints.\",\"tag\":\"ToyCon UK 2017 - Quest - 02 - Jon Paul Kaiser\",\"sku\":\"sdcc2017quest_jon_paul_kaiser\"},\"CCCCCCCCCC\":{\"quest_id\":\"sdcc2017\",\"order\":\"3\",\"type\":\"item\",\"card_thumbnail_url\":\"https://s3-us-west-1.amazonaws.com/assets-collector-powercore-io/lgMedallion-03-Baldwin.png\",\"thumbnail_url\":\"https://s3-us-west-1.amazonaws.com/assets-collector-powercore-io/smMedallion-03-Baldwin.png\",\"card_clue_background_url\":\"https://s3-us-west-1.amazonaws.com/assets-collector-powercore-io/bg-clue.png\",\"card_activated_background_url\":\"https://s3-us-west-1.amazonaws.com/assets-collector-powercore-io/bg-activated.png\",\"title\":\"Baldwin\",\"description\":\"Baldwin is one of the many popular characters from Dolly Oblong. Dolly has been a regular exhibitor at ToyCon from her native Holland.\",\"clue_title\":\"Clue Number Three\",\"clue\":\"To find this medallion hunt for this plucky long-eared character who is a regular visitor to ToyCon from Holland.\",\"tag\":\"ToyCon UK 2017 - Quest - 03 - Dolly Oblong\",\"sku\":\"sdcc2017quest_dolly_oblong\"},\"DDDDDDDDDD\":{\"quest_id\":\"sdcc2017\",\"order\":\"4\",\"type\":\"item\",\"card_thumbnail_url\":\"https://s3-us-west-1.amazonaws.com/assets-collector-powercore-io/lgMedallion-04-Mechatorians.png\",\"thumbnail_url\":\"https://s3-us-west-1.amazonaws.com/assets-collector-powercore-io/smMedallion-04-Mechatorians.png\",\"card_clue_background_url\":\"https://s3-us-west-1.amazonaws.com/assets-collector-powercore-io/bg-clue.png\",\"card_activated_background_url\":\"https://s3-us-west-1.amazonaws.com/assets-collector-powercore-io/bg-activated.png\",\"title\":\"Mechatorians\",\"description\":\"Doktor A and his amazing Mechtorians have been a constant fixture at ToyCon since its inception.\",\"clue_title\":\"Clue Number Four\",\"clue\":\"Take a trip to Retropolis,  a society of retrobotic characters from all walks of life to find this medallion.\",\"tag\":\"ToyCon UK 2017 - Quest - 04 - Doktor A\",\"sku\":\"sdcc2017quest_doktor_a\"},\"EEEEEEEEEE\":{\"quest_id\":\"sdcc2017\",\"order\":\"5\",\"type\":\"item\",\"card_thumbnail_url\":\"https://s3-us-west-1.amazonaws.com/assets-collector-powercore-io/lgMedallion-05-MechatroWeGo.png\",\"thumbnail_url\":\"https://s3-us-west-1.amazonaws.com/assets-collector-powercore-io/smMedallion-05-MechatroWeGo.png\",\"card_clue_background_url\":\"https://s3-us-west-1.amazonaws.com/assets-collector-powercore-io/bg-clue.png\",\"card_activated_background_url\":\"https://s3-us-west-1.amazonaws.com/assets-collector-powercore-io/bg-activated.png\",\"title\":\"WeGo Custom Show\",\"description\":\"The Mechatro WeGo was created by Kazushi Kobayashi. The Mechatro WeGo Global Custom Show makes its first stop of 2017 at ToyCon UK.\",\"clue_title\":\"Clue Number Five\",\"clue\":\"Customs shows are big part of the Designer Toy scene and this cute robot from Japan gets the royal treatment. Check out the show!\",\"tag\":\"ToyCon UK 2017 - Quest - 05 - WeGo Custom Show\",\"sku\":\"sdcc2017quest_wego_custom_show\"},\"FFFFFFFFFF\":{\"quest_id\":\"sdcc2017\",\"order\":\"6\",\"type\":\"item\",\"card_thumbnail_url\":\"https://s3-us-west-1.amazonaws.com/assets-collector-powercore-io/lgMedallion-06-TheBar.png\",\"thumbnail_url\":\"https://s3-us-west-1.amazonaws.com/assets-collector-powercore-io/smMedallion-06-TheBar.png\",\"card_clue_background_url\":\"https://s3-us-west-1.amazonaws.com/assets-collector-powercore-io/bg-clue.png\",\"card_activated_background_url\":\"https://s3-us-west-1.amazonaws.com/assets-collector-powercore-io/bg-activated.png\",\"title\":\"The Bar\",\"description\":\"Feeling refreshed? Make sure you check the schedule of interesting panels and live painting sessions happening all weekend.\",\"clue_title\":\"Clue Number Six\",\"clue\":\"After a hard day of chasing toys we all need some refreshment. Hint: this is also where the talk show & live painting sessions happen.\",\"tag\":\"ToyCon UK 2017 - Quest - 06 - Talk Show Session\",\"sku\":\"sdcc2017quest_talk_show_session\"},\"GGGGGGGGGG\":{\"quest_id\":\"sdcc2017\",\"order\":\"7\",\"type\":\"item\",\"card_thumbnail_url\":\"https://s3-us-west-1.amazonaws.com/assets-collector-powercore-io/lgMedallion-07-KoreKore.png\",\"thumbnail_url\":\"https://s3-us-west-1.amazonaws.com/assets-collector-powercore-io/smMedallion-07-KoreKore.png\",\"card_clue_background_url\":\"https://s3-us-west-1.amazonaws.com/assets-collector-powercore-io/bg-clue.png\",\"card_activated_background_url\":\"https://s3-us-west-1.amazonaws.com/assets-collector-powercore-io/bg-activated.png\",\"title\":\"Ben Hart (Kore Kore)\",\"description\":\"Ben has been one the key folks behind ToyCon UK since it started in 2013. He and Blair run Kore Kore an online retail shop that features the best designer toys coming out of Asia.\",\"clue_title\":\"Clue Number Seven\",\"clue\":\"To find this medallion you must find the man behind ToyCon UK. He may be on the move or at the booth for his online retail shop known for Asian vinyl.\",\"tag\":\"ToyCon UK 2017 - Quest - 07 - Ben Hart (Kore Kore)\",\"sku\":\"sdcc2017quest_ben_hart_kore_kore\"},\"HHHHHHHHHH\":{\"quest_id\":\"sdcc2017\",\"order\":\"8\",\"type\":\"item\",\"card_thumbnail_url\":\"https://s3-us-west-1.amazonaws.com/assets-collector-powercore-io/lgMedallion-08-ToyChronicle.png\",\"thumbnail_url\":\"https://s3-us-west-1.amazonaws.com/assets-collector-powercore-io/smMedallion-08-ToyChronicle.png\",\"card_clue_background_url\":\"https://s3-us-west-1.amazonaws.com/assets-collector-powercore-io/bg-clue.png\",\"card_activated_background_url\":\"https://s3-us-west-1.amazonaws.com/assets-collector-powercore-io/bg-activated.png\",\"title\":\"Toy Chronicle\",\"description\":\"This award-winning newsite is the Number One UK Vinyl Designer Toy Blog. Bet you already knew that!\",\"clue_title\":\"Clue Number Eight\",\"clue\":\"The Designer Toy scene has a deep hunger to be in the know about the latest and greatest releases. These guys go above and beyond to keep us all abreast of the newest news.\",\"tag\":\"ToyCon UK 2017 - Quest - 08 - Toy Chronicle\",\"sku\":\"sdcc2017quest_toy_chronicle\"},\"IIIIIIIIII\":{\"quest_id\":\"sdcc2017\",\"order\":\"9\",\"type\":\"item\",\"card_thumbnail_url\":\"https://s3-us-west-1.amazonaws.com/assets-collector-powercore-io/lgMedallion-09-Wananeko.png\",\"thumbnail_url\":\"https://s3-us-west-1.amazonaws.com/assets-collector-powercore-io/smMedallion-09-Wananeko.png\",\"card_clue_background_url\":\"https://s3-us-west-1.amazonaws.com/assets-collector-powercore-io/bg-clue.png\",\"card_activated_background_url\":\"https://s3-us-west-1.amazonaws.com/assets-collector-powercore-io/bg-activated.png\",\"title\":\"Wananeko\",\"description\":\"Wananeko - created by Javier Jimenez -  is a Yokai Cat that takes vengeance by shape-shifting into a basket of meowing kittens on porches of the unsuspecting!\",\"clue_title\":\"Clue Number Nine\",\"clue\":\"Scared of ghosts? Seek out this spooky cat by a Spanish Artist if you dare!\",\"tag\":\"ToyCon UK 2017 - Quest - 09 - PowerCore\",\"sku\":\"sdcc2017quest_powercore\"},\"JJJJJJJJJJ\":{\"quest_id\":\"sdcc2017\",\"order\":\"10\",\"type\":\"prize\",\"card_thumbnail_url\":\"https://s3-us-west-1.amazonaws.com/assets-collector-powercore-io/lgMedallion-01-GiantTcon.png\",\"thumbnail_url\":\"https://s3-us-west-1.amazonaws.com/assets-collector-powercore-io/smMedallion-01-Tcon.png\",\"card_clue_background_url\":\"https://s3-us-west-1.amazonaws.com/assets-collector-powercore-io/bg-clue.png\",\"card_activated_background_url\":\"https://s3-us-west-1.amazonaws.com/assets-collector-powercore-io/bg-activated.png\",\"title\":\"Quest Finished\",\"description\":\"Quest Finished description\",\"clue_title\":\"Quest Not Finished\",\"clue\":\"Please finish the quest then visit the PowerCore Booth\",\"tag\":\"ToyCon UK 2017 - Quest - 10 - Quest Finished\",\"sku\":\"sdcc2017quest_finished\"}}";
        
        var medalOjb = [
            {sku:'toyconuk2017quest_giant_tcon', card_thumbnail_url:'images/card_medal/lgMedallion-01-GiantTcon.png'},
            {sku:'toyconuk2017quest_jon_paul_kaiser', card_thumbnail_url:'images/card_medal/lgMedallion-02-CaptainSturnham.png'},
            {sku:'toyconuk2017quest_dolly_oblong', card_thumbnail_url:'images/card_medal/lgMedallion-03-Baldwin.png'},
            {sku:'toyconuk2017quest_doktor_a', card_thumbnail_url:'images/card_medal/lgMedallion-04-Mechatorians.png'},
            {sku:'toyconuk2017quest_wego_custom_show', card_thumbnail_url:'images/card_medal/lgMedallion-05-MechatroWeGo.png'},
            {sku:'toyconuk2017quest_talk_show_session', card_thumbnail_url:'images/card_medal/lgMedallion-06-TheBar.png'},
            {sku:'toyconuk2017quest_ben_hart_kore_kore', card_thumbnail_url:'images/card_medal/lgMedallion-07-KoreKore.png'},
            {sku:'toyconuk2017quest_toy_chronicle', card_thumbnail_url:'images/card_medal/lgMedallion-08-ToyChronicle.png'},
            {sku:'toyconuk2017quest_powercore', card_thumbnail_url:'images/card_medal/lgMedallion-09-Wananeko.png'}    
        ];
        

        var jsonObject;
        var questId = 'toyconuk2017';
        
        var stageManager;
        var res;

        var backgroundContainer;
        var footerContainer;
        var questContainer;
        var dialogContainer;
        
        var assets = new Array();
        
        assets.push(new Asset('white', 'images/white.png'));
        assets.push(new Asset('transparent', 'images/transparent.png'));
        assets.push(new Asset('tc_quest_bg', 'images/tc_quest_bg.png'));
        assets.push(new Asset('q_form_bg', 'images/q_form_bg.png'));
        assets.push(new Asset('q_footer', 'images/q_footer.png'));
        assets.push(new Asset('q_collect', 'images/q_collect.png'));
        assets.push(new Asset('q_help', 'images/q_help.png'));
        assets.push(new Asset('q_status_bg', 'images/q_status_bg.png'));
        assets.push(new Asset('tc_quest_header_small', 'images/tc_quest_header_small.png'));
        assets.push(new Asset('q_medallion', 'images/q_medallion.png'));
        assets.push(new Asset('q_card', 'images/q_card.png'));
        assets.push(new Asset('q_help_info', 'images/q_help_info.png'));
        assets.push(new Asset('tc_close', 'images/tc_close.png'));
        assets.push(new Asset('rounded_rectangle', 'images/rounded_rectangle.png'));
        
        function Asset(resName, resPath)
        {
            this.resName = resName;
            this.resPath = resPath;
        }

        function getAsset()
        {
            return assets;
        }
        
        function createImage(id, container, imageRes)
        {
            var image = new PIXI.Sprite(imageRes);
            container.addChild(image);
            
            var content = {};
            content.id = id;
            content.hasClicked = false;
            
            image.content = content;
            
            elements.push(image);
            
            return image;
        }
        
        function parseJsonString()
        {
            var json = jsonString, jsonObj = JSON && JSON.parse(json) || $.parseJSON(json);
            console.log(jsonObj);
            
            jsonObject = new Array();
            for(var key in jsonObj)
            {
                if (jsonObj.hasOwnProperty(key)) {
                    if(jsonObj[key].quest_id == questId && jsonObj[key].type == 'item')
                    {
                        jsonObject.push(jsonObj[key]);
                        console.log(jsonObj[key]); 
                    }
                }
            }
            
            jsonObject.sort(function(a, b) {
                return parseInt(a.order) - parseInt(b.order);
            });
            
            console.log(jsonObject);
        }
        
        function getJsonObject(sku)
        {
            return jsonObject.find(function(item){return item.sku === sku});
        }
        
        function getJsonObjectLocal(sku)
        {
            return medalOjb.find(function(item){return item.sku === sku});
        }
        
        function setup()
        {
            parseJsonString();
            
            stageManager = StageManager.getInstance();
            
            elements = new Array();
            
            backgroundContainer = new PIXI.Container();
            footerContainer = new PIXI.Container();
            questContainer = new PIXI.Container();
            dialogContainer = new PIXI.Container();

            stageManager.getContainer().addChild(backgroundContainer);
            stageManager.getContainer().addChild(questContainer);
            stageManager.getContainer().addChild(footerContainer);
            stageManager.getContainer().addChild(dialogContainer);
            
            res =  AssetLoaderManager.getInstance().getRes();

            var backgroundObj = createImage('mainbg', backgroundContainer, res['tc_quest_bg'].texture);
            backgroundObj.scale.x = backgroundObj.scale.y = stageManager.getDimension().calculateRatioBoth('height', backgroundObj.width, backgroundObj.height, 1, 1);
            
            var questObj = createImage('mainQuest', questContainer, res['q_form_bg'].texture);
            questObj.anchor.set(0.5);
            questObj.scale.x = questObj.scale.y = stageManager.getDimension().calculateRatioByWidth(questObj.width, 1);
            questObj.position.x = stageManager.getDimension().width * 0.5;
            questObj.position.y = stageManager.getDimension().height * 0.45;
            
            var questHeaderObj = createImage('mainQuest_header', questObj, res['tc_quest_header_small'].texture);
            questHeaderObj.anchor.x = 0.5;
            questHeaderObj.scale.x = questHeaderObj.scale.y = (questObj.width / questHeaderObj.width);
            questHeaderObj.position.y = -(questObj.height * 0.52);
            questHeaderObj.position.x = 0;
            
            var questHeaderSubTextObj = createImage('mainQuest_subHeader', questObj, res['white'].texture);
            questHeaderSubTextObj.tint = 0x13c7f0;
            questHeaderSubTextObj.anchor.x = 0.5;
            questHeaderSubTextObj.scale.x = (questObj.width / questHeaderSubTextObj.width);
            questHeaderSubTextObj.scale.y = (questObj.height / questHeaderSubTextObj.height) * 0.10;
            questHeaderSubTextObj.position.y = questHeaderObj.position.y + questHeaderObj.height + 10;
            questHeaderSubTextObj.position.x = 0;
            
            var questContentObj = createImage('mainQuest_content', questObj, res['transparent'].texture);
            questContentObj.anchor.x = 0.5;
            questContentObj.scale.x = questContentObj.scale.y = (questObj.width / questContentObj.width);
            questContentObj.position.y = questHeaderSubTextObj.position.y + questHeaderSubTextObj.height + 10;
            questContentObj.position.x = 0;
            
            
            var questContentContainer = new PIXI.Container();
            questContainer.addChild(questContentContainer);
            questContentContainer.scale.set(0.85);
            
            var sc = new ScrollContainer(stageManager.getDimension().width, 530);
            questContentContainer.addChild(sc.po);
            
            console.log(stageManager.getDimension().width);
            questContentContainer.position.x = (stageManager.getDimension().width * 0.5) - ((questObj.width * questContentContainer.scale.x) * 0.5);
            questContentContainer.position.y = 245;
            
            var questBtnContainer;
            var currentRow = -1;
            for(var i=0; i < jsonObject.length; i++)
            {
                
                
                var row = Math.floor(i / 3);
                console.log(row);
                if(currentRow != row)
                {
                    currentRow = row;
                    questBtnContainer = new PIXI.Container();
                    
                    sc.scrollContainer.addChild(questBtnContainer);
                    sc.items.push(questBtnContainer);
                    
                }

                var questBtn = createImage('mainQuest_questBtn'+i, questBtnContainer, res['q_medallion'].texture);
                questBtn.scale.x = questBtn.scale.y = 0.8;
                questBtn.position.x = (i % 3) * (questBtn.width + 20);
                questBtn.interactive = true;
                
                questBtnContainer.position.y = (row * (questBtn.height + 20)) + 20;
                
                sc.setItemHeight(questBtn.height + 20);
                
                questBtn.content.sku = jsonObject[i].sku;
                
                questBtn.on('pointertap', function click() {
                    var content = this.content;
                    if(!content.hasClicked && !sc.isMoving())
                    {
                        content.hasClicked = true;
                        showCard(content.sku, function()
                        {
                            content.hasClicked = false;
                        });
                    }
                
                });
            }
            
            var footerObj = createImage('footer', footerContainer, res['q_footer'].texture);
            footerObj.scale.x = stageManager.getDimension().calculateRatioByWidth(footerObj.width, 1);
            footerObj.scale.y = stageManager.getDimension().calculateRatioByHeight(footerObj.height, .08);
            footerObj.position.y = stageManager.getDimension().height - footerObj.height + 12;
            
            var collectBtn = createImage('footer_collectBtn', footerContainer, res['q_collect'].texture);
            collectBtn.anchor.y = 1;
            collectBtn.scale.x = collectBtn.scale.y = stageManager.getDimension().calculateRatioByWidth(collectBtn.width, 0.2);
            collectBtn.position.y = stageManager.getDimension().height;
            collectBtn.position.x = 8;
            
            var helpBtn = createImage('footer_helpBtn', footerContainer, res['q_help'].texture);
            helpBtn.anchor.y = 1;
            helpBtn.scale.x = helpBtn.scale.y = stageManager.getDimension().calculateRatioByWidth(helpBtn.width, 0.15);
            helpBtn.position.y = stageManager.getDimension().height;
            helpBtn.position.x = footerObj.width - helpBtn.width - 5;
            helpBtn.interactive = true;
            helpBtn.on('pointertap', function () {
                var content = this.content;
                if(!content.hasClicked)
                {
                    content.hasClicked = true;
                    showHelp(function()
                    {
                        content.hasClicked = false;
                    });
                }

            });
            
            var statusObj = createImage('footer_status', footerContainer, res['q_status_bg'].texture);
            statusObj.scale.x = stageManager.getDimension().calculateRatioByWidth(statusObj.width, 0.6);
            statusObj.scale.y = stageManager.getDimension().calculateRatioByHeight(statusObj.height, 0.05);
            statusObj.position.y = footerObj.y + 12;
            statusObj.position.x = (stageManager.getDimension().width * 0.5) - (statusObj.width * 0.5) + 15;
            
            var dialogBgObj = createImage('cardQuest_background', dialogContainer, res['white'].texture);
            dialogBgObj.visible = false;
            dialogBgObj.tint = 0x000000;
            dialogBgObj.alpha = 0.5;
            dialogBgObj.interactive = true;
            dialogBgObj.anchor.set(0.5);
            dialogBgObj.scale.x = stageManager.getDimension().calculateRatioByWidth(dialogBgObj.width, 1);
            dialogBgObj.scale.y = stageManager.getDimension().calculateRatioByHeight(dialogBgObj.height, 1);
            dialogBgObj.position.y = stageManager.getDimension().height * 0.5;
            dialogBgObj.position.x = stageManager.getDimension().width * 0.5;
            
            
            var cardObjContainer = new PIXI.Container();
            cardObjContainer.visible = false;
            dialogContainer.addChild(cardObjContainer);
            
            var helpObjContainer = new PIXI.Container();
            helpObjContainer.visible = false;
            dialogContainer.addChild(helpObjContainer);
            
            var cardObj = createImage('cardQuest', cardObjContainer, res['q_card'].texture);
            cardObj.anchor.set(0.5);
            cardObj.scale.x = cardObj.scale.y = stageManager.getDimension().calculateRatioByWidth(cardObj.width, 0.9);
            cardObj.position.x =  stageManager.getDimension().width * 0.5;
            cardObj.position.y =  stageManager.getDimension().height * 0.5;
            
            var cardCloseBtn = createImage('cardQuest_closeBtn', cardObjContainer, res['tc_close'].texture);
            cardCloseBtn.anchor.set(0.5);
            cardCloseBtn.scale.x = cardCloseBtn.scale.y = 1;
            cardCloseBtn.position.x = cardObj.position.x + (cardObj.width * 0.46);
            cardCloseBtn.position.y = cardObj.position.y - (cardObj.height * 0.46);
            cardCloseBtn.interactive = true;
            cardCloseBtn.on('pointertap', function () {
                var content = this.content;
                if(!content.hasClicked)
                {
                    content.hasClicked = true;
                    hideCard(function()
                    {
                        content.hasClicked = false;
                    });
                }
                
            });
            
            var cardImageObj = createImage('cardQuest_image', cardObjContainer, res['q_medallion'].texture);
            cardImageObj.anchor.x = 0.5;
            cardImageObj.scale.x = cardImageObj.scale.y = 1;
            cardImageObj.position.x = cardObj.position.x;
            cardImageObj.position.y = cardObj.position.y - (cardObj.height * 0.4);
            
            var cardContentBgObj = createImage('cardQuest_contentBg', cardObjContainer, res['rounded_rectangle'].texture);
            cardContentBgObj.anchor.x = 0.5;
            cardContentBgObj.scale.x = cardContentBgObj.scale.y = (cardObj.width * 0.85) / cardContentBgObj.width;
            cardContentBgObj.position.x = cardObj.position.x;
            cardContentBgObj.position.y = cardObj.position.y - 25;
            
            var cardTextObj = new PIXI.Text('', new PIXI.TextStyle({
                fontFamily: 'Arial',
                fontSize: 18,
                wordWrap: true,
                wordWrapWidth: cardContentBgObj.width - 40
            }));
            
            cardTextObj.anchor.set(0.5);
            cardTextObj.position.x = cardObj.position.x;
            cardTextObj.position.y = cardContentBgObj.position.y + 70;
            
            cardObjContainer.addChild(cardTextObj);
            
            var helpObj = createImage('helpQuest', helpObjContainer, res['q_help_info'].texture);
            helpObj.anchor.set(0.5);
            helpObj.scale.x = helpObj.scale.y = stageManager.getDimension().calculateRatioByWidth(helpObj.width, 0.85);
            helpObj.position.x =  stageManager.getDimension().width * 0.5;
            helpObj.position.y =  stageManager.getDimension().height * 0.5;
            
            var helpCloseBtn = createImage('helpQuest_closeBtn', helpObjContainer, res['tc_close'].texture);
            helpCloseBtn.anchor.set(0.5);
            helpCloseBtn.scale.x = helpCloseBtn.scale.y = 1;
            helpCloseBtn.position.x = helpObj.position.x + (helpObj.width * 0.5);
            helpCloseBtn.position.y = helpObj.position.y - (helpObj.height * 0.5);
            helpCloseBtn.interactive = true;
            helpCloseBtn.on('pointertap', function () {
                var content = this.content;
                if(!content.hasClicked)
                {
                    content.hasClicked = true;
                    hideHelp(function()
                    {
                        content.hasClicked = false;
                    });
                }
                
            });
            
            function showCard(sku, callBack)
            {
                console.log(sku);
                TweenMax.fromTo(cardObjContainer.position, 0.5, {y: stageManager.getDimension().height}, {y: 0, ease: Power2.easeOut, onComplete: onComplete});
                TweenMax.fromTo(dialogBgObj, 0.5, {alpha: 0}, {alpha: 0.5, ease: Power2.easeOut});
                dialogBgObj.visible = true;
                cardObjContainer.visible = true;  
                cardImageObj.texture = PIXI.Texture.fromImage(getJsonObjectLocal(sku).card_thumbnail_url);
                cardTextObj.text = getJsonObject(sku).clue;
//                var img = new Image();
//                img.crossOrigin = 'Anonymous';
//                img.src = getJsonObject(sku).card_thumbnail_url;
                
//                var base = new PIXI.BaseTexture(img), texture = new PIXI.Texture(base);
//                cardImageObj.image.texture = texture;
//                loadImage();
//                console.log(img);
                function loadImage(theUrl)
                {
                    //var theUrl = 'http://presspassimages.s3-us-west-1.amazonaws.com/upload/20161020231520904/img8060.JPG';
                    var xmlhttp;

                    if (window.XMLHttpRequest)
                    {// code for IE7+, Firefox, Chrome, Opera, Safari
                        xmlhttp = new XMLHttpRequest();
                    }
                    else
                    {// code for IE6, IE5
                        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
                    }
                    xmlhttp.onreadystatechange=function()
                    {
                        if (xmlhttp.readyState==4 && xmlhttp.status==200)
                        {
                            //console.log(xmlhttp.responseText);
                            return xmlhttp.responseText;
                        }
                    }
                    xmlhttp.open("GET", theUrl, true );

                    xmlhttp.send();    
                }
                
                function onComplete()
                {
                    callBack();
                }
            }

            function hideCard(callBack)
            {
                TweenMax.to(cardObjContainer.position, 0.5, {y: stageManager.getDimension().height, ease: Power2.easeIn, onComplete: onComplete});
                TweenMax.to(dialogBgObj, 0.5, {alpha: 0, ease: Power2.easeIn});
                function onComplete()
                {
                    dialogBgObj.visible = false;
                    cardObjContainer.visible = false;
                    callBack();
                }
            }
            
            function showHelp(callBack)
            {
                TweenMax.fromTo(helpObjContainer.position, 0.5, {y: stageManager.getDimension().height}, {y: 0, ease: Power2.easeOut, onComplete: onComplete});
                TweenMax.fromTo(dialogBgObj, 0.5, {alpha: 0}, {alpha: 0.5, ease: Power2.easeOut});
                dialogBgObj.visible = true;
                helpObjContainer.visible = true;  
                function onComplete()
                {
                    callBack();
                }
            }
            
            function hideHelp(callBack)
            {
                TweenMax.to(helpObjContainer.position, 0.5, {y: stageManager.getDimension().height, ease: Power2.easeIn, onComplete: onComplete});
                TweenMax.to(dialogBgObj, 0.5, {alpha: 0, ease: Power2.easeIn});
                function onComplete()
                {
                    dialogBgObj.visible = false;
                    helpObjContainer.visible = false;
                    callBack();
                }
            }
            
            function ScrollContainer(width, height) 
            {
                this.po = new PIXI.DisplayObjectContainer();
                this.scrollContainer = new PIXI.DisplayObjectContainer();
                this.po.addChild(this.scrollContainer);
                this.items = [];

                this.mask = new PIXI.Graphics();
                this.mask
                .beginFill(0xFFFFFF)
                .drawRect(0, 0, width, height)
                .endFill();

                this.po.addChild(this.mask);
                this.scrollContainer.mask = this.mask;

                var itemHeight = 1;
                
                var _this = this;

                var mousedown = false;
                var isMoving = false;
                var lastPos = null;
                var lastDiff = null;
                var scrollTween = null;
                var maxVel = 0;
                
                this.setItemHeight = setItemHeight;
                this.isMoving = getScrollMovement;

                function setItemHeight(value)
                {
                    itemHeight = value;
                }
                
                function getScrollMovement()
                {
                    return isMoving;
                }
                
                function onmousemove(e) 
                {
                    var clientY = !e.data.originalEvent.touches ? e.data.originalEvent.clientY : e.data.originalEvent.touches[0].clientY;

                    if (mousedown) {

                        lastDiff = clientY - lastPos.y;
                        if(Math.abs(lastDiff) > 10)
                        {
                            isMoving = true;
                        }
                        
                        if(isMoving)
                        {
                            lastPos.y = clientY;

                            if (-_this.scrollContainer.y < 0) {
                            _this.scrollContainer.y += lastDiff/2;
                            }else{
                            _this.scrollContainer.y += lastDiff/2;
                            }
                        }
                        
                    }
                }

                function onmousedown(e) 
                {
                    var clientY = !e.data.originalEvent.touches ? e.data.originalEvent.clientY : e.data.originalEvent.touches[0].clientY;
                    mousedown = true;
                    if (scrollTween) scrollTween.kill();
                    lastPos = {
                        y: clientY
                    }
                }

                function onmouseup(e) 
                {
                    if (lastDiff) {
                        var goY = _this.scrollContainer.y + lastDiff * 10;
                        var ease = Quad.easeOut;
                        var time = Math.abs(lastDiff / 150);

                        if (goY < -_this.items.length * itemHeight + height) {
                            goY = -_this.items.length * itemHeight + height;
                            ease = Back.easeOut;
                            time = .1 + Math.abs(lastDiff / 150);
                        }
                        if (goY > 0)  {
                            goY = 0;
                            ease = Back.easeOut;
                            time = .1 + Math.abs(lastDiff / 150);
                        }

                        if (_this.scrollContainer.y > 0) {
                            time = 1 + _this.scrollContainer.y / 5000;
                            ease = Elastic.easeOut;
                        }
                        if (_this.scrollContainer.y < -_this.items.length * itemHeight + height) {
                            time = 1 + (_this.items.length * itemHeight + height + _this.scrollContainer.y) / 5000;
                            ease = Elastic.easeOut;
                        }

                        scrollTween = TweenMax.to(_this.scrollContainer, time, {
                            y: goY,
                            ease: ease
                        });
                    }

                    isMoving = false;
                    mousedown = false;
                    lastPos = null;
                    lastDiff = null;
                }

                this.po.interactive = true;
                this.po.mousemove = onmousemove;
                this.po.mousedown = onmousedown;
                this.po.mouseup = onmouseup;
                this.po.touchmove = onmousemove;
                this.po.touchstart = onmousedown;
                this.po.touchend = onmouseup;
                this.po.touchleave = onmouseup;
                this.po.mouseleave = onmouseup;
                this.po.mouseout = onmouseup;
                
                this.hideOffscreenElements = function() {
                    var startIndex = Math.floor(-_this.scrollContainer.y / itemHeight);
                    var endIndex = Math.floor(startIndex + (height / itemHeight));

                    for (var i = 0; i < _this.items.length; i++) {
                        var item = _this.items[i];
                        item.visible = false;
                        if (i >= startIndex && i <= endIndex + 1) {
                            item.visible = true;
                        }
                    }
                }
                
            }
            
        }
        
        function setJsonString(value)
        {
            //jsonString = value;
        }
        
        var elements;
        
        function getElement(id)
        {
            return elements.find(function(item){return item.content.id === id});
        }
        
        return {
            getAsset: getAsset,
            setJsonString: setJsonString,
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

