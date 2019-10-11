import React from 'react';
import Grid from '@material-ui/core/Grid';
import LinearProgress from '@material-ui/core/LinearProgress'
import classNames from 'classnames';

import {webService} from '../../../js/webServices';
import * as localStore from '../../../js/localStore';

import ListaLetras from './ListaLetras';
import LetraIndice from './LetraIndice';
import BanderaButon from './BanderaButon';
import MenuDerecho from './MenuDerecho';
import ListaExpresiones from './ListaExpresiones';
import Cintilla from './Cintilla';
import Busqueda from './Busqueda';
import ModalDeBienvenida from './ModalDeBienvenida';

function Expresion(props){
  const [letraMain, setLetraMain] = React.useState('A');
  const [language,setLanguage] = React.useState("al");
  const [expresiones, setExpresiones] = React.useState([]);
  const [idExpresion, setIdExpresion] = React.useState('');
  const [open,setOpen]=React.useState(true);
  const [loading, setLoading]=React.useState(false);
  const [expresionSeleccionada, setExpresionSeleccionada]=React.useState({id:"", expresione:""});
  const [expanded1, setExpanded1] = React.useState(false);
  const [expanded2, setExpanded2] = React.useState(false);
  const [expanded3, setExpanded3] = React.useState(false);
  const [openModal, setOpenModal] = React.useState(false);
  
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

  console.log("letraMain", letraMain)

  function getJerarquia(event){
    console.log("evento", event.currentTarget.id)
    setExpresionSeleccionada({id: event.currentTarget.id.split("/")[0], expresion:event.currentTarget.id.split("/")[1]})
    setExpanded1(true)
    setExpanded2(true)
  }

  return(
    <div>
      <Grid container>
        <Grid item xs={12}>
            <ListaLetras letraMain={letraMain} setLetraMain={setLetraMain}/>
        </Grid>
        <Grid item xs={1} align="center" style={{borderRight:"1px rgb(240, 240, 240) solid"}}>
            <LetraIndice letraMain={letraMain}/>
            <BanderaButon language={props.language} setLanguage={props.setLanguage} lang={props.lang}/>
        </Grid>
        <Grid item xs={8} aling='center'>
            <ListaExpresiones expresiones={expresiones} setExpresiones={setExpresiones} idExpresion={idExpresion} 
            setIdExpresion={setIdExpresion} language={props.language} setLanguage={props.setLanguage} 
            expresionSeleccionada={expresionSeleccionada} setExpresionSeleccionada={setExpresionSeleccionada}
            getJerarquia={getJerarquia}
            />
        </Grid>
        <Grid item xs={3} className="bordoDelMenuDerecho">
            <Busqueda expresiones={expresiones} setExpresiones={setExpresiones} lang={props.lang}/>
            <MenuDerecho idExpresion={idExpresion} setIdExpresion={setIdExpresion} language={language}
            expresiones={expresiones} expresionSeleccionada={expresionSeleccionada} 
            setExpresionSeleccionada={setExpresionSeleccionada} expanded1={expanded1} setExpanded1={setExpanded1} 
            expanded2={expanded2} setExpanded2={setExpanded2} expanded3={expanded3} setExpanded3={setExpanded3}
            getJerarquia={getJerarquia} lang={props.lang} 
            />
        </Grid>
        <Grid item xs={12}>
            <Cintilla open={open} setOpen={setOpen} lang={props.lang} match={props.match}/>
        </Grid>
      </Grid>
      <LinearProgress className={classNames([{"hidden" : !loading}, "loadingBar"])}/>
      <ModalDeBienvenida openModal={openModal} setOpenModal={setOpenModal}/>
    </div>
  )
}

export default Expresion;