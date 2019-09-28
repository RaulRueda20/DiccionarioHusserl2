import React from 'react'
import IconButton from '@material-ui/core/IconButton';
import GetAppIcon from '@material-ui/icons/GetApp';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/styles';

import BanderaPasajes from './BanderaPasajes';
import PasajesRenderizados from './PasajesRenderizados'

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

  React.useEffect(() => {
    var nombreExpresion =  props.expresionSeleccionada != null ? props.expresionSeleccionada : emptyPasaje
    setTituloPasaje(nombreExpresion)
}, [props.expresionSeleccionada])

  return(
    <div>
      <Grid container justify="center" alignItems="center" alignContent="center">
        <Grid item xs={1}>
          <Tooltip title={"Descargar pasaje"}>
            <IconButton size="small" className="iconosIluminados">
              <GetAppIcon fontSize="large"/>
            </IconButton>
          </Tooltip>
        </Grid>
        <Grid item xs={10} className={classes.gridTituloPasaje}>
          {props.languageP=="al"?
          <Typography variant="h3">{tituloPasaje.expresion_original}</Typography>:
          <Typography variant="h3">{tituloPasaje.expresion_traduccion}</Typography>
          }
        </Grid>
        <Grid item xs={1}>
          <BanderaPasajes languageP={props.languageP} setLanguageP={props.setLanguageP}/>
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs={12}>
          <PasajesRenderizados expresionSeleccionada={props.expresionSeleccionada} languageP={props.languageP}
          />
        </Grid>
      </Grid>
    </div>
  )
}

export default withStyles(contenidoPasajes)(ContenidoPasaje);