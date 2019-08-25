import React from 'react';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/styles';

const styles = {
  footerText : {
    paddingTop: "22px !important",
    color: "rgba(255,255,255, .9)",
  },
  footerBody: {
    marginTop: 80
  }
}

class Footer extends React.Component{

  render(){
    const { classes } = this.props;
    return(
      <div className={classes.footerBody}>
        <Typography variant="h4" gutterBottom align="center">
           El proyecto del Diccionario Husserl es desarrollado por Antonio Zirión Quijano en el <a target="_blank" href="http://www.filosoficas.unam.mx"> Instituto de Investigaciones Filosóficas </a> de la <a target="_blank" href="http://www.unam.mx">Universidad Nacional Autónoma de México.</a>
        </Typography>
        <footer>
          <Typography className={classes.footerText} variant="h4" align="center">
            © Antonio Zirión Quijano, 2018. Derechos reservados conforme a la ley.
          </Typography>
        </footer>
      </div>
    )
  }
}
export default withStyles(styles)(Footer);