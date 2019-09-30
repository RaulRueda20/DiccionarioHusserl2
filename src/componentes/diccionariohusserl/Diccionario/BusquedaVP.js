import React from 'react';
import SearchIcon from '@material-ui/icons/Search';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import Switch from '@material-ui/core/Switch';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/styles';

import {busquedaPorLetra, toolTipIdiomaDeLaLista} from '../../../js/Language';

import es from "../../../Imagenes/spain.png";
import al from "../../../Imagenes/germany.png";

const styles={
    // TextFieldbus:{
    //    width:"50%"
    // },
    imagenesBandera:{
        width: "25px !important",
        height: "15px !important",
        fontSize: "0px",
        minHeight: "0px",
        minWidth: "0px !important",
        padding: "0px !important"
    }
}

function BusquedaVP(props){
    const {classes}=props;
    const [state, setState]=React.useState({checkedA:true,checkedB:true})

    const handleSwitch=name=>event=>{
        setState({...state, [name]:event.target.checked});
    }

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
          document.getElementById("VP"+expresion.id).classList.remove("hiddenE")
          if (expresionEncontrada == -1){
            document.getElementById("VP"+expresion.id).className += " hiddenE";
          }
        })
      }

    return(
        <Grid container justify="center" alignItems="center" alignContent="center">
            <Grid item xs={7} lg={9}>
                <FormControl>
                    <InputLabel htmlFor="input-with-icon-adornment">{busquedaPorLetra(props.lang)}</InputLabel>
                    <Input
                        fullWidth
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
            <Grid item xs={3} lg={2}>
                <Switch
                    checked={state.checkedA}
                    onChange={handleSwitch("checkedA")}
                    value="checkedA"
                    inputProps={{'aria-label': 'checkbox with default color'}}
                    size="small"
                />
            </Grid>
            <Grid item xs={2} lg={1}>
                <Tooltip title={toolTipIdiomaDeLaLista(props.lang)}>
                    {props.language == 'es' ?
                        <Button className={classes.imagenesBandera} onClick={clickChangeLanguageAlVP}><img className="banderaBusquedaPasajes" src={al}/></Button>
                        : <Button className={classes.imagenesBandera} onClick={clickChangeLanguageEsVP}><img className="banderaBusquedaPasajes" src={es}/></Button>
                    }                        
                </Tooltip>
            </Grid>
        </Grid>
    )
}

export default  withStyles(styles)(BusquedaVP);