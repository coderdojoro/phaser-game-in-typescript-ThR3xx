import 'phaser';
import * as EasyStar from 'easystarjs';
import MainMenuScene from '../scenes/mainMenuScene';
export default class Grizzly extends Phaser.GameObjects.Sprite {
    easystar: EasyStar.js;
    scene:MainMenuScene;
    constructor(scene, x, y) {
        super(scene, x, y, 'idle-e-spritesheet', 0);
        this.scene = scene;
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        (this.body as Phaser.Physics.Arcade.Body).setSize(20, 31);
        (this.body as Phaser.Physics.Arcade.Body).setOffset(6, 1);

        this.anims.create({
            key: 'grizzly-idle-anim',
            frames: this.anims.generateFrameNumbers('grizzly-idle-spritesheet', {}),
            frameRate: 5,
            repeat: -1,
        })
        this.anims.play('grizzly-idle-anim', true);

        this.easystar = new EasyStar.js();
        this.easystar.setGrid(this.scene.worldLayer.layer.data.map((arr)=>arr.map((tile)=> tile.index)));
        this.easystar.setAcceptableTiles(-1);
        this.easystar.enableDiagonals();
        this.easystar.enableCornerCutting();

        
    }
    preUpdate(time, delta) {
        super.preUpdate(time, delta);
        let distance = Phaser.Math.Distance.Between(this.x, this.y, this.scene.hero.x, this.scene.hero.y);
        if(distance<300){
            console.log("moving");
        }
    }
}

