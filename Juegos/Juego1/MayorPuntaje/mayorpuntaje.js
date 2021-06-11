console.log("a");

traerDatos();

function traerDatos() {
  console.log('b');

  const xhttp = new XMLHttpRequest();

  xhttp.open('GET', './MayorPuntaje/mayor.json', true);

  xhttp.send();

  xhttp.onreadystatechange = function() {

    if (this.readyState == 4 && this.status == 200) {

      let datos = JSON.parse(this.responseText);

      let res = document.querySelector('#res');
      res.innerHTML ='';

      for (let item of datos) {
        res.innerHTML += `
          <tr>
            <td>${item.nombre}</td>
            <td>${item.puntaje}</td>
          </tr>
        `
      }
    }
  }
}
