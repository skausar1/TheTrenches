class Bubble extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame){
        super(scene, x, y, texture, frame);

        //add object to existing scene
        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.setDebugBodyColor(0xFFFF00);
        this.depth = 0;
        this.body.setCircle(this.width/2);
    }
    pop()
    {
        this.scene.sound.play('pop');
        this.scene.Player.addOxy(5);
        console.log('oxygen =' + this.scene.Player.oxy);
        this.setVisible(false);
    }

    popCollide()
    {
        this.setVisible(false);
    }

}