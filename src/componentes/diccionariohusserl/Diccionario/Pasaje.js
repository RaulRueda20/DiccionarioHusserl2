import React from 'react';

import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import classNames from 'classnames';
import Hidden from '@material-ui/core/Hidden';
import LinearProgress from '@material-ui/core/LinearProgress'

import ListaIzquierdaExpresion from './ListaIzquierdaExpresion';
import BusquedaVP from './BusquedaVP';
import ContenidoPasaje from './ContenidoPasaje';
import ListaLetras from './ListaLetras';
import MenuDerechoPasajes from './MenuDerechoPasajes';
import MenuEscondido from './MenuEscondido';
import BusquedaEscondida from './BusquedaEscondida';
import ListaEscondida from './ListaEscondida';
import Paginador from './Paginador';

import {webService} from '../../../js/webServices';

const emptyPasaje = {clave:"", epretty:"", expresion_original:"", expresion_traduccion:"", orden:"", pasaje_original: "", pasaje_traduccion:"",ref_original:"", ref_traduccion:"", refid:"", tpretty:""}

function Pasaje(props){
  const [expresiones, setExpresiones] = React.useState([]);
  const [idExpresion, setIdExpresion] = React.useState('');
  const [languageP,setLanguageP] = React.useState("al");
  const [referenciaSeleccionada, setReferenciaSeleccionada]=React.useState(null);
  const [referencias, setReferencias] = React.useState([]);
  const [expanded1, setExpanded1] = React.useState(false);
  const [expanded2, setExpanded2] = React.useState(false);
  const [expanded3, setExpanded3] = React.useState(false);
  const [pasajeService, setPasajeService] = React.useState("");
  const [panelIzquierdo,setPanelIzquierdo]=React.useState(false);
  const [panelDerecho, setPanelDerecho]=React.useState(false);
  const [pasaje, setPasaje] = React.useState([emptyPasaje]);
  const [busqueda, setBusqueda] = React.useState("");
  const [state, setState]=React.useState({checkedA:true});
  const [openHidden, setOpenHidden]=React.useState(false);
  const [loading, setLoading]=React.useState(false);
  const [flagLetraMain,setFlagLetraMain]=React.useState(false);
  
  const fixReferencias = (referencias) => {
    var expresiones=[]
    var posicActual = -1
    var expreActual = ""
    var i = 0
    // console.log(referencias.length)
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

  function handlePanelIzquierdo(){
    setPanelIzquierdo(!panelIzquierdo)

  }

  function handlePanelDerecho(){
    setPanelDerecho(!panelDerecho)
  }

  function updateDimensions(){
    if(window.innerWidth > 600) {
      setOpenHidden(false);
    } 
  }
  
  // var idDeExpresion es el id que se toma de la URL, idExpresion es un estado que llama servicios y tiene otras funcionalidades

  React.useEffect(()=>{
    setLoading(true)
    var idDeExpresion=props.match.params.expresion;
    var idDeLaReferencia=props.match.params.id ? props.match.params.id : false;
    var service = "/expresiones/" + props.language + "/" + props.letraMain;
    if(pasajeService != service){
      setPasajeService(service)
      webService(service, "GET", {}, (data) => {
        setExpresiones(fixReferencias(data.data.response))
      })
    }
    service = "/referencias/obtieneReferencias/" + idDeExpresion
    webService(service, "GET", {}, (data) => {
      setIdExpresion(idDeExpresion)
      if(idDeLaReferencia){
        setReferenciaSeleccionada(findReferencias(data.data.response, idDeLaReferencia))
        if(data.data.response == null){data.data.response
          setPasaje(emptyPasaje)
        }else{
          setPasaje(data.data.response)
        }
      }else{
        setReferenciaSeleccionada(data.data.response[0])
        setReferencias(data.data.response)
        if(data.data.response == null){
          setPasaje(emptyPasaje)
        }else{
          setPasaje(data.data.response)
        }
      }
      setLoading(false)
      setExpanded1(true)
      setExpanded2(true)
      if(!flagLetraMain){
        if(props.letraMain != data.data.response[0].index_de.replace(/ /g,'')){
          props.setLetraMain(data.data.response[0].index_de.replace(/ /g,''))
          setFlagLetraMain(true)
        }
      }
    })
    updateDimensions()
    window.addEventListener("resize", updateDimensions);
  }, [props.letraMain, props.language, props.match.params.expresion, props.match.params.id, flagLetraMain])

  return(
    <div>
      <Hidden xsDown>
        {panelIzquierdo == false ? 
        <IconButton className="IconoIzquierdo" 
        onClick={handlePanelIzquierdo} size="small">
          <ArrowBackIosIcon size="small" className="iconosIluminados"/>
        </IconButton>:
        <IconButton className={classNames([{"botonIzquierdoEscondido" : panelIzquierdo==true}])}
        onClick={handlePanelIzquierdo} size="small">
          <ArrowForwardIosIcon size="small" className="iconosIluminados"/>
        </IconButton>
        }
        {panelDerecho == false ? 
        <IconButton className="IconoDerecho" onClick={handlePanelDerecho} size="small">
          <ArrowForwardIosIcon size="small" className="iconosIluminados"/>
        </IconButton>:
        <IconButton className={classNames([{"botonDerechoEscondido" : panelDerecho==true}])} 
        onClick={handlePanelDerecho} size="small">
          <ArrowBackIosIcon size="small" className="iconosIluminados"/>
        </IconButton>
        }
      </Hidden>
      <Grid container>
        <Grid item xs={12}>
          <ListaLetras letraMain={props.letraMain} setLetraMain={props.setLetraMain}/>
        </Grid>
        <Grid item xs={12} sm={3} md={3} lg={3} className={classNames([{"panelIzquierdoEscondido" : panelIzquierdo==true}])}>
          <Hidden xsDown>
            <BusquedaVP expresiones={expresiones} setExpresiones={setExpresiones} lang={props.lang} 
            language={props.language} setLanguage={props.setLanguage} busqueda={busqueda} setBusqueda={setBusqueda}
            state={state} setState={setState}
            />
            <ListaIzquierdaExpresion expresiones={expresiones} setExpresiones={setExpresiones} idExpresion={idExpresion} 
              setIdExpresion={setIdExpresion} language={props.language} setLanguage={props.setLanguage} referenciaSeleccionada={referenciaSeleccionada}
              setReferenciaSeleccionada={setReferenciaSeleccionada} setExpanded1={setExpanded1} setExpanded2={setExpanded2} match={props.match} setFlagLetraMain={setFlagLetraMain}
            />
          </Hidden>
          {openHidden == true ?
            <div>
              <BusquedaEscondida expresiones={expresiones} setExpresiones={setExpresiones} lang={props.lang} 
              language={props.language} setLanguage={props.setLanguage} busqueda={busqueda} setBusqueda={setBusqueda}
               state={state} setState={setState} openHidden={openHidden} setOpenHidden={setOpenHidden}/>
              <ListaEscondida expresiones={expresiones} setExpresiones={setExpresiones} idExpresion={idExpresion} 
              setIdExpresion={setIdExpresion} language={props.language} setLanguage={props.setLanguage} referenciaSeleccionada={referenciaSeleccionada}
              setReferenciaSeleccionada={setReferenciaSeleccionada} setExpanded1={setExpanded1} setExpanded2={setExpanded2}/>
            </div>
             : null
          }
        </Grid>
        <Grid item xs={12} sm={6} md={panelDerecho ? panelIzquierdo ? 12 : 9 : 6 && panelIzquierdo ? 9 : 6} lg={panelDerecho ? panelIzquierdo ? 12 : 9 : 6 && panelIzquierdo ? 9 : 6}
        className={classNames([{"contenidoPasajes" : openHidden==true}])}>
            <ContenidoPasaje referenciaSeleccionada={referenciaSeleccionada} languageP={languageP} setLanguageP={setLanguageP}
            idExpresion={idExpresion} lang={props.lang} match={props.match} panelDerecho={panelDerecho} panelIzquierdo={panelIzquierdo} 
            lang={props.lang} pasaje={pasaje} openHidden={openHidden} setOpenHidden={setOpenHidden}
            />
            {/* <Paginador referencias={referencias} referenciaSeleccionada={referenciaSeleccionada} expresionId={props.match.params.expresion}/> */}
        </Grid>
        <Grid item sm={3} md={3} lg={3} className={classNames([{"panelDerechoEscondido" : panelDerecho==true}])}>
          <Hidden xsDown>
            <MenuDerechoPasajes idExpresion={idExpresion} language={props.language}
            expresiones={expresiones} expanded1={expanded1} setExpanded1={setExpanded1} 
            expanded2={expanded2} setExpanded2={setExpanded2} expanded3={expanded3} setExpanded3={setExpanded3}
            lang={props.lang} referenciaSeleccionada={referenciaSeleccionada} letraMain={props.letraMain} setLetraMain={props.setLetraMain}
            setFlagLetraMain={setFlagLetraMain}
            />
          </Hidden>
        </Grid>
        {openHidden == true ? 
          <Grid item xs={12} className="menuPasajeEscondido">
            <MenuEscondido idExpresion={idExpresion} language={props.language}
            expresiones={expresiones} expanded1={expanded1} setExpanded1={setExpanded1} 
            expanded2={expanded2} setExpanded2={setExpanded2} expanded3={expanded3} setExpanded3={setExpanded3}
            lang={props.lang} referenciaSeleccionada={referenciaSeleccionada} setFlagLetraMain={setFlagLetraMain}
            />
          </Grid>
          :null
        }
      </Grid>
      <LinearProgress className={classNames([{"hidden" : !loading}, "loadingBar"])}/>
    </div>
  )
}

export default Pasaje;