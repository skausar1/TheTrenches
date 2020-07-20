class Plant extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame){
        super(scene, x, y, texture, frame);

        //add object to existing scene
        scene.add.existing(this);
        this.depth = 0;
        this.bubble1 = new Bubble(scene, this.x + 15, this.y, 'bubble').setScale(0.5);
        this.bubble2 = new Bubble(scene, this.x + 15, this.y, 'bubble').setScale(0.5);
        scene.bubbles.addMultiple([this.bubble1, this.bubble2]);
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