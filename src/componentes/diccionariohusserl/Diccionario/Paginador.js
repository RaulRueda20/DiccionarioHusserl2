import React from 'react';
import Grid from '@material-ui/core/Grid';
import Tooltip from '@material-ui/core/Tooltip';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Back from '@material-ui/icons/KeyboardArrowLeft';
import Next from '@material-ui/icons/KeyboardArrowRight';
import {Link} from 'react-router-dom';
import { Typography } from '@material-ui/core';

// import {webService} from '../../../js/webServices';

function Pasaje(props){
  const [expresiones, setExpresiones] = React.useState([]);
  const [referencias, setReferencias] = React.useState([]);
  const [referenciaSeleccionada, setReferenciaSeleccionada] = React.useState(null);

  // var idDeExpresion es el id que se toma de la URL, idExpresion es un estado que llama servicios y tiene otras funcionalidades

  React.useEffect(()=>{
    console.log("PAGINADOR")
    console.log(props.referenciaSeleccionada, props.referencias)
    console.log(props.referencias[0])
    if(props.referenciaSeleccionada != null) setReferenciaSeleccionada(props.referenciaSeleccionada)
    if(props.referencias.length > 0) setReferencias(props.referencias)
    // console.log(props.match.params.expresion)
  }, [props.referencias, props.referenciaSeleccionada])

  return(
    <div>
      { referenciaSeleccionada != null && referencias.length > 0 ? 
      <div>
        <Tooltip title={referencias[0].ref_original}>
          <Link to={`/husserl/pasaje/${props.expresionId}/${referencias[0].refid}`} 
            className="botonPaginador"><span><FirstPage fontSize="small"/></span></Link>
        </Tooltip>
        <Tooltip title={referencias[props.referencias.length -1].ref_original}>
          <Link to={`/husserl/pasaje/${props.expresionId}/${referencias[props.referencias.length -1].refid}`}
            className="botonPaginador"><span><Back fontSize="small"/></span></Link>
        </Tooltip>

        {props.referencias.map((referencia, index) => (
            // <Grid className="botonPaginador" item xs>
            <Tooltip title={referencias[index].ref_original}>
              <Link to={`/husserl/pasaje/${props.expresionId}/${referencia.refid}`} className="botonPaginador"><span>{index + 1}</span></Link>
            </Tooltip>
            // </Grid>
          ))
        }

        <Tooltip title={referencias[props.referencias.length -1].ref_original}>
          <Link><span className="botonPaginador"><Next fontSize="small"/></span></Link>
        </Tooltip>
        <Tooltip title={referencias[props.referencias.length -1].ref_original}>
          <Link><span className="botonPaginador"><LastPage fontSize="small"/></span></Link>
        </Tooltip>
      </div> : null}
      <Typography variant="h5">Hay {props.referencias.length} {props.referencias.length > 1 ? "pasajes" : "pasaje"} en total.</Typography>
    </div>
  )
}

export default Pasaje;