class Menu extends Phaser.Scene {
    constructor(){
        super("menuScene");
    }

    preload() {


        //load auido
        this.load.image('tempBoat', './assets/Boat.png');

}
    create(){
        //sets the background color of the game
        this.cameras.main.setBackgroundColor("#64CCFF");
        //menu display, chooses font, size, color, etc
        let menuConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            color: '#FFF',
            align: 'center',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }
        let centerX = game.config.width/2;
        let centerY = game.config.height/2;
        let textSpacer = 64;


        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        this.add.text(centerX, centerY - textSpacer * 2, 'Untitled Trench Game', menuConfig).setOrigin(0.5);
        this.add.rectangle(0, 300, 640, 180, 0x1E53FF).setOrigin(0,0);
        this.add.image(centerX, centerY + 15, 'tempBoat');


        
    }

    update() {
        this.scene.start("playScene");

    }
}