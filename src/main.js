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
    scene: [Load,Menu,Level1,Level2,Level3,Level4]
};
//create main game object
let game = new Phaser.Game(config); 

game.settings = {

    // following guide here: https://www.emanueleferonato.com/2018/12/06/html5-endless-runner-built-with-phaser-and-arcade-physics-step-3-adding-textures-to-platforms-and-coins-to-collect/
      
    // platform speed range, in pixels per second
       platformSpeedRange: [300, 300],
 
       // spawn range, how far should be the bottommost platform from the bottom edge
       // before next platform spawns, in pixels
       spawnRange: [80, 300],
    
       // platform width range, in pixels
       platformSizeRange: [90, 300],
    
       // platform max and min height, as screen height ratio
       platformVerticalLimit: [0.4, 0.8],
    
    
       // player starting Y position
       playerStartPosition: 200,
    
       // consecutive jumps allowed
       jumps: 2,
    
    //    // % of probability a coin appears on the platform
    //    coinPercent: 25
}

let keyA, keyD, keySpace, keyS, keyF;