import  React from 'react';

import PanelExpresion from './PanelExpresion';
import classNames from 'classnames';

import * as localStore from '../../../js/localStore';

import { makeStyles, useTheme } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  listContainer:{
    [theme.breakpoints.up('sm')]: {
      height: "calc(100vh - 9vh - 31px) !important",
      overflowY: "scroll", 
      overflowX: "hidden",
    },
    [theme.breakpoints.down('sm')]: {
      height: "47vh",
      overflowY: "scroll", 
    },
    width: "auto",
    backgroundColor: "rgb(245,245,245)",
    marginLeft: "30px !important",
    marginRight: "30px !important"
  },
  listContainer2:{
    height: "calc(100vh - 9vh - 84px) !important",
      overflowY: "scroll", 
      overflowX: "hidden",
  }
}))

export default function ListaExpresiones(props){
  const classes = useStyles();
  const theme = useTheme();
  const [panelesAbiertos,setPanelesAbiertos] = React.useState([]);
  
  function clickHandleVista(event){
    var expresionClickeada=event.currentTarget.id;
    var expresionesReferencias=props.expresiones[expresionClickeada];
    if(localStore.getObjects("referenciasConsultadas")==false){
      var referenciasConsultadas=[];
      referenciasConsultadas.push(expresionesReferencias)
      localStore.setObjects("referenciasConsultadas",referenciasConsultadas)
    }else{
      var store=localStore.getObjects("referenciasConsultadas")
      store.push(expresionesReferencias)
      localStore.setObjects("referenciasConsultadas",store)
    }
  }

  function handleClickPanel(event){
    var expresionesAbiertas=panelesAbiertos;
    var referenciasPrincipales= event.currentTarget.value;
    props.setIdExpresion(event.currentTarget.id)
    if(expresionesAbiertas.indexOf(event.currentTarget.id)>-1){
      expresionesAbiertas.splice(expresionesAbiertas.indexOf(event.currentTarget.id),1)
    }else{
      expresionesAbiertas.push(event.currentTarget.id)
    }
      setPanelesAbiertos(expresionesAbiertas)
  }
  
  return (
    <div>
      {props.state.checkedA == false ? 
      <div className={classNames([{[classes.listContainer2] : props.menuEscondido == true}, classes.listContainer])}>
        <ul>
          {props.expresionesGlobales.map((expresion, index)=>(
            <PanelExpresion key={expresion.id+"-"+index} expresion={expresion} handleClickPanel={handleClickPanel} clickHandleVista={clickHandleVista} index={index}
            getJerarquia={props.getJerarquia} idReferencias={props.idReferencias} setIdReferencias={props.setIdReferencias} expresionSeleccionada={props.expresionSeleccionada}
            setFlagLetraMain={props.setFlagLetraMain} setOpenModalN={props.setOpenModalN}/> 
          ))}
        </ul>
      </div> :
      <div className={classNames([{[classes.listContainer2] : props.menuEscondido == true}, classes.listContainer])}>
        <ul>
          {props.expresiones.map((expresion, index)=>(
            <PanelExpresion key={expresion.id+"-"+index} expresion={expresion} handleClickPanel={handleClickPanel} clickHandleVista={clickHandleVista} index={index}
            getJerarquia={props.getJerarquia} idReferencias={props.idReferencias} setIdReferencias={props.setIdReferencias} expresionSeleccionada={props.expresionSeleccionada}
            setFlagLetraMain={props.setFlagLetraMain} setOpenModalN={props.setOpenModalN}/> 
          ))}
        </ul>
      </div>}
    </div>
  );
}