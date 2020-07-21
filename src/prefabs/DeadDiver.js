class DeadDiver extends Phaser.Physics.Arcade.Sprite  {
    constructor(scene, x, y, texture, frame, Player, text){

        super(scene, x, y, texture, frame);

        //add object to existing scene
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.body.setAllowGravity(false);
        

        //must be text array, where each entry is a sentence
        this.text = text;

        this.wordDelay = 200;
        this.lineDelay = 500;
        this.lineIndex = 0;
        this.wordIndex = 0;
        this.depth = 0;

        //creating detection zone for when player gets close
        this.collisionZone = this.scene.add.zone(this.x, this.y, 100, 100);
        scene.physics.add.existing(this.collisionZone);
        this.collisionZone.body.setAllowGravity(false);

        //adding function so that overlapping triggers text to display
        scene.physics.add.overlap(this.collisionZone, Player, () => this.triggerText(), null, this);
        this.written = false;
    }

    triggerText() {
        console.log('in zone');
        console.log(this.collisionZone);
       if(!this.written)
        this.passage = this.scene.add.text(this.x - 75, this.y - 50, this.text, {font: 'Courier', fontSize: '16px'});

        this.written = true;
       // this.nextLine();
    }

    nextLine() {
        if(this.lineIndex == this.text.length)
            return;
        
        let line = this.text[this.lineIndex].split(' ');

        this.wordIndex = 0;

        this.dly = this.scene.time.addEvent({
	        delay: this.wordDelay,
            callback: this.nextWord(line),
	        loop: true})
        // this.scene.time.events.(this.wordDelay, line.length, this.nextWord(), this);
    }

    nextWord(line) {
        this.passage.text = this.passage.text.concat(line[this.wordIndex] + " ");

        this.wordIndex++;

        if(this.wordIndex == line.length)
        {
            this.passage.text = this.passage.text.concat('\n');

            this.scene.time.events.add(this.lineDelay, this.nextLine, this)
        }
    }
}