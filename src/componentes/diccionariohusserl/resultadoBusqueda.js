// React
import React from 'react';

//Components
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/styles';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

//Other req
import {webService} from '../../js/webServices';

const resultadoBusqueda={
    typosTitulos:{
        marginTop:"15px !important",
        marginBottom:"15px !important"
    }
}

const emptyPasajeB = {clave:"", epretty:"", expresion_original:"", expresion_traduccion:"", orden:"", pasaje_original: "", pasaje_traduccion:"",ref_original:"", ref_traduccion:"", refid:"", tpretty:""}

function ResultadoBusqueda(props){
    const {classes}=props;
    const [referencias, setReferencias] = React.useState([])
    const [referenciaSeleccionada, setReferenciaSeleccionada]=React.useState(emptyPasajeB);
    const [listaVerTambien,setListaVerTambien] = React.useState([]);
    const [hijos,setHijos] = React.useState([]);
    const [padres,setPadres] = React.useState([]);
    const [lang, setLang] = React.useState(true);

    React.useEffect(() => {
        var service = "/referencias/obtieneReferencias/" + props.idExpresionSeleccionada
        webService(service, "GET", {}, (data) => {
            setReferencias(data.data.response)
            setReferenciaSeleccionada(data.data.response.length >= 1 ? data.data.response[0] : emptyPasajeB)
        })
        if (props.idExpresionSeleccionada!=""){
            if(lang == true){
                var servicioHijosAl = "/expresiones/"+ "al" +"/hijosList/"+props.idExpresionSeleccionada;
                var servicioPadresAl = "/expresiones/"+ "al" +"/abuelosList/"+props.idExpresionSeleccionada;
                webService(servicioHijosAl,"GET", {}, (data) => setHijos(data.data.response))
                webService(servicioPadresAl,"GET", {}, (data) => setPadres(data.data.response))
            }else{
                var servicioHijosEs = "/expresiones/"+ "es" +"/hijosList/"+props.idExpresionSeleccionada;
                var servicioPadresEs = "/expresiones/"+ "es" +"/abuelosList/"+props.idExpresionSeleccionada
                webService(servicioHijosEs,"GET", {}, (data) => setHijos(data.data.response))
                webService(servicioPadresEs,"GET", {}, (data) => setPadres(data.data.response))
            }
            var service = "/vertambien/" + props.idExpresionSeleccionada
            webService(service, "GET", {}, data => {
              setListaVerTambien(data.data.response)
            })
        }
    }, [props.idExpresionSeleccionada, lang])

    function htmlPasajeOriginal(){
        return {__html:referenciaSeleccionada.pasaje_original}
    }

    function htmlPasajeTraduccion(){
        return {__html:referenciaSeleccionada.pasaje_traduccion}
    }

    return(
        <Grid container>
            <Grid item xs={12} className="pasajesRenderizadosBusqueda">
                <Typography variant="h3"  className={classes.typosTitulos}>{referenciaSeleccionada.expresion_original}</Typography>
                <div dangerouslySetInnerHTML={htmlPasajeOriginal()}></div>
                <Typography variant="h3" className={classes.typosTitulos}>{referenciaSeleccionada.expresion_traduccion}</Typography>
                <div dangerouslySetInnerHTML={htmlPasajeTraduccion()}></div>
            </Grid> 
            <Grid item xs={5} className="jerarquiaBusquedaIzquierda">
                <Typography variant="h5">Jerarquia</Typography>
                <Typography variant="caption">Derivada de:</Typography>
                <ul className="ulDeBusqueda" key={padres.refid}>
                {padres.map((padre, index)=>(
                    <li key={padre.id+"-"+index}>
                        <Typography variant="h6" className="consultaDePasajesB">{padre.expresion}</Typography>
                    </li>
                ))}
                </ul>
                <Typography variant="caption">Expresiones derivadas:</Typography>
                <ul className="ulDeBusqueda" key={hijos.refid}>
                {hijos.map((hijo, index)=>(
                    <li key={hijo.id+"-"+index}>
                        <Typography variant="h6" className="consultaDePasajesB">{hijo.expresion}</Typography>
                    </li>
                ))}
                </ul>
            </Grid>
            <Grid item xs={5} className="jerarquiaBusquedaDerecha">
                <Typography variant="h5">Ver tambien</Typography>
                <ul className="ulDeBusquedaVerTambien" key={listaVerTambien.id}>
                {listaVerTambien.map((lista, index)=>(
                    <li key={lista.id+"-"+index}>
                        <Typography variant="h6" className="consultaDePasajesB">{lista.expresion + "  //  " + lista.traduccion  + "  //  " + lista.id}</Typography>
                    </li>
                ))}
                </ul>
            </Grid>
            <Grid item xs={1}>
                <FormControlLabel
                    value="al"
                    control={<Switch color="primary" checked={lang} onChange={event =>setLang(!lang)}/>}
                    label={lang ? "Aleman" : "Español"}
                    labelPlacement="end"
                />
            </Grid>
        </Grid>
    )
}

export default withStyles(resultadoBusqueda)(ResultadoBusqueda);