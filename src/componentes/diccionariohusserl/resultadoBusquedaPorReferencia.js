// React
import React from 'react';
import {Link} from 'react-router-dom';

//Components
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/styles';

//Other req
import {webService} from '../../js/webServices';

const resultadoBusquedaRef={
    typosTitulos:{
        marginTop:"15px !important",
        marginBottom:"15px !important",
        textAlign: "center"
    }
}

function ResultadoBusquedaReferencia(props){
    const {classes}=props;
    const [pasajes,setPasajes]=React.useState({
        "original": "",
        "traduccion": ""
    })

    React.useEffect(() => {
        setPasajes({
            original : resaltarBusqueda(props.pasajeSeleccionado.ref_original, props.busqueda),
            traduccion : resaltarBusqueda(props.pasajeSeleccionado.ref_traduccion, props.busqueda)
        })
    }, [props.posicionPasaje])
    

    function resaltarBusqueda(string,separador){
        var split = string.split(separador)
        var resultado = split.join("<span class='resaltador'>" + separador + "</span>")
        return resultado
    }

    function htmlPasajeOriginal(){
        return {__html: pasajes.original}
    }

    function htmlPasajeTraduccion(){
        return {__html: pasajes.traduccion}
    }

    return(
        <Grid container>
             <Grid item xs={12} className="pasajesRenderizadosBusqueda">
                <Typography variant="h4" className={classes.typosTitulos}>{props.pasajeSeleccionado.ref_id}</Typography>
                <div dangerouslySetInnerHTML={htmlPasajeOriginal()}></div>
                <div dangerouslySetInnerHTML={htmlPasajeTraduccion()}></div>
            </Grid> 
            <Grid item xs={12} className="pasajesRenderizadosBusquedaPorReferencia">
                <Typography variant="h4" className={classes.typosTitulos}> Expresiones Relacionadas al Pasaje</Typography>
                <ul className="ulExpresionesRelacionadas">
                    {props.pasajeSeleccionado.expresiones.map(expresion=>(
                        <li
                            key={expresion.t_id}
                            className="liExpresionesRelacionadas"
                        >
                            <Link to={`/husserl/pasaje/${expresion.t_id}/${props.pasajeSeleccionado.ref_id}`}>
                                <Typography>{expresion.expresion_original +"  /  "+ expresion.expresion_traduccion}</Typography>
                            </Link>
                        </li>
                    ))}
                </ul>
            </Grid> 
        </Grid>
    )
}

export default withStyles(resultadoBusquedaRef)(ResultadoBusquedaReferencia);