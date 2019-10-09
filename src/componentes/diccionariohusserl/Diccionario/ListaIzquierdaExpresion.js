import  React from 'react';

import * as localStore from '../../../js/localStore';
import PanelExpresionIzquierdo from './PanelExpresionIzquierdo';


export default function ListaIzquierdaExpresiones(props){
  const [panelesAbiertos,setPanelesAbiertos] = React.useState([]);

  const {classes, match}=props;

  var expresiones=props.expresiones;

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
    props.setIdExpresion(expresionClickeada)
    props.setExpanded1(true)
    props.setExpanded2(true)
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
    <div className="listaIzquierda">
      <ul>
      {expresiones.map((expresion, index)=>(
        <PanelExpresionIzquierdo expresion={expresion} handleClickPanel={handleClickPanel} clickHandleVista={clickHandleVista} index={index}
        getJerarquia={props.getJerarquia} idReferencias={props.idReferencias} setIdReferencias={props.setIdReferencias} idExpresion={props.idExpresion}/>
        ))}
      </ul>
    </div>
  );
}