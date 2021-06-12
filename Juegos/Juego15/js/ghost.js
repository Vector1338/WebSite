/**
 * Script para gestionar los fantasmas
 */

/**
 * direction:
 *  0-top
 *  1-right
 *  2-bottom
 *  3-left
 */
let speedGhost=150;

function ghost(direction, h, v, color, interval) {
    this.direction=direction;
    this.h=h;
    this.v=v;
    this.color=[color];
    this.interval=interval;
    this.addColor=function(color) {
        if (this.color.indexOf(color)==-1) {
            this.color.push(color);
        }
    };
    this.removeColor=function(color) {
        if (this.color.indexOf(color)!=-1) {
            this.color.splice(this.color.indexOf(color), 1);
        }
    };
    this.elementAddColor=function(element) {
        this.color.forEach(c => element.classList.add(c));
    };
    this.elementRemoveColor=function(element) {
        this.color.forEach(c => element.classList.contains(c) ? element.classList.remove(c) : null);
    };
}

let ghosts=[
    new ghost(3, 9, 7, "red"),
    new ghost(0, 8, 9, "pink"),
    new ghost(0, 9, 9, "purple"),
    new ghost(0, 10, 9, "orange"),
];

// dibujamos los fantasmas
ghosts.forEach(g => {
    g.elementAddColor(document.querySelectorAll("#board>div")[(g.v*11)+g.h]);
    g.interval=setInterval(() => {
        // revisamos si hay colision con pacman
        if (checkCollision(g)) {
            return;
        }

        // buscamos la siguiente direccion para el fantasma
        g.direction=newDirection(g);
        g.elementRemoveColor(document.querySelectorAll("#board>div")[(g.v*11)+g.h]);
        if (g.direction==0 && gCanUp(g)) {
            g.v=g.v-1;
        } else if (g.direction==1 && gCanRight(g)) {
            g.h=g.h+1;
            g.h = g.h==11 ? 0 : g.h;
        } else if (g.direction==2 && gCanDown(g)) {
            g.v=g.v+1;
        } else if (g.direction==3 && gCanLeft(g)) {
            g.h=g.h-1;
            g.h = g.h==-1 ? 10 : g.h;
        }
        g.elementAddColor(document.querySelectorAll("#board>div")[(g.v*11)+g.h]);

        // revisamos si hay colision con pacman
        checkCollision(g);
    }, speedGhost);
});

/**
 * function to check if there are any collision
 *
 * @param {ghost object} g
 *
 * @return boolean
 */
const checkCollision = g => {
    // Si la posicion del fantasma es la misma que la de pacman
    if (g.v==position.v && g.h==position.h) {
        // Revisamos si el fantasma esta en azul para comerlo
        if (document.querySelectorAll("#board>div")[(g.v*19)+g.h].classList.contains("blue")) {
            g.elementRemoveColor(document.querySelectorAll("#board>div")[(g.v*11)+g.h]);
            g.removeColor("blue");
            g.h=1;
            g.v=1;
            g.elementAddColor(document.querySelectorAll("#board>div")[(g.v*11)+g.h]);
            score=score+10;
            document.getElementById("score").innerHTML=score;
        } else {
            endGame();
        }
        return true;
    }
    return false;
}

/**
 * Funciones que determinan si el fantasma puede ir hacia arriba, derecha, abajo o izquierda
 *
 * @param {ghost object} g
 *
 * @return boolean
 */
const gCanUp = g => screenDraw[g.v-1][g.h]==1 || screenDraw[g.v-1][g.h]==2;
const gCanRight = g => screenDraw[g.v][g.h+1]==1 || g.h+1==11;
const gCanDown = g => screenDraw[g.v+1][g.h]==1;
const gCanLeft = g => screenDraw[g.v][g.h-1]==1 || g.h-1==-1;

/**
 * Function to get new direction to ghost
 *
 * @param {ghost object} g
 *
 * @return integer [0-up|1-right|2-down|3-left]
 */
const newDirection = g => {
    // Creamos un array con los posibles movimientos del fantasma
    const position = [
        g.direction!=2 && gCanUp(g) ? 1 : 0,
        g.direction!=3 && gCanRight(g) ? 1 : 0,
        g.direction!=0 && gCanDown(g) ? 1 : 0,
        g.direction!=1 && gCanLeft(g) ? 1 : 0
    ];
    const sum=position.reduce((a,b) => a+b);

    // Obtenemos un numero aleatorio entre los posibles movimientos
    const random=Math.floor(Math.random() * sum);

    // Devolvemos el siguiente movimiento del fantasma [0-up|1-right|2-down|3-left]
    for (let i=0, pos=-1; i<position.length; i++) {
        pos = position[i]==1 ? pos+1 : pos;
        if (pos==random) {
            return i
        }
    }
}

/**
 * Funcion que se ejecuta al finalizar el juego
 */
function endGame() {
    // Detenemos el movimiento de los fantasmas
    ghosts.forEach(g => clearInterval(g.interval));

    // Detenemos el movimiento del pacman
    clearInterval(interval);

    // Ponemos un intervalo en el pacman para que parpadee
    setInterval(() => {
        document.querySelectorAll("#board>div")[(position.v*11)+position.h].classList.toggle("comecocos")
    }, 1000);
}

/**
 * Funcion que se ejecuta cuando nos comemos una vitamina
 * Convierte los fantasmas azules durante 10 segundos
 */
function convertBlue() {
    ghosts.forEach(g => g.addColor("blue"));
    setTimeout(() => {
        ghosts.forEach(g => g.removeColor("blue"));
    }, 10000);
}
