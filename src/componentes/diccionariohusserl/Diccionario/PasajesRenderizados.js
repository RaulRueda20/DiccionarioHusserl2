import React from 'react';
import Grid from '@material-ui/core/Grid';

// const emptyPasaje = {clave:"", epretty:"", expresion_original:"", expresion_traduccion:"", orden:"", pasaje_original: "", pasaje_traduccion:"",ref_original:"", ref_traduccion:"", refid:"", tpretty:""}

function PasajesRenderizados(props){
    const {classes}=props;
    // const [pasaje, setPasaje] = React.useState(emptyPasaje);
    const [pasajes, setPasajes] = React.useState({
        "original" : "",
        "traduccion" : ""
    })


    React.useEffect(() => {
        var pasaje_original =  props.referenciaSeleccionada != null ? props.referenciaSeleccionada : emptyPasaje
        setPasajes({
            original : resaltarBusqueda(props.referenciaSeleccionada.pasaje_original, props.busqueda),
            traduccion : resaltarBusqueda(props.referenciaSeleccionada.pasaje_traduccion, props.busqueda)
        })
        console.log("expresionSeleccionada",props.referenciaSeleccionada)
    }, [props.referenciaSeleccionada])

    function htmlPasajeOriginal(){
        return {__html:pasaje.pasaje_original}
    }

    function htmlPasajeTraduccion(){
        return {__html:pasaje.pasaje_traduccion}
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