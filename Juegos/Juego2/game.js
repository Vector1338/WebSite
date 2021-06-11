const WIDTH = 400;
const HEIGH = 400;

let objetivo = {
  x: getRandomNumber(WIDTH),
  y: getRandomNumber(HEIGH)
};

let $mapa = document.getElementById('mapa');
let $distancia = document.getElementById('distancia');
let clicks = 0;

$mapa.addEventListener('click',function (evento) {
  clicks++;
  let distancia = getDistance(evento, objetivo);
  let pistaDistancia = getDistanceHint(distancia);
  $distancia.innerHTML = `<h1>${pistaDistancia}</h1>`
  if (distancia < 20){
    alert(`Has encontrado el tesoro, y lo has echo en ${clicks} intentos`);
    location.reload();
  }
})
