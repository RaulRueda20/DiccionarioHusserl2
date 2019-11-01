import React from 'react';

//Components
import SearchIcon from '@material-ui/icons/Search';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import Switch from '@material-ui/core/Switch';
import Grid from '@material-ui/core/Grid';
import Icon from '@mdi/react';
import { mdiFormatLetterCase } from '@mdi/js';
import { withStyles } from '@material-ui/styles';

//LanguageChanges
import {busquedas, toolTipIdiomaDeLaLista, distincionMayusyMinus, BusquedaGeneral} from '../../../js/Language';

//Other request
import {webService} from '../../../js/webServices';
import classNames from 'classnames';

//Imagen
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
    const [insensitiveCase,setInsensitiveCase]=React.useState(false);

    const handleSwitch=name=>event=>{
        props.setState({...props.state, [name]:event.target.checked});
    }

    const clickChangeLanguageEsVP=()=>{
        props.setLanguage("es");
    }

    const clickChangeLanguageAlVP=()=>{
        props.setLanguage("al");
    }

    function handleInsensitiveCase(){
        setInsensitiveCase(!insensitiveCase)
    }

    const fixReferencias = (referencias) => {
        console.log("referencias",referencias)
        var expresiones=[]
        var posicActual = -1
        var expreActual = ""
        var i = 0
        while (i<referencias.length){
            if (expreActual != referencias[i].term_de){
                posicActual++
                expreActual = referencias[i].term_de
                expresiones.push({
                    expresion : referencias[i].term_de,
                    traduccion : referencias[i].term_es,
                    index_de: referencias[i].index_de,
                    index_es: referencias[i].index_es,
                    id: referencias[i].term_id,
                    referencias : [],
                })
                expresiones[posicActual].referencias.push({
                    referencia_original : referencias[i].ref_def_de,
                    referencia_traduccion: referencias[i].ref_def_es,
                    refid : referencias[i].ref_id,
                })
                i++
            }else{
                expresiones[posicActual].referencias.push({
                    ref_def_de : referencias[i].ref_def_de,
                    ref_def_es : referencias[i].ref_def_es,
                    refid : referencias[i].ref_id,
                })
            i++
            // expresiones
          }
        }
        console.log("expresiones",expresiones)
        return expresiones
    }

    const handleChangeBusquedaPasajes = (event) => {
        if(props.state.checkedA == false){
            var servicebe = "/referencias/busquedaExpresion/" + insensitiveCase
            webService(servicebe, "POST", {parametro:props.busqueda,case:insensitiveCase}, (data) => {
                var expresiones = data.data.response
                props.setExpresiones(fixReferencias(expresiones))
            })
        }else{
            props.expresiones.map(expresion=>{
            var expresionNombre=expresion.expresion +  expresion.traduccion +  expresion.id
            var expresionEncontrada= expresionNombre.indexOf(props.busqueda)
            document.getElementById("VP"+expresion.id).classList.remove("hiddenE")
                if (expresionEncontrada == -1){
                    document.getElementById("VP"+expresion.id).className += " hiddenE";
                }
            })
        }
    }

    return(
        <form onSubmit={handleChangeBusquedaPasajes}>
            <Grid container justify="center" alignItems="center" alignContent="center">
                <Grid item xs={7} lg={9}>
                    <FormControl>
                        <InputLabel htmlFor="input-with-icon-adornment">{busquedas(props.lang)}</InputLabel>
                        <Input  
                            onChange={event => props.setBusqueda(event.target.value)}
                            fullWidth
                            id="input-with-icon-adornment"
                            startAdornment={
                                <InputAdornment position="end">
                                    <Tooltip title={distincionMayusyMinus(props.lang)}>
                                        <IconButton onClick={handleInsensitiveCase} className={classNames([{"caseSeleccionado" : insensitiveCase == true}, "case"])}>
                                            <Icon path={mdiFormatLetterCase}
                                            title="User Profile"
                                            size={1}
                                            />
                                        </IconButton>
                                    </Tooltip>
                                </InputAdornment>
                            }
                            endAdornment={
                                <InputAdornment position="start">
                                    <IconButton type="submit">
                                        <SearchIcon />
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                    </FormControl>
                </Grid>
                <Grid item xs={3} lg={2}>
                    <Tooltip title={props.state.checkedA ? busquedaPorLetra(props.lang) : BusquedaGeneral(props.lang)}>
                        <Switch
                            checked={props.state.checkedA}
                            onChange={handleSwitch("checkedA")}
                            value="checkedA"
                            inputProps={{'aria-label': 'checkbox with default color'}}
                            size="small"
                        />
                    </Tooltip>
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
        </form>
    )
}

export default  withStyles(styles)(BusquedaVP);