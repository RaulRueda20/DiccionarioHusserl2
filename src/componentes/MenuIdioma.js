import React from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import IconButton from '@material-ui/core/IconButton';
import Lang from "@material-ui/icons/Language"
import Fab from '@material-ui/core/Fab';
import Tooltip from '@material-ui/core/Tooltip';
import { makeStyles, useTheme } from '@material-ui/core/styles';

import es from "../Imagenes/spain.png";
import en from "../Imagenes/england.png";
import fr from "../Imagenes/french.png";
import ca from "../Imagenes/catalan.png";
import al from "../Imagenes/germany.png";

import {toolTipMenuIdiomas} from '../js/Language';

const banderas = {
  botonesBan:{
    width: "34px !important",
    height: "19px !important",
    boxShadow: "none",
    fontSize: "null",
    background: "transparent !important"
  },
  menuUl: {
    marginLeft: "5px"
  },
  lang:{
    fontSize: "2.5rem"
  }
}

const useStyles = makeStyles(theme => ({
  botonesBan:{
    width: "34px !important",
    height: "19px !important",
    boxShadow: "none",
    fontSize: "null",
    background: "transparent !important"
  },
  menuUl: {
    marginLeft: "5px"
  },
  lang:{
    fontSize: "2.5rem"
  }
}))

function MenuIdioma(props){
  const classes = useStyles();
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = React.useState(null);

  function handleClick(event) {
      setAnchorEl(event.currentTarget);
  }

  function handleClose() {
      setAnchorEl(null);
  }

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
            <Lang className={classes.lang}/>
          </IconButton>
        </Tooltip>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          onClose={handleClose}
          className={classes.menuUl}
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

export default MenuIdioma;