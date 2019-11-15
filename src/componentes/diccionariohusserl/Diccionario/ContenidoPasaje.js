import React from 'react'
import IconButton from '@material-ui/core/IconButton';
import GetAppIcon from '@material-ui/icons/GetApp';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import SwapHorizIcon from '@material-ui/icons/SwapHoriz';
import Hidden from '@material-ui/core/Hidden';
import { makeStyles, useTheme } from '@material-ui/core/styles';

import BanderaPasajes from './BanderaPasajes';
import PasajesRenderizados from './PasajesRenderizados';
import ModalDescargas from './ModalDescargas';

import {descarga} from '../../../js/Language';
import { compose } from '@material-ui/system';

const emptyPasaje = {clave:"", epretty:"", expresion_original:"", expresion_traduccion:"", orden:"", pasaje_original: "", pasaje_traduccion:"",ref_original:"", ref_traduccion:"", refid:"", tpretty:""}

const useStyles = makeStyles(theme => ({
  gridTituloPasaje:{
    textAlign: "center",
    margin:"20px 0 !important"
  },
  typoSize:{
    [theme.breakpoints.down('xs')]: {
      fontSize : " 1.5rem !important",
    }
  }
}))

function ContenidoPasaje(props){
  const classes = useStyles();
  const theme = useTheme();
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
        <Grid item xs={2} sm={2} md={1} lg={1}>
          <Hidden smUp>
            <IconButton size="small" onClick={clickHandleHidden}>
              <SwapHorizIcon fontSize="large"/>
            </IconButton>
          </Hidden>
        </Grid>
        <Grid item xs={2} sm={2} md={1} lg={1}>
          <Tooltip title={descarga(props.lang)}>
            <IconButton size="small" className="iconosIluminados" onClick={clickHandleDescargas}>
              <GetAppIcon fontSize="large"/>
            </IconButton>
          </Tooltip>
        </Grid>
        <Grid item xs={6} sm={6} md={9} lg={9} className={classes.gridTituloPasaje}>
          <Typography className={classes.typoSize} variant="h2">{props.languageP=="al" ? tituloPasaje.expresion_original : tituloPasaje.expresion_traduccion}</Typography>
        </Grid>
        <Grid item xs={2} sm={2} md={1} lg={1}>
          <BanderaPasajes languageP={props.languageP} setLanguageP={props.setLanguageP} lang={props.lang}/>
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs={12}>
          <PasajesRenderizados referenciaSeleccionada={props.referenciaSeleccionada} languageP={props.languageP}
          cerrado={props.panelIzquierdo || props.panelDerecho} pasaje={props.pasaje} idDelURL={props.idDelURL}
          />
        </Grid>
      </Grid>
      <ModalDescargas openDescargas={openDescargas} setOpenDescargas={setOpenDescargas} idExpresion={props.idExpresion} 
      lang={props.lang} match={props.match} language={props.language}/>
    </div>
  )
}

export default (ContenidoPasaje);