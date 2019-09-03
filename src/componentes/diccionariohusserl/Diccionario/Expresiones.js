import  React from 'react';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Icon from '@material-ui/core/Icon';
import Jerarquia from '@material-ui/icons/DeviceHub';
import Grid from '@material-ui/core/Grid';

import classNames from 'classnames';

import {webService} from '../../../js/webServices';
import * as localStore from '../../../js/localStore';

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
        orden: referencias[i].orden,
        pretty_e: referencias[i].pretty_e,
        pretty_t: referencias[i].pretty_t,
        referencias : [],
        traduccion: referencias[i].traduccion
      })
      expresiones[posicActual].referencias.push({
        referencia_original : referencias[i].referencia_original,
        referencia_traduccion : referencias[i].referencia_traduccion,
        refid : referencias[i].refid,
      })
      i++
    }else{
      expresiones[posicActual].referencias.push({
        referencia_original : referencias[i].referencia_original,
        referencia_traduccion : referencias[i].referencia_traduccion,
        refid : referencias[i].refid,
      })
      i++
      // expresiones
    }
  }
  return expresiones
}

export default function Expresiones(props) {
  const [panel, setPanel] = React.useState(false);
  const {classes}=props;

  var expresiones = props.expresiones

  React.useEffect(()=>{
    var service = "/expresiones/" + language + "/" + props.letraMain
    webService(service, "GET", {}, (data) => {
      props.setExpresiones(fixReferencias(data.data.response))
      props.setIdExpresion(data.data.response.length > 0 ? data.data.response[0].id : "")
      console.log("expresiones", props.expresiones)
      console.log("idExpresion", props.idExpresion)
    })
  }, [props.letraMain])

  var Vistas=props.setVista

  function clickHandleVista(){
    props.setVistaP("pasajes")
  }

  function clickHandlePanel(){
    setPanel(true)
  }

  return (
    <div className="list-container">
      <ul>
      {expresiones.map((expresion, index)=>(
        <li 
          className={classNames({"selected" : expresion.id === props.idExpresion}, "sideList")} 
          key={expresion.id} value={expresion.id} onClick={clickHandleVista}
          id ={expresion.id}
        >
          <Grid container>
            <Grid item xs={10}>
              {expresion.expresion + '//' + expresion.traduccion}
            </Grid>
            <Grid item xs={1}>
              <div onClick={clickHandlePanel}>
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
        </li>
        ))}
      </ul>
    </div>
  );
}