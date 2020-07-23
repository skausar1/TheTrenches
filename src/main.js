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
            debug: true,
            //sets gravity to low drag down
            gravity: { y: 120 }
        }
    },
    scene: [Load,Menu,Intro,LevelCard,Level1,Level2,Level3,Level4],

    
};
//create main game object
let game = new Phaser.Game(config); 

game.settings = {

    //array which holds dialog snippets, each entry is a sentence   
    ddDialog: [
        "Beware your avarice, all who dare explore\n The below does not take kindly to plunderers", "1", "2"
    ]
}

let keyA, keyD, keySpace, keyS, keyF;
var globalOxy = 100;
var startOxy = globalOxy;