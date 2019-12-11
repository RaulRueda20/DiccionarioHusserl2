import React from 'react';
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
  const [casillas, setCasillas] = React.useState([]);
  const [referencias, setReferencias] = React.useState([]);
  const [posicion, setPosicion] = React.useState(0)
  const [referenciaSeleccionada, setReferenciaSeleccionada] = React.useState(null);
  const [next, setNext] = React.useState("");

  // var idDeExpresion es el id que se toma de la URL, idExpresion es un estado que llama servicios y tiene otras funcionalidades

  React.useEffect(()=>{
    setPosicion(0)
    if(props.referencias.length > 0) setReferencias(props.referencias)
    if(props.referenciaSeleccionada != null){
      setReferenciaSeleccionada(props.referenciaSeleccionada)
      acortadorPaginador(props.referencias)
    }
  }, [props.referencias, props.referenciaSeleccionada, posicion])

  function acortadorPaginador(referencias){
    var i = 0
    var refPos = 0
    var penultimo = props.referencias.length - 2
    while(i<referencias.length){
      referencias[i].index = i
      if(referencias[i].refid == props.referenciaSeleccionada.refid){
        refPos = i
        setPosicion(i)
      }
      i++
      // console.log("posicion", posicion)
    }
    if(referencias.length>=5){
      if(refPos==0){
        var siguientesEscenario1 = refPos + 3
        setCasillas(referencias.slice(refPos,siguientesEscenario1))
      }else if(refPos==1){
        var anteriorEscenario2=refPos - 1
        var siguientesEscenario2 = refPos + 2
        setCasillas(referencias.slice(anteriorEscenario2,siguientesEscenario2))
      }else if(refPos > 1 && refPos < penultimo){
        var anterioresEscenario3 = refPos - 2
        var siguientesEscenario3 = refPos + 3
        setCasillas(referencias.slice(anterioresEscenario3,siguientesEscenario3))
      }else if(refPos == penultimo){
        var anterioresEscenario4 = refPos -3
        var siguienteEscenario4 = refPos +2
        setCasillas(referencias.slice(anterioresEscenario4,siguienteEscenario4))
      }else if(refPos == referencias.length - 1){
        var anterioresEscenario5 = refPos - 4
        setCasillas(referencias.slice(anterioresEscenario5,refPos + 1))
      }
    }else if(referencias.length<5){
      if(refPos==0){
        var siguientesEscenario1 = refPos + 3
        setCasillas(referencias.slice(refPos,siguientesEscenario1))
      }else if(refPos==1){
        var anteriorEscenario2=refPos - 1
        var siguientesEscenario2 = refPos + 2
        setCasillas(referencias.slice(anteriorEscenario2,siguientesEscenario2))
      }else if(refPos > 1 && refPos < penultimo){
        var anterioresEscenario3 = refPos - 2
        var siguientesEscenario3 = refPos + 2
        setCasillas(referencias.slice(anterioresEscenario3,siguientesEscenario3))
      }else if(refPos == penultimo){
        var anterioresEscenario4 = refPos -2
        var siguienteEscenario4 = refPos +2
        setCasillas(referencias.slice(anterioresEscenario4,siguienteEscenario4))
      }else if(refPos == referencias.length - 1){
        var anterioresEscenario5 = refPos - 3
        setCasillas(referencias.slice(anterioresEscenario5,refPos + 1))
      }
    }
    return referencias
  }

  function handleForward(){
    if(posicion==props.referencias.length -1){
      setNext(props.referencias[referencias.length -1])
    }
  }

  return(
    <div style={{borderLeft: "1px lightgray solid",borderRight: "1px lightgray solid",padding: "0px 10px"}}>
      { referenciaSeleccionada != null && referencias.length > 0 ? 
      <div style={{textAlign: 'center'}}>
        <Tooltip title={posicion==0 ? "No hay más pasajes" : referencias[0].ref_original}>
          <Link to={posicion==0 ? null : `/husserl/pasaje/${props.expresionId}/${referencias[0].refid}`} 
            className="botonPaginador"><FirstPage fontSize="small"/></Link>
        </Tooltip>
        <Tooltip title={posicion<=0 ? "No hay más pasajes" : referencias[posicion-1].ref_original}>
          <Link to={posicion<=0 ? null : `/husserl/pasaje/${props.expresionId}/${referencias[posicion-1].refid}`}
            className="botonPaginador"><Back fontSize="small"/></Link>
        </Tooltip>

        {casillas.map((referencia, index) => {
          return (
            (
              <Tooltip title={referencias[index].ref_original}>
                <Link to={`/husserl/pasaje/${props.expresionId}/${referencia.refid}`} className={classNames(["botonPaginador", {"pasajeSeleccionado": props.referenciaSeleccionada.refid == referencia.refid}])} style={{padding: "13px 0px"}}><span>{referencia.index+1}</span></Link>
              </Tooltip>
            )
          )})
        }

        <Tooltip title={posicion == referencias.length -1 || referencias.length==1 ? "No hay más pasajes" : referencias[posicion+1].ref_original}>
          <Link to={posicion >= referencias.length -1 ? null : `/husserl/pasaje/${props.expresionId}/${referencias[posicion+1].refid}`} onClick={handleForward}><span className="botonPaginador"><Next fontSize="small"/></span></Link>
        </Tooltip>
        <Tooltip title={posicion == referencias.length - 1 ? "No hay más pasajes" : referencias[referencias.length -1].ref_original}>
          <Link to={posicion == referencias.length - 1 ? null : `/husserl/pasaje/${props.expresionId}/${referencias[referencias.length -1].refid}`}><span className="botonPaginador"><LastPage fontSize="small"/></span></Link>
        </Tooltip>
      </div> : null}
      <Typography variant="h5">Hay {referencias.length} {referencias.length > 1 ? "pasajes" : "pasaje"} en total.</Typography>
    </div>
  )
}

export default Pasaje;