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
import ModalDeNulos from './ModalDeNulos';

import {webService} from '../../../js/webServices';

function Pasaje(props){
  const [expresiones, setExpresiones] = React.useState([]);
  const [expresionesGlobales, setExpresionesGlobales] = React.useState([]);
  const [idExpresion, setIdExpresion] = React.useState('');
  const [languageP,setLanguageP] = React.useState("al");
  const [referenciaSeleccionada, setReferenciaSeleccionada]=React.useState(null);
  const [expanded1, setExpanded1] = React.useState(false);
  const [expanded2, setExpanded2] = React.useState(false);
  const [expanded3, setExpanded3] = React.useState(false);
  const [pasajeService, setPasajeService] = React.useState("");
  const [panelIzquierdo,setPanelIzquierdo]=React.useState(false);
  const [panelDerecho, setPanelDerecho]=React.useState(false);
  const [busqueda, setBusqueda] = React.useState("");
  const [state, setState]=React.useState({checkedA:true});
  const [openHidden, setOpenHidden]=React.useState(false);
  const [loading, setLoading]=React.useState(false);
  const [posicionReferenciasConsultadas,setPosicionReferenciasConsultadas]=React.useState("");
  const [referencias, setReferencias] = React.useState([]);
  const [openModal, setOpenModal] = React.useState(false);
  
  const fixReferencias = (referencias) => {
    var expresiones=[]
    var posicActual = -1
    var expreActual = ""
    var i = 0
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
      webService(service, "GET", {}, (dataE) => {
        setExpresiones(fixReferencias(dataE.data.response))
      })
    }
    var service = "/referencias/obtieneReferencias/" + idDeExpresion
    webService(service, "GET", {}, (data) => {
      setReferencias(data.data.response)
      setIdExpresion(idDeExpresion)
      if(idDeLaReferencia && idDeLaReferencia!=null){
        setReferenciaSeleccionada(findReferencias(data.data.response, idDeLaReferencia))
      }else{
        setReferenciaSeleccionada(data.data.response[0])
      }
      setLoading(false)
      setExpanded1(true)
      setExpanded2(true)
      if(!props.flagLetraMain){
        if(data.data.response[0]==null){
          props.setLetraMain(props.letraMain)
          setOpenModal(true)
          setReferenciaSeleccionada(null)
        }else if(props.letraMain != data.data.response[0].index_de.replace(/ /g,'')){
          props.setLetraMain(data.data.response[0].index_de.replace(/ /g,''))
          props.setFlagLetraMain(true)
        }
      }
    })
    updateDimensions()
    window.addEventListener("resize", updateDimensions);
    setTimeout(() => {
      if(document.getElementById("VP" + props.idExpresion) != null){
        document.getElementById("VP" + props.idExpresion).scrollIntoView()
      }
    }, 1000)
  }, [props.letraMain, props.language, props.match.params.expresion, props.match.params.id, props.flagLetraMain])

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
          <ListaLetras letraMain={props.letraMain} setLetraMain={props.setLetraMain} setFlagLetraMain={props.setFlagLetraMain} flagLetraMain={props.flagLetraMain}/>
        </Grid>
        <Grid item xs={12} sm={3} md={3} lg={3} className={classNames([{"panelIzquierdoEscondido" : panelIzquierdo==true}])}>
          <Hidden xsDown>
            <BusquedaVP expresiones={expresiones} setExpresiones={setExpresiones} lang={props.lang} 
            language={props.language} setLanguage={props.setLanguage} busqueda={busqueda} setBusqueda={setBusqueda}
            state={state} setState={setState} setExpresionesGlobales={setExpresionesGlobales}
            />
            <ListaIzquierdaExpresion expresiones={expresiones} setExpresiones={setExpresiones} idExpresion={idExpresion} 
              setIdExpresion={setIdExpresion} language={props.language} setLanguage={props.setLanguage} referenciaSeleccionada={referenciaSeleccionada}
              setReferenciaSeleccionada={setReferenciaSeleccionada} setExpanded1={setExpanded1} setExpanded2={setExpanded2} match={props.match} setFlagLetraMain={props.setFlagLetraMain}
              setPosicionReferenciasConsultadas={setPosicionReferenciasConsultadas} expresionesGlobales={expresionesGlobales} state={state}/>
          </Hidden>
          {openHidden == true ?
            <div>
              <BusquedaEscondida expresiones={expresiones} setExpresiones={setExpresiones} lang={props.lang} 
              language={props.language} setLanguage={props.setLanguage} busqueda={busqueda} setBusqueda={setBusqueda}
               state={state} setState={setState} openHidden={openHidden} setOpenHidden={setOpenHidden} setExpresionesGlobales={setExpresionesGlobales}/>
              <ListaEscondida expresiones={expresiones} setExpresiones={setExpresiones} idExpresion={idExpresion} 
              setIdExpresion={setIdExpresion} language={props.language} setLanguage={props.setLanguage} referenciaSeleccionada={referenciaSeleccionada}
              setReferenciaSeleccionada={setReferenciaSeleccionada} setExpanded1={setExpanded1} setExpanded2={setExpanded2} state={state} setFlagLetraMain={props.setFlagLetraMain}
              expresionesGlobales={expresionesGlobales}/>
            </div>
             : null
          }
        </Grid>
        <Grid item xs={12} sm={6} md={panelDerecho ? panelIzquierdo ? 12 : 9 : 6 && panelIzquierdo ? 9 : 6} lg={panelDerecho ? panelIzquierdo ? 12 : 9 : 6 && panelIzquierdo ? 9 : 6}
        className={classNames([{"contenidoPasajes" : openHidden==true}])}>
            <ContenidoPasaje referenciaSeleccionada={referenciaSeleccionada} languageP={languageP} setLanguageP={setLanguageP}
            idExpresion={idExpresion} lang={props.lang} match={props.match} panelDerecho={panelDerecho} panelIzquierdo={panelIzquierdo} 
            lang={props.lang} openHidden={openHidden} setOpenHidden={setOpenHidden}
            />
            {referenciaSeleccionada== null ? null : <Paginador referencias={referencias} referenciaSeleccionada={referenciaSeleccionada} expresionId={props.match.params.expresion}/>}
        </Grid>
        <Grid item sm={3} md={3} lg={3} className={classNames([{"panelDerechoEscondido" : panelDerecho==true}, "bordoDelMenuDerecho"])}>
          <Hidden xsDown>
            <MenuDerechoPasajes idExpresion={idExpresion} language={props.language}
            expresiones={expresiones} expanded1={expanded1} setExpanded1={setExpanded1} 
            expanded2={expanded2} setExpanded2={setExpanded2} expanded3={expanded3} setExpanded3={setExpanded3}
            lang={props.lang} referenciaSeleccionada={referenciaSeleccionada} letraMain={props.letraMain} setLetraMain={props.setLetraMain}
            setFlagLetraMain={props.setFlagLetraMain} posicionReferenciasConsultadas={posicionReferenciasConsultadas}
            />
          </Hidden>
        </Grid>
        {openHidden == true ? 
          <Grid item xs={12} className="menuPasajeEscondido">
            <MenuEscondido idExpresion={idExpresion} language={props.language}
            expresiones={expresiones} expanded1={expanded1} setExpanded1={setExpanded1} 
            expanded2={expanded2} setExpanded2={setExpanded2} expanded3={expanded3} setExpanded3={setExpanded3}
            lang={props.lang} referenciaSeleccionada={referenciaSeleccionada} setFlagLetraMain={props.setFlagLetraMain}
            />
          </Grid>
          :null
        }
      </Grid>
      <LinearProgress className={classNames([{"hidden" : !loading}, "loadingBar"])}/>
      <ModalDeNulos openModal={openModal} setOpenModal={setOpenModal} lang={props.lang}/>
    </div>
  )
}

export default Pasaje;