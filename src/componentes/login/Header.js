import React from 'react';
import classNames from 'classnames';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/styles';
import Grid from '@material-ui/core/Grid';
import Divider from "@material-ui/core/Divider"

import {tituloDiccionario, subtituloDiccionario} from '../../js/Language';

import MenuIdioma from '../MenuIdioma'

const stylesHed = {
  subtitulo1:{
    marginTop: "10px",
  },
  grids : {
    margin: "5vh 0"
  },
  menuIdiomas : {
    textAlign : "center"
  }
}

function Header(props){
  const { classes } = props;

  return(
    <div>
      <Grid className={classNames("grids", classes.grids)} container justify="center">
        <Grid item xs={11}  align="center">
          <Typography variant="h1" align="center">
            {tituloDiccionario(props.lang)}
          </Typography>
        </Grid>
        <Grid item xs={1} className={classes.menuIdiomas}>
          <MenuIdioma lang={props.lang} setLang={props.setLang}/>
        </Grid>
      </Grid>
      <br/>
      <Divider className="divisor"/>
      <Grid container>
        <Grid item xs={11}  align="center">
          <Typography variant="h4" align="center">
          {subtituloDiccionario(props.lang)}
          </Typography>
        </Grid>
      </Grid>
      <br/>
    </div>
  )
}

export default withStyles(stylesHed)(Header);