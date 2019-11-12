import React from 'react';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/styles';

import {Footer1, Footer2, Footer3} from '../../js/Language';

const styles = {
  footerText : {
    paddingTop: "22px !important",
    color: "rgba(255,255,255, .9)",
  },
  footerBody: {
    bottom: "25px",
    position: "absolute",
    width: "100%"
  }
}



function Footer(props){
  const { classes } =props;
  
  return(
    <div className={classes.footerBody}>
      <Typography variant="h4" gutterBottom align="center">
          {Footer1(props.lang)} <a target="_blank" href="http://www.filosoficas.unam.mx" className="links"> Instituto de Investigaciones Filosóficas </a> {Footer2(props.lang)} <a target="_blank" href="http://www.unam.mx" className="links">Universidad Nacional Autónoma de México.</a>
      </Typography>
      <footer>
        <Typography className={classes.footerText} variant="h4" align="center">
          {Footer3(props.lang)}
        </Typography>
      </footer>
    </div>
  )
}
export default withStyles(styles)(Footer);