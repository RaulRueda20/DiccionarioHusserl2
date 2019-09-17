// import React from 'react';
//
// const textBot = this.context === 'español' ? 'Ingresar' : 'ingles' ? 'Submit' : 'frances' ? 'Entrer' : 'aleman' ? 'Enter' : 'catalan' : 'Entrar'
//
// export {textBot};
import * as localStore from '../js/localStore';

const tituloDiccionario = lang => {
  // const lang = localStore.getItem("lang")
  switch(lang){
    case "es":
      return "DICCIONARIO HUSSERL"
    case "en":
      return "HUSSERL DICTIONARY"
    case "fr":
      return "DICTIONNAIRE HUSSERL"
    case "al":
      return "HUSSERL WÖRTERBUCH"
    case "ca":
      return "DICCIONARI HUSSERL"
  }
}

const botonIngresar= lang => {
  // const lang = localStore.getItem("lang")
  switch(lang){
    case "es":
      return "Ingresar"
    case "en":
      return "Submit"
    case "fr":
      return "tumama"
    case "al":
      return "tumami"
    case "ca":
      return "temamaste"
  }
}

const subtituloDiccionario= lang => {
  switch (lang) {
    case "es":
      return "Léxico bilingüe (alemán y español) de expresiones definidas a partir de las obras de Edmund Husserl (1859-1938)"
    case "en":
      return "pitutin"
    case "fr":
      return "papa"
    case "al":
      return "pititr"
    case "ca":
      return "ppapa"
  }
}

const inicio= lang => {
  switch (lang) {
    case "es":
      return "Inicio"
    case "en":
      return "pitutin"
    case "fr":
      return "papa"
    case "al":
      return "pititr"
    case "ca":
      return "ppapa"
  }
}

const correo= lang => {
  switch (lang) {
    case "es":
      return "Correo Electrónico"
    case "en":
      return "pitutin"
    case "fr":
      return "papa"
    case "al":
      return "pititr"
    case "ca":
      return "ppapa"
  }
}

const contra= lang => {
  switch (lang) {
    case "es":
      return "Contraseña"
    case "en":
      return "pitutin"
    case "fr":
      return "papa"
    case "al":
      return "pititr"
    case "ca":
      return "ppapa"
  }
}

const olvidoDeContra= lang => {
  switch (lang) {
    case "es":
      return "¿Olvido su contraseña?"
    case "en":
      return "pitutin"
    case "fr":
      return "papa"
    case "al":
      return "pititr"
    case "ca":
      return "ppapa"
  }
}

const registrarse= lang => {
  switch (lang) {
    case "es":
      return "Si no está registrado, registrarse"
    case "en":
      return "pitutin"
    case "fr":
      return "papa"
    case "al":
      return "pititr"
    case "ca":
      return "ppapa"
  }
}

const aqui= lang => {
  switch (lang) {
    case "es":
      return "Aquí."
    case "en":
      return "pitutin"
    case "fr":
      return "papa"
    case "al":
      return "pititr"
    case "ca":
      return "ppapa"
  }
}

const subtitulo1Footer= lang => {
  switch (lang) {
    case "es":
      return "El proyecto del Diccionario Husserl es desarrollado por Antonio Zirión Quijano en el "
    case "en":
      return "pitutin"
    case "fr":
      return "papa"
    case "al":
      return "pititr"
    case "ca":
      return "ppapa"
  }
}

const subtitulo2Footer= lang => {
  switch (lang) {
    case "es":
      return " en la "
    case "en":
      return "pitutin"
    case "fr":
      return "papa"
    case "al":
      return "pititr"
    case "ca":
      return "ppapa"
  }
}

const footer= lang => {
  switch (lang) {
    case "es":
      return "© Antonio Zirión Quijano, 2018. Derechos reservados conforme a la ley."
    case "en":
      return "pitutin"
    case "fr":
      return "papa"
    case "al":
      return "pititr"
    case "ca":
      return "ppapa"
  }
}

const registro= lang => {
  switch (lang) {
    case "es":
      return "Registro"
    case "en":
      return "pitutin"
    case "fr":
      return "papa"
    case "al":
      return "pititr"
    case "ca":
      return "ppapa"
  }
}

const nombre= lang => {
  switch (lang) {
    case "es":
      return "Nombre"
    case "en":
      return "pitutin"
    case "fr":
      return "papa"
    case "al":
      return "pititr"
    case "ca":
      return "ppapa"
  }
}

const apellido= lang => {
  switch (lang) {
    case "es":
      return "Apellidos"
    case "en":
      return "pitutin"
    case "fr":
      return "papa"
    case "al":
      return "pititr"
    case "ca":
      return "ppapa"
  }
}

const escuela= lang => {
  switch (lang) {
    case "es":
      return "Institución / Escuela"
    case "en":
      return "pitutin"
    case "fr":
      return "papa"
    case "al":
      return "pititr"
    case "ca":
      return "ppapa"
  }
}

const puesto= lang => {
  switch (lang) {
    case "es":
      return "Grado Académico / Puesto"
    case "en":
      return "pitutin"
    case "fr":
      return "papa"
    case "al":
      return "pititr"
    case "ca":
      return "ppapa"
  }
}

const pais= lang => {
  switch (lang) {
    case "es":
      return "País"
    case "en":
      return "pitutin"
    case "fr":
      return "papa"
    case "al":
      return "pititr"
    case "ca":
      return "ppapa"
  }
}

const comprobacionContra = lang => {
  switch (lang) {
    case "es":
      return "Comprobación de la contraseña"
    case "en":
      return "pitutin"
    case "fr":
      return "papa"
    case "al":
      return "pititr"
    case "ca":
      return "ppapa"
  }
}

const resgistrado= lang => {
  switch (lang) {
    case "es":
      return "¿Ya está registrado?, ingrese "
    case "en":
      return "pitutin"
    case "fr":
      return "papa"
    case "al":
      return "pititr"
    case "ca":
      return "ppapa"
  }
}

const modalRecuperacionContra= lang => {
  switch (lang) {
    case "es":
      return "Recuperar Contraseña"
    case "en":
      return "pitutin"
    case "fr":
      return "papa"
    case "al":
      return "pititr"
    case "ca":
      return "ppapa"
  }
}

const modalIngresarCorreo= lang => {
  switch (lang) {
    case "es":
      return "Para recuperar su contraseña, es necesario que ingrese su correo electrónico"
    case "en":
      return "pitutin"
    case "fr":
      return "papa"
    case "al":
      return "pititr"
    case "ca":
      return "ppapa"
  }
}

const tituloAlertaError= lang => {
  switch (lang) {
    case "es":
      return "Alerta de Error"
    case "en":
      return "pitutin"
    case "fr":
      return "papa"
    case "al":
      return "pititr"
    case "ca":
      return "ppapa"
  }
}

const alertaTexto= lang => {
  switch (lang) {
    case "es":
      return "Operación Exitosa"
    case "en":
      return "pitutin"
    case "fr":
      return "papa"
    case "al":
      return "pititr"
    case "ca":
      return "ppapa"
  }
}

const modalAlertaTexto= lang => {
  switch (lang) {
    case "es":
      return "Se ha enviado una liga a su correo electrónico para reestablecer su contraseña."
    case "en":
      return "pitutin"
    case "fr":
      return "papa"
    case "al":
      return "pititr"
    case "ca":
      return "ppapa"
  }
}

const ModalCorreoInvalido= lang => {
  switch (lang) {
    case "es":
      return "Correo electrónico invalido"
    case "en":
      return "pitutin"
    case "fr":
      return "papa"
    case "al":
      return "pititr"
    case "ca":
      return "ppapa"
  }
}

const aceptarAlerta= lang => {
  switch (lang) {
    case "es":
      return "Aceptar"
    case "en":
      return "pitutin"
    case "fr":
      return "papa"
    case "al":
      return "pititr"
    case "ca":
      return "ppapa"
  }
}

export {tituloDiccionario, botonIngresar, subtituloDiccionario, inicio, correo, contra, olvidoDeContra, registrarse, aqui,
  subtitulo1Footer, subtitulo2Footer, footer, registro, nombre, apellido, escuela, puesto, pais, comprobacionContra, resgistrado, 
  modalRecuperacionContra,modalIngresarCorreo, tituloAlertaError, alertaTexto, modalAlertaTexto, ModalCorreoInvalido, aceptarAlerta}
