class Crab extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame, collisionLayer, Player, multiplyer){

        super(scene, x, y, texture, frame);

         //config walk anim
         this.crabWalk = this.scene.anims.create({
            key: 'crabWalk',
            frames: this.scene.anims.generateFrameNumbers('crab', { start: 0, end: 2, first: 0}),
            frameRate: 3,
            repeat: true
        })

        //add object to existing scene
        scene.add.existing(this);
        //add physics to object
        scene.physics.add.existing(this);

        scene.physics.add.collider(this, collisionLayer);
        scene.physics.add.collider(this, Player, () => Player.dealDamage(10, this));
        console.log(this);
        //this.aniFrames = [];
        //list of starting frame
        //this.frame = aniFrames[multiplyer-1];

        //store pointValue health, damage,
        this.points = 10 * multiplyer;
        this.health = 5 * multiplyer;
        this.damage = 5 * multiplyer;
        
        let chooseDir = [-1, 1];

        this.dir = chooseDir[Phaser.Math.RND.between(0,1)];

        this.anims.play('crabWalk', true);


        this.collisionZone = this.scene.add.zone(this.x, this.y, 100, 100);
        scene.physics.add.existing(this.collisionZone);
        this.collisionZone.body.setAllowGravity(false);

        //adding function so that overlapping triggers text to display
        scene.physics.add.overlap(this.collisionZone, Player, () => this.jump(), null, this);

       
    }

    jump() {
        this.body.setVelocityY(-50);
    }


    update() {

       
        this.anims.play('crabWalk');
        this.collisionZone.x = this.x;
        this.collisionZone.y = this.y;
        if(this.body.blocked.left || this.body.blocked.right){
            this.dir *= -1;
        }
        this.body.setVelocityX(50 * this.dir);
    }

    reset(){
        this.x = game.config.width;
    }
}