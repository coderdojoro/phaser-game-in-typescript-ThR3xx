import 'phaser';

export default class MainMenuScene extends Phaser.Scene {

    constructor() {
        super({ key: 'MainMenuScene' });
    }

    preload() {
        this.load.spritesheet('idle-e-spirtesheet', 'assets/hero/idle_aggro_E.png', {frameWidth:128, frameHeight:128});
    }

    create() {
        // remove the loading screen
        let loadingScreen = document.getElementById('loading-screen');
        if (loadingScreen) {
            loadingScreen.classList.add('transparent');
            this.time.addEvent({
                delay: 1000,
                callback: () => {
                    // @ts-ignore
                    loadingScreen.remove();
                }
            });
        }

        this.cameras.main.fadeIn(2000);
        this.cameras.main.setBackgroundColor('#008080');
    
        let hero=this.physics.add.sprite(200,200,'idle-e-spirtesheet',0);
        this.anims.create({
            key:'idle-e-anim',
            frames:this.anims.generateFrameNumbers('idle-e-spritesheet', {}),
            frameRate:10,
            repeat:-1
        });
        hero.anims.play('idle-e-anim');

    }

    update(time, delta) {
        
    }
}
