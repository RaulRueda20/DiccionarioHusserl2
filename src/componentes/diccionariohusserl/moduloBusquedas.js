// React
import React from 'react';

//Components
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/styles';

//Elements
import SearchBusqueda from './searchBusqueda';
import SelectorBusqueda from './selectorBusqueda';
import ListaBusqueda from './listaBusqueda';
import SelectLetraBusqueda from './selectLetraBusqueda';
import ResultadoBusquedaExpresion from './resultadoBusquedaPorExpresion';
import ResultadoBusquedaReferencia from './resultadoBusquedaPorReferencia';

//Other req
import {webService} from '../../js/webServices';

const moduloBusqueda={
    gridSelectorBusqueda:{
        paddingRight:"30px !important",
    },
    gridSelectorLetras:{
        paddingRight:"30px !important"
    },
    gridResultados:{
        maxHeight: "79.5vh",
        overflow: "scroll",
    }
}

function moduloBusquedas(props){
    const {classes}=props;
    const [expresionesEncontradas,setExpresionesEncontradas]=React.useState([]);
    const [tipoBusqueda,setTipoBusqueda]=React.useState("");
    const [letraBuscada,setLetraBuscada]=React.useState("");
    const [posicionPasaje, setPosicionPasaje]=React.useState(0);
    const [idPasaje, setIdPasaje]=React.useState("");

    return(
        <Grid container>
            <Grid item xs={8}>
                <SearchBusqueda expresionesEncontradas={expresionesEncontradas} setExpresionesEncontradas={setExpresionesEncontradas} posicionPasaje={posicionPasaje} 
                setPosicionPasaje={setPosicionPasaje} tipoBusqueda={tipoBusqueda}/>
            </Grid>
            <Grid item xs={2} className={classes.gridSelectorLetras}>
                <SelectLetraBusqueda letraBuscada={letraBuscada} setLetraBuscada={setLetraBuscada}/>
            </Grid>
            <Grid item xs={2} className={classes.gridSelectorBusqueda}>
                <SelectorBusqueda tipoBusqueda={tipoBusqueda} setTipoBusqueda={setTipoBusqueda}/>
            </Grid>
            {
                expresionesEncontradas.length < 1 ? null :
                <Grid item xs={3}>
                    <ListaBusqueda expresionesEncontradas={expresionesEncontradas} posicionPasaje={posicionPasaje} 
                    setPosicionPasaje={setPosicionPasaje} tipoBusqueda={tipoBusqueda} idPasaje={idPasaje} 
                    setIdPasaje={setIdPasaje}
                    />
                </Grid>
            }

            {
                expresionesEncontradas.length < 1 ? null :
                <Grid item xs={9} className={classes.gridResultados}>
                    {tipoBusqueda == "Referencia" ?
                    <ResultadoBusquedaReferencia pasajeSeleccionado={expresionesEncontradas[posicionPasaje]} idPasaje={idPasaje}/>
                    :
                    <ResultadoBusquedaExpresion expresionSeleccionada={expresionesEncontradas[posicionPasaje]} idPasaje={idPasaje} setIdPasaje={setIdPasaje}/>
                    }
                    {/* <ResultadoBusquedaExpresion idPasaje={idPasaje} setIdPasaje={setIdPasaje}/> */}
                </Grid>
            }
        </Grid>
    )
}

export default withStyles(moduloBusqueda)(moduloBusquedas);