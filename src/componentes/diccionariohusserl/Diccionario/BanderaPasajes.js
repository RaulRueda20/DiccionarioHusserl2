import React from 'react';
import Fab from '@material-ui/core/Fab';
import { withStyles } from '@material-ui/styles';

import es from "../../../Imagenes/spain.png";
import al from "../../../Imagenes/germany.png";

const bandIn = {
  imagenesBandera:{
    width: "30px !important",
    height: "30px !important",
  }
}

function BanderaPasajes(props){
  const {classes} = props;

  var language=props.languageP
  var setLanguage=props.setLanguageP

  console.log("idiomas pasajes", language)

  const clickChangeLanguageEsBP=()=>{
    setLanguage("es");
  }

  const clickChangeLanguageAlBP=()=>{
    setLanguage("al");
  }

  return(
      <div>
        {props.languageP == 'es' ?
          <Fab className={classes.imagenesBandera} onClick={clickChangeLanguageAlBP}><img className="banderas" src={al}/></Fab>
          : <Fab className={classes.imagenesBandera} onClick={clickChangeLanguageEsBP}><img className="banderas" src={es}/></Fab>}
      </div>
    )
}

export default withStyles(bandIn)(BanderaPasajes);