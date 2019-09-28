import React from 'react'

const emptyPasaje = {clave:"", epretty:"", expresion_original:"", expresion_traduccion:"", orden:"", pasaje_original: "", pasaje_traduccion:"",ref_original:"", ref_traduccion:"", refid:"", tpretty:""}

function PasajesRenderizados(props){
    const {classes}=props;
    const [pasaje, setPasaje] = React.useState(emptyPasaje)

    React.useEffect(() => {
        var pasaje_original =  props.expresionSeleccionada != null ? props.expresionSeleccionada : emptyPasaje
        setPasaje(pasaje_original)
    }, [props.expresionSeleccionada])

    function htmlPasajeOriginal(){
        return {__html:pasaje.pasaje_original}
    }

    function htmlPasajeTraduccion(){
        return {__html:pasaje.pasaje_traduccion}
    }

    return (
        <div className="pasajesRenderizados">
            {props.languageP == "al" ?
            <div dangerouslySetInnerHTML={htmlPasajeOriginal()}></div>:<div dangerouslySetInnerHTML={htmlPasajeTraduccion()}></div>
            }
        </div>
    )
}

export default PasajesRenderizados;