import React from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import IconButton from '@material-ui/core/IconButton';
import Lang from "@material-ui/icons/Language"
import Fab from '@material-ui/core/Fab';
import { withStyles } from '@material-ui/styles';
import Typography from '@material-ui/core/Typography';

import * as localStore from '../js/localStore';

import es from "../Imagenes/spain.png";
import en from "../Imagenes/england.png";
import fr from "../Imagenes/french.png";
import ca from "../Imagenes/catalan.png";
import al from "../Imagenes/germany.png";

const banderas = {
    botonesBan:{
      width: "30px !important",
      height: "30px !important"
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

    const clickChangeLanguageEsPagina=()=>{
        props.setLenguajePagina("es");
      }
    
      const clickChangeLanguageAlPagina=()=>{
        props.setLenguajePagina("al");
      }

      const clickChangeLanguageEnPagina=()=>{
        props.setLenguajePagina("en");
      }

      const clickChangeLanguageFrPagina=()=>{
        props.setLenguajePagina("fr");
      }

      const clickChangeLanguageCaPagina=()=>{
        props.setLenguajePagina("ca");
      }

    return(
        <div>
        <IconButton
            aria-haspopup="true"
            aria-owns={anchorEl ? 'simple-menu': undefined}
            onClick={handleClick}
        >
          <Lang fontSize="large"/>
        </IconButton>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          onClose={handleClose}
          open={Boolean(anchorEl)}
        >
          <MenuItem onClick={handleClose}>
            <Fab className={classes.botonesBan} onClick={clickChangeLanguageEsPagina}><img className="banderas" src={es}/></Fab>
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <Fab className={classes.botonesBan} onClick={clickChangeLanguageAlPagina}><img className="banderas" src={al}/></Fab>
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <Fab className={classes.botonesBan} onClick={clickChangeLanguageEnPagina}><img className="banderas" src={en}/></Fab>
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <Fab className={classes.botonesBan} onClick={clickChangeLanguageFrPagina}><img className="banderas" src={fr}/></Fab>
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <Fab className={classes.botonesBan} onClick={clickChangeLanguageCaPagina}><img className="banderas" src={ca}/></Fab>
          </MenuItem>
        </Menu>
      </div>
    )
}

export default withStyles(banderas)(MenuIdioma);