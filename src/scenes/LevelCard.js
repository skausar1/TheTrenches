class LevelCard extends Phaser.Scene {
    
    constructor(){
        super("levelScene");
    
    }
    init(data) {
        this.currDepth = data.depth;
        this.passOxy = data.playerOxy;
        this.nextLevel = "level" + data.nextLevel;
        this.numResearch = data.numResearch;
        console.log(data);
    }

    preload() {
    }

    create() {
        var passage;
        console.log("in levelcard");
        this.cameras.main.setBackgroundColor("#000000");
        this.time.delayedCall(1000, () => {
            passage = this.add.text(game.config.width / 2, game.config.height / 4, "DEPTH: " + this.currDepth + 'M', {fontFamily: 'Courier', fontSize: '40px', align: 'center'});
            this.add.text(game.config.width / 6, game.config.height / 1.25, "Research Materials: " + this.numResearch, {fontFamily: 'Courier', fontSize: '16px', align: 'center'});
        }, null, this);

        startText = this.add.text(game.config.width / 2, game.config.height / 2, 'Press Space to Continue', {fontFamily: 'Courier', fontSize: '16px', align: 'center'}).setOrigin(0.5);
        startText.alpha = 0;   
        startTimer = this.time.addEvent({
            delay: 800,
            loop:true
        });
        keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    }

    update() {
        if(startTimer.getRepeatCount()%2 == 0)
        {
            startText.alpha = 0;   
        }
        else{
            startText.alpha = 1;
        }
        if(Phaser.Input.Keyboard.JustDown(keySpace))
        {
            console.log('here');
            this.scene.start(this.nextLevel, {depth: this.currDepth, oxy: this.passOxy, numResearch: this.numResearch})
        }
    }
}

