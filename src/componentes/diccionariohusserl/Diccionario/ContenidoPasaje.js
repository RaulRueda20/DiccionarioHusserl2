import React from 'react'
import IconButton from '@material-ui/core/IconButton';
import GetAppIcon from '@material-ui/icons/GetApp';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import SwapHorizIcon from '@material-ui/icons/SwapHoriz';
import Hidden from '@material-ui/core/Hidden';
import { withStyles } from '@material-ui/styles';

import BanderaPasajes from './BanderaPasajes';
import PasajesRenderizados from './PasajesRenderizados';
import ModalDescargas from './ModalDescargas';

import {descarga} from '../../../js/Language';
import { compose } from '@material-ui/system';

const emptyPasaje = {clave:"", epretty:"", expresion_original:"", expresion_traduccion:"", orden:"", pasaje_original: "", pasaje_traduccion:"",ref_original:"", ref_traduccion:"", refid:"", tpretty:""}

const contenidoPasajes={
  gridTituloPasaje:{
    textAlign: "center",
    margin:"20px 0 !important"
  }
}

function ContenidoPasaje(props){
  const {classes}=props;
  const [tituloPasaje, setTituloPasaje]=React.useState("");
  const [openDescargas, setOpenDescargas]=React.useState(false)

  React.useEffect(() => {
    var nombreExpresion =  props.referenciaSeleccionada != null ? props.referenciaSeleccionada : emptyPasaje
    setTituloPasaje(nombreExpresion)
  }, [props.referenciaSeleccionada])

  function clickHandleDescargas(){
    setOpenDescargas(true)
  }

  function clickHandleHidden(){
    props.setOpenHidden(!props.openHidden)
  }

  return(
    <div>
      <Grid container justify="center" alignItems="center" alignContent="center" style={{borderRight: "1px double lightgrey",
    borderLeft: "1px double lightgrey"}}>
        <Grid item xs={1}>
          <Hidden smUp>
            <IconButton size="small" onClick={clickHandleHidden}>
              <SwapHorizIcon fontSize="large"/>
            </IconButton>
          </Hidden>
        </Grid>
        <Grid item xs={1}>
          <Tooltip title={descarga(props.lang)}>
            <IconButton size="small" className="iconosIluminados" onClick={clickHandleDescargas}>
              <GetAppIcon fontSize="large"/>
            </IconButton>
          </Tooltip>
        </Grid>
        <Grid item xs={9} className={classes.gridTituloPasaje}>
          <Typography variant="h2">{props.languageP=="al" ? tituloPasaje.expresion_original : tituloPasaje.expresion_traduccion}</Typography>
        </Grid>
        <Grid item xs={1}>
          <BanderaPasajes languageP={props.languageP} setLanguageP={props.setLanguageP} lang={props.lang}/>
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs={12}>
          <PasajesRenderizados referenciaSeleccionada={props.referenciaSeleccionada} languageP={props.languageP}
          cerrado={props.panelIzquierdo || props.panelDerecho} pasaje={props.pasaje}
          />
        </Grid>
      </Grid>
      <ModalDescargas openDescargas={openDescargas} setOpenDescargas={setOpenDescargas} idExpresion={props.idExpresion} 
      lang={props.lang} match={props.match}/>
    </div>
  )
}

export default withStyles(contenidoPasajes)(ContenidoPasaje);