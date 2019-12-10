import React from 'react';
import Grid from '@material-ui/core/Grid';

function PasajesRenderizados(props){
    const [pasajeRenderizado, setPasajeRenderizado] = React.useState({
        "original" : "",
        "traduccion" : ""
    })

    React.useEffect(() => {
        if(props.referenciaSeleccionada != null){
            setPasajeRenderizado({
                original : resaltarBusqueda(props.referenciaSeleccionada.pasaje_original,props.referenciaSeleccionada.expresion_original),
                traduccion : resaltarBusqueda(props.referenciaSeleccionada.pasaje_traduccion,props.referenciaSeleccionada.expresion_traduccion) 
            })
        }else{
            setPasajeRenderizado({
                original : "Es gibt keine Referenz für diesen Ausdruck. Bitte beachten Sie die Liste der abgeleiteten Ausdrücke.",
                traduccion : "No hay ninguna referencia para esta expresión. Ver por favor la lista de expresiones derivadas." 
            })
        }
    }, [props.referenciaSeleccionada])

    function resaltarBusqueda(string,separador){
        var split = string.split(separador)
        var resultado = split.join("<span class='resaltador'>" + separador + "</span>")
        return resultado
    }

    function htmlPasajeOriginal(){
        return {__html:pasajeRenderizado.original}
    }

    function htmlPasajeTraduccion(){
        return {__html:pasajeRenderizado.traduccion}
    }

    return (
        <div>
            {props.cerrado ? 
            <Grid container>
                <Grid item xs={6} className="pasajesRenderizados"><div dangerouslySetInnerHTML={htmlPasajeOriginal()}></div></Grid>
                <Grid item xs={6} className="pasajesRenderizados"><div dangerouslySetInnerHTML={htmlPasajeTraduccion()}></div></Grid>
            </Grid>
            :
            props.languageP == "al" ? 
                <Grid container><Grid item xs={12} className="pasajesRenderizados"><div dangerouslySetInnerHTML={htmlPasajeOriginal()}></div></Grid></Grid> 
                :
                <Grid container><Grid item xs={12} className="pasajesRenderizados"><div dangerouslySetInnerHTML={htmlPasajeTraduccion()}></div></Grid></Grid>
            }
        </div>
    )
}

export default PasajesRenderizados;