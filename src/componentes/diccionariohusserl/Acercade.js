import React from 'react'

import {webService} from '../../js/webServices';
import { SwipeableDrawer } from '@material-ui/core';

function Acercade(props){
    const [acercade, setAcercade] = React.useState("")

    React.useEffect(()=>{
        webService("/acerca_de/get", "GET", {}, (data) => {
           setAcercade(data.data.response[0]) 
        })
    }, [])

    function renderizadoDeAcercaDe(){
        switch(props.lang){
            case "es":
                return {__html: acercade.contenido}
            case "ca":
                return {__html: acercade.contenido_ca}
            case "al":
                return {__html: acercade.contenido_de}
            case "en":
                return {__html: acercade.contenido_en}
            case "fr":
                return {__html: acercade.contenido_fr}
        }
    }

    return(
        <div className="acercaDe" dangerouslySetInnerHTML={renderizadoDeAcercaDe()}></div>
    )
}

export default Acercade;