import  React from 'react';
import {Link} from 'react-router-dom';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Icon from '@material-ui/core/Icon';
import Jerarquia from '@material-ui/icons/DeviceHub';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import * as localStore from '../../../js/localStore';

import classNames from 'classnames';

export default function ListaExpresiones(props){
  const [expresionSeleccionada,setExpresionSeleccionada] = React.useState(null)
  const [flagFuncionAccionada, setFlagFuncionAccionada]=React.useState(false)

  const {classes, match}=props;

  function clickHandleVista(event){
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

  function handleClickPanel(event){
    var expresionIdSeleccionada = event.currentTarget.id;
    if(flagFuncionAccionada==false && expresionSeleccionada==null){
      var expresionQueSelecciono=[];
      expresionQueSelecciono.push(expresionIdSeleccionada)
      setExpresionSeleccionada(expresionQueSelecciono)
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
          className="sideList" 
          key={expresion.id} value={index} 
          id={expresion.id} 
        >
          <Grid container justify="center" alignItems="center">
            <Grid item xs={10} onClick={clickHandleVista}>
              <Link to={`/husserl/pasaje/${expresion.id}`}>
                <p className={"parrafo"}>{expresion.expresion + '//' + expresion.traduccion}</p>
              </Link>
            </Grid>
            <Grid item id={expresion.id} xs={1} onClick={handleClickPanel}>
                <Icon>
                  <ExpandMoreIcon/>
                </Icon>
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