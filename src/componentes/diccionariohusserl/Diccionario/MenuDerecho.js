import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import MuiExpansionPanel from '@material-ui/core/ExpansionPanel';
import MuiExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import MuiExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';

import {webService} from '../../../js/webServices';
import * as localStore from '../../../js/localStore';
import { typography } from '@material-ui/system';

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

const emptyObj = {
  clave: "",
  epretty: "",
  expresion_original: "",
  expresion_traduccion: "",
  id: null,
  orden: null,
  ref_original: "",
  ref_traduccion: "",
  refid: "",
  tpretty: ""}

function MenuDerecho(props){
  const {classes}=props;
  const [referenciasConsultadasVista, setReferenciasConsultadasVista]=React.useState([])
  const [listaVerTambien,setListaVerTambien]=React.useState([]);
  const [expanded1, setExpanded1] = React.useState(false);
  const [expanded2, setExpanded2] = React.useState(false);
  const [expanded3, setExpanded3] = React.useState(false);
  const [hijos,setHijos]=React.useState("");
  const [padres,setPadres]=React.useState("");

  // const handleChange = panel => (event, newExpanded) => {
  //   var panelesExpandidos = expanded
  //   if(panelesExpandidos.indexOf(panel) > -1){
  //     panelesExpandidos.splice(panelesExpandidos.indexOf(panel), 1)
  //   }else{
  //     panelesExpandidos.push(panel)
  //   }
  //   // console.log(panelesExpandidos)
  //   setExpanded(panelesExpandidos);
  //   // console.log(expanded.indexOf('panel1') != -1)
  // };

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
    console.log("eseleccionada", props.expresionSeleccionada)
    if(localStore.getObjects("referenciasConsultadas")!=false){
      var referenciaConsultadaSacada = localStore.getObjects("referenciasConsultadas")
      setReferenciasConsultadasVista(referenciaConsultadaSacada)
    }
    if (props.expresionSeleccionada!=null && props.expresionSeleccionada != ""){
      var service = "/vertambien/" + props.expresionSeleccionada
      webService(service, "GET", {}, data => {
        setListaVerTambien(data.data.response)
        webService(("/expresiones/"+props.language+"/hijosList/"+props.expresionSeleccionada),"GET", {}, (data) => setHijos(data.data.response))
        webService(("/expresiones/"+props.language+"/abuelosList/"+props.expresionSeleccionada), "GET", {}, (data2) =>setPadres(data2.data.response))
      })
    }
  },[props.expresionSeleccionada])

  // const checkPanel = (panel) => {
  //   return expanded.indexOf(panel) != -1
  // }

  return (
    <div>
        <ExpansionPanel square expanded={expanded1} onChange={() => setExpanded1(!expanded1)}>
          <ExpansionPanelSummary aria-controls="panel1d-content" id="panel1d-header">
            <Typography>Jerarquía:</Typography>
          </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Typography>
            Derivada de: {padres.length > 0 ? paintJerarquia(padres) : null}
          </Typography>
        </ExpansionPanelDetails>
        <Divider />
        <ExpansionPanelDetails>
          <Typography>Expresión: {props.expresionSeleccionada.expresion_original}</Typography>
        </ExpansionPanelDetails>
          <Divider />
        <ExpansionPanelDetails>
          <Typography>Expresiones derivadas: {hijos.length > 0 ? paintJerarquia(hijos) : null}</Typography>
        </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel square expanded={expanded2} onChange={() => setExpanded2(!expanded2)}>
        <ExpansionPanelSummary aria-controls="panel2d-content" id="panel2d-header">
          <Typography>Referencias Consultadas:</Typography>
        </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <ul>
              {referenciasConsultadasVista.map(consultas=>(
                <li>
                  <Typography className={"consultaDePasajes"} variant="h6">{consultas.expresion + "  //  " + consultas.traduccion + "  --  " + consultas.referencias[0].refid}</Typography>
                </li>
              ))}
            </ul>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel square expanded={expanded3} onChange={() => setExpanded3(!expanded3)}l>
          <ExpansionPanelSummary aria-controls="panel3d-content" id="panel3d-header">
            <Typography>Ver También:</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <ul>
              {listaVerTambien.map(expresion=>{
                return <li>
                  <Typography className={"consultaDePasajes"} variant="h6">{expresion.expresion + "  //  " + expresion.traduccion + "  --  " + expresion.id}</Typography>
                </li>
              })}
            </ul>
          </ExpansionPanelDetails>
        </ExpansionPanel>
    </div>
  )
}

export default MenuDerecho; 
