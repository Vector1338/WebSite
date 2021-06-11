let getRandomNumber = size =>{
  return Math.floor(Math.random() * size);
}

let getDistance = (evento, objetivo) => {
  let diffX = evento.offsetX - objetivo.x;
  let diffY = evento.offsetY - objetivo.y;
  return Math.sqrt((diffX * diffX) + (diffY * diffY));
}

let getDistanceHint = distancia => {
  if (distancia < 30) {
    return "Estas muy cerca";
  } else if (distancia < 40) {
    return "Estas cerca";
  } else if (distancia < 60) {
    return "Te falta";
  } else if (distancia < 100) {
    return "Estas lejos";
  } else if (distancia < 180) {
    return "Estas muy lejos";
  } else if (distancia < 360) {
    return "Estas demasiado lejos";
  } else {
    return "Te fuiste a la punta del cerro";
  }
}
