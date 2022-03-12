import 'phaser';
import Hero from '../entities/hero';

export default class MainMenuScene extends Phaser.Scene {
    hero: Hero;
    constructor() {
        super({ key: 'MainMenuScene' });
    }

    preload() {
        this.load.spritesheet('idle-e-spritesheet', 'assets/hero/idle_aggro_E.png', { frameWidth: 128, frameHeight: 128 });
        this.load.spritesheet('walk-e-spritesheet', 'assets/hero/walk_aggro_E.png', { frameWidth: 128, frameHeight: 128 });
        this.load.spritesheet('walk-s-spritesheet', 'assets/hero/walk_aggro_S.png', { frameWidth: 128, frameHeight: 128 });
        this.load.spritesheet('idle-s-spritesheet', 'assets/hero/idle_aggro_S.png', { frameWidth: 128, frameHeight: 128 });
        this.load.spritesheet('idle-n-spritesheet', 'assets/hero/idle_aggro_N.png', { frameWidth: 128, frameHeight: 128 });
        this.load.spritesheet('walk-n-spritesheet', 'assets/hero/walk_aggro_N.png', { frameWidth: 128, frameHeight: 128 });
        this.load.spritesheet('atk-n-spritesheet', 'assets/hero/atk_heavy_N.png', { frameWidth: 128, frameHeight: 128 });
        this.load.spritesheet('atk-e-spritesheet', 'assets/hero/atk_heavy_E.png', { frameWidth: 128, frameHeight: 128 });
        this.load.spritesheet('atk-s-spritesheet', 'assets/hero/atk_heavy_S.png', { frameWidth: 128, frameHeight: 128 });
        this.load.image('tiles', 'assets/tilesets/ground-tileset.png');
        this.load.tilemapTiledJSON('map', 'assets/tilemaps/town.json');
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

        let map = this.make.tilemap({ key: 'map' });
        let tileset = map.addTilesetImage('ground', 'tiles', 32, 32, 1, 2);

        let belowLayer = map.createLayer('Below hero', tileset, 0, 0);
        let objBelowLayer = map.createLayer('Objects below hero', tileset, 0, 0);
        let worldlayer = map.createLayer('World', tileset, 0, 0);
        let abovelayer = map.createLayer('Above hero', tileset, 0, 0);
        worldlayer.setCollisionBetween(tileset.firstgid, tileset.firstgid + tileset.total, true);

        let spawnPoint = map.findObject('Objects', (obj) => obj.name == 'Spawn Point');

        this.hero = new Hero(this, spawnPoint.x, spawnPoint.y);

        abovelayer.setDepth(100);
        this.hero.setDepth(50);

        this.physics.add.collider(this.hero, worldlayer);
        this.cameras.main.startFollow(this.hero);
        this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
        this.physics.world.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
        this.physics.world.setBoundsCollision(true, true, true, true);
    }

    update(time, delta) {}
}
