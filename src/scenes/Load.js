class Load extends Phaser.Scene {
    constructor(){
        super("load");
    }
    preload() {

        var progressBar = this.add.graphics();
        var progressBox = this.add.graphics();
        progressBox.fillStyle(0x222222, 0.8);
        progressBox.fillRect(155, 216, 320, 50);
        var width = this.cameras.main.width;
        var height = this.cameras.main.height;
        var loadingText = this.make.text({
            x: width / 2,
            y: height / 2 - 50,
            text: 'Loading...',
            style: {
                font: '20px monospace',
                fill: '#ffffff'
            }
        });
        loadingText.setOrigin(0.5, 0.5);

        var percentText = this.make.text({
            x: width / 2,
            y: height / 2 - 5,
            text: '0%',
            style: {
                font: '18px monospace',
                fill: '#ffffff'
            }
        });

        var assetText = this.make.text({
            x: width / 2,
            y: height / 2 + 50,
            text: '',
            style: {
                font: '18px monospace',
                fill: '#ffffff'
            }
        });
        assetText.setOrigin(0.5, 0.5);
        percentText.setOrigin(0.5, 0.5);

        //Load all new assests between these comments
        //
        //
        //
        this.load.image('boat', './assets/Boat.png');
        this.load.image('bubble', './assets/bubble.png');
        this.bgTile1 = this.load.image('water', './assets/Water_Overlay.png');
        this.bgTile2 = this.load.image('wall', './assets/pxBG1.png');
        this.load.image('plants', './assets/plant.png');
        this.load.image('tiles', './assets/basic_tileset.png');
        this.load.image('fossil', './assets/Fossil.png');
        this.load.image('oxyUI', './assets/tankBlank.png');
        this.load.audio('pop', './assets/bubblePopRefined.wav');
        this.load.atlas('Diver','./assets/DiverV.png','./assets/DiverV.json');
        this.load.spritesheet('isopod', './assets/Iso1.png', {frameWidth: 32, frameHeight: 16, startFrame: 0, endFrame: 4});
        this.load.spritesheet('jelly', './assets/giantJelly.png', {frameWidth: 128, frameHeight: 128, startFrame: 0, endFrame: 3});
        this.load.spritesheet('crab', './assets/SpiderCrab.png', {frameWidth: 16, frameHeight: 16, startFrame: 0, endFrame: 2});
        this.load.spritesheet('oxyBars', './assets/OxyGaugesTrimmed.png', {frameWidth: 11, frameHeight: 64, starFrame: 0, endFrame: 3});

        this.load.tilemapTiledJSON('map1', './assets/Level1.json');
        this.load.tilemapTiledJSON('map2', './assets/Level2.json');
        //
        //
        //
        //end Assest load

        this.load.on('progress', function (value) {
            console.log(value);
            progressBar.clear();
            progressBar.fillStyle(0xffffff);
            progressBar.fillRect(163, 224, 300 * value, 30);
            percentText.setText(parseInt(value * 100) + '%');
        });
                    
        this.load.on('fileprogress', function (file) {
            console.log(file.src);
            assetText.setText('Loading asset: ' + file.key);
        });
         
        this.load.on('complete', function () {
            console.log('complete');
            progressBar.destroy();
            progressBox.destroy();
            loadingText.destroy();
            percentText.destroy();
            assetText.destroy();
        });
    }

    create(){
        this.boat = this.add.image(game.config.width/2, game.config.height/2 - 50, 'boat');
        this.scene.start("menuScene");
    }

}