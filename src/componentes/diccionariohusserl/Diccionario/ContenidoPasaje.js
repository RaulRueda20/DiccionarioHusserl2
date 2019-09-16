import React from 'react'
import IconButton from '@material-ui/core/IconButton';
import GetAppIcon from '@material-ui/icons/GetApp';
import Grid from '@material-ui/core/Grid';

import BanderaPasajes from './BanderaPasajes';
import ContenidoPasajes from './ContenidoPasajes';

import {webService} from '../../../js/webServices';

function ContenidoPasaje(props){
  const [pasajesO, setPasajesO]=React.useState("")
  const [pasajesT, setPasajesT]=React.useState("")
  
  React.useEffect(()=>{
      var service = "/referencias/obtieneReferenciasByTerm/" + 2
      webService(service, "GET", {}, (data) => {
        console.log("data pasajes", data)
        setPasajesO(data.data.response[0])
        setPasajesT(data.data.response[0])
      })
  }, [props.idExpresion])

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
          <ContenidoPasajes languageP={props.languageP} pasajesT={pasajesT} setPasajesT={setPasajesT} pasajesO={pasajesO} setPasajesO={setPasajesO}/>
        </Grid>
      </Grid>
    </div>
  )
}

export default ContenidoPasaje;