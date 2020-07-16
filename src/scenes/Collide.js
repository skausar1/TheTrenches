class Collide extends Phaser.Scene {
    constructor(){
        super("collide");
    }

    preload() {
        this.load.image('player','./assets/rocket.png');
        this.load.image('bubble', './assets/BOB.png');
        this.load.image('water', './assets/Water_Overlay.png');
        this.load.image('plants', './assets/plant.png');
        this.load.image('tiles', './assets/Tiles.png');
        this.load.image('boat', './assets/Boat.png');
        this.load.tilemapTiledJSON('map', './assets/Test2.json');
        this.load.audio('pop', './assets/bubblePopRefined.wav');
    }

    create(){ 
        //creating clock and timer for timed events
        this.gameClock = new Phaser.Time.Clock(this);
        this.tick = this.gameClock.now;
        this.oxyTick =  this.gameClock.now;
        

        this.bubbles = this.add.group();
        this.cameras.main.setBackgroundColor("#1E53FF");

        this.map = this.make.tilemap({ key: "map" });
        this.tileset = this.map.addTilesetImage("Tiles", "tiles");

        this.belowLayer = this.map.createStaticLayer("background", this.tileset, 0, 0);
        this.worldLayer = this.map.createStaticLayer("Platforms", this.tileset, 0, 0);

        this.worldLayer.setCollisionByProperty({ collides: true });
        this.debugGraphics = this.add.graphics().setAlpha(0.75);
        //Uncomment for debuging platforms
        // this.worldLayer.renderDebug(this.debugGraphics, {
        //   tileColor: null, // Color of non-colliding tiles
        //   collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255), // Color of colliding tiles
        //   faceColor: new Phaser.Display.Color(40, 39, 37, 255) // Color of colliding face edges
        // });


        //create player object
        this.plant1 = new Plant(this, game.config.width/2, game.config.height/2 - 30, 'plants');
        this.plant2 = new Plant(this, 102, 590, 'plants');
        this.Player = new Player(this, 50, 15, 'player', 0, 10);
        this.cameras.main.startFollow(this.Player);
        this.cameras.main.setBounds(0,0, 800, this.map.heightInPixels);

        this.physics.add.collider(this.Player, this.worldLayer);
        
        //declare movement keys
        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);


        // this.water = this.add.tileSprite(0, 0, 1000, 1000, 'water').setOrigin(0, 0);
        // this.water.alpha = 0.35;

        //Displays O2 meter
        this.O2Display = this.add.text(69, 25, "O2 Left " + Math.round(this.Player.oxy), this.O2Config).setScrollFactor(0);

        //Displays Depth by y of player
        this.pressureDisplay = this.add.text(450, 25, "Depth " + Math.round(this.Player.y/10) + " meters", this.O2Config).setScrollFactor(0);

        //checking failstate (too little oxygen)
        this.gameOver = false;
    }

    update(time, delta){

        //update timer
        this.gameClock.update(time, delta);

        this.pressureDisplay.text = "Depth " + Math.round(this.Player.y/10) + " meters";
      

        if(this.Player.oxy <= 0){
            this.gameOver = true;
        }
        if(!this.gameOver){
            this.Player.update();
        }
        else{
            console.log("you're dead");
        }
        this.plant1.update();
        this.plant2.update();
        for(var i = 0; i < this.bubbles.children.entries.length; i++)
        {
            if(this.physics.overlap(this.Player, this.bubbles.children.entries[i]) && this.bubbles.children.entries[i].visible)
            {
                this.bubbles.children.entries[i].pop();
            }
        }
        if(this.gameClock.now - this.oxyTick >= 2500)
        {
            this.Player.addOxy(-1);
            console.log('oxygen =' + this.Player.oxy);
            this.oxyTick = this.gameClock.now;
        }
        if(keyF.isDown)
        {
            // console.log(this.Player.x);
            // console.log(this.Player.y);
            console.log(this.bubbles)
            
        }
        this.O2Display.text = ("O2 Left " + this.Player.oxy);

         // check key input for restart
         if(this.gameOver)
         {
            this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', this.O2Config).setOrigin(0.5);
            this.add.text(game.config.width/2, game.config.height/2 + 64, '(F) to Restart or (A) for Menu').setOrigin(0.5);
         }
         if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyF)) {
            this.scene.restart();
        }

        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyA)) {
            this.scene.start("menuScene");
        }
    }

}