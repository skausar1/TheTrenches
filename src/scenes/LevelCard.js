class levelCard extends Phaser.Scene {
    constructor(){
        super("levelCard" );
    }

    init(data) {
        this.currDepth = data.depth;
        this.passOxy = data.playerOxy;
        this.nextLevel = data.nextLevel;
        console.log(data);
    }

    create() {
        this.cameras.main.setBackgroundColor("#ffffff");
        this.time.delayedCall(3000, () => {
            var passage = this.add.text(game.config.width / 2, game.config.height / 2, "DEPTH: " + this.currDepth + 'M', {font: 'Courier', fontSize: '32px'})
        }, null, this);

        var delay = this.time.delayedCall(8000, () => this.scene.tweens.add({
            targets: passage,
            alpha: 0,
            duration: 5000,
            ease: 'Power2',
           // callback: this.scene.start(data.nextLevel)
          }, this), null, this);
    }
}

