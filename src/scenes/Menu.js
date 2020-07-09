class Menu extends Phaser.Scene {
    constructor(){
        super("menuScene");
    }

    preload() {
        //load audio
}
    create(){
        //menu display
        let menuConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
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

        
    }

    update() {
        this.scene.start("playScene");

    }
}