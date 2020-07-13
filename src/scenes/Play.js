class Play extends Phaser.Scene {
    //Constructor
    constructor(){
        super("playScene");
    }

    preload(){
       this.load.image('player','./assets/rocket.png');
       this.load.image('bubble', './assets/BOB.png');
    }

    create(){
    
      //create player object
      this.Player = new Player(this, game.config.width/2, game.config.height/4, 'player', 0, 100);

      //declare movement keys
      keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
      keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
      keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    
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
        this.oxyTick =  this.gameClock.now;

        //following this guide: collision between bubbles and player

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
            bubble = this.add.sprite(Phaser.Math.Between(0, posX),Phaser.Math.Between(0, posY), "bubble");
            this.physics.add.existing(bubble);
            bubble.body.setImmovable(true);
            //bubble.body.checkCollision = true;
            this.bubbleGroup.add(bubble);
           

        }

        //following guide here: https://www.emanueleferonato.com/2018/12/06/html5-endless-runner-built-with-phaser-and-arcade-physics-step-3-adding-textures-to-platforms-and-coins-to-collect/
        //set up collision between player and bubbles

        this.physics.add.overlap(this.Player, this.bubbleGroup, function(player, bubble){
            this.tweens.add({
                targets: bubble,
                alpha: 0,
                duration: 0,
                ease: "Cubic.easeOut",
                callbackScope: this,
                onComplete: function(){
                    this.bubbleGroup.killAndHide(bubble);
                    this.bubbleGroup.remove(bubble);
                    
                }
            }
            );
        }, null, this);       
    }


    update(time, delta){


        //update timer
        this.gameClock.update(time, delta);

        //checking failstate (too little oxygen)
        let gameOver = false;

        if(this.Player.oxy <= 0)
            gameOver = true;

        if(!gameOver)
            this.Player.update();
        else    
            console.log("you're dead!");

        
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

        if(this.gameClock.now - this.tick >= 2500)
        {
            console.log('bubble time');
            this.addBubble(game.config.width, game.config.height);
            this.tick = this.gameClock.now;
        }

        if(this.gameClock.now - this.oxyTick >= 5000)
        {
            this.Player.addOxy(-1);
            console.log('oxygen =' + this.Player.oxy);
            this.oxyTick = this.gameClock.now;
        }

        if(this.physics.collide(this.Player, this.bubbleGroup))
        {

            this.Player.addOxy(5);
            console.log('oxygen = ' + this.Player.oxy);

        }


    }
}
