/**
 * Script para gestionar el pacman
 */

/**
 * direction:
 *  0-top
 *  1-right
 *  2-bottom
 *  3-left
 */
let position={
    direction:3,
    h:9,
    v:11
}
let score=0;
let speed=700;

// Dibujamos el comecocos
document.querySelectorAll("#board>div")[(position.v*19)+position.h].classList.remove("food");
document.querySelectorAll("#board>div")[(position.v*19)+position.h].classList.add("comecocos");

// detectamos la pulsacion de las teclas de movimiento
window.addEventListener("keyup", e => {
    e.preventDefault();
    if (e.code=="ArrowUp" && canUp()) { // up
        position.direction=0;
    } else if (e.code=="ArrowRight" && canRight()) { // right
        position.direction=1;
    } else if (e.code=="ArrowDown" && canDown()) { // down
        position.direction=2;
    } else if (e.code=="ArrowLeft" && canLeft()) { // left
        position.direction=3;
    }
});

let interval=setInterval(() => {
    // Escondemos el pacman
    document.querySelectorAll("#board>div")[(position.v*19)+position.h].classList.remove("comecocos");

    // Comprovamos si puede seguir moviendose en la misma direccion
    if (position.direction==0 && canUp()) { // up
        position.v=position.v-1;
    } else if (position.direction==1 && canRight()) { // right
        position.h=position.h+1;
        position.h = position.h==19 ? 0 : position.h;
    } else if (position.direction==2 && canDown()) { // down
        position.v=position.v+1;
    } else if (position.direction==3 && canLeft()) { // left
        position.h=position.h-1;
        position.h = position.h==-1 ? 18 : position.h;
    }

    // Movemos el pacman
    const dest=document.querySelectorAll("#board>div")[(position.v*19)+position.h];

    // Comprovamos si hay un cuadro de comida
    if (dest.classList.contains("food")) {
        // Eliminamos el cuadro de comida
        dest.classList.remove("food");
        // Aumentamos la puntuacion
        document.getElementById("score").innerHTML=++score;
        // Si no queda comida, finalizamos el juego
        if (document.querySelectorAll("#board>div.food").length==0) {
            endGame();
        }
    }

    // Si la casilla tiene una vitamina
    if (dest.classList.contains("energizer")) {
        // Eliminamos la vitamina
        dest.classList.remove("energizer");
        // Convertimos los fantasmas en azules
        convertBlue();
    }
    dest.classList.add("comecocos");
}, speed);

/**
 * Funciones que determinan si pacman puede ir hacia arriba, derecha, abajo o izquierda
 *
 * @return boolean
 */
const canUp = () =>    screenDraw[position.v-1][position.h]==1 || screenDraw[position.v-1][position.h]==9;
const canRight = () => screenDraw[position.v][position.h+1]==1 || screenDraw[position.v][position.h+1]==9 || position.h+1==19;
const canDown = () =>  screenDraw[position.v+1][position.h]==1 || screenDraw[position.v+1][position.h]==9;
const canLeft = () =>  screenDraw[position.v][position.h-1]==1 || screenDraw[position.v][position.h-1]==9 || position.h-1==-1;
