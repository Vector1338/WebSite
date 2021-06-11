import Palas from '../gameObjects/palas.js';

const jugador1 = document.getElementById('jugador1');
const jugador2 = document.getElementById('jugador2');

let contador1 = 0;
let contador2 = 0;

class Scene_play extends Phaser.Scene {
  constructor() {
    super({key: "Scene_play"});
  }

  create() {
    console.log(this);
    let center_width = this.sys.game.config.width/2;
    let center_height = this.sys.game.config.height/2;

    // Separador
    this.add.image(center_width, center_height, "separador");

    // Palas
    this.izquierda = new Palas(this, 30, center_height, "izquierda")
    this.derecha = new Palas(this, this.sys.game.config.width-30, center_height, "derecha")

    // Bola
    this.physics.world.setBoundsCollision(false, false, true, true);
    this.ball = this.physics.add.image(center_width, center_height, 'ball');
    this.ball.setCollideWorldBounds(true);
    this.ball.setBounce(1);
    this.ball.setVelocityX(-300);

    // Fisicas
    this.physics.add.collider(this.ball, this.izquierda, this.chocaPala, null, this);
    this.physics.add.collider(this.ball, this.derecha, this.chocaPala, null, this);

    // Controles
    // Pala derecha
    this.cursor = this.input.keyboard.createCursorKeys();

    // Pala izquierda
    this.cursor_W = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    this.cursor_S = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
  }

  update() {
    if(this.ball.x < 0 || this.ball.x > this.sys.game.config.width) {
      if (this.ball.x < 0) {
        contador2++;
        this.ball.setPosition(this.sys.game.config.width/2, this.sys.game.config.height/2);
      }

      if (this.ball.x > this.sys.game.config.width) {
        contador1++;
        this.ball.setPosition(this.sys.game.config.width/2, this.sys.game.config.height/2);
      }

      jugador1.textContent = contador1;
      jugador2.textContent = contador2;
    }

    // Control de las palas
    // Pala derecha
    if(this.cursor.down.isDown) {
      this.derecha.body.setVelocityY(300);
    } else if(this.cursor.up.isDown) {
      this.derecha.body.setVelocityY(-300);
    } else {
      this.derecha.body.setVelocityY(0);
    }

    // Pala izquierda
    if(this.cursor_S.isDown) {
      this.izquierda.body.setVelocityY(300);
    } else if(this.cursor_W.isDown) {
      this.izquierda.body.setVelocityY(-300);
    } else {
      this.izquierda.body.setVelocityY(0);
    }
  }

  chocaPala() {
    this.ball.setVelocityY(Phaser.Math.Between(-120, 120));
  }
}

export default Scene_play;
