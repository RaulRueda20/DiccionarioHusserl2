import  React from 'react';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Icon from '@material-ui/core/Icon';
import Jerarquia from '@material-ui/icons/DeviceHub';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import * as localStore from '../../../js/localStore';

import classNames from 'classnames';

export default function Expresiones(props){
  const [expresionSeleccionada,setExpresionSeleccionada] = React.useState(null)
  const [flagFuncionAccionada, setFlagFuncionAccionada]=React.useState(false)

  const {classes}=props;

  function clickHandleVista(event){
    setFlagFuncionAccionada(true)
    if(flagFuncionAccionada==true){
      props.setVistaP("pasajes")
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
  }

  function handleClickPanel(event){
    var expresionIdSeleccionada = event.currentTarget.id;
    if(flagFuncionAccionada==false && expresionSeleccionada==null){
      var expresionQueSelecciono=[];
      expresionQueSelecciono.push(expresionIdSeleccionada)
      expresionSeleccionada(expresionQueSelecciono)
      props.setIdExpresion(expresionIdSeleccionada)
      console.log("expresionIdSeleccionada",expresionIdSeleccionada)
    }
  }

  console.log("flag",flagFuncionAccionada)
  console.log("expresionId",props.idExpresion)

  return (
    <div className="list-container">
      <ul>
      {props.expresiones.map((expresion, index)=>(
        <li 
          className={classNames({"selected" : expresion.id === props.idExpresion}, "sideList")} 
          key={expresion.id} value={index} 
          id={expresion.id} onDoubleClick={clickHandleVista}
        >
          <Grid container>
            <Grid item xs={10}>
              <p>{expresion.expresion + '//' + expresion.traduccion}</p>
            </Grid>
            <Grid item xs={1}>
              <div id={expresion.id} onClick={handleClickPanel}>
                <Icon>
                  <ExpandMoreIcon/>
                </Icon>
              </div>
            </Grid>
            <Grid item xs={1}>
              <div>
                <Icon>
                  <Jerarquia/>
                </Icon>
              </div>
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