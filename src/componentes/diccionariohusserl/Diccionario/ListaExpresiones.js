import  React from 'react';

import PanelExpresion from './PanelExpresion';

import * as localStore from '../../../js/localStore';

export default function ListaExpresiones(props){
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
    console.log("referenciasprincipales", referenciasPrincipales)
    props.setIdExpresion(event.currentTarget.id)
    if(expresionesAbiertas.indexOf(event.currentTarget.id)>-1){
      expresionesAbiertas.splice(expresionesAbiertas.indexOf(event.currentTarget.id),1)
    }else{
      expresionesAbiertas.push(event.currentTarget.id)
    }
      setPanelesAbiertos(expresionesAbiertas)
  }
  
  return (
    <div className="list-container">
      <ul>
      {props.expresiones.map((expresion, index)=>(
        <PanelExpresion expresion={expresion} handleClickPanel={handleClickPanel} clickHandleVista={clickHandleVista} index={index}
        getJerarquia={props.getJerarquia} idReferencias={props.idReferencias} setIdReferencias={props.setIdReferencias} expresionSeleccionada={props.expresionSeleccionada}/> 
      ))}
      </ul>
    </div>
  );
}