class isopod extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame, collisionLayer, Player, multiplyer){

        super(scene, x, y, texture, frame);

         //config walk anim
        scene.anims.create({
            key: 'isopodWalk',
            frames: scene.anims.generateFrameNumbers('isopod', { start: 0, end: 3, first: 0}),
            frameRate: 10
        })



        //add object to existing scene
        scene.add.existing(this);
        //add physics to object
        scene.physics.add.existing(this);

        scene.physics.add.collider(this, collisionLayer);
        scene.physics.add.collider(this, Player, () => Player.dealDamage(10, this));
        
        this.body.setAllowGravity(false);
        
        let chooseDir = [-1, 1];

        this.dir = chooseDir[Phaser.Math.RND.between(0,1)];
    }


    update() {

        this.anims.play('isopodWalk');
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