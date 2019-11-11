// React
import React from 'react';
import {Link} from 'react-router-dom';

// Elements
import { withStyles } from '@material-ui/core/styles';
import MuiExpansionPanel from '@material-ui/core/ExpansionPanel';
import MuiExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import MuiExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';

// Components
import ListaPadresPasajes from './LIstaPadresPasajes';
import ListaHijosPasajes from './ListaHijosPasajes'

// Language
import {menuDerechoJerarquia, menuDerechoJerarquiaDerivadaDe, menuDerechoJerarquiaExpresion, menuDerechoJerarquiaExpresionesDerivadas, menuDerechoVerTambien, menuDerechoReferenciasConsultadas} from '../../../js/Language';

// Other req
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
  expanded: {minHeight: "0px !important", height: "48px", alignItems: "center"},
})(MuiExpansionPanelSummary);

function MenuDerechoPasajes(props){
  const [referenciasConsultadasVista, setReferenciasConsultadasVista]=React.useState([])
  const [listaVerTambien,setListaVerTambien]=React.useState([]);
  const [hijos,setHijos]=React.useState([]);
  const [padres,setPadres]=React.useState([]);
  const [nombre, setNombre] = React.useState("")

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
        webService(("/expresiones/"+props.language+"/hijosList/"+props.idExpresion),"GET", {}, (data) => {
          setHijos(data.data.response)
          console.log("hijos",data.data.response)
        })
        webService(("/expresiones/"+props.language+"/abuelosList/"+props.idExpresion), "GET", {}, (data2) =>{
          setPadres(data2.data.response)
          console.log("padres",data2.data.response)
        })
      })
    }
    var expresion_original =  props.referenciaSeleccionada != null ? props.referenciaSeleccionada : emptyPasaje
    setNombre(expresion_original)
  },[props.idExpresion,props.referenciaSeleccionada])
 
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
          {padres.map((padre,index)=>(
            <ListaPadresPasajes padre={padre} index={index} language={props.language} key={padre.id+'-'+index}/>
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
            {hijos.map((hijo,index)=>(
              <ListaHijosPasajes hijo={hijo} index={index} language={props.language} key={hijo.id+"-"+index}/>
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
              {listaVerTambien.map((expresion,index)=>{
                return <li key={expresion.id+"-"+index}>
                  <Link to={`/husserl/pasaje/${expresion.id}`}>
                    <Typography className={"consultaDePasajes"} variant="h6">{expresion.expresion + "  //  " + expresion.traduccion + "  --  " + expresion.id}</Typography>
                  </Link>
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
              {referenciasConsultadasVista.map((consultas,index)=>(
                <li className="bordeDeConsultas" key={consultas.referencias[0].refid+"-"+index}>
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