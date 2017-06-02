var stageManager = StageManager.getInstance();
var spineManager = SpineManager.getInstance();

spineManager.onReady(spineManagerReady);

function spineManagerReady()
{
    spineManager.createSpine("powercore_male","Edison",100,250,0.5);  
    spineManager.createSpine("powercore_male","Jia",250,250,0.5);  
    spineManager.createSpine("powercore_male","Jian",400,250,0.5);  
}



