class Plant extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame){
        super(scene, x, y, texture, frame);

        //add object to existing scene
        scene.add.existing(this);
        this.depth = -1;
        this.rotation += 1.6;
        this.bubble1 = scene.physics.add.sprite(this.x, this.y, 'bubble').setScale(0.5);
        this.bubble1.setDebugBodyColor(0xFFFF00);
        this.bubble1.depth = -3;
        this.bubble1.body.setCircle(this.bubble1.width/2);
        this.bubble2 = scene.physics.add.sprite(this.x, this.y + 50, 'bubble').setScale(0.5);
        this.bubble2.setDebugBodyColor(0xFFFF00);
        this.bubble2.depth = -2;
        this.bubble2.body.setCircle(this.bubble2.width/2);
        this.startBub = false;
    }
    update()
    {
        if(this.startBub)
        {
            this.bubble2.setVelocityY(-50);
        }
        else{
            this.bubble2.y = this.y + 50;
        }
        this.bubble1.setVelocityY(-50);
        
        if(this.bubble1.y < this.y/2)
        {
            this.startBub = true;
        }
        if(this.bubble1.y < -10)
        {
            this.bubble1.y = this.y + 50;
            this.bubble1.setVisible(true);
        }
        if(this.bubble2.y < -10)
        {
            this.bubble2.y = this.y + 50;
            this.bubble2.setVisible(true);
        }
    }

}