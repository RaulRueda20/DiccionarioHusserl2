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

const ingresar= lang => {
  // const lang = localStore.getItem("lang")
  switch(lang){
    case "es":
      return "Ingresar"
    case "en":
      return "Submit"
    case "fr":
      return "Entrer"
    case "al":
      return "Eintreten"
    case "ca":
      return "Entrar"
  }
}

const subtituloDiccionario= lang => {
  switch (lang) {
    case "es":
      return "Léxico bilingüe (alemán y español) de expresiones definidas a partir de las obras de Edmund Husserl (1859-1938)"
    case "en":
      return "German-Spanish Lexicon of Expressions from Works by Edmund Husserl (1859-1938)"
    case "fr":
      return "Lexique germano-espagnol des expressions d'oeuvres de Edmund Husserl (1859-1938)"
    case "al":
      return "Deutsch-spanisches Lexikon husserlscher Ausdrücke. Edmund Husserl (1859-1938)"
    case "ca":
      return "Lèxic alemany-espanyol de les expressions de les obres d'Edmund Husserl (1859-1938)"
  }
}

const inicio= lang => {
  switch (lang) {
    case "es":
      return "INICIO"
    case "en":
      return "START"
    case "fr":
      return "DÉBUT"
    case "al":
      return "EINTRITT"
    case "ca":
      return "Començar"
  }
}

const email= lang => {
  switch (lang) {
    case "es":
      return "Correo Electrónico"
    case "en":
      return "Email Address"
    case "fr":
      return "Adresse électronique"
    case "al":
      return "E-Mail Adresse"
    case "ca":
      return "Correu electrònic"
  }
}

const contra= lang => {
  switch (lang) {
    case "es":
      return "Contraseña"
    case "en":
      return "Password"
    case "fr":
      return "Mot de passe"
    case "al":
      return "Passwort"
    case "ca":
      return "Contrasenya"
  }
}

const olvidoDeContra= lang => {
  switch (lang) {
    case "es":
      return "¿Olvido su contraseña?"
    case "en":
      return "Forgot your password?"
    case "fr":
      return "Mot de passe oublié?"
    case "al":
      return "Passwort vergessen?"
    case "ca":
      return "Has oblidat la teva contrasenya?"
  }
}

const registrarse= lang => {
  switch (lang) {
    case "es":
      return "Si no está registrado, registrarse"
    case "en":
      return "Not yet registered? Please sign up"
    case "fr":
      return "Pas encore enregistré? Inscrivez vous s'il vous plait"
    case "al":
      return "Noch nicht registriert? Bitte registrieren"
    case "ca":
      return "Encara no està registrat? Registreu-vos"
  }
}

const aqui= lang => {
  switch (lang) {
    case "es":
      return "aquí."
    case "en":
      return "here."
    case "fr":
      return "ici."
    case "al":
      return "hier."
    case "ca":
      return "aquí"
  }
}

const Footer1= lang => {
  switch (lang) {
    case "es":
      return "El proyecto del Diccionario Husserl es desarrollado por Antonio Zirión Quijano en el "
    case "en":
      return "The Husserl Dictionary is a project developed by Antonio Zirión Quijano at the"
    case "fr":
      return "Antonio Zirión Quijano, 2018. Tous les droits sont réservés."
    case "al":
      return "Das Husserl Wörterbuch Projekt ist entwickelt von Antonio Zirión Quijano im"
    case "ca":
      return "El Diccionari Husserl és un projecte desenvolupat per Antonio Zirión Quijano a la Universitat Autònoma de Barcelona"
  }
}

const Footer2= lang => {
  switch (lang) {
    case "es":
      return " en la "
    case "en":
      return "of"
    case "fr":
      return "de"
    case "al":
      return "von"
    case "ca":
      return "de"
  }
}

const Footer3= lang => {
  switch (lang) {
    case "es":
      return "© Antonio Zirión Quijano, 2018. Derechos reservados conforme a la ley."
    case "en":
      return "© Antonio Zirión Quijano, 2018. All Rights reserved."
    case "fr":
      return "© Antonio Zirión Quijano, 2018. Tous les droits sont réservés."
    case "al":
      return "© Antonio Zirión Quijano, 2018. Alle Rechte vorbehalten"
    case "ca":
      return "© Antonio Zirión Quijano, 2018. Tots els drets reservats."
  }
}

const registro= lang => {
  switch (lang) {
    case "es":
      return "REGISTRO"
    case "en":
      return "REGISTER"
    case "fr":
      return "INSCRIPTION"
    case "al":
      return "REGISTRIERUNG"
    case "ca":
      return "REGISTRAR-SE"
  }
}

const registrado= lang => {
  switch (lang) {
    case "es":
      return "¿Ya está registrado?, ingrese "
    case "en":
      return "Already registered?"
    case "fr":
      return "Déjà enregistré?"
    case "al":
      return "Schon registriert? Anmelden"
    case "ca":
      return "Ja registrat?"
  }
}

const nombre= lang => {
  switch (lang) {
    case "es":
      return "Nombre"
    case "en":
      return "Name"
    case "fr":
      return "Prénom"
    case "al":
      return "Vorname"
    case "ca":
      return "Nom"
  }
}

const apellido= lang => {
  switch (lang) {
    case "es":
      return "Apellidos"
    case "en":
      return "Last Name"
    case "fr":
      return "Nom de famille"
    case "al":
      return "Nachname(n)"
    case "ca":
      return "Cognom"
  }
}

const escuela= lang => {
  switch (lang) {
    case "es":
      return "Institución / Escuela"
    case "en":
      return "Institution or School"
    case "fr":
      return "Institution ou école"
    case "al":
      return "Institution oder Schule"
    case "ca":
      return "Institució o escola"
  }
}

const puesto= lang => {
  switch (lang) {
    case "es":
      return "Grado Académico / Puesto"
    case "en":
      return "Academic Degree or Position"
    case "fr":
      return "Diplôme universitaire ou poste"
    case "al":
      return "Akademischer Grad oder Platz"
    case "ca":
      return "Titulació acadèmica o càrrec"
  }
}

const pais= lang => {
  switch (lang) {
    case "es":
      return "País"
    case "en":
      return "Country"
    case "fr":
      return "Pays"
    case "al":
      return "Land"
    case "ca":
      return "País"
  }
}

const comprobacionContra = lang => {
  switch (lang) {
    case "es":
      return "Comprobación de la contraseña"
    case "en":
      return "Password Confirmation"
    case "fr":
      return "Confirmation mot de passe"
    case "al":
      return "Passwort Bestätigung"
    case "ca":
      return "Comprovació de la contrasenya"
  }
}

const modalRecuperacionContra= lang => {
  switch (lang) {
    case "es":
      return "Recuperar Contraseña"
    case "en":
      return "Password retrieval"
    case "fr":
      return "Récupération de mot de passe"
    case "al":
      return "Passwort zurückbekommen"
    case "ca":
      return "Recuperació de la contrasenya"
  }
}

const modalIngresarCorreo= lang => {
  switch (lang) {
    case "es":
      return "Para recuperar su contraseña, es necesario que ingrese su correo electrónico:"
    case "en":
      return "To retrieve your password, please write your email adress:"
    case "fr":
      return "Pour récupérer votre mot de passe, entrez votre email:"
    case "al":
      return "Um sein Passwort zurück zu bekommen, bitte seine E-Mail-Adresse anmelden:"
    case "ca":
      return "Per recuperar la vostra contrasenya, escriviu la vostra adreça de correu electrònic:"
  }
}

const exitoBody= lang => {
  switch (lang) {
    case "es":
      return "Se ha enviado una liga a su correo electrónico para reestablecer su contraseña."
    case "en":
      return "A link has been sent to your email to reset your password."
    case "fr":
      return "Un lien a été envoyé a votre adresse email pour réinitialiser votre mot de passe."
    case "al":
      return "Es wurde eine E-mail gesendet, um Ihr Passwort zurückzusetzen"
    case "ca":
      return "S'ha enviat una lliga al seu correu electrònic per restablir la seva contrasenya."
  }
}

const correoInvalido= lang => {
  switch (lang) {
    case "es":
      return "Correo electrónico o contraseña invalido"
    case "en":
      return "Invalid email or password"
    case "fr":
      return "Email ou mont de passe invalide"
    case "al":
      return "Ungültige E-Mail-Adresse oder ungültiges Passwort"
    case "ca":
      return "Correu electrònic o contrasenya invàlid"
  }
}

const correoNoEncontrado= lang => {
  switch (lang) {
    case "es":
      return "Correo electrónico no encontrado"
    case "en":
      return "Email not found"
    case "fr":
      return "Email non trouvé"
    case "al":
      return "E-Mail nitch gefunden"
    case "ca":
      return "Correu electrònic trobat"
  }
}

const aceptarAlert= lang => {
  switch (lang) {
    case "es":
      return "Aceptar"
    case "en":
      return "Accept"
    case "fr":
      return "Acceptez"
    case "al":
      return "Akzeptieren"
    case "ca":
      return "Acceptar"
  }
}

const menuDiccionario= lang => {
  switch (lang) {
    case "es":
      return "Diccionario"
    case "en":
      return "Dictionary"
    case "fr":
      return "Dictionnaire"
    case "al":
      return "Wörterbuch"
    case "ca":
      return "Diccionari"
  }
}

const menuAcercaDe= lang => {
  switch (lang) {
    case "es":
      return "Acerca del Diccionario"
    case "en":
      return "About the Dictionary"
    case "fr":
      return "A propos du dictionnaire"
    case "al":
      return "Über das Wörterbuch"
    case "ca":
      return "Sobre el Diccionari"
  }
}

const menuGuia= lang => {
  switch (lang) {
    case "es":
      return "Guía de uso"
    case "en":
      return "Usage guide"
    case "fr":
      return "Guide d'utilisation"
    case "al":
      return "Gebrauchsanweisung"
    case "ca":
      return "Guia d'ús"
  }
}

const menuSalir= lang => {
  switch (lang) {
    case "es":
      return "Salir"
    case "en":
      return "Exit"
    case "fr":
      return "Sortie"
    case "al":
      return "Logout"
    case "ca":
      return "Sortir"
  }
}

const menuDerechoJerarquia= lang => {
  switch (lang) {
    case "es":
      return "Jerarquía"
    case "en":
      return "Hierarchy"
    case "fr":
      return "Hiérarchie"
    case "al":
      return "Rangordnung"
    case "ca":
      return "Jerarquia"
  }
}

const menuDerechoJerarquiaDerivadaDe= lang => {
  switch (lang) {
    case "es":
      return "Derivada de:"
    case "en":
      return "Derived from:"
    case "fr":
      return "Dérivé de:"
    case "al":
      return "Abgeleitet von:"
    case "ca":
      return "Deriva de:"
  }
}

const menuDerechoJerarquiaExpresion= lang => {
  switch (lang) {
    case "es":
      return "Expresión:"
    case "en":
      return "Expression:"
    case "fr":
      return "Expression:"
    case "al":
      return "Ausdruck:"
    case "ca":
      return "Expressió:"
  }
}

const menuDerechoJerarquiaExpresionesDerivadas= lang => {
  switch (lang) {
    case "es":
      return "Expresiones derivadas:"
    case "en":
      return "Expressions derivades:"
    case "fr":
      return "Expresions Dérivées:"
    case "al":
      return "Ableitungsausdrücke:"
    case "ca":
      return "Derived Expressions:"
  }
}

const menuDerechoVerTambien= lang => {
  switch (lang) {
    case "es":
      return "Ver también"
    case "en":
      return "See also"
    case "fr":
      return "Siehe auch"
    case "al":
      return "Voir aussi"
    case "ca":
      return "Veure també"
  }
}


const menuDerechoReferenciasConsultadas= lang => {
  switch (lang) {
    case "es":
      return "Referencias consultadas"
    case "en":
      return "Looked-up References"
    case "fr":
      return "Références consultées"
    case "al":
      return "Nachgeschlagene Hinweise"
    case "ca":
      return "Referències buscada"
  }
}

const busquedaPorLetra= lang => {
  switch (lang) {
    case "es":
      return "Busqueda por letra"
    case "en":
      return "Search by letter"
    case "fr":
      return "Recherche par lettre"
    case "al":
      return "Suche nach Buchstabe"
    case "ca":
      return "Cerca per lletra"
  }
}

const toolTipMenuPrincipal= lang => {
  switch (lang) {
    case "es":
      return "Menú principal"
    case "en":
      return "Main menu"
    case "fr":
      return "Menu principal"
    case "al":
      return "Hauptmenü"
    case "ca":
      return "Menú principal"
  }
}

const toolTipMenuIdiomas= lang => {
  switch (lang) {
    case "es":
      return "Menú idiomas"
    case "en":
      return "Languages menu"
    case "fr":
      return "Menu des langues"
    case "al":
      return "Menü Spranchen"
    case "ca":
      return "Menú idiomes"
  }
}

const toolTipIdiomaDeLaLista= lang => {
  switch (lang) {
    case "es":
      return "Idioma de la lista"
    case "en":
      return "List languages"
    case "fr":
      return "Liste des langues"
    case "al":
      return "Listen Sie die Sprachen auf"
    case "ca":
      return "Idiomes de la llista"
  }
}

const cintilla= lang => {
  switch (lang) {
    case "es":
      return "¡Advertencia! Los pasajes en español de Ideas I están en proceso de sustitución: la versión de José Gaos (1962) se reemplaza por la versión de Zirión (2013). Ver los detalles en la"
    case "en":
      return "The spanish passages of Ideas I are in a process of substitution: the version of José Gaos (1962) is replaced by the version of Zirión (2013). See the details in the"
    case "fr":
      return "Les passages en espagnol d'Idées I sont en train d'être substitués: la version de José Gaos (1962) est remplacée par la version de Zirión (2013). Voir les détails dans le"
    case "al":
      return "Die spanische Passagenvon Ideen I sind in Ersetzungsprozess: die Übersetzung von José Gaos (1962) wird ersetzt mit der Übersetzung von Zirión (2013). Siehe die Einzelheiten im"
    case "ca":
      return "Els passatges espanyols d'Idees I es troben en un procés de substitució: la versió de José Gaos (1962) és substituïda per la versió de Zirión (2013). Vegeu els detalls al document"
  }
}

const guia= lang => {
  switch (lang) {
    case "es":
      return "Guía"
    case "en":
      return "Guide"
    case "fr":
      return "Guide"
    case "al":
      return "Handbuch"
    case "ca":
      return "Guia"
  }
}

const descarga= lang => {
  switch (lang) {
    case "es":
      return "Descargar consulta"
    case "en":
      return "Lookup Download"
    case "fr":
      return "Consultation télécharger"
    case "al":
      return "Suche Herunterladen"
    case "ca":
      return "Cerca de descàrrega"
  }
}

const idiomaConsultas= lang => {
  switch (lang) {
    case "es":
      return "Idioma de consultas"
    case "en":
      return "Query Language"
    case "fr":
      return "Langage de requête"
    case "al":
      return "Abfragesprache"
    case "ca":
      return "Idioma de consultes"
  }
}

const busquedas= lang => {
  switch (lang) {
    case "es":
      return "Busquedas"
    case "en":
      return "Search"
    case "fr":
      return "Recherche"
    case "al":
      return "Suche"
    case "ca":
      return "Cerca"
  }
}

const distincionMayusyMinus= lang => {
  switch (lang) {
    case "es":
      return "Distincion entre mayúsculas/minúsculas"
    case "en":
      return "Distinction between upper / lower case"
    case "fr":
      return "Distinction entre majuscules et minuscules"
    case "al":
      return "Unterscheidung zwischen Groß- und Kleinschreibung"
    case "ca":
      return "Distinció entre majúscules / minúscules"
  }
}

const BusquedaGeneral= lang => {
  switch (lang) {
    case "es":
      return "Busqueda General"
    case "en":
      return "General search"
    case "fr":
      return "Recherche générale"
    case "al":
      return "Allgemeine Suche"
    case "ca":
      return "Cerca general"
  }
}

const tipoDeBusqueda= lang => {
  switch (lang) {
    case "es":
      return "Tipo de busqueda"
    case "en":
      return "Search Type"
    case "fr":
      return "Type de recherche"
    case "al":
      return "Suchtyp"
    case "ca":
      return "Tipus de cerca"
  }
}

const dentroExpresion= lang => {
  switch (lang) {
    case "es":
      return "Dentro de Expresion"
    case "en":
      return "Within expression"
    case "fr":
      return "Dans l'expression"
    case "al":
      return "Im Ausdruck"
    case "ca":
      return "Dins d'expressió"
  }
}

const dentroReferencia= lang => {
  switch (lang) {
    case "es":
      return "Dentro de Referencia"
    case "en":
      return "Within reference"
    case "fr":
      return "Dans la référence"
    case "al":
      return "Innerhalb der Referenz"
    case "ca":
      return "Dins de referència"
  }
}

const noDerivaDe= lang => {
  switch (lang) {
    case "es":
      return "No deriva de ninguna expresión"
    case "en":
      return "It does not derive from any expression"
    case "fr":
      return "Il ne dérive d'aucune expression"
    case "al":
      return "Sie leitet sich nicht aus irgendeinem Ausdruck ab"
    case "ca":
      return "No deriva de cap expressió"
  }
}

const noContieneExpresionesDerivadas= lang => {
  switch (lang) {
    case "es":
      return "No contiene ninguna expresión derivada."
    case "en":
      return "It does not contain any derived expression."
    case "fr":
      return "Il ne contient aucune expression dérivée."
    case "al":
      return "Es enthält keinen abgeleiteten Ausdruck."
    case "ca":
      return "No conté cap expressió derivada."
  }
}

const bienvenido= lang => {
  switch (lang) {
    case "es":
      return "Bienvenido"
    case "en":
      return "Welcome"
    case "fr":
      return "Bienvenue"
    case "al":
      return "Herzlich willkommen"
    case "ca":
      return "Benvingut"
  }
}

const bienvenidaModal= lang => {
  switch (lang) {
    case "es":
      return "Si esta es tu primera vez que utiliza el diccionario, será conveniente que visite nuestra guía."
    case "en":
      return "If this is your first time using the dictionary, you should visit our guide."
    case "fr":
      return "Si vous utilisez le dictionnaire pour la première fois, vous devriez consulter notre guide."
    case "al":
      return "Wenn Sie das Wörterbuch zum ersten Mal verwenden, sollten Sie unseren Leitfaden besuchen."
    case "ca":
      return "Si aquesta és la teva primera vegada que utilitza el diccionari, serà convenient que visiti la nostra guia."
  }
}

const descargarConsulta = lang => {
  switch (lang) {
    case "es":
      return "Descargar Consulta"
    case "en":
      return "Lookup Download"
    case "fr":
      return "Consultation télécharger"
    case "al":
      return "Suche Herunterladen"
    case "ca":
      return "Cerca de descàrrega"
  }
}

const seGeneraArchivo = lang => {
  switch (lang) {
    case "es":
      return "Se genera un archivo con las siguientes especificaciones"
    case "en":
      return "A file with the following specifications is generated"
    case "fr":
      return "Un fichier avec les spécifications suivantes est généré"
    case "al":
      return "Eine Datei mit den folgenden Spezifikationen wird generiert"
    case "ca":
      return "Es genera un arxiu amb les següents especificacions"
  }
}

const conReferencias = lang => {
  switch (lang) {
    case "es":
      return "¿Con referencias?"
    case "en":
      return "With references?"
    case "fr":
      return "Avec des références?"
    case "al":
      return "Mit Referenzen?"
    case "ca":
      return "Amb referències?"
  }
}

const descargarEn = lang => {
  switch (lang) {
    case "es":
      return "Descargar Pasaje En:"
    case "en":
      return "Download Passage In:"
    case "fr":
      return "Télécharger Passage In:"
    case "al":
      return "Passage In herunterladen:"
    case "ca":
      return "Descarregar Passatge En:"
  }
}

const idiomaAl = lang => {
  switch (lang) {
    case "es":
      return "Alemán"
    case "en":
      return "German"
    case "fr":
      return "Allemand"
    case "al":
      return "Deutsch"
    case "ca":
      return "Alemany"
  }
}

const idiomaEs = lang => {
  switch (lang) {
    case "es":
      return "Español"
    case "en":
      return "Spanish"
    case "fr":
      return "Espagnol"
    case "al":
      return "Spanisch"
    case "ca":
      return "Espanyol"
  }
}

const pasajeSeleccionadoOTodos = lang => {
  switch (lang) {
    case "es":
      return "Descargar Pasaje Seleccionado o Todos los Pasajes:"
    case "en":
      return "Download Selected Passage or All Passages:"
    case "fr":
      return "Télécharger le passage sélectionné ou tous les passages:"
    case "al":
      return "Download der ausgewählten Passage oder aller Passagen:"
    case "ca":
      return "Descarregar Passatge Seleccionat o Tots els Passatges:"
  }
}

const pasajeSeleccionado = lang => {
  switch (lang) {
    case "es":
      return "Pasaje seleccionado"
    case "en":
      return "Selected Passage"
    case "fr":
      return "Passage sélectionné"
    case "al":
      return "Ausgewählte Passage"
    case "ca":
      return "Passatge Seleccionat"
  }
}

const todosLosPasajes = lang => {
  switch (lang) {
    case "es":
      return "Todos los pasajes"
    case "en":
      return "All the Passages"
    case "fr":
      return "Tous les passages"
    case "al":
      return "Alle Passagen"
    case "ca":
      return "Tots els Passatges"
  }
}

const tipoDeArchivos = lang => {
  switch (lang) {
    case "es":
      return "Tipo de archivo"
    case "en":
      return "Type of file"
    case "fr":
      return "Type de fichier"
    case "al":
      return "Dateityp"
    case "ca":
      return "Tipus d'arxiu"
  }
}

const texto = lang => {
  switch (lang) {
    case "es":
      return "Texto"
    case "en":
      return "Text"
    case "fr":
      return "Texte"
    case "al":
      return "Text"
    case "ca":
      return "Text"
  }
}

export {tituloDiccionario, ingresar, subtituloDiccionario, inicio, email, contra, olvidoDeContra, registrarse, 
  registrado, aqui, Footer1, Footer2, Footer3, registro, nombre, apellido, escuela, puesto, pais, comprobacionContra,
  modalRecuperacionContra,modalIngresarCorreo, exitoBody, correoInvalido, correoNoEncontrado, aceptarAlert, menuDiccionario,
  menuAcercaDe, menuGuia, menuSalir, menuDerechoJerarquia, menuDerechoJerarquiaDerivadaDe, menuDerechoJerarquiaExpresion, 
  menuDerechoJerarquiaExpresionesDerivadas, menuDerechoReferenciasConsultadas, menuDerechoVerTambien, busquedaPorLetra,
  toolTipMenuPrincipal, toolTipMenuIdiomas, toolTipIdiomaDeLaLista, cintilla, guia, descarga, idiomaConsultas, busquedas,
  distincionMayusyMinus, BusquedaGeneral, tipoDeBusqueda, dentroExpresion, dentroReferencia, noDerivaDe, noContieneExpresionesDerivadas,
  bienvenido, bienvenidaModal, descargarConsulta, seGeneraArchivo, conReferencias, descargarEn, idiomaAl, idiomaEs, pasajeSeleccionadoOTodos,
  pasajeSeleccionado, todosLosPasajes, tipoDeArchivos, texto}
