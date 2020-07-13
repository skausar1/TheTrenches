class Play extends Phaser.Scene {
    //Constructor
    constructor(){
        super("playScene");
    }

    preload(){
       this.load.image('player','./assets/rocket.png');
       this.load.image('bubblePic', './assets/BOB.png');
       this.load.audio('bubbleSound', './assets/bubblePopRefined.wav');
       this.load.atlas('Diver','./assets/DiverV.png','./assets/DiverV.json');
    }

    create(){
        
        this.camera = this.cameras.main;

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
        
        
      //create player object
      this.Player = new Player(this, game.config.width/2, game.config.height/4, 'Diver',  "DiverV0", 3600);
      //this.ship01 = new Spaceship(this, game.config.width + 192, 132, 'pyr','Pyramid0001',30).setOrigin(0,0).anims.play('fly'); 
      //declare movement keys
      keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
      keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
      keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
      
        this.cameras.main.setBounds(0,0,480,1000);
        this.cameras.main.startFollow(Player, 0, 0, 0, 0, 50);

      // followed Phaser 3 guide here: https://phaser.io/examples/v3/view/physics/arcade/overlap-zone
      //create zone to detect whether game should scroll and generate new terrain
      this.scrollZone =  this.add.zone(game.config.width/2, game.config.height - 100).setSize(game.config.width, game.config.height / 2);
      this.physics.world.enable(this.scrollZone);
      this.scrollZone.body.setAllowGravity(false);
      this.scrollZone.body.moves = false;

      this.physics.add.overlap(this.Player, this.scrollZone);
      
    
      //loosely followed guider here: https://www.emanueleferonato.com/2018/12/06/html5-endless-runner-built-with-phaser-and-arcade-physics-step-3-adding-textures-to-platforms-and-coins-to-collect/
      //create group for bubbles
        this.bubbleGroup = this.add.group({
            
            //when a bubble is removed from pool, readd it to bubble group
            removeCallback: function(bubble){
                bubble.scene.bubblePool.add(bubble)
            }
        });

        //create pool for bubbles
        this.bubblePool = this.add.group({

            //when a bubble is removed from group, re-add to bubble pool
            removeCallback: function(bubble){
                bubble.scene.bubbleGroup.add(bubble)
            }
        })

        //keep track of added bubbles
        this.addedBubbles = 0;

        // adding bubbles to the game, the arguments are x position and y position
        this.addBubble( game.config.width / 2, game.config.height);

        //creating clock and timer for timed events
        this.gameClock = new Phaser.Time.Clock(this);
        this.tick = this.gameClock.now;

        // O2 Display panel declaration and implimentation
      this.O2Config = {
        fontFamily: 'Courier',
        frontSize: '28px',
        backgroundColor: '#F3B141',
        color: '#ffffff',
        align: 'right',
        padding:{
            top: 5,
            bottem: 5,
        },
        fixedWidth: 100
        } 
    }

    addBubble(posX, posY)
    {
        this.addedBubbles++;
        let bubble;
      
        if(this.bubblePool.getLength())
        {
            bubble = this.bubblePool.getFirst();
            bubble.x = Phaser.Math.Between(0, posX);
            //only for testing, should be changed to always posY
            bubble.y = Phaser.Math.Between(0, posY);
            this.bubblePool.remove(bubble);
        }
        else
        {
            //again, after testing should change to always posY
            bubble = this.add.sprite(Phaser.Math.Between(0, posX),Phaser.Math.Between(0, posY), "bubblePic").setScale(0.10);
            this.physics.add.existing(bubble);
            bubble.body.setImmovable(true);
            this.bubbleGroup.add(bubble);

        }
    }


    update(time, delta){
        //update timer
        this.gameClock.update(time, delta);

        //checking failstate (too little oxygen)
        let gameOver = false;

        if(this.Player.oxy <= 0)
            gameOver = true;

        if(!gameOver){
            this.Player.update();
            this.O2Display = this.add.text(69,54, "O2 Left " + Math.round(this.Player.oxy / 60), this.O2Config).setScrollFactor(0);
            this.camera.startFollow(this.Player);
        }
        else
            console.log("you're dead!");
        
        if(keyA.isDown)
            this.Player.anims.play('walkLeft');
        
        if(keyD.isDown)
            //this.Player.anims.play('walkRight');
        
        if(!keyD.isDown && !keyA.isDown){
            this.Player.anims.pause('walkLeft');
            //test
            
        }
        //detect if player is in scroll zone
        if(!this.scrollZone.body.touching.none)
            console.log('below half, scroll time');

        //recycling bubbles
        this.bubbleGroup.getChildren().forEach(function(bubble){
            if(bubble.x < - bubble.displayWidth / 2){
                this.bubbleGroup.killAndHide(bubble);
                this.bubbleGroup.remove(bubble);
            }
        }, this);

        if(this.gameClock.now - this.tick >= 1000)
        {
            console.log('bubble time');
            this.addBubble(game.config.width, game.config.height);
            this.tick = this.gameClock.now;
        }
    }
}
