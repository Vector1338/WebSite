let salto = 0;
var x = 0;
var y = 0;
export class Game extends Phaser.Scene {
  constructor() {
    super({ key: 'game' });
  }

  preload() {
    this.load.image('background', 'imagenes/background.png');
    this.load.image('gameover', 'imagenes/gameover.png');
    this.load.image('platform', 'imagenes/platform.png');
    this.load.image('player', 'imagenes/player.png');
  }

  create() {
    this.physics.world.setBoundsCollision(true, true, true, true);

    this.add.image(400, 250, 'background');
    this.gameoverImage = this.add.image(400, 90, 'gameover');
    this.gameoverImage.visible = false;

    this.platform = this.physics.add.image(400, 460, 'platform').setImmovable();
    this.platform.body.allowGravity = false;

    this.player = this.physics.add.image(400, 200, 'player');
    this.player.body.allowGravity = true;
    this.player.setCollideWorldBounds(true);

    let velocity = 100 * Phaser.Math.Between(1.3, 2);
    if (Phaser.Math.Between(0, 10) > 5) {
      velocity = 0 - velocity;
    }
    this.player.setVelocity(velocity, 10);

    this.player.setBounce(0);

    this.physics.add.collider(this.player, this.platform, this.saltar, null, this);

    this.cursors = this.input.keyboard.createCursorKeys();
  }

  saltar() {
    salto = 1;
  }

  update() {
    var cursor = document.getElementById('cursor');
    document.addEventListener('mousemove', function(e){
      x = e.clientX;
      y = e.clientY;
      console.log(e);
    });

    if (this.cursors.left.isDown) {
      this.player.setVelocityX(-300);
    } else if (this.cursors.right.isDown) {
      this.player.setVelocityX(300);
    } else {
      this.player.setVelocityX(0);
    }

    if (this.cursors.up.isDown) {
      if (salto === 1) {
        this.player.setVelocityY(-400);
        salto = 0;
      }
    }

    this.player.setPosition(x-4,y-70);
  }
}
