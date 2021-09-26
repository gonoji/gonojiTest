//変数
let Game = {};
let Data = {};

//Game Size
Game.width = 800;
Game.height = 450;

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
class CantStop extends Phaser.Scene {

	constructor() {
		super({key: 'CantStop'});
		let dicePict;
	}
	//let dicePict;
	preload(){
		this.load.spritesheet('dice', 'gonojisGame/assets/dice.png', { frameWidth: 32, frameHeight: 32 });
	}

	create() {
		let textTitle = this.add.text(Game.width/16, Game.height/12, 'Cant Stop').setFontSize(30).setFontFamily("Arial");
		let textTurn = this.add.text(Game.width/16, Game.height/5, '誰のターンです?').setFontSize(20).setFontFamily("Arial");
		
		let choices=[[[],[]],[[],[]],[[],[]]];
		let row=0;
		let column=0;
		for(const choiceId in choices){
			for(const pairId in choices[choiceId]){
				choices[choiceId][pairId]=[];
				const x0= pairId==0 ? Game.width/16 : Game.width/6;
				const x1= x0+36;
				const y = Game.height/2 + choiceId*48;
				choices[choiceId][pairId][0]=this.add.sprite(x0,y,'dice').setOrigin(0,0);
				choices[choiceId][pairId][1]=this.add.sprite(x1,y,'dice').setOrigin(0,0);
				console.log('pi');
			}
		}
		
		const dices =[];
    	for(let i=0;i<4;i++){
    		dices[i]=this.add.sprite(Game.width/16+48*i, Game.height/3,'dice').setOrigin(0,0);	
    	}
    	


    	for(let i=0;i<4;i++){
    		const a=[0,1,2,3,4,5];
    		const b=[];
    		while(a.length){
    			b.push(a.splice(Phaser.Math.Between(0,a.length-1),1)[0]);
    		}
    		console.log(b)
    		this.anims.create({
        		key: `rolling${i}`,
        		frames: this.anims.generateFrameNumbers('dice',{ frames: b }),
        		frameRate: 16,
        		repeat: -1
    		});
    	}
		this.anims.create({
    		key: 'face1',
        	frames: [{key: 'dice', frame: 0}],
        	frameRate: 10
    	});
    	this.anims.create({
    		key: 'face2',
        	frames: [{key: 'dice', frame: 1}],
        	frameRate: 10
    	});
    	this.anims.create({
    		key: 'face3',
        	frames: [{key: 'dice', frame: 2}],
    		frameRate: 10
    	});
    	this.anims.create({
    		key: 'face4',
        	frames: [{key: 'dice', frame: 3}],
        	frameRate: 10,
    	});
    	this.anims.create({
    		key: 'face5',
        	frames: [{key: 'dice', frame: 4}],
        	frameRate: 10,
    	});
    	this.anims.create({
    		key: 'face6',
        	frames: [{key: 'dice', frame: 5}],
        	frameRate: 10,
    	});


    	dices.forEach((dice, i)=>dice.anims.play(`rolling${i}`,true));

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
	scene: [Title_Scene, Game_Scene, CantStop]
};

let game = new Phaser.Game(config);