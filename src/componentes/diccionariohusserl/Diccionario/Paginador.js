import React from 'react';
import Grid from '@material-ui/core/Grid';
import classNames from 'classnames';
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
    if(props.referenciaSeleccionada != null) setReferenciaSeleccionada(props.referenciaSeleccionada)
    if(props.referencias.length > 0) setReferencias(props.referencias)
    // console.log(props.match.params.expresion)
  }, [props.referencias, props.referenciaSeleccionada])

  return(
    <div style={{borderLeft: "1px lightgray solid",borderRight: "1px lightgray solid",padding: "0px 10px"}}>
      { referenciaSeleccionada != null && referencias.length > 0 ? 
      <div style={{textAlign: 'center'}}>
        <Tooltip title={referencias[0].ref_original}>
          <Link to={`/husserl/pasaje/${props.expresionId}/${referencias[0].refid}`} 
            className="botonPaginador"><FirstPage fontSize="small"/></Link>
        </Tooltip>
        <Tooltip title={referencias[props.referencias.length -1].ref_original}>
          <Link to={`/husserl/pasaje/${props.expresionId}/${referencias[props.referencias.length -1].refid}`}
            className="botonPaginador"><Back fontSize="small"/></Link>
        </Tooltip>

        {props.referencias.map((referencia, index) => (
            <Tooltip title={referencias[index].ref_original}>
              <Link to={`/husserl/pasaje/${props.expresionId}/${referencia.refid}`} className={classNames(["botonPaginador", {"pasajeSeleccionado": props.referenciaSeleccionada.refid == referencia.refid}])} style={{padding: "13px 0px"}}><span>{index + 1}</span></Link>
            </Tooltip>
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