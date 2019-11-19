import  React from 'react';

import * as localStore from '../../../js/localStore';
import PanelExpresionIzquierdo from './PanelExpresionIzquierdo';

function ListaEscondida(props){
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

    React.useEffect(()=>{
      setTimeout(() => {
        if(document.getElementById("VP" + props.idExpresion) != null){
          document.getElementById("VP" + props.idExpresion).scrollIntoView()
        }
      }, 1000)
    },[props.idExpresion])

    return (
        <div className="listaIzquierdaEscondida">
          {props.state.checkedA == false ?
            <ul>
              {props.expresionesGlobales.map((expresion, index)=>(
                <PanelExpresionIzquierdo key={expresion.id+"-"+index} expresion={expresion} handleClickPanel={handleClickPanel} clickHandleVista={clickHandleVista} index={index}
                getJerarquia={props.getJerarquia} idReferencias={props.idReferencias} setIdReferencias={props.setIdReferencias} expresionSeleccionada={props.expresionSeleccionada} 
                setFlagLetraMain={props.setFlagLetraMain} idExpresion={props.idExpresion}/> 
              ))}
            </ul>
          :
            <ul key={props.expresiones.id}>
            {props.expresiones.map((expresion, index)=>(
              <PanelExpresionIzquierdo key={expresion.id+"-"+index} expresion={expresion} handleClickPanel={handleClickPanel} clickHandleVista={clickHandleVista} index={index}
              getJerarquia={props.getJerarquia} idReferencias={props.idReferencias} setIdReferencias={props.setIdReferencias} idExpresion={props.idExpresion} setFlagLetraMain={props.setFlagLetraMain} idExpresion={props.idExpresion}/>
              ))}
            </ul>  
        }
      </div>
    )
}

export default ListaEscondida; 