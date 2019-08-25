import React from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import IconButton from '@material-ui/core/IconButton';
import Lang from "@material-ui/icons/Language"
import Fab from '@material-ui/core/Fab';
import { withStyles } from '@material-ui/styles';

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

class MenuIdiomas extends React.Component{
  constructor(props){
    super(props)
  }

  state = {anchorEl : null, language: this.props.lang}


  setMenuIdio = (event) => {
    this.setState({anchorEl: event.currentTarget})
  }

  closeMenuIdio = () =>{
    this.setState({anchorEl:null})
  }

  // onLanguageChange = language =>{
  //   localStore.setItem("lang", language)
  //   this.setState({lang})
  // }

  render(){
    const {classes} = this.props
    const {anchorEl} = this.state
    return(
      <div>
        <IconButton
          aria-haspopup="true"
          aria-owns={anchorEl ? 'simple-menu': undefined}
          onClick={this.setMenuIdio}
        >
          <Lang fontSize="large"/>
        </IconButton>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          onClose={this.closeMenuIdio}
          open={Boolean(anchorEl)}
        >
          <MenuItem onClick={this.closeMenuIdio}>
            <Fab className={classes.botonesBan} onClick = {() => this.props.setLang("es")}><img className="banderas" src={es}/></Fab>
          </MenuItem>
          <MenuItem onClick={this.closeMenuIdio}>
            <Fab className={classes.botonesBan} onClick = {() => this.props.setLang("al")}><img className="banderas" src={al}/></Fab>
          </MenuItem>
          <MenuItem onClick={this.closeMenuIdio}>
            <Fab className={classes.botonesBan} onClick = {() => this.props.setLang("en")}><img className="banderas" src={en}/></Fab>
          </MenuItem>
          <MenuItem onClick={this.closeMenuIdio}>
            <Fab className={classes.botonesBan} onClick = {() => this.props.setLang("fr")}><img className="banderas" src={fr}/></Fab>
          </MenuItem>
          <MenuItem onClick={this.closeMenuIdio}>
            <Fab className={classes.botonesBan} onClick = {() => this.props.setLang("ca")}><img className="banderas" src={ca}/></Fab>
          </MenuItem>
        </Menu>
      </div>
    )
  }
}

export default withStyles(banderas)(MenuIdiomas);
