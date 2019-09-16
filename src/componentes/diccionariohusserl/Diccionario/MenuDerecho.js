import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import MuiExpansionPanel from '@material-ui/core/ExpansionPanel';
import MuiExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import MuiExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';

import {webService} from '../../../js/webServices';
import * as localStore from '../../../js/localStore';

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

const ExpansionPanelDetails = withStyles(theme => ({
  root: {
    padding: theme.spacing(2),
    overflowX:"hidden",
    maxHeight: 85
  },
}))(MuiExpansionPanelDetails);

const ExpansionPanelSummary = withStyles({
  root: {
    backgroundColor: 'rgba(0, 0, 0, .03)',
    // borderBottom: '1px solid rgba(0, 0, 0, .125)',
    // marginBottom: -1,
    '&$expanded': {
    },
  },
  content: {
    minHeight:'0 !important',
    '&$expanded': {
      margin: '5px 0',
    },
  },
  expanded: {},
})(MuiExpansionPanelSummary);

function MenuDerecho(props){
  const {classes}=props;
  const [referenciasConsultadasVista, setReferenciasConsultadasVista]=React.useState([])
  const [expanded, setExpanded] = React.useState('');

  const handleChange = panel => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  const paintJerarquia = (lista) => {
    var lastString = ""
    for(var i in lista){
      if(i == lista.length-1)
        lastString += lista[i].expresion + "."
      else lastString += lista[i].expresion + ", "
    }
    return lastString
  }

  React.useEffect(()=>{
    console.log("rc:"+localStore.getObjects("referenciasConsultadas"))
    if(localStore.getObjects("referenciasConsultadas")!=false){
      var referenciaConsultadaSacada = localStore.getObjects("referenciasConsultadas")
      setReferenciasConsultadasVista(referenciaConsultadaSacada)
    }
  }, [localStore.getObjects("referenciasConsultadas")])

  return (
    <div>
        <ExpansionPanel square expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
        <ExpansionPanelSummary aria-controls="panel1d-content" id="panel1d-header">
          <Typography>Jerarquía:</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Typography>
            Derivada de:
          </Typography>
        </ExpansionPanelDetails>
        <Divider />
        <ExpansionPanelDetails>
          <Typography>Expresión:</Typography>
        </ExpansionPanelDetails>
          <Divider />
        <ExpansionPanelDetails>
          <Typography>Expresiones derivadas:</Typography>
        </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel square expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
        <ExpansionPanelSummary aria-controls="panel2d-content" id="panel2d-header">
          <Typography>Referencias Consultadas:</Typography>
        </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <ul>
              {referenciasConsultadasVista.map(consultas=>(
                <li>
                  {consultas.expresion + "//" + consultas.traduccion}
                </li>
              ))}
            </ul>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel square expanded={expanded === 'panel3'} onChange={handleChange('panel3')}l>
          <ExpansionPanelSummary aria-controls="panel3d-content" id="panel3d-header">
            <Typography>Ver También:</Typography>
            <ExpansionPanelDetails>

            </ExpansionPanelDetails>
          </ExpansionPanelSummary>
        </ExpansionPanel>
    </div>
  )
}

export default MenuDerecho; 
