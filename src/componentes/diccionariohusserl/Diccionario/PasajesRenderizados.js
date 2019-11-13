import React from 'react';
import Grid from '@material-ui/core/Grid';

function PasajesRenderizados(props){
    const {classes}=props;
    const [pasajeRenderizado, setPasajeRenderizado] = React.useState({
        "original" : "",
        "traduccion" : ""
    })
    const [refId,setRefId]=React.useState({})

    function pasajesOriginal(PasajeO){
        for(var i in PasajeO){
            if(props.idDelURL==PasajeO[i].refid){
                console.log("pasajeO",PasajeO[i].pasaje_original)
                setPasajeRenderizado({
                    original : resaltarBusqueda(PasajeO[i].pasaje_original,PasajeO[i].expresion_original),
                    traduccion : resaltarBusqueda(PasajeO[i].pasaje_traduccion,PasajeO[i].expresion_traduccion) 
                })
            }
        }
    }

    React.useEffect(() => {
        console.log("url",props.idDelURL)
        pasajesOriginal(props.pasaje)
    }, [props.referenciaSeleccionada, props.pasaje, props.idDelURL])

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