import React from 'react';
import classNames from 'classnames';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/styles';
import Grid from '@material-ui/core/Grid';
import Divider from "@material-ui/core/Divider"

import MenuIdioma from '../MenuIdioma'

const stylesHed = {
  subtitulo1:{
    marginTop: "10px",
  },
  grids : {
    margin: "5vh 0"
  }
}

function Header(props){
  const { classes } = props;
  const [lenguajePagina, setLenguajePagina]=React.useState("es")

  return(
    <div>
      <Grid className={classNames("grids", classes.grids)} container justify="center">
        <Grid item xs={10}  align="center">
          <Typography variant="h1" align="center">
            Diccionario Husserl
          </Typography>
        </Grid>
        <Grid item xs={2}>
          <MenuIdioma lenguajePagina={lenguajePagina} setLenguajePagina={setLenguajePagina}/>
        </Grid>
      </Grid>
      <br/>
      <Divider className="divisor"/>
      <Grid container>
        <Grid item xs={11}  align="center">
          <Typography variant="h4" align="center">
            Léxico bilingüe (alemán y español) de expresiones definidas a partir de las obras de Edmund Husserl (1859-1938)
          </Typography>
        </Grid>
      </Grid>
      <br/>
    </div>
  )
}

export default withStyles(stylesHed)(Header);