import React from 'react';
import Grid from '@material-ui/core/Grid';

import ExpresionesVP from './Expresiones';
import BusquedaVP from './BusquedaVP';
import PasajesVP from './PasajesVP';
import ListaLetras from './ListaLetras';
import MenuDerecho from './MenuDerecho';
function VistaPasajes(props){
    const [hijos, setHijos] = React.useState([]);
    const [padres, setPadres] = React.useState([]);

    return (
        <Grid container>
            <Grid item xs={12}>
                <ListaLetras letraMain={props.letraMain} setLetraMain={props.setLetraMain}/>
            </Grid>
            <Grid item xs={3}>
                <BusquedaVP language={props.language} setLanguage={props.setLanguage}/>
                <ExpresionesVP expresiones={props.expresiones} setExpresiones={props.setExpresiones} idExpresion={props.idExpresion} 
                setIdExpresion={props.setIdExpresion} language={props.language}letraMain={props.letraMain} vistaP={props.vistaP} setVistaP={props.setVistaP}
                />
            </Grid>  
            <Grid item xs={6}>
                <PasajesVP  idExpresion={props.idExpresion} setIdExpresion={props.setIdExpresion}/>
            </Grid>
            <Grid item xs={3}>
                <MenuDerecho expresionSeleccionada={props.idExpresion} hijos={hijos} setHijos={setHijos}/>
            </Grid>
        </Grid>
    )
}
export default VistaPasajes;