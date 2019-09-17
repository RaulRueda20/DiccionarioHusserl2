import  React from 'react';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Icon from '@material-ui/core/Icon';
import Grid from '@material-ui/core/Grid';

import * as localStore from '../../../js/localStore';

import classNames from 'classnames';

export default function ListaIzquierdaExpresiones(props){
  const [expresionSeleccionadaListaIzquierda,setExpresionSeleccionadaListaIzquierda] = React.useState(null)
  const [flagFuncionAccionada, setFlagFuncionAccionada]=React.useState(false)

  const {classes, match}=props;

  var expresiones=props.expresiones;

  console.log("Expresiones", expresiones)

  function clickHandleListaExpresiones(event){
      var expresionClickeada=event.currentTarget.value;
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

  function handleClickPanelListaExpresiones(event){
    var expresionIdSeleccionada = event.currentTarget.id;
    if(flagFuncionAccionada==false && expresionSeleccionadaListaIzquierda==null){
      var expresionQueSelecciono=[];
      expresionQueSelecciono.push(expresionIdSeleccionada)
      setExpresionSeleccionadaListaIzquierda(expresionQueSelecciono)
      props.setIdExpresion(expresionIdSeleccionada)
      console.log("expresionIdSeleccionada",expresionIdSeleccionada)
    }
  }

  console.log("flag",flagFuncionAccionada)
  console.log("expresionId",props.idExpresion)

  return (
    <div className="list-container">
      <ul>
      {expresiones.map((expresion, index)=>(
        <li 
          className="sideList" 
          key={expresion.id} value={index} 
          id={expresion.id} 
        >
          <Grid container justify="center" alignItems="center">
            <Grid item xs={10} onClick={clickHandleListaExpresiones}>
              <p className={"parrafo"}>{expresion.expresion + '//' + expresion.traduccion}</p>
            </Grid>
            <Grid item id={expresion.id} xs={1} onClick={handleClickPanelListaExpresiones}>
                <Icon>
                  <ExpandMoreIcon/>
                </Icon>
            </Grid>
            <Grid item xs={1}>
            </Grid>
          </Grid>
          <div>
            <ul>
              <li>
              
              </li>
            </ul>
          </div>
        </li>
        ))}
      </ul>
    </div>
  );
}