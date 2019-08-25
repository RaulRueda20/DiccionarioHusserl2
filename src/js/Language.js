// import React from 'react';
//
// const textBot = this.context === 'español' ? 'Ingresar' : 'ingles' ? 'Submit' : 'frances' ? 'Entrer' : 'aleman' ? 'Enter' : 'catalan' : 'Entrar'
//
// export {textBot};
import * as localStore from '../js/localStore';

const TDiccionario= lang => {
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

const SubmitButtonText= lang => {
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

const SbtDiccionario= lang => {
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

const SbtInic= lang => {
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

const Correo= lang => {
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

const Contra= lang => {
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

const OlvC= lang => {
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

const Registrarse= lang => {
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

const Aqui= lang => {
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

const Sbtfoot= lang => {
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

const sbtfoot2= lang => {
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

const foot= lang => {
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

const sbtRegistro= lang => {
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

const Nomb= lang => {
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

const Apell= lang => {
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

const Escue= lang => {
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

const Puesto= lang => {
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

const Pais= lang => {
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

const CompContra = lang => {
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

const Resgistrado= lang => {
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

const Tmodal= lang => {
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

const Menmodal= lang => {
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

const Talerterr= lang => {
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

const Talertex= lang => {
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

const Malertex= lang => {
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

const Malerterr= lang => {
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

const AceptAlert= lang => {
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

export {TDiccionario, SubmitButtonText, SbtDiccionario, SbtInic, Correo, Contra, OlvC, Registrarse, Aqui,
  Sbtfoot, sbtfoot2, foot, sbtRegistro, Nomb, Apell, Escue, Puesto, Pais, CompContra, Resgistrado, Tmodal,
   Menmodal, Talerterr, Talertex, Malertex, Malerterr, AceptAlert}
