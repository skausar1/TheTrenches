class masterEnemy extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame, pointValue, health, damage){
        super(scene, x, y, texture, frame);
        
        //add object to existing scene
        scene.add.existing(this);

        //store pointValue
        this.points = pointValue;
    }
}