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

function BanderaButon(props){
  const {classes} = props;

  var idioma = props.setLanguage

  const clickChangeLanguageEs=()=>{
    idioma("es");
  }

  const clickChangeLanguageAl=()=>{
    idioma("al");
  }

  return(
      <div>
        {props.language == 'es' ?
          <Fab className={classes.imagenesBandera} onClick={clickChangeLanguageAl}><img className="banderas" src={al}/></Fab>
          : <Fab className={classes.imagenesBandera} onClick={clickChangeLanguageEs}><img className="banderas" src={es}/></Fab>}
      </div>
    )
}

export default withStyles(bandIn)(BanderaButon);