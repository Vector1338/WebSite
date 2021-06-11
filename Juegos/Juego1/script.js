document.getElementById('player').addEventListener("mouseover",sumarPuntos);

puntos = 0;
tiempo = 60;
function sumarPuntos(){
  puntos++;
  document.getElementById('puntos').innerHTML = "Puntos: <b>" + puntos + "</b>";
  randNum1 = Math.round(Math.random()*400);
  randNum2 = Math.round(Math.random()*400);
  document.getElementById('player').style.marginTop = randNum1 + "px";
  document.getElementById('player').style.marginLeft = randNum2 + "px";
  if (puntos == 30){
    alert("Ganaste Crak");
    tiempo = 60;
    puntos = 0;
  }
}

function restarTiempo(){
  tiempo--;
  document.getElementById('tiempo').innerHTML = "Tiempo: "+tiempo;
  if (tiempo == 0){
    alert("Perdiste capo JAJAJAJA re manco");
    tiempo = 60;
    puntos = 0;
  }
}

setInterval(restarTiempo,1000);
