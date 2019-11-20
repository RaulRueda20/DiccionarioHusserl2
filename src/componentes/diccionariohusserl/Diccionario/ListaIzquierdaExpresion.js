import  React from 'react';

import * as localStore from '../../../js/localStore';
import PanelExpresionIzquierdo from './PanelExpresionIzquierdo';
// import { setFlagsFromString } from 'v8';

export default function ListaIzquierdaExpresiones(props){
  const [panelesAbiertos,setPanelesAbiertos] = React.useState([]);

  function clickHandleVista(event){
    var expresionClickeada=event.currentTarget.id.split("-")[0];
    var posicionExpresion=event.currentTarget.id.split("-")[1]
    var expresionesReferencias=props.expresiones[posicionExpresion];
    if(localStore.getObjects("referenciasConsultadas")==false){
      var referenciasConsultadas=[];
      referenciasConsultadas.push(expresionesReferencias)
      localStore.setObjects("referenciasConsultadas",referenciasConsultadas)
    }else{
      var store=localStore.getObjects("referenciasConsultadas")
      store.push(expresionesReferencias)
      localStore.setObjects("referenciasConsultadas",store)
    }
    props.setPosicionReferenciasConsultadas(posicionExpresion)
    props.setIdExpresion(expresionClickeada)
    props.setExpanded1(true)
    props.setExpanded2(true)
  }

  function handleClickPanel(event){
    var expresionesAbiertas=panelesAbiertos;
    props.setIdExpresion(event.currentTarget.id)
    if(expresionesAbiertas.indexOf(event.currentTarget.id)>-1){
      expresionesAbiertas.splice(expresionesAbiertas.indexOf(event.currentTarget.id),1)
    }else{
      expresionesAbiertas.push(event.currentTarget.id)
    }
    setPanelesAbiertos(expresionesAbiertas)
  }

  React.useEffect(()=>{
    setTimeout(() => {
      console.log("TimeOut", document.getElementById("VP" + props.idExpresion))
      if(document.getElementById("VP" + props.idExpresion) != null){
        document.getElementById("VP" + props.idExpresion).scrollIntoView()
      }
    }, 5000)
  },[props.idExpresion])

  return (
    <div className="listaIzquierda">
      {props.state.checkedA == false ?
        <ul>
          {props.expresionesGlobales.map((expresion, index)=>{
            return(
            <PanelExpresionIzquierdo key={expresion.id+"-"+index} expresion={expresion} handleClickPanel={handleClickPanel} clickHandleVista={clickHandleVista} index={index}
            getJerarquia={props.getJerarquia} idReferencias={props.idReferencias} setIdReferencias={props.setIdReferencias} expresionSeleccionada={props.expresionSeleccionada} 
            setFlagLetraMain={props.setFlagLetraMain} idExpresion={props.idExpresion}/> 
          )})}
        </ul>
      :
        <ul>
        {props.expresiones.map((expresion, index)=>{
          return(<PanelExpresionIzquierdo key={expresion.id+"-"+index} expresion={expresion} handleClickPanel={handleClickPanel} clickHandleVista={clickHandleVista} index={index}
          getJerarquia={props.getJerarquia} idReferencias={props.idReferencias} setIdReferencias={props.setIdReferencias} idExpresion={props.idExpresion} open={props.idExpresion == expresion.id}
          match={props.match} setFlagLetraMain={props.setFlagLetraMain} idExpresion={props.idExpresion}/>
          )})}
        </ul> 
      } 
    </div>
  )
}
