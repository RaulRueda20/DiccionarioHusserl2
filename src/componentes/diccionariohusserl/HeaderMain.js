import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import MenuHeader from './MenuHeader';
import MenuIdioma from '../MenuIdioma'

import {tituloDiccionario} from '../../js/Language';

const useStyles = makeStyles(theme => ({
  titulo:{
    color: "white",
  }
}))


function HeaderMain(props){
  const classes = useStyles();
  const theme = useTheme();

  return(
    <Grid container direction="row" justify="center" className="grids">
      <AppBar position="static" color="primary" className="headerMain">
        <Toolbar variant="dense">
          <Grid item xs={2} sm={1} md={1} xl={1}>
            <MenuHeader match={props.match} lang={props.lang} setLang={props.setLang}/>
          </Grid>
          <Grid item xs={8} sm={10} md={10} xl={10} align="center">
            <Typography variant="h2" className={classes.titulo}>
              {tituloDiccionario(props.lang)}
            </Typography>
          </Grid>
          <Grid item xs={2} sm={1} md={1} xl={1}>
            <MenuIdioma lang={props.lang} setLang={props.setLang}/>
          </Grid>
        </Toolbar>
      </AppBar>
    </Grid>
  )
}


export default HeaderMain;
