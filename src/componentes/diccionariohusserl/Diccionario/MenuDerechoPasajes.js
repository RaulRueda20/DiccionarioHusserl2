import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import MuiExpansionPanel from '@material-ui/core/ExpansionPanel';
import MuiExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import MuiExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';

import {menuDerechoJerarquia, menuDerechoJerarquiaDerivadaDe, menuDerechoJerarquiaExpresion, menuDerechoJerarquiaExpresionesDerivadas, menuDerechoVerTambien, menuDerechoReferenciasConsultadas} from '../../../js/Language';

import {webService} from '../../../js/webServices';
import * as localStore from '../../../js/localStore';

const ExpansionPanel = withStyles({
  root: {
    border: '1px solid rgba(0, 0, 0,.1)',
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
    padding: "0",
    overflowX:"hidden",
    paddingTop:"8px",
    maxHeight: "70px",
    // backgroundColor:'rgb(180,180,180)'
  },
}))(MuiExpansionPanelDetails);

const ExpansionPanelSummary = withStyles({
  root: {
    backgroundColor: 'rgba(0, 0, 0, .05)',
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

function MenuDerechoPasajes(props){
  const [referenciasConsultadasVista, setReferenciasConsultadasVista]=React.useState([])
  const [listaVerTambien,setListaVerTambien]=React.useState([]);
  const [hijos,setHijos]=React.useState([]);
  const [padres,setPadres]=React.useState([]);

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
    if(localStore.getObjects("referenciasConsultadas")!=false){
      var referenciaConsultadaSacada = localStore.getObjects("referenciasConsultadas")
      setReferenciasConsultadasVista(referenciaConsultadaSacada)
    }
    // if (props.expresionSeleccionada.id!=""){
    //   var service = "/vertambien/" + props.expresionSeleccionada.id
    //   webService(service, "GET", {}, data => {
    //     setListaVerTambien(data.data.response)
    //     webService(("/expresiones/"+props.language+"/hijosList/"+props.expresionSeleccionada.id),"GET", {}, (data) => setHijos(data.data.response))
    //     webService(("/expresiones/"+props.language+"/abuelosList/"+props.expresionSeleccionada.id), "GET", {}, (data2) =>setPadres(data2.data.response))
    //   })
    // }
  },[])

//   props.expresionSeleccionada

  console.log("expresionSeleccionada", props.expresionSeleccionada)

  return (
    <div>
        <ExpansionPanel square expanded={props.expanded1} onChange={()=>props.setExpanded1(!props.expanded1)}>
          <ExpansionPanelSummary aria-controls="panel1d-content" id="panel1d-header">
            <Typography>{menuDerechoJerarquia(props.lang)}</Typography>
          </ExpansionPanelSummary>
        <ExpansionPanelDetails className="panelDeDetalle">
          <Typography variant="caption">
          {menuDerechoJerarquiaDerivadaDe(props.lang)}
          </Typography>
          {/* <ul className="ulDelMenuDerecho" key={padres.refid}>
            {padres.map(padre=>(
              <li>
                <Typography variant="h6" className="consultaDePasajes">{padre.expresion}</Typography>
              </li>
            ))}
          </ul> */}
        </ExpansionPanelDetails>
        <Divider />
        <ExpansionPanelDetails className="panelDeDetalle">
          <Typography variant="caption">{menuDerechoJerarquiaExpresion(props.lang)}</Typography>
          {/* <ul className="ulDelMenuDerecho" >
            <li>
              <Typography variant="h6" className="consultaDePasajes">{props.expresionSeleccionada.expresion}</Typography>
            </li>
          </ul> */}
        </ExpansionPanelDetails>
          <Divider />
        <ExpansionPanelDetails className="panelDeDetalle">
          <Typography variant="caption">{menuDerechoJerarquiaExpresionesDerivadas(props.lang)}</Typography>
          {/* <ul className="ulDelMenuDerecho"  key={hijos.refid}> 
            {hijos.map(hijo=>(
              <li>
                <Typography variant="h6" className="consultaDePasajes">{hijo.expresion}</Typography>
              </li>
            ))}
          </ul> */}
        </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel square expanded={props.expanded2} onChange={()=>props.setExpanded2(!props.expanded2)}>
          <ExpansionPanelSummary aria-controls="panel2d-content" id="panel2d-header">
            <Typography>{menuDerechoVerTambien(props.lang)}</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails className="panelDeDetalle">
            <ul className="ulDelMenuDerecho">
              {listaVerTambien.map(expresion=>{
                return <li>
                  <Typography className={"consultaDePasajes"} variant="h6">{expresion.expresion + "  //  " + expresion.traduccion + "  --  " + expresion.id}</Typography>
                </li>
              })}
            </ul>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel square expanded={props.expanded3} onChange={()=>props.setExpanded3(!props.expanded3)}>
        <ExpansionPanelSummary aria-controls="panel3d-content" id="panel3d-header">
          <Typography>{menuDerechoReferenciasConsultadas(props.lang)}</Typography>
        </ExpansionPanelSummary>
          <ExpansionPanelDetails className="panelDeDetalle">
            {/* <ul className="ulDelMenuDerecho">
              {referenciasConsultadasVista.map(consultas=>(
                <li className="bordeDeConsultas">
                  <Typography className={"consultaDePasajes"} variant="h6">{consultas.expresion + "  //  " + consultas.traduccion + "  --  " + consultas.referencias[0].refid}</Typography>
                </li>
              ))}
            </ul> */}
          </ExpansionPanelDetails>
        </ExpansionPanel>
    </div>
  )
}

export default MenuDerechoPasajes; 