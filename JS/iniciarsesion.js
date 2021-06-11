const form = document.forms['iniciar'];

form.onsubmit = (event) => {
  event.preventDefault();
  console.log(formDataToJSON());
}

function formDataToJSON() {
  const user = {};
  Array.from(form.elements).forEach(element => {
    if (element.name) user[element.name] = element.value;
  });
  alert("Iniciado");
  return user;
}
