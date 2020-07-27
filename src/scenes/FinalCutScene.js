class FinalCutScene extends Phaser.Scene {
    constructor(){
        super("final");
    }

    preload() {
    }
    create(){
        //sets the background color of the game
        this.cameras.main.setBackgroundColor("#000000");
        //menu display, chooses font, size, color, etc
        let menuConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            color: '#FFF',
            align: 'center',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }
        //finds the center of the screen
        this.centerX = game.config.width/2;
        this.centerY = game.config.height/2;
        this.startTalk = true;
        //simple spacer
        this.player = this.add.image(this.centerX, 0, 'Diver').setOrigin(0,0);
        this.monsterText = this.add.text(this.centerX - 275, this.centerY + 50, 'You should have listened to those \n before you explorer').setOrigin(0,0).setAlign('center').setFontSize('28px').setAlpha(0)
        this.monsterText2 = this.add.text(this.centerX - 240, this.centerY + 50, 'Oh well, thanks for dinner...').setOrigin(0,0).setAlign('center').setFontSize('28px').setAlpha(0)
        this.eye1 = this.add.triangle(centerX + 100, 202, 0, 0, 80, 15, 80, -15, 0xFFFF00).setScale(2).setAlpha(0)
        this.eye2 = this.add.triangle(centerX - 75, 200, 0, 0, 80, 15, 80, -15, 0xFFFF00).setScale(2).setAlpha(0)
        this.eye2.scaleX = -1;
        this.eye1.scaleX = 1;

        this.clock = this.time.delayedCall(20000, () => {
            this.scene.start("thanks");
        })
 
    }

    update(){
        if(this.player.y <= this.centerY - 50 ){
            this.player.y += 1.25
        }
        else if(this.player.y >= this.centerY-50 && this.monsterText.alpha != 1 && this.startTalk){
            this.monsterText.alpha += 0.005
        }
        else if(this.monsterText.alpha > 0){
            this.startTalk = false;
            this.monsterText.alpha -= 0.005
        }
        else if(this.monsterText.alpha <= 0 && this.monsterText2.alpha != 1){
            this.monsterText2.alpha += 0.005
        }
        else if(this.monsterText.alpha <= 0){
            this.eye1.alpha += 0.0075;
            this.eye2.alpha += 0.0075;
        }
        if(this.eye1.alpha >= 1){

        }
    }
}
