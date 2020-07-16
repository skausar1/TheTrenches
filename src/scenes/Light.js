class Light extends Phaser.Scene {
    constructor(){
        super("light");
    }
    create()
	{
        this.cameras.main.setBackgroundColor("#1E53FF");

		const x = 100
		const y = 100

        this.keep = this.add.image(x, y, 'tempBoat')
        this.reveal = this.add.image(x, y, 'tempBoat')
        this.cover = this.add.rectangle(x, y, 600, 600)
        this.cover.setFillStyle(1, 0.8);


		const width = this.cover.width
		const height = this.cover.height

		const rt = this.make.renderTexture({
			width,
			height,
			add: false
		})

		const maskImage = this.make.image({
			x,
			y,
			key: rt.texture.key,
			add: false
		})

		this.cover.mask = new Phaser.Display.Masks.BitmapMask(this, maskImage)
		this.cover.mask.invertAlpha = true

		this.reveal.mask = new Phaser.Display.Masks.BitmapMask(this, maskImage)

		this.light = this.add.circle(0, 0, 40, 0xFFF, 1)
		this.light.visible = false;

        this.renderTexture = rt
        
        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
	}

	update()
	{
		const x = this.reveal.x - this.cover.x + this.cover.width * 0.5
		const y = this.reveal.y - this.cover.y + 20 + this.cover.height * 0.5

		this.renderTexture.clear()
        this.renderTexture.draw(this.light, x, y)

        if(keyA.isDown)
        {
            this.reveal.x -= 10;
        }
        else if(keyD.isDown)
        {
            this.reveal.x += 10;
        }
        this.keep.x = this.reveal.x;
    }
}

