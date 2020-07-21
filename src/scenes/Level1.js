class Level1 extends Phaser.Scene {
    constructor(){
        super("level1");
    }

    preload() {
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
            frameRate: 6,
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

        this.bgOverlay2 = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'water')
        this.bgOverlay2.setOrigin(0, 0);
        this.bgOverlay2.setScrollFactor(0);

        this.map = this.make.tilemap({ key: "map1" });
        this.tileset = this.map.addTilesetImage("AquaSet", "tiles");
        console.log(this.tileset);

        this.belowLayer = this.map.createStaticLayer("WorldLayer", this.tileset, 0, 0);
        console.log(this.belowLayer)

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

        // Let's get the spike objects, these are NOT sprites
        const plantObjects = this.map.getObjectLayer('plants')['objects'];

        // Now we create spikes in our sprite group for each object in our map
        plantObjects.forEach(plantObject => {
            const plant = new Plant(this, plantObject.x, plantObject.y - 32, 'plants').setOrigin(0,0);
            this.plants.add(plant);
        });


        //find player spawn
        const playerSpawn = this.map.findObject("SpawnPoint", obj => obj.name == "SpawnPoint");
        //create player object
        this.Player = new Player(this, playerSpawn.x, playerSpawn.y, 'Diver', 0, 100).setScale(0.5);

        const levelExitSpawn = this.map.findObject("SpawnPoint", obj => obj.name == "level_exit");
        this.levelExit = this.add.zone(levelExitSpawn.x, levelExitSpawn.y, 200, 400);
        this.physics.add.existing(this.levelExit);
        this.levelExit.body.setAllowGravity(false);

        //adding function so that overlapping triggers text to display
        this.physics.add.overlap(this.levelExit, this.Player, () => this.scene.start("level2"), null, this);

        //this.enemies = ['jelly', 'isopod'];
        
        // let enemyObjects = this.map.filterObjects("Spawn", obj => obj.type === "enemySpawn");

        // this.enemies = this.add.group();
        // enemyObjects.map((element) => {

        //     console.log(element.properties[0].value);
        //     let enemy;

        //     if(element.properties[0].value == 'jelly')
        //         enemy = new Jelly(this, element.x, element.y, 'jelly', 0, this.belowLayer, this.Player, 1).setScale(0.25);
        //     else if(element.properties[0].value == 'isopod')
        //         enemy = new isopod(this, 102, 590, 'isopod', 0, this.belowLayer, this.Player, 1);

            
        //     console.log(enemy);

        //     this.enemies.add(enemy);
        // })

        //Mask taken from https://blog.ourcade.co/posts/2020/phaser-3-object-reveal-flashlight-spotlight-magic-lens/
        this.cover = this.add.rectangle(this.map.widthInPixels/2, this.map.heightInPixels/2, this.map.widthInPixels, this.map.heightInPixels,  0x000000);
        
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
        //this.cover.setOrigin(.5,0);

		this.cover.mask = new Phaser.Display.Masks.BitmapMask(this, maskImage)
		this.cover.mask.invertAlpha = true
        //end of mask code

		this.Player.mask = new Phaser.Display.Masks.BitmapMask(this, maskImage)

		this.light = this.add.circle(0, 0, 20, 0xFFF, 1)
        this.light.visible = false;
        this.light2 = this.add.triangle(this.Player.x,this.Player.y, 0, 0, 80, 15, 80, -15, 0xFFF)
        this.light2.visible = false;
        console.log(this.light2);

        this.renderTexture = rt

        this.isopod1 = new isopod(this, 102, 590, 'isopod', 0, this.belowLayer, this.Player, 1);
        this.jelly1 = new Jelly(this, 1000, 250, 'jelly', 0, this.belowLayer, this.Player, 1);
        this.dd1 = new DeadDiver(this, 1585, 1128, 'fossil', 0, this.Player, ["I crave death", "please be merciful"]);
        this.crab1 = new Crab(this, this.Player.x, this.Player.y + 75, 'crab', 0, this.belowLayer, this.Player, 1);
        this.dd1.setVisible(false);

        this.cameras.main.setZoom(1.5);
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
        this.O2Display = this.add.text(500, 97, Math.round(this.Player.oxy), this.O2Config).setScrollFactor(0).setScale(0.75).setDepth(101);
        this.O2Display.setColor("black");
        this.O2Display.setFontSize(14);

        //Displays Depth by y of player
        this.pressureDisplay = this.add.text(450, 25, "Depth " + Math.round(this.Player.y/10) + "M", this.O2Config).setScrollFactor(0);

        //checking failstate (too little oxygen)
        this.gameOver = false;

        this.gameOverIsDisplayed = false;
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
        this.cover.alpha = this.Player.y/1000;
      

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
        this.crab1.update();
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
            if(!gameOverIsDisplayed){
            this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', this.O2Config).setOrigin(0.5).setScrollFactor(0);
            this.add.text(game.config.width/2, game.config.height/2 + 64, '(F) to Restart or (A) for Menu').setOrigin(0.5).setScrollFactor(0);
            this.gameOverIsDisplayed = true;
        }
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
        if(this.Player.isLeft)
        {
            this.light2.scaleX = -1;
            this.renderTexture.draw(this.light2, x - 20, y + 15)
        }
        else
        {
            this.light2.scaleX = 1;
            this.renderTexture.draw(this.light2, x + 20, y + 15)
        }

        if(this.Player.isDown)
        {
            this.light2.scaleY = -1;
            this.renderTexture.draw(this.light2, x + 20, y - 15)
        }
        else if(this.Player.isUp)
        {
            this.light2.scaleY = 1;
            this.renderTexture.draw(this.light2, x + 20, y + 15)
        }
        
    }

}