class Collide extends Phaser.Scene {
    constructor(){
        super("collide");
    }

    preload() {
        this.load.image('player','./assets/rocket.png');
        this.load.image('bubble', './assets/BOB.png');
        this.bgTile1 = this.load.image('water', './assets/Water_Overlay.png');
        this.bgTile2 = this.load.image('wall', './assets/pxBG1.png');
        this.load.image('plants', './assets/plant.png');
        this.load.image('fossil', './assets/Fossil.png');
        this.load.image('oxyUI', './assets/tankBlank.png');
        this.load.tilemapTiledJSON('map', './assets/Level1.json');
        this.load.image('tiles2', './assets/basic_tileset.png');
        this.load.audio('pop', './assets/bubblePopRefined.wav');
        this.load.atlas('Diver','./assets/DiverV.png','./assets/DiverV.json');
        this.load.spritesheet('isopod', './assets/Iso1.png', {frameWidth: 32, frameHeight: 16, startFrame: 0, endFrame: 4});
        this.load.spritesheet('jelly', './assets/giantJelly.png', {frameWidth: 128, frameHeight: 128, startFrame: 0, endFrame: 3});
        this.load.spritesheet('oxyBars', './assets/OxyGaugesTrimmed.png', {frameWidth: 11, frameHeight: 64, starFrame: 0, endFrame: 3});
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

        //setting up parallax bg
        this.cameras.main.setBackgroundColor("#3d3579");
        this.bgOverlay1 = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'wall')
        this.bgOverlay1.setOrigin(0, 0);
        this.bgOverlay1.setScrollFactor(0);
        this.bgOverlay1.depth = -3;

        this.bgOverlay2 = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'water')
        this.bgOverlay2.setOrigin(0, 0);
        this.bgOverlay2.setScrollFactor(0);
        this.bgOverlay2.depth = -2;

        this.map = this.make.tilemap({ key: "map" });
        this.tileset = this.map.addTilesetImage("AquaSet", "tiles2");

        this.belowLayer = this.map.createStaticLayer("WorldLayer", this.tileset, 0, 0);

        this.belowLayer.setCollisionByProperty({ collides: true });
        this.debugGraphics = this.add.graphics().setAlpha(0.75);
        //Uncomment for debuging platforms
        // this.belowLayer.renderDebug(this.debugGraphics, {
        //   tileColor: null, // Color of non-colliding tiles
        //   collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255), // Color of colliding tiles
        //   faceColor: new Phaser.Display.Color(40, 39, 37, 255) // Color of colliding face edges
        // });
        this.plants = this.add.group({
            immovable: true
          });

        // place plants in
        const plantObjects = this.map.getObjectLayer('plants')['objects'];

        // Now we create plants as sprites
        plantObjects.forEach(plantObject => {
            const plant = new Plant(this, plantObject.x, plantObject.y - 32, 'plants').setOrigin(0,0);
            this.plants.add(plant);
        });

        this.spawnPoint = this.map.getObjectLayer('SpawnPoint')['objects'];

        this.spawnPoint.forEach(point => {
            this.Player = new Player(this, point.x, point.y, 'player', 0, 100).setScale(0.75);
        })


        var texture = this.textures.createCanvas('gradient', 200, 256);
        var context = texture.getContext();
        var grd = context.createLinearGradient(0, 0, game.config.width, game.config.height);

        grd.addColorStop(0, '#000000');
        grd.addColorStop(1, '#FFFFFF');
        //Mask taken from https://blog.ourcade.co/posts/2020/phaser-3-object-reveal-flashlight-spotlight-magic-lens/
        this.cover = this.add.rectangle(this.map.widthInPixels/2, this.map.heightInPixels/2, this.map.widthInPixels, this.map.heightInPixels,  0x000000, 0.8);
        this.cover.texture = grd;
        
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

        this.isopod1 = new isopod(this, 102, 590, 'isopod', 0, this.belowLayer, this.Player, 1);
        this.jelly1 = new Jelly(this, 1000, 250, 'jelly', 0, this.belowLayer, this.Player, 1);
        this.dd1 = new DeadDiver(this, 1585, 1128, 'fossil', 0, this.Player, ["I crave death", "please be merciful"]);
        this.dd1.setVisible(false);

        this.cameras.main.startFollow(this.Player);
        this.cameras.main.setBounds(0,0, this.map.widthInPixels, this.map.heightInPixels);
        this.physics.world.bounds.setTo(0, 0, this.map.widthInPixels, this.map.heightInPixels);

        this.physics.add.collider(this.Player, this.belowLayer);
        
        //declare movement keys
        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);


        // this.water = this.add.tileSprite(0, 0, 1000, 1000, 'water').setOrigin(0, 0);
        // this.water.alpha = 0.35;

        //Displays O2 meter
        this.O2Display = this.add.text(592, 30, Math.round(this.Player.oxy), this.O2Config).setScrollFactor(0);
        this.O2Display.setColor("black");
        this.O2Display.setFontSize(14);

        //Displays Depth by y of player
        this.pressureDisplay = this.add.text(450, 25, "Depth " + Math.round(this.Player.y/10) + "M", this.O2Config).setScrollFactor(0);

        //checking failstate (too little oxygen)
        this.gameOver = false;
    }

    update(time, delta){

        //update timer
        this.gameClock.update(time, delta);

        //update parallax bg
        this.bgOverlay1.tilePositionX = this.cameras.main.scrollX * 0.3;
        this.bgOverlay1.tilePositionY = this.cameras.main.scrollY * 0.3;

        this.bgOverlay2.tilePositionX = this.cameras.main.scrollX * 0.7;
        this.bgOverlay2.tilePositionY = this.cameras.main.scrollY * 0.7;

        //this.bgOverlay.x = this.Player.x;
        //this.bgOverlay.y = this.Player.y;

        this.pressureDisplay.text = "Depth " + Math.round(this.Player.y/10) + "M";
      

        if(this.Player.oxy <= 0){
            this.gameOver = true;
        }
        if(!this.gameOver){
            this.Player.update();
        }
        else{
            console.log("you're dead");
        }
        for(var i = 0; i < this.plants.children.entries.length; i++)
        {
            this.plants.children.entries[i].update();
        }
        this.isopod1.update();
        this.jelly1.update();
        this.dd1.update();
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
            //console.log('oxygen =' + this.Player.oxy);
            this.oxyTick = this.gameClock.now;
        }
        if(keyF.isDown)
        {
            console.log(this.Player.x);
            console.log(this.Player.y);
            
            
        }
        this.O2Display.text = (this.Player.oxy);

         // check key input for restart
         if(this.gameOver)
         {
            this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', this.O2Config).setOrigin(0.5).setScrollFactor(0);
            this.add.text(game.config.width/2, game.config.height/2 + 64, '(F) to Restart or (A) for Menu').setOrigin(0.5).setScrollFactor(0);
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