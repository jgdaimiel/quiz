//función que prepara y devuelve un objeto javascript, en el que se indica cúal es la categoría seleccionada
// el parámetro de entrada 'cat' es el nombre de la categoría
exports.cat_select = function(cat) {
  var selec = {otro: "", humanidades: "", ocio: "", ciencia: "", tecnologia: ""};

  if(cat !== null){

  switch (cat) {
    case "Otro":
      selec.otro = "selected";
      break;

    case "Humanidades":
      selec.humanidades = "selected";
      break;

    case "Ocio":
      selec.ocio = "selected";
      break;

    case "Ciencia":
      selec.ciencia = "selected";
      break;

    case "Tecnologia":
      selec.tecnologia = "selected";
      break;
  }
}

  return selec;
}
