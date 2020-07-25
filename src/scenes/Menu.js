let start = false;
let startText;
let startTimer;
let centerX;

class Menu extends Phaser.Scene {
    constructor(){
        super("menuScene");
    }

    preload() {
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
        globalOxy = 100
        startOxy = globalOxy
        //finds the center of the screen
        centerX = game.config.width/2;
        let centerY = game.config.height/2;
        //simple spacer
        let textSpacer = 64;

        keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        this.add.text(centerX, centerY - textSpacer * 2, 'Untitled Trench Game', menuConfig).setOrigin(0.5);
        this.sea = this.add.rectangle(0, 300, 640, 485, 0x1E53FF).setOrigin(0,0);
        this.boat = this.add.image(0, centerY + 15, 'boat');
        menuConfig.fontSize = '20px';
        startText = this.add.text(centerX, centerY - textSpacer, 'Press Space to Start', menuConfig).setOrigin(0.5);
        startText.alpha = 0;   
        startTimer = this.time.addEvent({
            delay: 800,
            loop:true
        });

    }

    update() {
        if(this.boat.x >= centerX)
        {
            if(startTimer.getRepeatCount()%2 == 0)
            {
                startText.alpha = 0;   
            }
            else{
                startText.alpha = 1;
            }
        }
        if(this.boat.x <= centerX)
        {
            this.boat.x += 2;
        }
        else 
        {
            start = true;
            startText.text = ''; 
        }
        if(start && this.sea.y > -5)
        {
            this.sea.y -= 2;
            this.boat.y -= 2;
        }
        else if(this.sea.y <= -5)
        {
            this.scene.start("startCutscene");
            start = false;
        }
    }
}