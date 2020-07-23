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

        var delay = this.time.delayedCall(3000, () => this.tweens.add({
            targets: passage,
            alpha: 0,
            duration: 2000,
            ease: 'Power2',
            callback: this.scene.start(this.nextLevel, {depth: this.currDepth, oxy: this.passOxy, numResearch: this.numResearch})
          }, this), null, this);
    }

    update() {
    }
}

