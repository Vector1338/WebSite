const form = document.forms['registrar'];

form.onsubmit = (event) => {
  event.preventDefault();
  console.log(formDataToJSON());
}

function formDataToJSON() {
  const user = {};
  Array.from(form.elements).forEach(element => {
    if (element.name) user[element.name] = element.value;
  });
  alert("Registrado");
  return user;
}
