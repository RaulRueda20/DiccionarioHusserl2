import  React from 'react';
import {Link} from 'react-router-dom';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Icon from '@material-ui/core/Icon';
import Jerarquia from '@material-ui/icons/DeviceHub';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import {webService} from '../../../js/webServices';
import * as localStore from '../../../js/localStore';

import classNames from 'classnames';
import Axios from 'axios';

export default function ListaExpresiones(props){
  const [expresionSeleccionadaPanel,setExpresionSeleccionadaPanel] = React.useState(null);

  const {classes, match}=props;

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
    if(event.currentTarget.id==null){
      var expresionQueSelecciono=[];
      expresionQueSelecciono.push(event.currentTarget.id)
      setExpresionSeleccionadaPanel(expresionQueSelecciono)
      props.setIdExpresion(event.currentTarget.id)
    }
  }

  function getJerarquia(event){
    props.setExpresionSeleccionada(event.currentTarget.id)
  }
  
  return (
    <div className="list-container">
      <ul>
      {props.expresiones.map((expresion, index)=>(
        <li 
          className="sideList" 
          key={expresion.id} 
          id={"expresion"+expresion.id} value={expresion.id}
        >
          <Grid container justify="center" alignItems="center">
            <Grid item xs={10} id={index} onClick={clickHandleVista}>
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
              <div id={expresion.id} onClick={getJerarquia}>
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