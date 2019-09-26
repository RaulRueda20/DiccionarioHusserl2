import React from 'react';
import Fab from '@material-ui/core/Fab';
import Tooltip from '@material-ui/core/Tooltip';
import { withStyles } from '@material-ui/styles';

import es from "../../../Imagenes/spain.png";
import al from "../../../Imagenes/germany.png";

import {toolTipIdiomaDeLaLista} from '../../../js/Language';

const bandIn = {
  imagenesBandera:{
    width: "33px !important",
    height: "25px !important",
    fontSize: "0px",
    minHeight: "0px"
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
        <Tooltip title={toolTipIdiomaDeLaLista(props.lang)}>
          {props.language == 'es' ?
            <Fab className={classes.imagenesBandera} onClick={clickChangeLanguageAl}><img className="banderaIzquierda" src={al}/></Fab>
            : <Fab className={classes.imagenesBandera} onClick={clickChangeLanguageEs}><img className="banderaIzquierda" src={es}/></Fab>
          }
        </Tooltip>
      </div>
    )
}

export default withStyles(bandIn)(BanderaButon);