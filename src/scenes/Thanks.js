class Thanks extends Phaser.Scene {
    constructor(){
        super("thanks");
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

        this.add.text(centerX, centerY - textSpacer * 3, 'Thanks For Playing!', menuConfig).setOrigin(0.5);
        this.sea = this.add.rectangle(0, 300, 640, 485, 0x1E53FF).setOrigin(0,0);
        this.boat = this.add.image(centerX, centerY + 15, 'boat');
        menuConfig.fontSize = '20px';

        this.researchText = this.add.text(centerX, centerY - textSpacer * 2, 'Total Research Collect: ' + finalResearch, menuConfig).setOrigin(0.5).setAlpha(0);
        this.restartText = this.add.text(centerX, centerY - textSpacer, 'Press Space to Dive Again!' , menuConfig).setOrigin(0.5).setAlpha(0);
    }

    update(){
        if(this.boat.x < game.config.width + 100)
        {
            this.boat.x += 1.25;
        }
        if(this.boat.x >= centerX + 300)
        {
            this.restartText.alpha = 1;
        }
        if(this.boat.x >= centerX + 150){
            this.researchText.alpha = 1;
        }
        if(this.restartText.alpha == 1 && Phaser.Input.Keyboard.JustDown(keySpace))
        {
            this.scene.start('menuScene')
        }
    }
}
