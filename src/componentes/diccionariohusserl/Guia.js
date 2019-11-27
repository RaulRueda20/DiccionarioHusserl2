import React from 'react';
import Typography from '@material-ui/core/Typography';

import {webService} from '../../js/webServices';

function Guia(props){
    const [guia, setGuia]=React.useState("")

    React.useEffect(()=>{
        webService("/manual/get", "GET", {}, (data) => {
           setGuia(data.data.response[0])
        })
    }, [])

    function renderizadoGuia(){
        switch(props.lang){
            case "es":
                return {__html: guia.contenido}
            case "ca":
                return {__html: guia.contenido_ca}
            case "al":
                return {__html: guia.contenido_de}
            case "en":
                return {__html: guia.contenido_en}
            case "fr":
                return {__html: guia.contenido_fr}
        }
    }

    return(
        <div className="guia" dangerouslySetInnerHTML={renderizadoGuia()}></div>
    )
}

export default Guia;