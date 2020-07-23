class Jelly extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame, collisionLayer, Player, multiplyer){

        super(scene, x, y, texture, frame);

         //config walk anim
         this.jellyWalk = this.scene.anims.create({
            key: 'jellyFloat',
            frames: this.scene.anims.generateFrameNumbers('jelly', { start: 0, end: 3, first: 0}),
            frameRate: 3,
            repeat: 1
        })


       
        //add object to existing scene
        scene.add.existing(this);
        //add physics to object
        scene.physics.add.existing(this);

        scene.physics.add.collider(this, collisionLayer);
        scene.physics.add.collider(this, Player, () => Player.dealDamage(10, this));
        this.body.setAllowGravity(false);

        //store pointValue health, damage,
        this.points = 10 * multiplyer;
        this.health = 5 * multiplyer;
        this.damage = 5 * multiplyer;
        
        let chooseDir = [-1, 1];

        this.dir = chooseDir[Phaser.Math.RND.between(0,1)];

        this.ai = this.scene.time.addEvent({delay: 3000, callback: () => this.moveJelly(), loop: true });
        this.anims.play('jellyFloat', true);

       
    }


    moveJelly() {
        this.body.setAccelerationX(Phaser.Math.Between(-2, 2));
        this.body.setAccelerationY(Phaser.Math.Between(-2, 2));
        this.anims.play('jellyFloat', true);
    }

    update() {
        
        this.anims.play('jellyFloat', true);

        // if(this.body.blocked.left || this.body.blocked.right){
        //     this.dir *= -1;
        // }
        // this.body.setVelocityX(50 * this.dir);

        //if(this.body.)
    }

    reset(){
        this.x = game.config.width;
    }
}