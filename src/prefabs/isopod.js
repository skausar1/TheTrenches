class isopod extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame, collisionLayer, Player, multiplyer){
        super(scene, x, y, texture, frame);

        //add object to existing scene
        scene.add.existing(this);
        //add physics to object
        scene.physics.add.existing(this);

        scene.physics.add.collider(this, collisionLayer);
        scene.physics.add.overlap(this, Player, () => Player.addOxy(-10));
        //this.aniFrames = [];
        //list of starting frame
        //this.frame = aniFrames[multiplyer-1];

        //store pointValue health, damage,
        this.points = 10 * multiplyer;
        this.health = 5 * multiplyer;
        this.damage = 5 * multiplyer;
        
        let chooseDir = [-1, 1];

        this.dir = chooseDir[Phaser.Math.RND.between(0,1)];
    }


    update() {

        if(this.body.blocked.left || this.body.blocked.right){
            this.dir *= -1;
        }
        this.body.setVelocityX(50 * this.dir);

        //if(this.body.)
    }

    reset(){
        this.x = game.config.width;
    }
}