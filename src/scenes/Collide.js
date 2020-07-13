class Collide extends Phaser.Scene {
    constructor(){
        super("collide");
    }

    preload() {
        this.load.image('player','./assets/rocket.png');
        this.load.image('bubble', './assets/BOB.png');
        this.load.image('water', './assets/Water_Overlay.png');
        this.load.image('plants', './assets/spaceship.png');
        this.load.image('tiles', './assets/Tiles.png');
        this.load.image('boat', './assets/Boat.png');
        this.load.tilemapTiledJSON('map', './assets/Test2.json');
    }

    create(){ 
        //creating clock and timer for timed events
        this.gameClock = new Phaser.Time.Clock(this);
        this.tick = this.gameClock.now;
        this.oxyTick =  this.gameClock.now;

        this.cameras.main.setBackgroundColor("#1E53FF");

        this.map = this.make.tilemap({ key: "map" });
        this.tileset = this.map.addTilesetImage("Tiles", "tiles");

        this.belowLayer = this.map.createStaticLayer("background", this.tileset, 0, 0);
        this.worldLayer = this.map.createStaticLayer("Platforms", this.tileset, 0, 0);

        this.worldLayer.setCollisionByProperty({ collides: true });
        this.debugGraphics = this.add.graphics().setAlpha(0.75);
        // this.worldLayer.renderDebug(this.debugGraphics, {
        //   tileColor: null, // Color of non-colliding tiles
        //   collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255), // Color of colliding tiles
        //   faceColor: new Phaser.Display.Color(40, 39, 37, 255) // Color of colliding face edges
        // });


        //create player object
        this.plant1 = new Plant(this, game.config.width/2, game.config.height/2, 'plants');
        this.plant2 = new Plant(this, 102, 610, 'plants');
        this.Player = new Player(this, 50, 15, 'player', 0, 100);
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
    }

    update(time, delta){

        //update timer
        this.gameClock.update(time, delta);

        //checking failstate (too little oxygen)
        let gameOver = false;

        if(this.Player.oxy <= 0){
            gameOver = true;
        }
        if(!gameOver){
            this.Player.update();
        }
        else{
            console.log("you're dead");
        }
        this.plant1.update();
        this.plant2.update();
        if(this.physics.overlap(this.Player, this.plant1.bubble1) && this.plant1.bubble1.visible)
        {
            this.Player.addOxy(5);
            console.log('oxygen =' + this.Player.oxy);
            this.plant1.bubble1.setVisible(false);
        }
        if(this.physics.overlap(this.Player, this.plant1.bubble2) && this.plant1.bubble2.visible)
        {
            this.Player.addOxy(5);
            console.log('oxygen =' + this.Player.oxy);
            this.plant1.bubble2.setVisible(false);
        }
        if(this.physics.overlap(this.Player, this.plant2.bubble1) && this.plant2.bubble1.visible)
        {
            this.Player.addOxy(5);
            console.log('oxygen =' + this.Player.oxy);
            this.plant2.bubble1.setVisible(false);
        }
        if(this.physics.overlap(this.Player, this.plant2.bubble2) && this.plant2.bubble2.visible)
        {
            this.Player.addOxy(5);
            console.log('oxygen =' + this.Player.oxy);
            this.plant2.bubble2.setVisible(false);
        }
        if(this.gameClock.now - this.oxyTick >= 2500)
        {
            this.Player.addOxy(-1);
            console.log('oxygen =' + this.Player.oxy);
            this.oxyTick = this.gameClock.now;
        }
        if(keyF.isDown)
        {
            console.log(this.Player.x);
            console.log(this.Player.y);
            
        }

    }

}