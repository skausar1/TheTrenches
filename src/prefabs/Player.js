class Player extends Phaser.Physics.Arcade.Sprite  {
    constructor(scene, x, y, texture, frame, oxygen){
        super(scene, x, y, texture, frame);
        this.oxy = oxygen;
        this.cash = 0;

        
        
        //add object to existing scene
        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.setDrag(100);
        this.MAX_ACCEL = 200;
        this.body.setMaxVelocity(120);
        this.body.setCollideWorldBounds(true);
        
       this.isInvincible = false;
    }

    addOxy(oxy) {
        this.oxy += oxy;
    }

    dealDamage(damAmount, enemy) {
        if(!this.isInvincible){
            this.oxy -= damAmount;
             this.body.setVelocityX(-this.body.velocityX);
             this.body.setVelocityY(-100);
            //this.body.setBounce(1);
            console.log('hit');
            this.alpha = 0.5;
            this.isInvincible = true;
            this.playerReset = this.scene.time.addEvent({
	        delay: 1500,
	        callback: ()=>{
            this.alpha = 1;
            this.isInvincible = false;
	},
	loop: false
})
        }
    }

    toggleInvincibility() {
        this.isInvincible = !this.isInvincible;
        console.log(this.isInvincible);
        //this.body.setBounce(0);
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
            //console.log("A is down");
        }
        else if(keyD.isDown)
        {
            this.setFlip(true, false);
            this.body.setAccelerationX(this.MAX_ACCEL);
            this.anims.play('walkLeft', true);
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