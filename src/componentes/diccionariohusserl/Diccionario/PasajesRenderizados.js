import React from 'react';
import Grid from '@material-ui/core/Grid';

const emptyPasaje = {clave:"", epretty:"", expresion_original:"", expresion_traduccion:"", orden:"", pasaje_original: "", pasaje_traduccion:"",ref_original:"", ref_traduccion:"", refid:"", tpretty:""}

const rows = []

function PasajesRenderizados(props){
    const {classes}=props;
    const [pasaje, setPasaje] = React.useState(emptyPasaje);

    React.useEffect(() => {
        var pasaje_original =  props.referenciaSeleccionada != null ? props.referenciaSeleccionada : emptyPasaje
        setPasaje(pasaje_original)
        console.log(props.cerrado)
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