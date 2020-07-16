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
        this.load.tilemapTiledJSON('map', './assets/Test2.json');
        this.load.audio('pop', './assets/bubblePopRefined.wav');
        this.load.atlas('Diver','./assets/DiverV.png','./assets/DiverV.json');
        this.load.image('isopod', './assets/Iso1.png');
       
    }

    create(){ 

        //Diver anime declare
        this.anims.create({
            key: 'walkLeft', 
            frames: this.anims.generateFrameNames('Diver', {  
            prefix: 'DiverV',
            start: 1,
            end: 3,
            suffix: '.png',
            zeroPad: 1,
            }),
            frameRate: 8,
            repeat: -1,
        });
        //Diver anime declare
        this.anims.create({
            key: 'idle', 
            frames: this.anims.generateFrameNames('Diver', {  
            prefix: 'DiverV',
            start: 1,
            end: 1,
            suffix: '.png',
            zeroPad: 1,
            }),
            frameRate: 8,
            repeat: -1,
        });

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
        this.plant3 = new Plant(this, 380, 590, 'plants');
        this.plant4 = new Plant(this, 500, game.config.height/2 - 30, 'plants');
        this.Player = new Player(this, 50, 15, 'player', 0, 100).setScale(0.75);

        //Mask taken from https://blog.ourcade.co/posts/2020/phaser-3-object-reveal-flashlight-spotlight-magic-lens/
        this.cover = this.add.rectangle(this.map.widthInPixels/2, this.map.heightInPixels/2, this.map.widthInPixels, this.map.heightInPixels,  0x000000, .8);
        
        const x = this.map.widthInPixels/2;
        const y = this.map.heightInPixels/2;

		const width = this.cover.width
		const height = this.cover.height

		const rt = this.make.renderTexture({
			width,
			height,
			add: false
		})

		const maskImage = this.make.image({
			x,
			y,
			key: rt.texture.key,
			add: false
        })
        this.cover.setOrigin(.5,0);

		this.cover.mask = new Phaser.Display.Masks.BitmapMask(this, maskImage)
		this.cover.mask.invertAlpha = true
        //end of mask code

		this.Player.mask = new Phaser.Display.Masks.BitmapMask(this, maskImage)

		this.light = this.add.circle(0, 0, 40, 0xFFF, 1)
		this.light.visible = false;

        this.renderTexture = rt

        this.isopod1 = new isopod(this, 102, 590, 'isopod', 0, this.worldLayer, this.Player, 1);
        this.cameras.main.startFollow(this.Player);
        this.cameras.main.setBounds(0,0, this.map.widthInPixels, this.map.heightInPixels);
        this.physics.world.bounds.setTo(0, 0, this.map.widthInPixels, this.map.heightInPixels);

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
        this.plant3.update();
        this.plant4.update();
        this.isopod1.update();
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

        const x = this.Player.x - this.cover.x + this.cover.width * 0.5
		const y = this.Player.y - this.cover.y + this.cover.height * 0.5

		this.renderTexture.clear()
        this.renderTexture.draw(this.light, x, y)
    }

}