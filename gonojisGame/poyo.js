//変数
let Game = {};
let Data = {};

//Game Size
Game.width = 800;
Game.height = 400;

//Title_Scene
class Title_Scene extends Phaser.Scene {

	constructor() {
		super({
			key: 'Title_Scene'
		});
	}

	preload() {


	}

	create() {
		//Game Title
		let title = this.add.text(Game.width / 2, Game.height / 3 * 1, 'GAME TITLE', {font: '40px Arial'}).setOrigin(0.5);

		//Start Button
		let start = this.add.text(Game.width / 2, Game.height / 3 * 2, 'START', {font: '20px Arial'}).setInteractive().setOrigin(0.5).setTint(0xff00ff, 0xffff00, 0x0000ff, 0xff0000);

		start.on('pointerdown', function(pointer) {
			this.scene.start('CantStop');
		}, this);

	}

}

//Game Scene
class Game_Scene extends Phaser.Scene {

	constructor() {
		super({key: 'Game_Scene'});
	}

	preload() {

	}

	create() {

	}

	update() {

	}

}

//Game Scene
class CantStop extends Phaser.Scene {

	constructor() {
		super({key: 'CantStop'});
	}
	preload(){
		this.load.spritesheet('dice', 'gonojisGame/assets/dice.png', { frameWidth: 32, frameHeight: 32 });
	}

	create() {
		let text = this.add.text(0, 0, 'dededede').setFontSize(30);
		text.setText('dododoodoa')
		
		dices = this.physics.add.staticGroup({
        	key: 'dice',
       		repeat: 4,
        	setXY: { x: Game.width/2, y: Game.width/4, stepX: 48 }
    	});

	}
	

}


//config
let config = {
	type: Phaser.AUTO,
	parent: 'canvas',
	width: Game.width,
	height: Game.height,
	pixelArt: true,
	//scale: {
    //    	mode: Phaser.Scale.FIT,
	//	autoCenter: Phaser.Scale.CENTER_HORIZONTALLY
	//},
	physics: {
		default: 'arcade',
	},
	scene: [Title_Scene, Game_Scene, CantStop]
};

let game = new Phaser.Game(config);