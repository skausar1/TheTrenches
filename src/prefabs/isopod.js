class isopod extends masterEnemy {
    constructor(scene, x, y, multiplyer){
        super(scene, x, y, texture, frame);

        //add object to existing scene
        scene.add.existing(this);
        this.aniFrames = [];
        //list of starting frame
        this.frame = aniFrames[multiplyer-1];

        //store pointValue health, damage,
        this.points = 10 * multiplyer;
        this.health = 5 * multiplyer;
        this.damage = 5 * multiplyer;

    }
    preload(){
        this.load.image('iso', './assets/rocket.png');
    }

    update() {
        
    }

    reset(){
        this.x = game.config.width;
    }
}