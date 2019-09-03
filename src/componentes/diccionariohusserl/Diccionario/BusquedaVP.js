import React from 'react';
import SearchIcon from '@material-ui/icons/Search';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import Fab from '@material-ui/core/Fab';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/styles';


import es from "../../../Imagenes/spain.png";
import al from "../../../Imagenes/germany.png";

const styles = {
    TextFieldbus:{
       width:"100%"
    },
    imagenesBandera:{
        width: "30px !important",
        height: "30px !important",
      }
}

function BusquedaVP(props){
    const {classes}=props;

    var idioma = props.setLanguage

    const clickChangeLanguageEsVP=()=>{
        idioma("es");
    }

    const clickChangeLanguageAlVP=()=>{
        idioma("al");
    }

    var expresiones = props.expresiones

    const handleChangeBusquedaExpresionesDiccionarioVP = (event) => {
        var expresionBuscadaDicVP=event.target.value
        expresiones.map(expresion=>{
          var expresionNombre=expresion.expresion +  expresion.traduccion +  expresion.id
          var expresionEncontrada= expresionNombre.indexOf(expresionBuscadaDicVP)
          console.log("expresion buscada",expresionBuscadaDicVP)
          console.log("expresion encontrada",expresionEncontrada)
          document.getElementById("VP"+expresion.id).classList.remove("hiddenE")
          if (expresionEncontrada == -1){
            document.getElementById("VP"+expresion.id).className += " hiddenE";
          }
        })
      }

    return(
        <Grid container>
            <Grid item xs={10}>
                <FormControl className={classes.TextFieldbus}>
                    <InputLabel htmlFor="input-with-icon-adornment">Busqueda por letra</InputLabel>
                    <Input
                    id="input-with-icon-adornment"
                    startAdornment={
                        <InputAdornment position="start">
                        <SearchIcon />
                        </InputAdornment>
                    }
                    onChange={handleChangeBusquedaExpresionesDiccionarioVP}
                    />
                </FormControl>
            </Grid>
            <Grid item xs={2}>
                {props.language == 'es' ?
                    <Fab className={classes.imagenesBandera} onClick={clickChangeLanguageAlVP}><img className="banderas" src={al}/></Fab>
                    : <Fab className={classes.imagenesBandera} onClick={clickChangeLanguageEsVP}><img className="banderas" src={es}/></Fab>
                }
            </Grid>
        </Grid>
    )
}

export default  withStyles(styles)(BusquedaVP);