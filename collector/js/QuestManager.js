"use strict";
var QuestManager = (function () {
    
    // Instance stores a reference to the Singleton
    var instance;

    function init() {

        // Singleton Init
        var jsonString = "{\"AH0AX89DCC\":{\"quest_id\":\"toyconuk2017\",\"order\":\"1\",\"type\":\"item\",\"card_thumbnail_url\":\"https://s3-us-west-1.amazonaws.com/assets-collector-powercore-io/lgMedallion-01-GiantTcon.png\",\"thumbnail_url\":\"https://s3-us-west-1.amazonaws.com/assets-collector-powercore-io/smMedallion-01-Tcon.png\",\"card_clue_background_url\":\"https://s3-us-west-1.amazonaws.com/assets-collector-powercore-io/bg-clue.png\",\"card_activated_background_url\":\"https://s3-us-west-1.amazonaws.com/assets-collector-powercore-io/bg-activated.png\",\"title\":\"Toyconosaurus\",\"description\":\"\u201CT-con\u201D was born as the ToyCon UK mascot. The vinyl toy version is made by UNBOX and debuted in 2013 and this  \u201Clife-size\u201D version made its debut at ToyCon UK 2016.\",\"clue_title\":\"Clue Number One\",\"clue\":\"This little Kaiju made his debut at the very first ToyCon UK and  can be spotted at many places around the show but you must find the biggest one in the room!\",\"tag\":\"ToyCon UK 2017 - Quest - 01 - Giant T-Con\",\"sku\":\"toyconuk2017quest_giant_tcon\"},\"KKWABR9DCC\":{\"quest_id\":\"toyconuk2017\",\"order\":\"2\",\"type\":\"item\",\"card_thumbnail_url\":\"https://s3-us-west-1.amazonaws.com/assets-collector-powercore-io/lgMedallion-02-CaptainSturnham.png\",\"thumbnail_url\":\"https://s3-us-west-1.amazonaws.com/assets-collector-powercore-io/smMedallion-02-CaptainSturnham.png\",\"card_clue_background_url\":\"https://s3-us-west-1.amazonaws.com/assets-collector-powercore-io/bg-clue.png\",\"card_activated_background_url\":\"https://s3-us-west-1.amazonaws.com/assets-collector-powercore-io/bg-activated.png\",\"title\":\"Captain Sturnbrau\",\"description\":\"Captain Sturnbrau was one of ToyCon regular Jon Paul Kaiser's first toys and lives on in his logo!\",\"clue_title\":\"Clue Number Two\",\"clue\":\"\u201CShiver me timbers!\u201D Seek out the reknowned U.K. artist who is famous for his monochromatic custom paints.\",\"tag\":\"ToyCon UK 2017 - Quest - 02 - Jon Paul Kaiser\",\"sku\":\"toyconuk2017quest_jon_paul_kaiser\"},\"PZXYNQ9DDJ\":{\"quest_id\":\"toyconuk2017\",\"order\":\"3\",\"type\":\"item\",\"card_thumbnail_url\":\"https://s3-us-west-1.amazonaws.com/assets-collector-powercore-io/lgMedallion-03-Baldwin.png\",\"thumbnail_url\":\"https://s3-us-west-1.amazonaws.com/assets-collector-powercore-io/smMedallion-03-Baldwin.png\",\"card_clue_background_url\":\"https://s3-us-west-1.amazonaws.com/assets-collector-powercore-io/bg-clue.png\",\"card_activated_background_url\":\"https://s3-us-west-1.amazonaws.com/assets-collector-powercore-io/bg-activated.png\",\"title\":\"Baldwin\",\"description\":\"Baldwin is one of the many popular characters from Dolly Oblong. Dolly has been a regular exhibitor at ToyCon from her native Holland.\",\"clue_title\":\"Clue Number Three\",\"clue\":\"To find this medallion hunt for this plucky long-eared character who is a regular visitor to ToyCon from Holland.\",\"tag\":\"ToyCon UK 2017 - Quest - 03 - Dolly Oblong\",\"sku\":\"toyconuk2017quest_dolly_oblong\"},\"VFVK0S9DB6\":{\"quest_id\":\"toyconuk2017\",\"order\":\"4\",\"type\":\"item\",\"card_thumbnail_url\":\"https://s3-us-west-1.amazonaws.com/assets-collector-powercore-io/lgMedallion-04-Mechatorians.png\",\"thumbnail_url\":\"https://s3-us-west-1.amazonaws.com/assets-collector-powercore-io/smMedallion-04-Mechatorians.png\",\"card_clue_background_url\":\"https://s3-us-west-1.amazonaws.com/assets-collector-powercore-io/bg-clue.png\",\"card_activated_background_url\":\"https://s3-us-west-1.amazonaws.com/assets-collector-powercore-io/bg-activated.png\",\"title\":\"Mechatorians\",\"description\":\"Doktor A and his amazing Mechtorians have been a constant fixture at ToyCon since its inception.\",\"clue_title\":\"Clue Number Four\",\"clue\":\"Take a trip to Retropolis,  a society of retrobotic characters from all walks of life to find this medallion.\",\"tag\":\"ToyCon UK 2017 - Quest - 04 - Doktor A\",\"sku\":\"toyconuk2017quest_doktor_a\"},\"X6NW649DCA\":{\"quest_id\":\"toyconuk2017\",\"order\":\"5\",\"type\":\"item\",\"card_thumbnail_url\":\"https://s3-us-west-1.amazonaws.com/assets-collector-powercore-io/lgMedallion-05-MechatroWeGo.png\",\"thumbnail_url\":\"https://s3-us-west-1.amazonaws.com/assets-collector-powercore-io/smMedallion-05-MechatroWeGo.png\",\"card_clue_background_url\":\"https://s3-us-west-1.amazonaws.com/assets-collector-powercore-io/bg-clue.png\",\"card_activated_background_url\":\"https://s3-us-west-1.amazonaws.com/assets-collector-powercore-io/bg-activated.png\",\"title\":\"WeGo Custom Show\",\"description\":\"The Mechatro WeGo was created by Kazushi Kobayashi. The Mechatro WeGo Global Custom Show makes its first stop of 2017 at ToyCon UK.\",\"clue_title\":\"Clue Number Five\",\"clue\":\"Customs shows are big part of the Designer Toy scene and this cute robot from Japan gets the royal treatment. Check out the show!\",\"tag\":\"ToyCon UK 2017 - Quest - 05 - WeGo Custom Show\",\"sku\":\"toyconuk2017quest_wego_custom_show\"},\"R58Z949DD1\":{\"quest_id\":\"toyconuk2017\",\"order\":\"6\",\"type\":\"item\",\"card_thumbnail_url\":\"https://s3-us-west-1.amazonaws.com/assets-collector-powercore-io/lgMedallion-06-TheBar.png\",\"thumbnail_url\":\"https://s3-us-west-1.amazonaws.com/assets-collector-powercore-io/smMedallion-06-TheBar.png\",\"card_clue_background_url\":\"https://s3-us-west-1.amazonaws.com/assets-collector-powercore-io/bg-clue.png\",\"card_activated_background_url\":\"https://s3-us-west-1.amazonaws.com/assets-collector-powercore-io/bg-activated.png\",\"title\":\"The Bar\",\"description\":\"Feeling refreshed? Make sure you check the schedule of interesting panels and live painting sessions happening all weekend.\",\"clue_title\":\"Clue Number Six\",\"clue\":\"After a hard day of chasing toys we all need some refreshment. Hint: this is also where the talk show & live painting sessions happen.\",\"tag\":\"ToyCon UK 2017 - Quest - 06 - Talk Show Session\",\"sku\":\"toyconuk2017quest_talk_show_session\"},\"YGVDD19DDB\":{\"quest_id\":\"toyconuk2017\",\"order\":\"7\",\"type\":\"item\",\"card_thumbnail_url\":\"https://s3-us-west-1.amazonaws.com/assets-collector-powercore-io/lgMedallion-07-KoreKore.png\",\"thumbnail_url\":\"https://s3-us-west-1.amazonaws.com/assets-collector-powercore-io/smMedallion-07-KoreKore.png\",\"card_clue_background_url\":\"https://s3-us-west-1.amazonaws.com/assets-collector-powercore-io/bg-clue.png\",\"card_activated_background_url\":\"https://s3-us-west-1.amazonaws.com/assets-collector-powercore-io/bg-activated.png\",\"title\":\"Ben Hart (Kore Kore)\",\"description\":\"Ben has been one the key folks behind ToyCon UK since it started in 2013. He and Blair run Kore Kore an online retail shop that features the best designer toys coming out of Asia.\",\"clue_title\":\"Clue Number Seven\",\"clue\":\"To find this medallion you must find the man behind ToyCon UK. He may be on the move or at the booth for his online retail shop known for Asian vinyl.\",\"tag\":\"ToyCon UK 2017 - Quest - 07 - Ben Hart (Kore Kore)\",\"sku\":\"toyconuk2017quest_ben_hart_kore_kore\"},\"2HZK7Z9DE0\":{\"quest_id\":\"toyconuk2017\",\"order\":\"8\",\"type\":\"item\",\"card_thumbnail_url\":\"https://s3-us-west-1.amazonaws.com/assets-collector-powercore-io/lgMedallion-08-ToyChronicle.png\",\"thumbnail_url\":\"https://s3-us-west-1.amazonaws.com/assets-collector-powercore-io/smMedallion-08-ToyChronicle.png\",\"card_clue_background_url\":\"https://s3-us-west-1.amazonaws.com/assets-collector-powercore-io/bg-clue.png\",\"card_activated_background_url\":\"https://s3-us-west-1.amazonaws.com/assets-collector-powercore-io/bg-activated.png\",\"title\":\"Toy Chronicle\",\"description\":\"This award-winning newsite is the Number One UK Vinyl Designer Toy Blog. Bet you already knew that!\",\"clue_title\":\"Clue Number Eight\",\"clue\":\"The Designer Toy scene has a deep hunger to be in the know about the latest and greatest releases. These guys go above and beyond to keep us all abreast of the newest news.\",\"tag\":\"ToyCon UK 2017 - Quest - 08 - Toy Chronicle\",\"sku\":\"toyconuk2017quest_toy_chronicle\"},\"EMSRM89DE9\":{\"quest_id\":\"toyconuk2017\",\"order\":\"9\",\"type\":\"item\",\"card_thumbnail_url\":\"https://s3-us-west-1.amazonaws.com/assets-collector-powercore-io/lgMedallion-09-Wananeko.png\",\"thumbnail_url\":\"https://s3-us-west-1.amazonaws.com/assets-collector-powercore-io/smMedallion-09-Wananeko.png\",\"card_clue_background_url\":\"https://s3-us-west-1.amazonaws.com/assets-collector-powercore-io/bg-clue.png\",\"card_activated_background_url\":\"https://s3-us-west-1.amazonaws.com/assets-collector-powercore-io/bg-activated.png\",\"title\":\"Wananeko\",\"description\":\"Wananeko - created by Javier Jimenez -  is a Yokai Cat that takes vengeance by shape-shifting into a basket of meowing kittens on porches of the unsuspecting!\",\"clue_title\":\"Clue Number Nine\",\"clue\":\"Scared of ghosts? Seek out this spooky cat by a Spanish Artist if you dare!\",\"tag\":\"ToyCon UK 2017 - Quest - 09 - PowerCore\",\"sku\":\"toyconuk2017quest_powercore\"},\"T2T0H99DEB\":{\"quest_id\":\"toyconuk2017\",\"order\":\"10\",\"type\":\"prize\",\"card_thumbnail_url\":\"https://s3-us-west-1.amazonaws.com/assets-collector-powercore-io/lgMedallion-01-GiantTcon.png\",\"thumbnail_url\":\"https://s3-us-west-1.amazonaws.com/assets-collector-powercore-io/smMedallion-01-Tcon.png\",\"card_clue_background_url\":\"https://s3-us-west-1.amazonaws.com/assets-collector-powercore-io/bg-clue.png\",\"card_activated_background_url\":\"https://s3-us-west-1.amazonaws.com/assets-collector-powercore-io/bg-activated.png\",\"title\":\"Quest Finished\",\"description\":\"Quest Finished description\",\"clue_title\":\"Quest Not Finished\",\"clue\":\"Please finish the quest then visit the PowerCore Booth\",\"tag\":\"ToyCon UK 2017 - Quest - 10 - Quest Finished\",\"sku\":\"toyconuk2017quest_finished\"},\"AAAAAAAAAA\":{\"quest_id\":\"sdcc2017\",\"order\":\"1\",\"type\":\"item\",\"card_thumbnail_url\":\"https://s3-us-west-1.amazonaws.com/assets-collector-powercore-io/lgMedallion-01-GiantTcon.png\",\"thumbnail_url\":\"https://s3-us-west-1.amazonaws.com/assets-collector-powercore-io/smMedallion-01-Tcon.png\",\"card_clue_background_url\":\"https://s3-us-west-1.amazonaws.com/assets-collector-powercore-io/bg-clue.png\",\"card_activated_background_url\":\"https://s3-us-west-1.amazonaws.com/assets-collector-powercore-io/bg-activated.png\",\"title\":\"Toyconosaurus\",\"description\":\"\u201CT-con\u201D was born as the ToyCon UK mascot. The vinyl toy version is made by UNBOX and debuted in 2013 and this  \u201Clife-size\u201D version made its debut at ToyCon UK 2016.\",\"clue_title\":\"Clue Number One\",\"clue\":\"This little Kaiju made his debut at the very first ToyCon UK and  can be spotted at many places around the show but you must find the biggest one in the room!\",\"tag\":\"ToyCon UK 2017 - Quest - 01 - Giant T-Con\",\"sku\":\"sdcc2017quest_giant_tcon\"},\"BBBBBBBBBB\":{\"quest_id\":\"sdcc2017\",\"order\":\"2\",\"type\":\"item\",\"card_thumbnail_url\":\"https://s3-us-west-1.amazonaws.com/assets-collector-powercore-io/lgMedallion-02-CaptainSturnham.png\",\"thumbnail_url\":\"https://s3-us-west-1.amazonaws.com/assets-collector-powercore-io/smMedallion-02-CaptainSturnham.png\",\"card_clue_background_url\":\"https://s3-us-west-1.amazonaws.com/assets-collector-powercore-io/bg-clue.png\",\"card_activated_background_url\":\"https://s3-us-west-1.amazonaws.com/assets-collector-powercore-io/bg-activated.png\",\"title\":\"Captain Sturnbrau\",\"description\":\"Captain Sturnbrau was one of ToyCon regular Jon Paul Kaiser's first toys and lives on in his logo!\",\"clue_title\":\"Clue Number Two\",\"clue\":\"\u201CShiver me timbers!\u201D Seek out the reknowned U.K. artist who is famous for his monochromatic custom paints.\",\"tag\":\"ToyCon UK 2017 - Quest - 02 - Jon Paul Kaiser\",\"sku\":\"sdcc2017quest_jon_paul_kaiser\"},\"CCCCCCCCCC\":{\"quest_id\":\"sdcc2017\",\"order\":\"3\",\"type\":\"item\",\"card_thumbnail_url\":\"https://s3-us-west-1.amazonaws.com/assets-collector-powercore-io/lgMedallion-03-Baldwin.png\",\"thumbnail_url\":\"https://s3-us-west-1.amazonaws.com/assets-collector-powercore-io/smMedallion-03-Baldwin.png\",\"card_clue_background_url\":\"https://s3-us-west-1.amazonaws.com/assets-collector-powercore-io/bg-clue.png\",\"card_activated_background_url\":\"https://s3-us-west-1.amazonaws.com/assets-collector-powercore-io/bg-activated.png\",\"title\":\"Baldwin\",\"description\":\"Baldwin is one of the many popular characters from Dolly Oblong. Dolly has been a regular exhibitor at ToyCon from her native Holland.\",\"clue_title\":\"Clue Number Three\",\"clue\":\"To find this medallion hunt for this plucky long-eared character who is a regular visitor to ToyCon from Holland.\",\"tag\":\"ToyCon UK 2017 - Quest - 03 - Dolly Oblong\",\"sku\":\"sdcc2017quest_dolly_oblong\"},\"DDDDDDDDDD\":{\"quest_id\":\"sdcc2017\",\"order\":\"4\",\"type\":\"item\",\"card_thumbnail_url\":\"https://s3-us-west-1.amazonaws.com/assets-collector-powercore-io/lgMedallion-04-Mechatorians.png\",\"thumbnail_url\":\"https://s3-us-west-1.amazonaws.com/assets-collector-powercore-io/smMedallion-04-Mechatorians.png\",\"card_clue_background_url\":\"https://s3-us-west-1.amazonaws.com/assets-collector-powercore-io/bg-clue.png\",\"card_activated_background_url\":\"https://s3-us-west-1.amazonaws.com/assets-collector-powercore-io/bg-activated.png\",\"title\":\"Mechatorians\",\"description\":\"Doktor A and his amazing Mechtorians have been a constant fixture at ToyCon since its inception.\",\"clue_title\":\"Clue Number Four\",\"clue\":\"Take a trip to Retropolis,  a society of retrobotic characters from all walks of life to find this medallion.\",\"tag\":\"ToyCon UK 2017 - Quest - 04 - Doktor A\",\"sku\":\"sdcc2017quest_doktor_a\"},\"EEEEEEEEEE\":{\"quest_id\":\"sdcc2017\",\"order\":\"5\",\"type\":\"item\",\"card_thumbnail_url\":\"https://s3-us-west-1.amazonaws.com/assets-collector-powercore-io/lgMedallion-05-MechatroWeGo.png\",\"thumbnail_url\":\"https://s3-us-west-1.amazonaws.com/assets-collector-powercore-io/smMedallion-05-MechatroWeGo.png\",\"card_clue_background_url\":\"https://s3-us-west-1.amazonaws.com/assets-collector-powercore-io/bg-clue.png\",\"card_activated_background_url\":\"https://s3-us-west-1.amazonaws.com/assets-collector-powercore-io/bg-activated.png\",\"title\":\"WeGo Custom Show\",\"description\":\"The Mechatro WeGo was created by Kazushi Kobayashi. The Mechatro WeGo Global Custom Show makes its first stop of 2017 at ToyCon UK.\",\"clue_title\":\"Clue Number Five\",\"clue\":\"Customs shows are big part of the Designer Toy scene and this cute robot from Japan gets the royal treatment. Check out the show!\",\"tag\":\"ToyCon UK 2017 - Quest - 05 - WeGo Custom Show\",\"sku\":\"sdcc2017quest_wego_custom_show\"},\"FFFFFFFFFF\":{\"quest_id\":\"sdcc2017\",\"order\":\"6\",\"type\":\"item\",\"card_thumbnail_url\":\"https://s3-us-west-1.amazonaws.com/assets-collector-powercore-io/lgMedallion-06-TheBar.png\",\"thumbnail_url\":\"https://s3-us-west-1.amazonaws.com/assets-collector-powercore-io/smMedallion-06-TheBar.png\",\"card_clue_background_url\":\"https://s3-us-west-1.amazonaws.com/assets-collector-powercore-io/bg-clue.png\",\"card_activated_background_url\":\"https://s3-us-west-1.amazonaws.com/assets-collector-powercore-io/bg-activated.png\",\"title\":\"The Bar\",\"description\":\"Feeling refreshed? Make sure you check the schedule of interesting panels and live painting sessions happening all weekend.\",\"clue_title\":\"Clue Number Six\",\"clue\":\"After a hard day of chasing toys we all need some refreshment. Hint: this is also where the talk show & live painting sessions happen.\",\"tag\":\"ToyCon UK 2017 - Quest - 06 - Talk Show Session\",\"sku\":\"sdcc2017quest_talk_show_session\"},\"GGGGGGGGGG\":{\"quest_id\":\"sdcc2017\",\"order\":\"7\",\"type\":\"item\",\"card_thumbnail_url\":\"https://s3-us-west-1.amazonaws.com/assets-collector-powercore-io/lgMedallion-07-KoreKore.png\",\"thumbnail_url\":\"https://s3-us-west-1.amazonaws.com/assets-collector-powercore-io/smMedallion-07-KoreKore.png\",\"card_clue_background_url\":\"https://s3-us-west-1.amazonaws.com/assets-collector-powercore-io/bg-clue.png\",\"card_activated_background_url\":\"https://s3-us-west-1.amazonaws.com/assets-collector-powercore-io/bg-activated.png\",\"title\":\"Ben Hart (Kore Kore)\",\"description\":\"Ben has been one the key folks behind ToyCon UK since it started in 2013. He and Blair run Kore Kore an online retail shop that features the best designer toys coming out of Asia.\",\"clue_title\":\"Clue Number Seven\",\"clue\":\"To find this medallion you must find the man behind ToyCon UK. He may be on the move or at the booth for his online retail shop known for Asian vinyl.\",\"tag\":\"ToyCon UK 2017 - Quest - 07 - Ben Hart (Kore Kore)\",\"sku\":\"sdcc2017quest_ben_hart_kore_kore\"},\"HHHHHHHHHH\":{\"quest_id\":\"sdcc2017\",\"order\":\"8\",\"type\":\"item\",\"card_thumbnail_url\":\"https://s3-us-west-1.amazonaws.com/assets-collector-powercore-io/lgMedallion-08-ToyChronicle.png\",\"thumbnail_url\":\"https://s3-us-west-1.amazonaws.com/assets-collector-powercore-io/smMedallion-08-ToyChronicle.png\",\"card_clue_background_url\":\"https://s3-us-west-1.amazonaws.com/assets-collector-powercore-io/bg-clue.png\",\"card_activated_background_url\":\"https://s3-us-west-1.amazonaws.com/assets-collector-powercore-io/bg-activated.png\",\"title\":\"Toy Chronicle\",\"description\":\"This award-winning newsite is the Number One UK Vinyl Designer Toy Blog. Bet you already knew that!\",\"clue_title\":\"Clue Number Eight\",\"clue\":\"The Designer Toy scene has a deep hunger to be in the know about the latest and greatest releases. These guys go above and beyond to keep us all abreast of the newest news.\",\"tag\":\"ToyCon UK 2017 - Quest - 08 - Toy Chronicle\",\"sku\":\"sdcc2017quest_toy_chronicle\"},\"IIIIIIIIII\":{\"quest_id\":\"sdcc2017\",\"order\":\"9\",\"type\":\"item\",\"card_thumbnail_url\":\"https://s3-us-west-1.amazonaws.com/assets-collector-powercore-io/lgMedallion-09-Wananeko.png\",\"thumbnail_url\":\"https://s3-us-west-1.amazonaws.com/assets-collector-powercore-io/smMedallion-09-Wananeko.png\",\"card_clue_background_url\":\"https://s3-us-west-1.amazonaws.com/assets-collector-powercore-io/bg-clue.png\",\"card_activated_background_url\":\"https://s3-us-west-1.amazonaws.com/assets-collector-powercore-io/bg-activated.png\",\"title\":\"Wananeko\",\"description\":\"Wananeko - created by Javier Jimenez -  is a Yokai Cat that takes vengeance by shape-shifting into a basket of meowing kittens on porches of the unsuspecting!\",\"clue_title\":\"Clue Number Nine\",\"clue\":\"Scared of ghosts? Seek out this spooky cat by a Spanish Artist if you dare!\",\"tag\":\"ToyCon UK 2017 - Quest - 09 - PowerCore\",\"sku\":\"sdcc2017quest_powercore\"},\"JJJJJJJJJJ\":{\"quest_id\":\"sdcc2017\",\"order\":\"10\",\"type\":\"prize\",\"card_thumbnail_url\":\"https://s3-us-west-1.amazonaws.com/assets-collector-powercore-io/lgMedallion-01-GiantTcon.png\",\"thumbnail_url\":\"https://s3-us-west-1.amazonaws.com/assets-collector-powercore-io/smMedallion-01-Tcon.png\",\"card_clue_background_url\":\"https://s3-us-west-1.amazonaws.com/assets-collector-powercore-io/bg-clue.png\",\"card_activated_background_url\":\"https://s3-us-west-1.amazonaws.com/assets-collector-powercore-io/bg-activated.png\",\"title\":\"Quest Finished\",\"description\":\"Quest Finished description\",\"clue_title\":\"Quest Not Finished\",\"clue\":\"Please finish the quest then visit the PowerCore Booth\",\"tag\":\"ToyCon UK 2017 - Quest - 10 - Quest Finished\",\"sku\":\"sdcc2017quest_finished\"}}";
        
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
            var content = {};
            var image = new PIXI.Sprite(imageRes);

            container.addChild(image);
            
            content.id = id;
            content.hasClicked = false;
            content.image = image;
            
            elements.push(content);
            
            return content;
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
        
        function setup()
        {
            parseJsonString();
            
            console.log(getJsonObject('toyconuk2017quest_wego_custom_show'));
            
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
            backgroundObj.image.scale.x = backgroundObj.image.scale.y = stageManager.getDimension().calculateRatioBoth('height', backgroundObj.image.width, backgroundObj.image.height, 1, 1);
            
            var questObj = createImage('mainQuest', questContainer, res['q_form_bg'].texture);
            questObj.image.anchor.set(0.5);
            questObj.image.scale.x = questObj.image.scale.y = stageManager.getDimension().calculateRatioByWidth(questObj.image.width, 1);
            questObj.image.position.x = stageManager.getDimension().width * 0.5;
            questObj.image.position.y = stageManager.getDimension().height * 0.45;
            
            var questHeaderObj = createImage('mainQuest_header', questObj.image, res['tc_quest_header_small'].texture);
            questHeaderObj.image.anchor.x = 0.5;
            questHeaderObj.image.scale.x = questHeaderObj.image.scale.y = (questObj.image.width / questHeaderObj.image.width);
            questHeaderObj.image.position.y = -(questObj.image.height * 0.52);
            questHeaderObj.image.position.x = 0;
            
            var questHeaderSubTextObj = createImage('mainQuest_subHeader', questObj.image, res['white'].texture);
            questHeaderSubTextObj.image.tint = 0x13c7f0;
            questHeaderSubTextObj.image.anchor.x = 0.5;
            questHeaderSubTextObj.image.scale.x = (questObj.image.width / questHeaderSubTextObj.image.width);
            questHeaderSubTextObj.image.scale.y = (questObj.image.height / questHeaderSubTextObj.image.height) * 0.10;
            questHeaderSubTextObj.image.position.y = questHeaderObj.image.position.y + questHeaderObj.image.height + 10;
            questHeaderSubTextObj.image.position.x = 0;
            
            var questContentObj = createImage('mainQuest_content', questObj.image, res['transparent'].texture);
            questContentObj.image.anchor.x = 0.5;
            questContentObj.image.scale.x = questContentObj.image.scale.y = (questObj.image.width / questContentObj.image.width);
            questContentObj.image.position.y = questHeaderSubTextObj.image.position.y + questHeaderSubTextObj.image.height + 10;
            questContentObj.image.position.x = 0;
            
            for(var i=0; i < jsonObject.length; i++)
            {
                var questBtn = createImage('mainQuest_questBtn'+i, questContentObj.image, res['q_medallion'].texture);
                questBtn.image.anchor.x = 0.5;
                questBtn.image.scale.x = questBtn.image.scale.y = 0.05;
                questBtn.image.position.y = (Math.floor(i / 3) * 10) + 1;
                questBtn.image.position.x = ((i % 3)-1) * 11;
                questBtn.image.interactive = true;
                questBtn.sku = jsonObject[i].sku;
      
                questBtn.image.on('pointertap', function () {
                    if(!questBtn.hasClicked)
                    {
                        questBtn.hasClicked = true;
                        showCard(questBtn.sku, function()
                        {
                            questBtn.hasClicked = false;
                        });
                    }
                
                });
            }
            
            
            var footerObj = createImage('footer', footerContainer, res['q_footer'].texture);
            footerObj.image.scale.x = stageManager.getDimension().calculateRatioByWidth(footerObj.image.width, 1);
            footerObj.image.scale.y = stageManager.getDimension().calculateRatioByHeight(footerObj.image.height, .08);
            footerObj.image.position.y = stageManager.getDimension().height - footerObj.image.height + 12;
            
            var collectBtn = createImage('footer_collectBtn', footerContainer, res['q_collect'].texture);
            collectBtn.image.anchor.y = 1;
            collectBtn.image.scale.x = collectBtn.image.scale.y = stageManager.getDimension().calculateRatioByWidth(collectBtn.image.width, 0.2);
            collectBtn.image.position.y = stageManager.getDimension().height;
            collectBtn.image.position.x = 8;
            
            var helpBtn = createImage('footer_helpBtn', footerContainer, res['q_help'].texture);
            helpBtn.image.anchor.y = 1;
            helpBtn.image.scale.x = helpBtn.image.scale.y = stageManager.getDimension().calculateRatioByWidth(helpBtn.image.width, 0.15);
            helpBtn.image.position.y = stageManager.getDimension().height;
            helpBtn.image.position.x = footerObj.image.width - helpBtn.image.width - 5;
            helpBtn.image.interactive = true;
            helpBtn.image.on('pointertap', function () {
                if(!helpBtn.hasClicked)
                {
                    helpBtn.hasClicked = true;
                    showHelp(function()
                    {
                        helpBtn.hasClicked = false;
                    });
                }

            });
            
            var statusObj = createImage('footer_status', footerContainer, res['q_status_bg'].texture);
            statusObj.image.scale.x = stageManager.getDimension().calculateRatioByWidth(statusObj.image.width, 0.6);
            statusObj.image.scale.y = stageManager.getDimension().calculateRatioByHeight(statusObj.image.height, 0.05);
            statusObj.image.position.y = footerObj.image.y + 12;
            statusObj.image.position.x = (stageManager.getDimension().width * 0.5) - (statusObj.image.width * 0.5) + 15;
            
            var dialogBgObj = createImage('cardQuest_background', dialogContainer, res['white'].texture);
            dialogBgObj.image.visible = false;
            dialogBgObj.image.tint = 0x000000;
            dialogBgObj.image.alpha = 0.5;
            dialogBgObj.image.interactive = true;
            dialogBgObj.image.anchor.set(0.5);
            dialogBgObj.image.scale.x = stageManager.getDimension().calculateRatioByWidth(dialogBgObj.image.width, 1);
            dialogBgObj.image.scale.y = stageManager.getDimension().calculateRatioByHeight(dialogBgObj.image.height, 1);
            dialogBgObj.image.position.y = stageManager.getDimension().height * 0.5;
            dialogBgObj.image.position.x = stageManager.getDimension().width * 0.5;
            
            
            var cardObjContainer = new PIXI.Container();
            cardObjContainer.visible = false;
            dialogContainer.addChild(cardObjContainer);
            
            var helpObjContainer = new PIXI.Container();
            helpObjContainer.visible = false;
            dialogContainer.addChild(helpObjContainer);
            
            var cardObj = createImage('cardQuest', cardObjContainer, res['q_card'].texture);
            cardObj.image.anchor.set(0.5);
            cardObj.image.scale.x = cardObj.image.scale.y = stageManager.getDimension().calculateRatioByWidth(cardObj.image.width, 0.9);
            cardObj.image.position.x =  stageManager.getDimension().width * 0.5;
            cardObj.image.position.y =  stageManager.getDimension().height * 0.5;
            
            var cardCloseBtn = createImage('cardQuest_closeBtn', cardObjContainer, res['tc_close'].texture);
            cardCloseBtn.image.anchor.set(0.5);
            cardCloseBtn.image.scale.x = cardCloseBtn.image.scale.y = 1;
            cardCloseBtn.image.position.x = cardObj.image.position.x + (cardObj.image.width * 0.46);
            cardCloseBtn.image.position.y = cardObj.image.position.y - (cardObj.image.height * 0.46);
            cardCloseBtn.image.interactive = true;
            cardCloseBtn.image.on('pointertap', function () {
                if(!cardCloseBtn.hasClicked)
                {
                    cardCloseBtn.hasClicked = true;
                    hideCard(function()
                    {
                        cardCloseBtn.hasClicked = false;
                    });
                }
                
            });
            
            var cardImageObj = createImage('cardQuest_image', cardObjContainer, res['q_medallion'].texture);
            cardImageObj.image.anchor.x = 0.5;
            cardImageObj.image.scale.x = cardImageObj.image.scale.y = 1;
            cardImageObj.image.position.x = cardObj.image.position.x;
            cardImageObj.image.position.y = cardObj.image.position.y - (cardObj.image.height * 0.4);
            
            var cardContentBgObj = createImage('cardQuest_contentBg', cardObjContainer, res['rounded_rectangle'].texture);
            cardContentBgObj.image.anchor.x = 0.5;
            cardContentBgObj.image.scale.x = cardContentBgObj.image.scale.y = (cardObj.image.width * 0.85) / cardContentBgObj.image.width;
            cardContentBgObj.image.position.x = cardObj.image.position.x;
            cardContentBgObj.image.position.y = cardObj.image.position.y - 25;
            
            var helpObj = createImage('helpQuest', helpObjContainer, res['q_help_info'].texture);
            helpObj.image.anchor.set(0.5);
            helpObj.image.scale.x = helpObj.image.scale.y = stageManager.getDimension().calculateRatioByWidth(helpObj.image.width, 0.85);
            helpObj.image.position.x =  stageManager.getDimension().width * 0.5;
            helpObj.image.position.y =  stageManager.getDimension().height * 0.5;
            
            var helpCloseBtn = createImage('helpQuest_closeBtn', helpObjContainer, res['tc_close'].texture);
            helpCloseBtn.image.anchor.set(0.5);
            helpCloseBtn.image.scale.x = helpCloseBtn.image.scale.y = 1;
            helpCloseBtn.image.position.x = helpObj.image.position.x + (helpObj.image.width * 0.5);
            helpCloseBtn.image.position.y = helpObj.image.position.y - (helpObj.image.height * 0.5);
            helpCloseBtn.image.interactive = true;
            helpCloseBtn.image.on('pointertap', function () {
                if(!helpCloseBtn.hasClicked)
                {
                    helpCloseBtn.hasClicked = true;
                    hideHelp(function()
                    {
                        helpCloseBtn.hasClicked = false;
                    });
                }
                
            });
            
            function showCard(sku, callBack)
            {
                TweenMax.fromTo(cardObjContainer.position, 0.5, {y: stageManager.getDimension().height}, {y: 0, ease: Power2.easeOut, onComplete: onComplete});
                TweenMax.fromTo(dialogBgObj.image, 0.5, {alpha: 0}, {alpha: 0.5, ease: Power2.easeOut});
                dialogBgObj.image.visible = true;
                cardObjContainer.visible = true;  
//                cardImageObj.image.texture = PIXI.Texture.fromImage(loadImage());
//                var img = new Image();
//                img.crossOrigin = 'Anonymous';
//                img.src = getJsonObject(sku).card_thumbnail_url;
//                
//                var base = new PIXI.BaseTexture(img), texture = new PIXI.Texture(base);
//                cardImageObj.image.texture = texture;
//                loadImage();
//                console.log(img);
//                function loadImage()
//                {
//                    var theUrl = 'http://presspassimages.s3-us-west-1.amazonaws.com/upload/20161020231520904/img8060.JPG';
//                    var xmlhttp;
//
//                    if (window.XMLHttpRequest)
//                    {// code for IE7+, Firefox, Chrome, Opera, Safari
//                        xmlhttp = new XMLHttpRequest();
//                    }
//                    else
//                    {// code for IE6, IE5
//                        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
//                    }
//                    xmlhttp.onreadystatechange=function()
//                    {
//                        if (xmlhttp.readyState==4 && xmlhttp.status==200)
//                        {
//                            console.log(xmlhttp.responseText);
//                            return xmlhttp.responseText;
//                        }
//                    }
//                    xmlhttp.open("GET", theUrl, true );
//
//                    xmlhttp.send();    
//                }
                
                function onComplete()
                {
                    callBack();
                }
            }

            function hideCard(callBack)
            {
                TweenMax.to(cardObjContainer.position, 0.5, {y: stageManager.getDimension().height, ease: Power2.easeIn, onComplete: onComplete});
                TweenMax.to(dialogBgObj.image, 0.5, {alpha: 0, ease: Power2.easeIn});
                function onComplete()
                {
                    dialogBgObj.image.visible = false;
                    cardObjContainer.visible = false;
                    callBack();
                }
            }
            
            function showHelp(callBack)
            {
                TweenMax.fromTo(helpObjContainer.position, 0.5, {y: stageManager.getDimension().height}, {y: 0, ease: Power2.easeOut, onComplete: onComplete});
                TweenMax.fromTo(dialogBgObj.image, 0.5, {alpha: 0}, {alpha: 0.5, ease: Power2.easeOut});
                dialogBgObj.image.visible = true;
                helpObjContainer.visible = true;  
                function onComplete()
                {
                    callBack();
                }
            }
            
            function hideHelp(callBack)
            {
                TweenMax.to(helpObjContainer.position, 0.5, {y: stageManager.getDimension().height, ease: Power2.easeIn, onComplete: onComplete});
                TweenMax.to(dialogBgObj.image, 0.5, {alpha: 0, ease: Power2.easeIn});
                function onComplete()
                {
                    dialogBgObj.image.visible = false;
                    helpObjContainer.visible = false;
                    callBack();
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
            return elements.find(function(item){return item.id === id});
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

