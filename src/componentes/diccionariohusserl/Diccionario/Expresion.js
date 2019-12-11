import React from 'react';
import classNames from 'classnames';

import Grid from '@material-ui/core/Grid';
import LinearProgress from '@material-ui/core/LinearProgress';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';

import {webService} from '../../../js/webServices';
import * as localStore from '../../../js/localStore';

//Elements
import ListaLetras from './ListaLetras';
import LetraIndice from './LetraIndice';
import BanderaButon from './BanderaButon';
import MenuDerecho from './MenuDerecho';
import ListaExpresiones from './ListaExpresiones';
import Cintilla from './Cintilla';
import Busqueda from './Busqueda';
import ModalDeBienvenida from './ModalDeBienvenida';
import MenuBajo from './MenuBajo';
import BusquedaAbajo from './BusquedaAbajo';
import ModalDeBusqueda from './ModalDeBusqueda';
import ModalCaracterInvalido from './ModalCaracterInvalido';
import ModalNumeros from './ModalNumeros'

function Expresion(props){
  const [letraMain, setLetraMain] = React.useState('A');
  const [language,setLanguage] = React.useState("al");
  const [expresiones, setExpresiones] = React.useState([]);
  const [expresionesGlobales, setExpresionesGlobales] = React.useState([]);
  const [idExpresion, setIdExpresion] = React.useState('');
  const [open,setOpen]=React.useState(true);
  const [loading, setLoading]=React.useState(false);
  const [expresionSeleccionada, setExpresionSeleccionada]=React.useState({id:"", expresione:""});
  const [expanded1, setExpanded1] = React.useState(false);
  const [expanded2, setExpanded2] = React.useState(false);
  const [expanded3, setExpanded3] = React.useState(false);
  const [openModal, setOpenModal] = React.useState(false);
  const [state, setState]=React.useState({checkedA:true});
  const [busqueda, setBusqueda] = React.useState("");
  const [menuEscondido,setMenuEscondido]=React.useState(false);
  const [modalDeBusquedas,setModalDebusquedas]=React.useState(false);
  const [modalCaracteresIvalidos,setModalCaracteresInvalidos]=React.useState(false);
  const [modalNumeros,setModalNumeros]=React.useState(false);
  
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
          refid : referencias[i].refid,
          orden: referencias[i].orden,
        })
        i++
      }else{
        expresiones[posicActual].referencias.push({
          referencia_original : referencias[i].referencia_original,
          referencia_traduccion : referencias[i].referencia_traduccion,
          refid : referencias[i].refid,
          orden: referencias[i].orden,
        })
        i++
        // expresiones
      }
    }
    return expresiones
  }

  React.useEffect(()=>{
    setLoading(true)
    var service = "/expresiones/" + language + "/" + letraMain
    webService(service, "GET", {}, (data) => {
      setExpresiones(fixReferencias(data.data.response))
      setExpresionesGlobales(fixReferencias(data.data.response))
      if(idExpresion === ''){
        setIdExpresion(data.data.response.length > 0 ? data.data.response[0].id : "")
      }
      setLoading(false)
    })
    if(localStore.getObjects("bienvenida")==false){
      setOpenModal(true)
      localStore.setObjects("bienvenida",true)
    }
  }, [letraMain, language])

  function getJerarquia(event){
    setExpresionSeleccionada({id: event.currentTarget.id.split("/")[0], expresion:event.currentTarget.id.split("/")[1]})
    setExpanded1(true)
    setExpanded2(true)
  }

  function handleMenuEscondido(){
    setMenuEscondido(!menuEscondido)

  }

  return(
    <div>
      <Grid container>
        <Grid item xs={12} >
            <ListaLetras letraMain={letraMain} setLetraMain={setLetraMain}/>
        </Grid>
        <Grid item xs={2} sm={1} md={1} xl={1} align="center" style={{borderRight:"1px rgb(240, 240, 240) solid"}}>
            <LetraIndice letraMain={letraMain} state={state}/>
            <BanderaButon language={language} setLanguage={setLanguage} lang={props.lang} state={state}/>
        </Grid>
        <Grid item xs={10} sm={8} md={8} xl={8} aling='center' >
            <ListaExpresiones expresiones={expresiones} setExpresiones={setExpresiones} idExpresion={idExpresion} 
            setIdExpresion={setIdExpresion} language={props.language} setLanguage={props.setLanguage} 
            expresionSeleccionada={expresionSeleccionada} setExpresionSeleccionada={setExpresionSeleccionada}
            getJerarquia={getJerarquia} menuEscondido={menuEscondido} state={state} expresionesGlobales={expresionesGlobales}
            setFlagLetraMain={props.setFlagLetraMain}
            />
        </Grid>
        <Hidden smUp>
          {menuEscondido == false ? 
            <IconButton className="iconoAbajo"
            onClick={handleMenuEscondido} size="medium">
              <KeyboardArrowDownIcon fontSize="large"/>
            </IconButton>:
            <IconButton className="iconoArriba"
            onClick={handleMenuEscondido} size="medium">
              <KeyboardArrowUpIcon fontSize="large"/>
            </IconButton>
          }
        </Hidden>
        <Grid item xs={12} sm={3} md={3} lg={3} className={classNames([{"menuAbajoEscondido" : menuEscondido==true}, "bordoDelMenuDerecho"])}>
          <Hidden xsDown> 
            <Busqueda expresiones={expresiones} setExpresiones={setExpresiones} lang={props.lang} state={state} setState={setState}
            busqueda={busqueda} setBusqueda={setBusqueda} setLoading={setLoading} expresionesGlobales={expresionesGlobales} 
            setExpresionesGlobales={setExpresionesGlobales} setModalDebusquedas={setModalDebusquedas} 
            setModalCaracteresInvalidos={setModalCaracteresInvalidos} setModalNumeros={setModalNumeros}/>
            <MenuDerecho idExpresion={idExpresion} setIdExpresion={setIdExpresion} language={language}
            expresiones={expresiones} expresionSeleccionada={expresionSeleccionada} 
            setExpresionSeleccionada={setExpresionSeleccionada} expanded1={expanded1} setExpanded1={setExpanded1} 
            expanded2={expanded2} setExpanded2={setExpanded2} expanded3={expanded3} setExpanded3={setExpanded3}
            getJerarquia={getJerarquia} lang={props.lang} setLetraMain={props.setLetraMain} setFlagLetraMain={props.setFlagLetraMain}
            />
          </Hidden>
          <Hidden smUp>
            <BusquedaAbajo expresiones={expresiones} setExpresiones={setExpresiones} lang={props.lang} state={state} setState={setState}
            busqueda={busqueda} setBusqueda={setBusqueda} expresionesGlobales={expresionesGlobales} 
            setExpresionesGlobales={setExpresionesGlobales}/>
            <MenuBajo idExpresion={idExpresion} setIdExpresion={setIdExpresion} language={language}
            expresiones={expresiones} expresionSeleccionada={expresionSeleccionada} 
            setExpresionSeleccionada={setExpresionSeleccionada} expanded1={expanded1} setExpanded1={setExpanded1} 
            expanded2={expanded2} setExpanded2={setExpanded2} expanded3={expanded3} setExpanded3={setExpanded3}
            getJerarquia={getJerarquia} lang={props.lang} setLetraMain={props.setLetraMain} setFlagLetraMain={props.setFlagLetraMain}/>
          </Hidden>
        </Grid>    
        <Grid item xs={12}>
            <Cintilla open={open} setOpen={setOpen} lang={props.lang} match={props.match}/>
        </Grid>
      </Grid>
      <LinearProgress className={classNames([{"hidden" : !loading}, "loadingBar"])}/>
      <ModalDeBienvenida openModal={openModal} setOpenModal={setOpenModal} lang={props.lang}/>
      <ModalDeBusqueda modalDeBusquedas={modalDeBusquedas} setModalDebusquedas={setModalDebusquedas} lang={props.lang}/>
      <ModalCaracterInvalido modalCaracteresIvalidos={modalCaracteresIvalidos} setModalCaracteresInvalidos={setModalCaracteresInvalidos} lang={props.lang}/>
      <ModalNumeros modalNumeros={modalNumeros} setModalNumeros={setModalNumeros} lang={props.lang}/>
    </div>
  )
}

export default Expresion;