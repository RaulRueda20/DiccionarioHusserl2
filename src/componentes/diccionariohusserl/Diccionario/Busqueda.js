import React from 'react';
import SearchIcon from '@material-ui/icons/Search';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import { withStyles } from '@material-ui/styles';

import '../../../css/expresiones.css';

import {busquedaPorLetra} from '../../../js/Language';

const styles = {
    TextFieldbus:{
       width:"100%"
    }
}

function Busqueda(props){
  const {classes}=props;

  var expresiones=props.expresiones
  
  const handleChangeBusquedaExpresionesDiccionario = (event) => {
    var expresionBuscadaDic=event.target.value
    expresiones.map(expresion=>{
      var expresionNombre=expresion.expresion +  expresion.traduccion +  expresion.id
      var expresionEncontrada= expresionNombre.indexOf(expresionBuscadaDic)
      document.getElementById("expresion"+expresion.id).classList.remove("hiddenE")
      if (expresionEncontrada == -1){
        document.getElementById("expresion"+expresion.id).className += " hiddenE";
      }
    })
  }

    return(
        <FormControl className={classes.TextFieldbus}>
            <InputLabel htmlFor="input-with-icon-adornment">{busquedaPorLetra(props.lang)}</InputLabel>
            <Input
            id="input-with-icon-adornment"
            startAdornment={
                <InputAdornment position="start">
                <SearchIcon />
                </InputAdornment>
            }
            onChange={handleChangeBusquedaExpresionesDiccionario}
            />
        </FormControl>
    )
}

export default withStyles(styles)(Busqueda);