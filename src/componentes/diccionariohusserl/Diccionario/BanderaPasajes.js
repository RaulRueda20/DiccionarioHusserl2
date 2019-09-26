import React from 'react';
import Fab from '@material-ui/core/Fab';
import { withStyles } from '@material-ui/styles';

import es from "../../../Imagenes/spain.png";
import al from "../../../Imagenes/germany.png";

const bandIn = {
  imagenesBandera:{
    width: "33px !important",
    height: "25px !important",
    fontSize: "0px",
    minHeight: "0px"
  }
}

function BanderaPasajes(props){
  const {classes} = props;

  var language=props.languageP
  var setLanguage=props.setLanguageP

  const clickChangeLanguageEsBP=()=>{
    setLanguage("es");
  }

  const clickChangeLanguageAlBP=()=>{
    setLanguage("al");
  }

  return(
      <div>
        {props.languageP == 'es' ?
          <Fab className={classes.imagenesBandera} onClick={clickChangeLanguageAlBP}><img className="banderaIzquierda" src={al}/></Fab>
          : <Fab className={classes.imagenesBandera} onClick={clickChangeLanguageEsBP}><img className="banderaIzquierda" src={es}/></Fab>}
      </div>
    )
}

export default withStyles(bandIn)(BanderaPasajes);