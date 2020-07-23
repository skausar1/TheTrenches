class Player extends Phaser.Physics.Arcade.Sprite  {
    constructor(scene, x, y, texture, frame, oxygen, numResearch){
        super(scene, x, y, texture, frame);
        this.oxy = oxygen;
        this.researchGot = numResearch;

        //for updating oxy bar
        this.maxOxy = 100;
        this.numResearch = numResearch;
        
        //add object to existing scene
        scene.add.existing(this);
        scene.physics.add.existing(this);

        //adding sprites oxy bar
        scene.add.sprite(505, 110, 'oxyUI', 0).setScrollFactor(0).setScale(0.75).setDepth(100);
        this.oxyBar = scene.add.sprite(490, 110, 'oxyBars', 0).setScrollFactor(0).setScale(0.75).setDepth(100);
        this.oxyBarMask = scene.add.sprite(490, 110, 'oxyBars', 0).setScrollFactor(0).setScale(0.75).setDepth(100);
        this.oxyBarMask.visible = false;

        //add mask for oxy bar
        this.oxyBar.mask = new Phaser.Display.Masks.BitmapMask(scene, this.oxyBarMask);

        this.updateOxyBar(-(this.maxOxy - this.oxy));

        //edit sprite physics behavior
        this.setDrag(100);
        this.MAX_ACCEL = 200;
        this.body.setMaxVelocity(120);
        this.body.setCollideWorldBounds(true);
        this.isLeft = false;
        
        this.isInvincible = false;

        this.passage = null;
       //create quip machine
       this.quips = ['By Jove!', 'Good heavens!', 'This is simply marvelous!', 'I hope I can recall the way out...', 'Goodness gracious!', 'What in the name of science is this?']
       //add timer for quip machine

     this.quipTimer = this.scene.time.addEvent({delay: 8000, callback: () => this.onEvent(), callbackScope: this });
    }

    onEvent(){
            let quip = Phaser.Math.RND.pick(this.quips);
            this.passage = this.scene.add.text(this.body.position.x + 10, this.body.position.y - 20, quip, {fontFamily: 'Courier', fontSize: '8px'});
               var delay = this.scene.time.delayedCall(2000, () => this.scene.tweens.add({
                  targets: this.passage,
                  alpha: 0,
                  duration: 3000,
                  ease: 'Power2'
                }, this), null, this);

            this.quipTimer.reset({delay: Phaser.Math.Between( 15000, 30000), callback: () => this.onEvent(), callbackScope: this, repeat: 1});
    }


    preload() {
        
    }

    addResearch() {
     this.researchGot += 1;

     let research = this.scene.add.text(this.x, this.y, 'Research gained!', {fontFamily: 'Courier', fontSize: '16px'});
     var delay = this.scene.time.delayedCall(2000, () => this.scene.tweens.add({
        targets: research,
        alpha: 0,
        duration: 3000,
        ease: 'Power2'
      }, this), null, this);
    }

    addOxy(oxy) {
        if(this.oxy + oxy <= this.maxOxy)
        {
            this.oxy += oxy;
            this.updateOxyBar(oxy);
        }
        else{
            this.updateOxyBar(this.maxOxy - this.oxy)
            this.oxy = this.maxOxy;
        }
        
    }

    updateOxyBar(oxy) {
        //find percentage of bar to obscure
        this.oxyDiff = oxy / this.maxOxy;
        //multiply this percentage by the height of the bar to determine number of pixels to obscure
        this.oxyPixelDiff = this.oxyDiff * 64 * .75;
        this.oxyPixelDiff2 = this.oxyDiff * 64;


        this.oxyBarMask.y -= this.oxyPixelDiff; 
    }

    //Based on this answer: https://phaser.discourse.group/t/solved-making-a-player-invincible-for-a-brief-time/3211/2

    dealDamage(damAmount, enemy) {
        if(!this.isInvincible){
            this.scene.sound.play("enemyHit");
            this.addOxy(-damAmount);
            this.body.setBounce(1);
            // this.body.setVelocityX(-this.body.velocity);
             console.log(this.body.velocity);
             this.body.setVelocityY(-100);
            
            console.log('hit');
            this.alpha = 0.5;
            this.isInvincible = true;
            this.playerReset = this.scene.time.addEvent({
	        delay: 1500,
	        callback: ()=>{
            this.alpha = 1;
            this.isInvincible = false;
            this.body.setBounce(0);
	},
	loop: false
})
        }
    }


    update()
    {
        this.updateCycle += 1;

        if(this.passage != null)
        {
            this.passage.x = this.body.position.x + 10;
            this.passage.y = this.body.position.y - 20;
        
        }
        if(keyA.isDown)
        {
            this.body.setAccelerationX(-this.MAX_ACCEL);
            this.anims.play('walkLeft', true);
            this.resetFlip();
            this.isLeft = true;

            //console.log("A is down");
        }
        else if(keyD.isDown)
        {
            this.setFlip(true, false);
            this.body.setAccelerationX(this.MAX_ACCEL);
            this.anims.play('walkLeft', true);
            this.isLeft = false;
            //console.log("D is down");
        }
        else if(this.body.velocity.x != 0)
        {
            this.body.setAccelerationX(0);
            this.anims.play('walkLeft', true);
            //console.log("nothing down");
            //this.body.setDrag(0.99);
        }
        else
        {
            this.body.setAccelerationX(0);
            this.anims.play('idle');
        }

        if(keySpace.isDown)
        {
            this.body.setVelocityY(-65);
           // console.log('space');
        }
        else if(keyS.isDown)
        {
            this.setVelocityY(80);
        }

    }


}