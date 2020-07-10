class Player extends Phaser.Physics.Arcade.Sprite  {
    constructor(scene, x, y, texture, frame, oxygen){
        super(scene, x, y, texture, frame);

        this.oxy = oxygen;
        //add object to existing scene
        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.setDrag(10);
        //this.body.setMaxVelocity(50);
        this.setCollideWorldBounds(true);
        this.onWorldBounds = true;

        this.MAX_ACCEL = 200;

        this.canJump = 3;
       
    }

    update()
    {
        this.oxy -= 1;
        this.updateCycle += 1;

        if(this.oxy % 60 == 0)
            console.log('oxygen =' + this.oxy / 60);

        if(this.updateCycle >= 300 && this.canJump <= 0)
            this.canJump = 3;

        if(keyA.isDown)
        {
            this.body.setAccelerationX(-this.MAX_ACCEL);
            //console.log("A is down");
        }
        else if(keyD.isDown)
        {

            this.body.setAccelerationX(this.MAX_ACCEL);
            //console.log("D is down");
        }
        else
        {
            this.body.setAccelerationX(0);
            //console.log("nothing down");
            //this.body.setDrag(0.99);

        }

        if(keySpace.justDown && this.canJump > 0)
        {
            this.setVelocityY(-50);
           // console.log('space');

            this.canJump--;
        }
    }


}