import  React from 'react';
import classNames from 'classnames';

import {webService} from '../../../js/webServices';
import * as localStore from '../../../js/localStore';

const fixReferencias = (referencias) => {
  var expresiones=[]
  var posicActual = -1
  var expreActual = ""
  var i = 0
  console.log(referencias.length)
  while (i<referencias.length){
    if (expreActual != referencias[i].expresion){
      posicActual++
      expreActual = referencias[i].expresion
      expresiones.push({
        clave : referencias[i].clave,
        expresion : referencias[i].expresion,
        id : referencias[i].id,
        index_de: referencias[i].index_de,
        index_es: referencias[i].index_es,
        orden: referencias[i].orden,
        pretty_e: referencias[i].pretty_e,
        pretty_t: referencias[i].pretty_t,
        referencias : [],
        traduccion: referencias[i].traduccion
      })
      expresiones[posicActual].referencias.push({
        referencia_original : referencias[i].referencia_original,
        referencia_traduccion : referencias[i].referencia_traduccion,
        refid : referencias[i].refid,
      })
      i++
    }else{
      expresiones[posicActual].referencias.push({
        referencia_original : referencias[i].referencia_original,
        referencia_traduccion : referencias[i].referencia_traduccion,
        refid : referencias[i].refid,
      })
      i++
      // expresiones
    }
  }
  return expresiones
}

export default function ListaIzquierdaExpresion(props) {
  const [expanded, setExpanded] = React.useState('panel');
  const [pasajes, setPasajes] = React.useState([])
  const {classes}=props;

  var expresiones = props.expresiones

  // React.useEffect(()=>{
  //   var service = "/referencias/obtieneReferenciasByTerm/" + props.idExpresion
  //   webService(service, "GET", {}, (data) => {
  //     console.log("data pasajes", data)
  //   })
  // }, [props.idExpresion])

//   var Vistas=props.setVista

//   function clickHandleVista(){
//     props.setVistaP("pasajes")
//   }

  // const handleClickExpresion=(event)=>{
  //   console.log("evento", event.target)
  //   props.setIdExpresion(event.target.value)
  // }

  return (
    <div className="list-container">
      <ul>
      {expresiones.map((expresion, index)=>(
        <li 
          className={classNames({"selected" : expresion.id === props.idExpresion}, "sideList")} 
          key={"VP"+expresion.id} value={"VP"+expresion.id} 
          id ={"VP"+expresion.id}
        >
          {expresion.expresion + '//' + expresion.traduccion}
        </li>
        ))}
      </ul>
    </div>
  );
}