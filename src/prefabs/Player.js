class Player extends Phaser.Physics.Arcade.Sprite  {
    constructor(scene, x, y, texture, frame, oxygen){
        super(scene, x, y, texture, frame);
        this.oxy = oxygen;

        //for updating oxy bar
        this.maxOxy = oxygen;
        this.cash = 0;

        
        
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

        //edit sprite physics behavior
        this.setDrag(100);
        this.MAX_ACCEL = 200;
        this.body.setMaxVelocity(120);
        this.body.setCollideWorldBounds(true);
        this.isLeft = false;
        
       this.isInvincible = false;


       //create quip machine
       this.quips = ['By Jove!', 'Good heavens!', 'This is simply marvelous!', 'I hope I can recall the way out...', 'Goodness gracious!', 'What in the name of science is this?']
       //add timer for quip machine

     this.quipTimer = this.scene.time.addEvent({delay: 8000, callback: () => this.onEvent(), callbackScope: this });
    }

    onEvent(){
            let quip = Phaser.Math.RND.pick(this.quips);
            let passage = this.scene.add.text(this.x - 25, this.y - 25, quip, {font: 'Courier', fontSize: '16px'}).setScrollFactor(0);

               var delay = this.scene.time.delayedCall(5000, () => this.scene.tweens.add({
                  targets: passage,
                  alpha: 0,
                  duration: 5000,
                  ease: 'Power2'
                }, this), null, this);

            this.quipTimer.reset({delay: Phaser.Math.Between( 15000, 30000), callback: () => this.onEvent(), callbackScope: this, repeat: 1});
    }


    preload() {
        
    }

    addOxy(oxy) {
        if(this.oxy + oxy <= this.maxOxy)
        {
            this.oxy += oxy;
            this.updateOxyBar(oxy);
        }
        else{
            this.oxy = this.maxOxy;
        }
    }

    updateOxyBar(oxy) {

        //find percentage of bar to obscure
        this.oxyDiff = oxy / this.maxOxy;
        //multiply this percentage by the height of the bar to determine number of pixels to obscure
        this.oxyPixelDiff = this.oxyDiff * 64 * .75;
        this.oxyPixelDiff2 = this.oxyDiff * 64;


        if(oxy < -1)
        {
            //subtract or add appropriate num of pixels
            this.oxyBarMask.y -= this.oxyPixelDiff/2; 
        }
        else
        {
            this.oxyBarMask.y -= this.oxyPixelDiff/1.15;
        }
    }

    //Based on this answer: https://phaser.discourse.group/t/solved-making-a-player-invincible-for-a-brief-time/3211/2

    dealDamage(damAmount, enemy) {
        if(!this.isInvincible){
            this.addOxy(-damAmount);
            this.updateOxyBar(-damAmount);
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

        if(this.updateCycle >= 300 && this.canJump <= 0)
            this.canJump = 3;

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