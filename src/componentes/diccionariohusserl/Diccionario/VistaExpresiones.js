import React from 'react';
import Grid from '@material-ui/core/Grid';

import {webService} from '../../../js/webServices';
import * as localStore from '../../../js/localStore';

import ListaLetras from './ListaLetras';
import LetraIndice from './LetraIndice';
import BanderaButon from './BanderaButon';
import MenuDerecho from './MenuDerecho';
import Expresiones from './Expresiones';
import Cintilla from './Cintilla';
import Busqueda from './Busqueda';

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

function VistaExpresiones(props){
    const [open,setOpen]=React.useState(true);
    const [expresion, setExpresion] = React.useState(emptyObj)

    React.useEffect(()=>{
        var service = "/expresiones/" + props.language + "/" + props.letraMain
        webService(service, "GET", {}, (data) => {
          console.log("data de expresiones", data)
          console.log("expresiones", props.idExpresion)
          props.setExpresiones(fixReferencias(data.data.response))
          if(props.idExpresion === ''){
            props.setIdExpresion(data.data.response.length > 0 ? data.data.response[0].id : "")
          }
        })
      }, [props.letraMain])
    

    return(
        <Grid container>
        <Grid item xs={12}>
            <ListaLetras letraMain={props.letraMain} setLetraMain={props.setLetraMain}/>
        </Grid>
        <Grid item xs={1} align="center" style={{borderRight:"1px rgb(240, 240, 240) solid"}}>
            <LetraIndice letraMain={props.letraMain}/>
            <BanderaButon language={props.language} setLanguage={props.setLanguage}/>
        </Grid>
        <Grid item xs={8} aling='center'>
            <Expresiones expresiones={props.expresiones} setExpresiones={props.setExpresiones} idExpresion={props.idExpresion} 
            setIdExpresion={props.setIdExpresion} vistaP={props.vistaP} setVistaP={props.setVistaP}
            />
        </Grid>
        <Grid item xs={3}>
            <Busqueda expresiones={props.expresiones} setExpresiones={props.setExpresiones}/>
            <MenuDerecho expresionSeleccionada={props.idExpresion} hijos={props.hijos} setHijos={props.setHijos}/>
        </Grid>
        <Grid item xs={12}>
            <Cintilla open={open} setOpen={setOpen}/>
        </Grid>
        </Grid>
    )
}

export default VistaExpresiones;