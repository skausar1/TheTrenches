let centerX;
let start = false;

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
        //finds the center of the screen
        centerX = game.config.width/2;
        let centerY = game.config.height/2;
        //simple spacer
        let textSpacer = 64;


        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        this.sea = this.add.rectangle(0, 300, 640, 485, 0x1E53FF).setOrigin(0,0);
        this.boat = this.add.image(0, centerY + 15, 'tempBoat');
        this.add.text(centerX, centerY - textSpacer * 2, 'Untitled Trench Game', menuConfig).setOrigin(0.5);
        


        
    }

    update() {
        this.scene.start("playScene");
        if(this.boat.x != centerX)
        {
            this.boat.x += 1;
        }
        if(Phaser.Input.Keyboard.JustDown(keySpace))
        {
            start = true; 
        }
        if(start && this.sea.y > -5)
        {
            this.sea.y -= 2;
            this.boat.y -= 2;
        }
        else
        {
            start = false;
        }
    }
}