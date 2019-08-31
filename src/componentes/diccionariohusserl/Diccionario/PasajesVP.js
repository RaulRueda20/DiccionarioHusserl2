import React from 'react'
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import GetAppIcon from '@material-ui/icons/GetApp';
import Grid from '@material-ui/core/Grid';

import BanderaPasajes from './BanderaPasajes';

import {webService} from '../../../js/webServices';

function PasajesVP(props){
  const [pasajesO, setPasajesO]=React.useState("")
  const [pasajesT, setPasajesT]=React.useState("")
  
  React.useEffect(()=>{
      var service = "/referencias/obtieneReferenciasByTerm/" + props.idExpresion
      webService(service, "GET", {}, (data) => {
        console.log("data pasajes", data)
        setPasajesO(data.data.response)
        setPasajesT(data.data.response)
      })
  }, [props.idExpresion])

  var language=props.languageP

  console.log("pasajes Idiomas", language)

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
          <Typography>
            Pasajes en proceso
          </Typography>
        </Grid>
      </Grid>
    </div>
  )
}

export default PasajesVP;