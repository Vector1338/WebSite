window.onload = function(){
//declaracion de la varibles
var cv,
cx,
lastPress = null,
dir = null,
wall = [],
coin =[],
pacman;
var comiendo = new Audio();

//objetos que nos permitiran crear los obstaculos y personajes del juego
var square = function(x,y,wi,he,color){
    this.x = x;
    this.y = y;
    this.wi = wi;
    this.he = he;
    this.color = color;
};
var circle = function(x,y,r,color){
    this.x = x;
    this.y = y;
    this.r = r;

    this.color = color;

};
// en los siguientes prototipos se agregan a los objetos funciones que los dibujan y los mueven por la pantalla
square.prototype ={
    get left(){
        return this.x;
    },
    get right(){
        return this.x + this.wi;
    },
    get top(){
        return this.y;
    },
    get bottom(){
        return this.y + this.he;
    },
    draw: function(){
        cx.beginPath();
        cx.fillStyle = this.color;
        cx.fillRect(this.x,this.y,this.wi,this.he);
        cx.fill();
        cx.closePath();

    }
};
circle.prototype ={
    get left(){
        return this.x - this.r;
    },
    get right(){
        return this.x + this.r;
    },
    get top(){
        return this.y - this.r;
    },
    get bottom(){
        return this.y + this.r;
    },


    draw: function(){
        cx.beginPath();
        cx.fillStyle = this.color;
        cx.moveTo(this.x,this.y);
        cx.arc(this.x,this.y,this.r,Math.PI*2,0,true);
        cx.fill();
        cx.closePath();
    },move: function(TheKey){
        this.lastX = this.x;
        this.lastY = this.y;
        if(TheKey===37){
            dir = 0;
            console.log("a");
        }
        else if(TheKey === 38){
            dir = 1;
        }
        else if(TheKey === 39){
            dir = 2;
        }
        else if(TheKey === 40){
            dir = 3;
        }
        if(dir === 0 ){
          this.x -= 30;
        }
        else if(dir === 1 ){
            this.y -= 30;
        }
        else if(dir === 2 ){
            this.x += 30;
        }
        else if(dir === 3 ){
            this.y += 30;
        }
    },
    intersects: function(rect){
        return (this.left < rect.right &&
           this.right > rect.left &&
            this.top < rect.bottom &&
            this.bottom > rect.top);
    }
};
//es el tile map de donde se dibujara el escenario
var level0=[
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    [1,3,1,0,0,0,0,0,0,1,0,0,0,0,0,0,1,3,1],
    [1,1,1,0,1,0,1,1,0,1,0,1,1,0,1,0,1,1,1],
    [1,0,0,3,0,0,0,1,0,0,0,1,0,0,0,0,0,0,1],
    [1,0,1,0,1,1,0,1,0,1,0,1,0,1,1,0,1,0,1],
    [1,0,1,0,1,1,0,1,0,1,0,1,0,1,1,0,1,0,1],
    [1,0,1,0,0,0,0,0,0,1,0,0,0,0,0,0,1,0,1],
    [1,0,1,1,1,1,0,1,0,1,0,1,0,1,1,1,1,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,1,1,0,1,1,0,1,1,0,1,1,0,1,1,0,1,1,1],
    [1,0,0,0,0,0,0,1,3,3,3,1,0,0,0,0,0,0,1],
    [1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,1,1,1,1,0,1,0,1,0,1,0,1,1,1,1,0,1],
    [1,0,1,0,0,0,0,1,0,0,0,1,0,0,0,0,1,0,1],
    [1,0,1,0,1,1,0,1,0,1,0,1,0,1,1,0,1,0,1],
    [1,0,1,0,1,1,0,1,0,1,0,1,0,1,1,0,1,0,1],
    [1,0,0,0,0,0,0,1,0,0,0,1,0,0,0,0,0,0,1],
    [1,1,1,0,1,0,1,1,0,1,0,1,1,0,1,0,1,1,1],
    [1,3,1,0,0,0,0,0,0,1,0,0,0,0,0,0,1,3,1],
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
];
//se inicializan las variables y se inicia el juego
function init(){
    cv = document.getElementById("lienzo");
    cx = cv.getContext("2d");
    comiendo.src = "../media/come.mp3"
    pacman = new circle(105,105,15,"#FFFF00");
    setMap(level0, 30);
    window.setInterval(run,150);
}
//esta funcion almacena los objetos en array para luego dibujarlos
function setMap(map, blockSize){
    let col = 0,
    columns = 0;
    wall.length = 0;
    for(row of map){
        let ind = map.indexOf(row);
        for(col = 0, columns = map[ind].length; col < columns; col++){
            if(map[ind][col]=== 1){
                wall.push(new square(col * blockSize, ind * blockSize, blockSize, blockSize, "#0055ff"));
            }
            if(map[ind][col]=== 0){
               coin.push(new circle((col*blockSize) + (blockSize / 2),(ind*blockSize) +(blockSize / 2),5,"gold"));
            }
        }
    }
}
//esta funcion dibuja el juego
function draw(){
    cx.clearRect(0,0,cv.width,cv.height);
    for(let w of wall){
        w.draw();
    }
    for(i = 0; i < coin.length; i++){
        coin[i].draw();
    }
    pacman.draw();
}
//colisiones, movimientos, puntajes,etc
function actions(){
    pacman.move(lastPress);
    for(let w of wall){
        if(pacman.intersects(w)){
            pacman.x = pacman.lastX;
            pacman.y = pacman.lastY;
        }
    }
    for(i = 0; i < coin.length; i++){
        if(pacman.intersects(coin[i])){
            coin.splice(coin.indexOf(coin[i]), 1);
         }
    }


}//esta es la funcion que corre el juego a 90 fps
function run(){
    actions();
    draw();
}
//se escucha la ultima tecla presionada, para darle direccion al personaje
window.addEventListener("keydown",function(evt){
    let code = evt.keyCode;
    lastPress = code;
});
init();

};
