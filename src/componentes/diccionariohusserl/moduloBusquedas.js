import React from 'react';
import Grid from '@material-ui/core/Grid';

import SearchBusqueda from './searchBusqueda';
import SelectorBusqueda from './selectorBusqueda';


function moduloBusquedas(props){
    return(
        <Grid container>
            <Grid item xs={9}>
                <SearchBusqueda/>
            </Grid>
            <Grid item xs={3}>
                <SelectorBusqueda/>
            </Grid>
        </Grid>
    )
}

export default moduloBusquedas;