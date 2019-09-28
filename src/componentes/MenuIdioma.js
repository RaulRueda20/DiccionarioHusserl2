import React from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import IconButton from '@material-ui/core/IconButton';
import Lang from "@material-ui/icons/Language"
import Fab from '@material-ui/core/Fab';
import Tooltip from '@material-ui/core/Tooltip';
import { withStyles } from '@material-ui/styles';

import es from "../Imagenes/spain.png";
import en from "../Imagenes/england.png";
import fr from "../Imagenes/french.png";
import ca from "../Imagenes/catalan.png";
import al from "../Imagenes/germany.png";

import {toolTipMenuIdiomas} from '../js/Language';

const banderas = {
    botonesBan:{
      width: "32px !important",
      height: "19px !important",
      boxShadow: "none",
      fontSize: "null",
      background: "transparent !important"
    }
  }

function MenuIdioma(props){
    const {classes}=props;
    const [anchorEl, setAnchorEl] = React.useState(null);

    function handleClick(event) {
        setAnchorEl(event.currentTarget);
    }

    function handleClose() {
        setAnchorEl(null);
    }

    // const clickChangeLanguageEsPagina=()=>{
    //   props.setLang("es");
    //   }
    
    //   const clickChangeLanguageAlPagina=()=>{
    //     props.setLang("al");
    //   }

    //   const clickChangeLanguageEnPagina=()=>{
    //     props.setLang("en");
    //   }

    //   const clickChangeLanguageFrPagina=()=>{
    //     props.setLang("fr");
    //   }

    //   const clickChangeLanguageCaPagina=()=>{
    //     props.setLang("ca");
    //   }

    return(
        <div className="menuIdiomas">
          <Tooltip title={toolTipMenuIdiomas(props.lang)}>
            <IconButton
              aria-haspopup="true"
              aria-owns={anchorEl ? 'simple-menu': undefined}
              onClick={handleClick}
              size="small"
              className="iconosIluminados"
            >
              <Lang fontSize="large"/>
            </IconButton>
          </Tooltip>
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            onClose={handleClose}
            open={Boolean(anchorEl)}
          >
            <MenuItem onClick={handleClose} className="menuSimple">
              <Fab className={classes.botonesBan} onClick={()=>props.setLang("al")}><img className="banderas" src={al}/></Fab>
            </MenuItem>
            <MenuItem onClick={handleClose} className="menuSimple">
              <Fab className={classes.botonesBan} onClick={()=>props.setLang("es")}><img className="banderas" src={es}/></Fab>
            </MenuItem>
            <MenuItem onClick={handleClose} className="menuSimple">
              <Fab className={classes.botonesBan} onClick={()=>props.setLang("en")}><img className="banderas" src={en}/></Fab>
            </MenuItem>
            <MenuItem onClick={handleClose} className="menuSimple">
              <Fab className={classes.botonesBan} onClick={()=>props.setLang("fr")}><img className="banderas" src={fr}/></Fab>
            </MenuItem>
            <MenuItem onClick={handleClose} className="menuSimple">
              <Fab className={classes.botonesBan} onClick={()=>props.setLang("ca")}><img className="banderas" src={ca}/></Fab>
            </MenuItem>
          </Menu>
      </div>
    )
}

export default withStyles(banderas)(MenuIdioma);