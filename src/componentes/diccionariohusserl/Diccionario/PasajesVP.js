import React from 'react'
import Typography from '@material-ui/core/Typography';

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

    return(
      <Typography>
        Pasajes en proceso
      </Typography>
    )
}

export default PasajesVP