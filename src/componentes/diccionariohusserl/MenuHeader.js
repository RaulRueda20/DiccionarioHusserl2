import React from 'react';
import {Link} from 'react-router-dom';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Menu from '@material-ui/core/Menu';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MenuItem from '@material-ui/core/MenuItem';
import Tooltip from '@material-ui/core/Tooltip';

import Book from '@material-ui/icons/Book';
import Description from '@material-ui/icons/Description';
import Info from '@material-ui/icons/Info';
import Exit from '@material-ui/icons/ExitToApp';
import PageviewIcon from '@material-ui/icons/Pageview';

import {menuDiccionario, menuAcercaDe, menuGuia, menuSalir, toolTipMenuPrincipal} from '../../js/Language';

class MenuHeader extends React.Component{
  state = { anchorEl : null  }

  setMenu = (event) => {
    this.setState({anchorEl: event.currentTarget})
  }

  closeMenu = () =>{
    this.setState({anchorEl:null})
  }

  exitMain = () =>{
    localStorage.removeItem("sesion")
    document.getElementById("toLogin").click()
  }

  render(){
    const {anchorEl} = this.state
    const {match} = this.props
    return(
      <div>
        <Tooltip title={toolTipMenuPrincipal(this.props.lang)}>
          <IconButton
            aria-haspopup="true"
            aria-owns={anchorEl ? 'menuheader': undefined}
            onClick={this.setMenu} size="small"
            className="iconosIluminados"
          >
            <MenuIcon fontSize="large"/>
          </IconButton>
        </Tooltip>
        <Menu
          id="menuheader"
          anchorEl={anchorEl}
          keepMounted
          onClose={this.closeMenu}
          open={Boolean(anchorEl)}
        >
          <Link to={`${match.url}/diccionario`}>
            <MenuItem onClick={this.closeMenu}>
              <ListItemIcon>
                <Book />
              </ListItemIcon>
              <ListItemText primary={menuDiccionario(this.props.lang)}/>
            </MenuItem>
          </Link>
          <Link to={`${match.url}/busquedas`}>
            <MenuItem onClick={this.closeMenu}>
              <ListItemIcon>
                <PageviewIcon />
              </ListItemIcon>
              <ListItemText primary="Busquedas"/>
            </MenuItem>
          </Link>
          <Link to={`${match.url}/acercade`}>
            <MenuItem onClick={this.closeMenu}>
              <ListItemIcon>
                <Description />
              </ListItemIcon>
              <ListItemText primary={menuAcercaDe(this.props.lang)}/>
            </MenuItem>
          </Link>
          <Link to={`${match.url}/guia`}>
            <MenuItem onClick={this.closeMenu}>
              <ListItemIcon>
                <Info />
              </ListItemIcon>
              <ListItemText primary={menuGuia(this.props.lang)}/>
            </MenuItem>
          </Link>
          <MenuItem onClick={this.exitMain}>
            <ListItemIcon>
              <Exit />
            </ListItemIcon>
            <ListItemText primary={menuSalir(this.props.lang)}/>
          </MenuItem>
        </Menu>
        <Link id="toLogin" to={'/'} />
      </div>
    )
  }
}

export default (MenuHeader);
