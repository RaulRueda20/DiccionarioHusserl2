import React from 'react'
import IconButton from '@material-ui/core/IconButton';
import GetAppIcon from '@material-ui/icons/GetApp';
import Grid from '@material-ui/core/Grid';

import BanderaPasajes from './BanderaPasajes';
import PasajesRenderizados from './PasajesRenderizados';

function ContenidoPasaje(props){

  return(
    <div>
      <Grid container>
        <Grid item xs={10}>
          <IconButton>
            <GetAppIcon fontSize="large"/>
          </IconButton>
        </Grid>
        <Grid item xs={2}>
          <BanderaPasajes languageP={props.languageP} setLanguageP={props.setLanguageP}/>
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs={12}>
          <PasajesRenderizados expresionSeleccionada={props.expresionSeleccionada} languageP={props.languageP}/>
        </Grid>
      </Grid>
    </div>
  )
}

export default ContenidoPasaje;