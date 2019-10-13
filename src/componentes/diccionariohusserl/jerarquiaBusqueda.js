// React
import React from 'react';

//Components
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { withStyles } from '@material-ui/styles';

function JerarquiaBusqueda(props){

    return(
        <Grid container className="pasajesRenderizadosVistaBusqueda">
            <Grid item xs={5} className="jerarquiaBusqueda">
                <Typography variant="h5">Jerarquia</Typography>
                <Typography variant="caption">Derivada de:</Typography>
                <ul className="ulDeBusqueda" key={props.padres.refid}>
                {props.padres.map((padre, index)=>(
                    <li key={padre.id+"-"+index}>
                        <Typography variant="h6" className="consultaDePasajesB">{padre.expresion}</Typography>
                    </li>
                ))}
                </ul>
                <Typography variant="caption">Expresiones derivadas:</Typography>
                <ul className="ulDeBusqueda" key={props.hijos.refid}>
                {props.hijos.map((hijo, index)=>(
                    <li key={hijo.id+"-"+index}>
                        <Typography variant="h6" className="consultaDePasajesB">{hijo.expresion}</Typography>
                    </li>
                ))}
                </ul>
            </Grid>
            <Grid item xs={5} className="jerarquiaBusqueda">
                <Typography variant="h5">Ver tambien</Typography>
                <ul className="ulDeBusquedaVerTambien" key={props.hijos.refid}>
                {props.listaVerTambien.map((lista, index)=>(
                    <li key={lista.id+"-"+index}>
                        <Typography variant="h6" className="consultaDePasajesB">{lista.expresion + "  //  " + lista.traduccion  + "  //  " + lista.id}</Typography>
                    </li>
                ))}
                </ul>
            </Grid>
            <Grid item xs={1}>
                <FormControlLabel
                    value="al"
                    control={<Switch color="primary" checked={props.lang} onChange={event => props.setLang(!props.lang)}/>}
                    label={props.lang ? "Aleman" : "Español"}
                    labelPlacement="end"
                />
            </Grid>
        </Grid>
    )
}

export default JerarquiaBusqueda;