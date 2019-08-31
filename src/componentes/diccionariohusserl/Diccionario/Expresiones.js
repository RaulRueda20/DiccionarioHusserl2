import  React from 'react';
import { Link } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles';
import MuiExpansionPanel from '@material-ui/core/ExpansionPanel';
import MuiExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import MuiExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import IconButton from '@material-ui/core/IconButton';
import Jerarquia from '@material-ui/icons/DeviceHub';
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

const ExpansionPanel = withStyles({
  root: {
    border: '1px solid rgba(0, 0, 0, .125)',
    boxShadow: 'none',
    '&:not(:last-child)': {
      borderBottom: 0,
    },
    '&:before': {
      display: 'none',
    },
    '&$expanded': {
      margin: 'auto',
    },
  },
  expanded: {},
})(MuiExpansionPanel);

const ExpansionPanelSummary = withStyles({
  root: {
    backgroundColor: 'rgba(0, 0, 0, .03)',
    borderBottom: '1px solid rgba(0, 0, 0, .125)',
    marginBottom: -1,
    minHeight: 56,
    '&$expanded': {
      minHeight: 56,
    },
  },
  content: {
    '&$expanded': {
      margin: '12px 0',
    },
  },
  expanded: {},
})(MuiExpansionPanelSummary);

const ExpansionPanelDetails = withStyles(theme => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiExpansionPanelDetails);

export default function Expresiones(props) {
  const [expanded, setExpanded] = React.useState('panel');
  const {classes}=props;

  const handleChange = panel => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : true);
  };

  var expresiones = props.expresiones

  var language=props.language

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

  const handleClickExpresion=(event)=>{
    console.log("evento", event.target)
    props.setIdExpresion(event.target.value)
  }

  return (
    <div>
        {expresiones.map((expresion, index)=>(
          <ExpansionPanel key ={expresion.id} square expanded={expanded === 'panel'+index} onChange={handleChange('panel'+index)} TransitionProps={{ unmountOnExit: true }}>
            <ExpansionPanelSummary  
              className={classNames({"selected" : expresion.id === props.idExpresion})} 
              key={expresion.id} value={expresion.id}
              id ={expresion.id} expandIcon={<ExpandMoreIcon/>} aria-controls="panel1d-content" id={'panel'+index+"d-header"}
            >
              <Link key ={expresion.id} onClick={clickHandleVista}>{expresion.expresion + " // " + expresion.traduccion}</Link>
              <IconButton className="jerarquia" onClick={handleClickExpresion}>
                <Jerarquia fontSize="small"/>
              </IconButton>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails id ={expresion.id}>
              <Typography key ={expresion.id}>
                {expresion.referencias[0].referencia_original + " // " + expresion.referencias[0].referencia_traduccion}
              </Typography>
            </ExpansionPanelDetails>
          </ExpansionPanel>
        ))}
    </div>
  );
}