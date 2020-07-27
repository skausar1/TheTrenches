//Untiled Trench Game
//Names: Dilion Ney, David Carroll, Saif Kausar
//github Pages: https://skausar1.github.io/TheTrenches/

let config = {
    type: Phaser.WEBGL,
    parent: 'UTG',
    width: 640,
    height: 480,
    physics: {
        default: 'arcade',
        arcade: {
            fps: 60,
            debug: false,
            //sets gravity to low drag down
            gravity: { y: 120 }
        }
    },
    scene: [Load,Menu,StartCutscene,Intro,LevelCard,Level1,Level2,Level3,Level4,FinalCutScene,Thanks],
    pixelArt: true
};
//create main game object
let game = new Phaser.Game(config); 

game.settings = {

    //array which holds dialog snippets, each entry is a sentence   
    ddDialog: [
        "Beware your avarice, all who dare explore\n The below does not take kindly to plunderers", 
        "Well looks I can't tell\n whether this man suffocated to death\n or arf’ arf’ an’ arf’ed to death\n based on all the alcohol bottles nearby. \nSomething is amiss though. \nThe man’s eyes are bleeding green somehow. \nI am not afternoonified enough for this.",
        "The man’s stature i\ns a bang up to the elephant. \nHis suit looks batty-fanged, with teeth marks the size a foot long in diameter. \nIf I get out alive me and the boys\n will have quite the Benjo",
        "This one has a not \nthat sounds like a Church-bell lady. \nHe called her his Chuckaboo. \nDespite having a fly-rink and gas-pipes, \nhe seemed to be quite the gal-sneaker.",
        "The picture in this locket looks to be\n a gigglemug which got me the morbs thinking about my wife. \nMakes me reget kruger-spoofing to her about being gone for a day or two.\n I need to show her i’m no meater \nand bring fame to the household.",
        "That parish pick-axe and sauce-box of his is really getting \n my goat.\n Wonder if he died smothering a parrot. \nI suggestionized I should take the egg\n before everything is not up to dick."
    ]
}

let keyA, keyD, keySpace, keyS, keyF;
var globalOxy = 100;
var startOxy = globalOxy;