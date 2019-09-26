import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

import MenuHeader from './MenuHeader';
import MenuIdioma from '../MenuIdioma'

import {tituloDiccionario} from '../../js/Language';

function HeaderMain(props){

  return(
    <Grid container direction="row" justify="center" className="grids">
      <AppBar position="static" color="primary" className="headerMain">
        <Toolbar variant="dense">
          <Grid item xs={1}>
            <MenuHeader match={props.match} lang={props.lang} setLang={props.setLang}/>
          </Grid>
          <Grid item xs={10} align="center">
            <Typography variant="h2" style={{color: "white"}}>
              {tituloDiccionario(props.lang)}
            </Typography>
          </Grid>
          <Grid item xs={1}>
            <MenuIdioma lang={props.lang} setLang={props.setLang}/>
          </Grid>
        </Toolbar>
      </AppBar>
    </Grid>
  )
}


export default HeaderMain;
