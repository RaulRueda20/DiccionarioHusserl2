import React from 'react';
import Grid from '@material-ui/core/Grid';

import {webService} from '../../../js/webServices';
import * as localStore from '../../../js/localStore';

import ListaLetras from './ListaLetras';
import LetraIndice from './LetraIndice';
import BanderaButon from './BanderaButon';
import MenuDerecho from './MenuDerecho';
import Expresiones from './Expresiones';

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

function DiccionarioMain(props){
  const [letraMain, setLetraMain] = React.useState('A');
  const [language,setLanguage] = React.useState("al");
  const [expresiones, setExpresiones] = React.useState([]);
  const [idExpresion, setIdExpresion] = React.useState([1]);

  React.useEffect(()=>{
    var service = "/expresiones/" + language + "/" + letraMain
    webService(service, "GET", {}, (data) => {
      console.log("lista de expresiones", data)
      setExpresiones(fixReferencias(data.data.response))
      setIdExpresion(data.data.response.length > 0 ? data.data.response[0].id : "")
    })
  }, [letraMain])

  return(
      <Grid container>
        <Grid item xs={12}>
          <ListaLetras letraMain={letraMain} setLetraMain={setLetraMain}/>
        </Grid>
        <Grid item xs={1} align="center" style={{borderRight:"1px rgb(240, 240, 240) solid"}}>
          <LetraIndice letraMain={letraMain}/>
          <BanderaButon language={language} setLanguage={setLanguage}/>
        </Grid>
        <Grid item xs={8} aling='center'>
          <Expresiones expresiones={expresiones} setExpresiones={setExpresiones} idExpresion={idExpresion} setIdExpresion={setIdExpresion}/>
        </Grid>
        <Grid item xs={3}>
          <MenuDerecho/>
        </Grid>
      </Grid>
    )
}

export default DiccionarioMain;