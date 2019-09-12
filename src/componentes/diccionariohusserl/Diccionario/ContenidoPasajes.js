import React from 'react'
import Typography from '@material-ui/core/Typography';


function ContenidoPasajes(props){
    const {classes}=props;

    var pasaje_original = props.pasajesO.pasaje_original;
    var pasaje_traduccion = props.pasajesT.pasaje_traduccion;
    var languageP = props.languageP

    console.log("html", pasaje_original)

    function htmlPasajeOriginal(){
        return {__html:pasaje_original}
    }

    function htmlPasajeTraduccion(){
        return {__html:pasaje_traduccion}
    }

    return (
        <div>
            {languageP == "al" ?
            <div dangerouslySetInnerHTML={htmlPasajeOriginal()}></div>:<div dangerouslySetInnerHTML={htmlPasajeTraduccion()}></div>
            }
        </div>
    )
}

export default ContenidoPasajes;