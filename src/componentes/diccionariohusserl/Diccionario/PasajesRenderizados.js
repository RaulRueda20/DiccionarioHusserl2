import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

function PasajesRenderizados(props){
    const {classes}=props;
    const [pasajeRenderizado, setPasajeRenderizado] = React.useState({
        "original" : "",
        "traduccion" : ""
    })


    React.useEffect(() => {
        setPasajeRenderizado({
            original : resaltarBusqueda(props.pasaje[0].pasaje_original,props.pasaje[0].expresion_original),
            traduccion : resaltarBusqueda(props.pasaje[0].pasaje_traduccion,props.pasaje[0].expresion_traduccion) 
        })
    }, [props.referenciaSeleccionada, props.pasaje])

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