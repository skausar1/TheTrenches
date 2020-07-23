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
        
        this.researchTier1 = false;
        if(this.numResearch >= 6)
            this.researchTier1 = true;

        this.researchTier2 = false;
        if(this.numResearch >= 6)
        this.researchTier2 = true;
        
        this.researchTier3 = false;
        if(this.numResearch >= 6)
            this.researchTier3 = true;
    }

    preload() {
    }

    create() {
        var passage;
        this.cameras.main.setBackgroundColor("#000000");
        this.add.image(game.config.width/2, game.config.height/2, 'wall');
        this.time.delayedCall(1000, () => {
            passage = this.add.text(game.config.width / 2 + 40, game.config.height / 4, "DEPTH: " + this.currDepth + 'M', {fontFamily: 'Courier', fontSize: '40px', align: 'center'});
            this.add.text(game.config.width / 2 + 15 + 40, game.config.height / 3 + 3, "Research Materials: " + this.numResearch, {fontFamily: 'Courier', fontSize: '16px', align: 'right'});
        }, null, this);

        startText = this.add.text(game.config.width / 2, game.config.height - 20, 'Press Space to Continue', {fontFamily: 'Courier', fontSize: '16px', align: 'center'}).setOrigin(0.5);
        startText.alpha = 0;   
        startTimer = this.time.addEvent({
            delay: 800,
            loop:true
        });
        keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.research1  = this.add.text(40, game.config.height / 4 + 60, "New Reseach Unlocked!\n\t Isopods:  \nGadzooks! Look at the girth of that pill bug! \nIf such a small insect can become so large at this depth,\n I shudder to imagine what will follow.\n I'd better cook up a plan to back slang it out of here if need be.", {fontFamily: 'Courier', fontSize: '12px', align: 'left'});
        this.research2 = this.add.text(40, game.config.height / 4 + 150, "New Reseach Unlocked!\n\t Giant Jellies:  \nWell, this is jammiest bits of jam of a jellyfish.\n This is both silly and terrifying.\n They seem to vary in their size immensely.\n Curious... I wonder if gigantification is a property of this trench...", {fontFamily: 'Courier', fontSize: '12px', align: 'left'});
        this.research3 = this.add.text(40, game.config.height / 4 + 240, "New Reseach Unlocked!\n\t Spider Crabs:  \nYuck, what sort of putrid display is this?\n A spider of crimson of blood and soil. \nWhat horrors to ye toil? Could you be used as fish oil?\n Or will I be shoved off this mortal coil?", {fontFamily: 'Courier', fontSize: '12px', align: 'left'});
       
        this.research1.alpha = 0;
        this.research2.alpha = 0;
        this.research3.alpha = 0;
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
            this.scene.start(this.nextLevel, {depth: this.currDepth, oxy: this.passOxy, numResearch: this.numResearch})
        }

        if(this.numResearch >= 6)
        {
            this.research1.alpha = 1;
         }

        if(this.numResearch >= 15)
        {
            this.research2.alpha = 1;
        }

        if(this.numResearch >= 28)
        {
            this.research3.alpha = 1;
        }
    }
}

