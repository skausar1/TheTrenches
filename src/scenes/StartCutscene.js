class StartCutscene extends Phaser.Scene {
    constructor(){
        super("startCutscene");
    }

    create(){
        //setting bg
        this.cameras.main.setBackgroundColor("#000000");
        this.add.image(game.config.width/2, game.config.height/2, 'wall');

        //adding intro cutscene text
        this.time.delayedCall(1000, () => {
            let passage = this.add.text(50, 100, "\nBermuda triangle, 1889.\n\n\n\t UPON THIS DAY \n\nI follow the trail of bricky adventurers before me\n to delve into the abyss for the sake of \nscientific knowledge and for the betterment of mankind.\n As a side note, \nthere is rumored to be treasure in the trench from \nsunk ships that will no doubt bring me much fame.\n\n ", {fontFamily: 'Courier', fontSize: '16px', align: 'left'});
            this.add.text(50, 400, "IT IS TIME TO DELVE DOWN INTO THE ABYSS").setFontSize('24px');
        }, null, this);

        //adding 'press start to continue' prompt
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
        //add in blinking of space prompt, plus detection of space being pressed
        if(startTimer.getRepeatCount()%2 == 0)
        {
            startText.alpha = 0;   
        }
        else{
            startText.alpha = 1;
        }
        if(Phaser.Input.Keyboard.JustDown(keySpace))
        {
            this.scene.start('introScene')
        }
    }
}