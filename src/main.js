
let config = {
    type: Phaser.CANVAS,
    parent: 'UTG',
    width: 640,
    height: 480,
    physics: {
        default: 'arcade',
        arcade: {
            fps: 60,
            debug: true,
            //sets gravity to low drag down
            gravity: { y: 20 }
        }
    },
    scene: [Menu,Play]
};
//create main game object
let game = new Phaser.Game(config); 

game.settings = {

}

let keyA, keyD, keySpace;