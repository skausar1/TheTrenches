let config = {
    type: Phaser.CANVAS,
    width: 640,
    height: 480,
    scene: [Menu,Play],

};
//create main game object
let game = new Phaser.Game(config); 

let keyF, keyLEFT, keyRIGHT;