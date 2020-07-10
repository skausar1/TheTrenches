class Colide extends Phaser.Scene {
    constructor(){
        super("colide");
    }

    preload() {
        this.load.image('player','./assets/rocket.png');
        this.load.image('bubble', './assets/bubble.png');
    }
    create(){ 
      //create player object
      this.Player = new Player(this, game.config.width/2, game.config.height/4, 'player', 0, 3600);

      //declare movement keys
      keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
      keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
      keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

    }

    update() {
    }
}