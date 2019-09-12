import  React from 'react';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Icon from '@material-ui/core/Icon';
import Jerarquia from '@material-ui/icons/DeviceHub';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import classNames from 'classnames';

export default function Expresiones(props){
  const [id,setId] = React.useState([])
  const {classes}=props;

  function clickHandleVista(){
    props.setVistaP("pasajes")
  }

  const handleChangeId=(event)=>{
    props.setIdExpresion(event.target.value)
    var listaid = id
    var listaClaves = listaid.push(props.idExpresion)
    console.log("id pusheada", listaClaves)
    console.log("id de la expresion", props.idExpresion)
  }

  console.log("id enviado", props.idExpresion)

  return (
    <div className="list-container">
      <ul>
      {props.expresiones.map((expresion, index)=>(
        <li 
          className={classNames({"selected" : expresion.id === props.idExpresion}, "sideList")} 
          key={expresion.id} value={expresion.id} 
          id ={expresion.id} 
        >
          <Grid container>
            <Grid item xs={10}>
              <p onClick={clickHandleVista}>{expresion.id + "-" + expresion.expresion + '//' + expresion.traduccion}</p>
            </Grid>
            <Grid item xs={1}>
              <div onClick={handleChangeId}>
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