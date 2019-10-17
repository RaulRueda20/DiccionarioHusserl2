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
import ResultadoBusqueda from './resultadoBusqueda';

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
        maxWidth: "71% !important"
    }
}

function moduloBusquedas(props){
    const {classes}=props;
    const [expresionesEncontradas,setExpresionesEncontradas]=React.useState([]);
    const [tipoBusqueda,setTipoBusqueda]=React.useState("");
    const [letraBuscada,setLetraBuscada]=React.useState("");
    const [idExpresionSeleccionada, setIdExpresionSeleccionada]=React.useState([]);

    React.useEffect(() => {
    }, [true])

    return(
        <Grid container>
            <Grid item xs={8}>
                <SearchBusqueda expresionesEncontradas={expresionesEncontradas} setExpresionesEncontradas={setExpresionesEncontradas} idExpresionSeleccionada={idExpresionSeleccionada} 
                setIdExpresionSeleccionada={setIdExpresionSeleccionada}/>
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
                    <ListaBusqueda expresionesEncontradas={expresionesEncontradas} idExpresionSeleccionada={idExpresionSeleccionada} 
                    setIdExpresionSeleccionada={setIdExpresionSeleccionada}
                    />
                </Grid>
            }

            {
                expresionesEncontradas.length < 1 ? null :
                <Grid item xs={9} className={classes.gridResultados}>
                    <ResultadoBusqueda idExpresionSeleccionada={idExpresionSeleccionada} setIdExpresionSeleccionada={setIdExpresionSeleccionada}/>
                </Grid>
            }
        </Grid>
    )
}

export default withStyles(moduloBusqueda)(moduloBusquedas);