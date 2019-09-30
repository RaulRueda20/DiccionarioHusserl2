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
    }, [props.referenciaSeleccionada])

    function htmlPasajeOriginal(){
        return {__html:pasaje.pasaje_original}
    }

    function htmlPasajeTraduccion(){
        return {__html:pasaje.pasaje_traduccion}
    }

    return (
        <Grid container>
            <Grid item xs={12} className="pasajesRenderizados">
                {props.languageP == "al" ?
                <div dangerouslySetInnerHTML={htmlPasajeOriginal()}></div>:<div dangerouslySetInnerHTML={htmlPasajeTraduccion()}></div>
                }
            </Grid>
        </Grid>
    )
}

export default PasajesRenderizados;