// React
import React from 'react';

//Components
import Grid from '@material-ui/core/Grid';

//Elements
import SearchBusqueda from './searchBusqueda';
import SelectorBusqueda from './selectorBusqueda';
import ResultadoBusqueda from './listaBusqueda';


function moduloBusquedas(props){
    const [expresionesEncontradas,setExpresionesEncontradas]=React.useState([])

    return(
        <Grid container>
            <Grid item xs={8}>
                <SearchBusqueda expresionesEncontradas={expresionesEncontradas} setExpresionesEncontradas={setExpresionesEncontradas}/>
            </Grid>
            <Grid item xs={3}>
                <SelectorBusqueda/>
            </Grid>
            <Grid item xs={4}>
                <ResultadoBusqueda expresionesEncontradas={expresionesEncontradas}/>
            </Grid>
        </Grid>
    )
}

export default moduloBusquedas;