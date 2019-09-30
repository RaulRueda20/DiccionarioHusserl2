import React from 'react';
import Grid from '@material-ui/core/Grid';

import ListaIzquierdaExpresion from './ListaIzquierdaExpresion';
import BusquedaVP from './BusquedaVP';
import ContenidoPasaje from './ContenidoPasaje';
import ListaLetras from './ListaLetras';
import MenuDerechoPasajes from './MenuDerechoPasajes';
import Paginador from './Paginador';

import {webService} from '../../../js/webServices';

function Pasaje(props){
  const [expresiones, setExpresiones] = React.useState([]);
  const [idExpresion, setIdExpresion] = React.useState('');
  const [languageP,setLanguageP] = React.useState("al");
  const [referenciaSeleccionada, setReferenciaSeleccionada]=React.useState(null);
  const [expanded1, setExpanded1] = React.useState(false);
  const [expanded2, setExpanded2] = React.useState(false);
  const [expanded3, setExpanded3] = React.useState(false);
  const [pasajeService, setPasajeService] = React.useState("");

  const handleChangePage=(event, newPage)=>{
    setRowsPerPage(newPage)
  }

  const onChangeRowsPerPage=event=>{
    setRowsPerPage(parseInt)
  }
  
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
          pretty_e: referencias[i].pretty_e,
          pretty_t: referencias[i].pretty_t,
          referencias : [],
          traduccion: referencias[i].traduccion
        })
        expresiones[posicActual].referencias.push({
          referencia_original : referencias[i].referencia_original,
          referencia_traduccion : referencias[i].referencia_traduccion,
          refid : referencias[i].refid, orden: referencias[i].orden
        })
        i++
      }else{
        expresiones[posicActual].referencias.push({
          referencia_original : referencias[i].referencia_original,
          referencia_traduccion : referencias[i].referencia_traduccion,
          refid : referencias[i].refid, orden: referencias[i].orden,
        })
        i++
        // expresiones
      }
    }
    return expresiones
  }

  const findReferencias = (referencias, referenciaId) =>{
    for (var i in referencias){
      if(referencias[i].refid==referenciaId){
        var referenciaEncontrada=referencias[i];
      }
    }
    return referenciaEncontrada
  }

  // var idDeExpresion es el id que se toma de la URL, idExpresion es un estado que llama servicios y tiene otras funcionalidades

  React.useEffect(()=>{
    var idDeExpresion=props.match.params.expresion;
    var idDeLaReferencia=props.match.params.id;
    var service = "/expresiones/" + props.language + "/" + props.letraMain
    if(pasajeService != service){
      setPasajeService(service)
      webService(service, "GET", {}, (data) => {
        setExpresiones(fixReferencias(data.data.response))
        if(idExpresion === ''){
          setIdExpresion(data.data.response.length > 0 ? data.data.response[0].id : "")
        }
      })
    }
    service = "/referencias/obtieneReferencias/" + idDeExpresion
    webService(service, "GET", {}, (data) => {
      setReferenciaSeleccionada(findReferencias(data.data.response, idDeLaReferencia))
    })
  }, [props.letraMain, props.language, props.match.params.expresion, props.match.params.id])

  return(
    <div>
      <Grid container>
            <Grid item xs={12}>
              <ListaLetras letraMain={props.letraMain} setLetraMain={props.setLetraMain}/>
            </Grid>
            <Grid item xs={3}>
              <BusquedaVP expresiones={expresiones} setExpresiones={setExpresiones} lang={props.lang} language={props.language} setLanguage={props.setLanguage}/>
              <ListaIzquierdaExpresion expresiones={expresiones} setExpresiones={setExpresiones} idExpresion={idExpresion} 
                setIdExpresion={setIdExpresion} language={props.language} setLanguage={props.setLanguage} referenciaSeleccionada={referenciaSeleccionada}
                setReferenciaSeleccionada={setReferenciaSeleccionada} 
              />
            </Grid>  
            <Grid item xs={6}>
                <ContenidoPasaje referenciaSeleccionada={referenciaSeleccionada} languageP={languageP} setLanguageP={setLanguageP}
                idExpresion={idExpresion} lang={props.lang} match={props.match}/>
            </Grid>
            <Grid item xs={3}>
              <MenuDerechoPasajes idExpresion={idExpresion} language={props.language}
              expresiones={expresiones} expanded1={expanded1} setExpanded1={setExpanded1} 
              expanded2={expanded2} setExpanded2={setExpanded2} expanded3={expanded3} setExpanded3={setExpanded3}
              lang={props.lang} referenciaSeleccionada={referenciaSeleccionada}
              />
            </Grid>
        </Grid>
    </div>
    )
}

export default Pasaje;