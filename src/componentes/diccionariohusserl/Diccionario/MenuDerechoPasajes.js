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
  expanded: {minHeight:'40px !important'},
})(MuiExpansionPanel);

const ExpansionPanelDetails = withStyles(theme => ({
  root: {
    // padding: "0",
    // overflowX:"hidden",
    // paddingTop:"5px",
    // maxHeight: "70px !important",
    // backgroundColor:'rgb(180,180,180)'
  },
}))(MuiExpansionPanelDetails);

const ExpansionPanelSummary = withStyles({
  root: {
    backgroundColor: "rgba(0,0,0,.11) !important",
    // borderBottom: '1px solid rgba(0, 0, 0, .125)',
    // marginBottom: -1,
    '&$expanded': {
    },
  },
  content: {
    '&$expanded': {
      margin: '5px 0',
    },
  },
  expanded: {minHeight:'48px !important'},
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
  const [nombre, setNombre] = React.useState("")

  const paintJerarquia = (lista) => {
    var lastString = ""
    for(var i in lista){
      if(i == lista.length-1)
        lastString += lista[i].expresion + "."
      else lastString += lista[i].expresion + ", "
    }
    return lastString
  }

  const emptyPasaje = {clave:"", epretty:"", expresion_original:"", expresion_traduccion:"", orden:"", pasaje_original: "", pasaje_traduccion:"",ref_original:"", ref_traduccion:"", refid:"", tpretty:""}


  React.useEffect(()=>{
    if(localStore.getObjects("referenciasConsultadas")!=false){
      var referenciaConsultadaSacada = localStore.getObjects("referenciasConsultadas")
      setReferenciasConsultadasVista(referenciaConsultadaSacada)
    }
    if (props.idExpresion!=""){
      var service = "/vertambien/" + props.idExpresion
      webService(service, "GET", {}, data => {
        setListaVerTambien(data.data.response)
        webService(("/expresiones/"+props.language+"/hijosList/"+props.idExpresion),"GET", {}, (data) => setHijos(data.data.response))
        webService(("/expresiones/"+props.language+"/abuelosList/"+props.idExpresion), "GET", {}, (data2) =>setPadres(data2.data.response))
      })
    }
      var expresion_original =  props.referenciaSeleccionada != null ? props.referenciaSeleccionada : emptyPasaje
      setNombre(expresion_original)
  },[props.idExpresion])
 
  return (
    <div className="contenedorMenuDerecho">
        <ExpansionPanel square expanded={props.expanded1} onChange={()=>props.setExpanded1(!props.expanded1)} className="panelPrincipal">
          <ExpansionPanelSummary aria-controls="panel1d-content" id="panel1d-header">
            <Typography>{menuDerechoJerarquia(props.lang)}</Typography>
          </ExpansionPanelSummary>
        <ExpansionPanelDetails className="panelDeDetallePadres">
          <Typography variant="caption">
          {menuDerechoJerarquiaDerivadaDe(props.lang)}
          </Typography>
          <ul className="ulDelMenuDerechoPadres" key={padres.refid}>
            {padres.map(padre=>(
              <li>
                <Typography variant="h6" className="consultaDePasajes">{padre.expresion}</Typography>
              </li>
            ))}
          </ul>
        </ExpansionPanelDetails>
        <Divider />
        <ExpansionPanelDetails className="panelDeDetalleExpresion">
          <Typography variant="caption">{menuDerechoJerarquiaExpresion(props.lang)}</Typography>
          <ul className="ulDelMenuDerechoExpresion" >
            <li>
              <Typography variant="h6" className="consultaDePasajes">{nombre.expresion_original}</Typography>
            </li>
          </ul>
        </ExpansionPanelDetails>
          <Divider />
        <ExpansionPanelDetails className="panelDeDetalleHijos">
          <Typography variant="caption">{menuDerechoJerarquiaExpresionesDerivadas(props.lang)}</Typography>
          <ul className="ulDelMenuDerechoHijos"  key={hijos.refid}> 
            {hijos.map(hijo=>(
              <li>
                <Typography variant="h6" className="consultaDePasajes">{hijo.expresion}</Typography>
              </li>
            ))}
          </ul>
        </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel square expanded={props.expanded2} onChange={()=>props.setExpanded2(!props.expanded2)} className="panelPrincipal">
          <ExpansionPanelSummary aria-controls="panel2d-content" id="panel2d-header">
            <Typography>{menuDerechoVerTambien(props.lang)}</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails className="panelDeDetalleVerTambien">
            <ul className="ulDelMenuDerechoVerTambien">
              {listaVerTambien.map(expresion=>{
                return <li>
                  <Typography className={"consultaDePasajes"} variant="h6">{expresion.expresion + "  //  " + expresion.traduccion + "  --  " + expresion.id}</Typography>
                </li>
              })}
            </ul>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel square expanded={props.expanded3} onChange={()=>props.setExpanded3(!props.expanded3)} className="panelPrincipal">
        <ExpansionPanelSummary aria-controls="panel3d-content" id="panel3d-header">
          <Typography>{menuDerechoReferenciasConsultadas(props.lang)}</Typography>
        </ExpansionPanelSummary>
          <ExpansionPanelDetails className="panelDeDetalleReferenciasConsultadas">
            <ul className="ulDelMenuDerechoReferenciasConsultadas">
              {referenciasConsultadasVista.map(consultas=>(
                <li className="bordeDeConsultas">
                  <Typography className={"consultaDePasajes"} variant="h6">{consultas.expresion + "  //  " + consultas.traduccion + "  --  " + consultas.referencias[0].refid}</Typography>
                </li>
              ))}
            </ul>
          </ExpansionPanelDetails>
        </ExpansionPanel>
    </div>
  )
}

export default MenuDerechoPasajes; 