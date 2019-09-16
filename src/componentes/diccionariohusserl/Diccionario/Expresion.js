import React from 'react';

import Grid from '@material-ui/core/Grid';

import {webService} from '../../../js/webServices';
import * as localStore from '../../../js/localStore';

import ListaLetras from './ListaLetras';
import LetraIndice from './LetraIndice';
import BanderaButon from './BanderaButon';
import MenuDerecho from './MenuDerecho';
import ListaExpresiones from './ListaExpresiones';
import Cintilla from './Cintilla';
import Busqueda from './Busqueda';

function Expresion(props){
  const [letraMain, setLetraMain] = React.useState('A');
  const [language,setLanguage] = React.useState("al");
  const [languageP,setLanguageP] = React.useState("al");
  const [expresiones, setExpresiones] = React.useState([]);
  const [idExpresion, setIdExpresion] = React.useState('');
  const [hijos, setHijos] = React.useState([]);
  const [padres, setPadres] = React.useState([]);
  const [open,setOpen]=React.useState(true)

  const emptyObj = {
    clave: "",
    epretty: "",
    expresion_original: "",
    expresion_traduccion: "",
    id: null,
    orden: null,
    ref_original: "",
    ref_traduccion: "",
    refid: "",
    tpretty: ""
}

const fixReferencias = (referencias) => {
  var expresiones=[]
  var posicActual = -1
  var expreActual = ""
  var i = 0
  console.log(referencias.length)
  while (i<referencias.length){
    if (expreActual != referencias[i].expresion){
      posicActual++
      expreActual = referencias[i].expresion
      expresiones.push({
        clave : referencias[i].clave,
        expresion : referencias[i].expresion,
        id : referencias[i].id,
        index_de: referencias[i].index_de,
        index_es: referencias[i].index_es,
        orden: referencias[i].orden,
        pretty_e: referencias[i].pretty_e,
        pretty_t: referencias[i].pretty_t,
        referencias : [],
        traduccion: referencias[i].traduccion
      })
      expresiones[posicActual].referencias.push({
        referencia_original : referencias[i].referencia_original,
        referencia_traduccion : referencias[i].referencia_traduccion,
        refid : referencias[i].refid,
      })
      i++
    }else{
      expresiones[posicActual].referencias.push({
        referencia_original : referencias[i].referencia_original,
        referencia_traduccion : referencias[i].referencia_traduccion,
        refid : referencias[i].refid,
      })
      i++
      // expresiones
    }
  }
  return expresiones
}

  React.useEffect(()=>{
    var service = "/expresiones/" + language + "/" + letraMain
    webService(service, "GET", {}, (data) => {
      console.log("data de language", language)
      console.log("letraMain", letraMain)
      setExpresiones(fixReferencias(data.data.response))
      if(idExpresion === ''){
        setIdExpresion(data.data.response.length > 0 ? data.data.response[0].id : "")
      }
    })
  }, [letraMain, language])

  return(
    <div>
      <Grid container>
        <Grid item xs={12}>
            <ListaLetras letraMain={letraMain} setLetraMain={setLetraMain}/>
        </Grid>
        <Grid item xs={1} align="center" style={{borderRight:"1px rgb(240, 240, 240) solid"}}>
            <LetraIndice letraMain={letraMain}/>
            <BanderaButon language={language} setLanguage={setLanguage}/>
        </Grid>
        <Grid item xs={8} aling='center'>
            <ListaExpresiones expresiones={expresiones} setExpresiones={setExpresiones} idExpresion={idExpresion} 
            setIdExpresion={setIdExpresion} language={language} setLanguage={setLanguage}
            />
        </Grid>
        <Grid item xs={3}>
            <Busqueda expresiones={expresiones} setExpresiones={setExpresiones}/>
            <MenuDerecho expresionSeleccionada={idExpresion} hijos={hijos} setHijos={setHijos}/>
        </Grid>
        <Grid item xs={12}>
            <Cintilla open={open} setOpen={setOpen}/>
        </Grid>
      </Grid>
    </div>
  )
}

export default Expresion;