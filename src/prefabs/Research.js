class Research extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame, collisionLayer, Player){

        super(scene, x, y, texture, frame);

        //add object to existing scene
        scene.add.existing(this);
        //add physics to object
        scene.physics.add.existing(this);

        scene.physics.add.collider(this, collisionLayer);
        scene.physics.add.collider(this, Player, () => {
            Player.addResearch();
            this.destroy();
        });

    }


    update() {

    }

    reset(){

    }
}