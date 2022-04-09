import 'phaser';
import * as EasyStar from 'easystarjs';
import MainMenuScene from '../scenes/mainMenuScene';
export enum State{
    IDLE, 
    FOLLOW
}
export default class Grizzly extends Phaser.GameObjects.Sprite {
    easystar: EasyStar.js;
    scene:MainMenuScene;
    enemyState: State = State.IDLE;
    target: Phaser.Math.Vector2;
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
        if(this.enemyState == State.IDLE){
            let distance = Phaser.Math.Distance.Between(this.x, this.y, this.scene.hero.x, this.scene.hero.y);
            if(distance<300){
                this.comuteNextTarget();
            }
        }
        if(this.enemyState== State.FOLLOW){
            this.scene.physics.moveTo(this, this.target.x , this.target.y);
        }
    }
    comuteNextTarget(){
        this.easystar.findPath(
            this.scene.map.worldToTileX(this.x), 
            this.scene.map.worldToTileY(this.y),
            this.scene.map.worldToTileX(this.scene.hero.x),
            this.scene.map.worldToTileY(this.scene.hero.y),
            (path) => {
                this.target = new Phaser.Math.Vector2(this.scene.map.tileToWorldX(path[1].x)+16, (this.scene.map.tileToWorldY(path[1].y)+16) );
                this.enemyState = State.FOLLOW;
            }
        );
        this.easystar.calculate();
    }
}

