class Intro extends Phaser.Scene {
    constructor(){
        super("introScene");
    }

    create(){
        let introConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            color: '#FFF',
            align: 'center',
            padding: {
            },
            fixedWidth: 0
        }

        //sets the background color of the game
        this.cameras.main.setBackgroundColor("#1E53FF");
        this.add.image(game.config.width/2, game.config.height/2, 'wall');
        this.add.text(game.config.width/2 - 100, 10, 'How to Play', introConfig);
        this.add.text(130, 90, 'Use', introConfig).setFontSize('24px');
        this.add.image(150, 150, 'wasd').setScale(.2)
        this.add.text(250, 140, '- to Swim around the trench', introConfig).setFontSize('20px');
        this.add.text(130, 240, 'Use', introConfig).setFontSize('24px');
        this.add.image(150, 290, 'spacebar').setScale(.75)
        this.add.text(250, 280, '- to Float up', introConfig).setFontSize('20px');
        this.add.text(50, 370, 'Collect Research', introConfig).setFontSize('24px');
        this.add.image(150, 420, 'fossil').setScale(2)
        this.add.text(180, 410, ' - and explore the trench to find its secrets', introConfig).setFontSize('16px');

        startText = this.add.text(game.config.width / 2, game.config.height - 20, 'Press Space to Continue', {fontFamily: 'Courier', fontSize: '16px', align: 'center'}).setOrigin(0.5);
        startText.alpha = 0;   
        startTimer = this.time.addEvent({
            delay: 800,
            loop:true
        });
        keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    }   
    update()
    {
        if(startTimer.getRepeatCount()%2 == 0)
        {
            startText.alpha = 0;   
        }
        else{
            startText.alpha = 1;
        }
        if(Phaser.Input.Keyboard.JustDown(keySpace))
        {
            this.scene.start("levelScene", {depth: 0, playerOxy: 100, nextLevel: 1, numResearch: 0})
        }
    }
}