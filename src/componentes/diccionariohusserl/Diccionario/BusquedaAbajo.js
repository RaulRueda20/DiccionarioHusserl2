//React
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

//Other req
import '../../../css/expresiones.css';
import {webService} from '../../../js/webServices';
import classNames from 'classnames';

//Language
import {busquedas, distincionMayusyMinus, BusquedaGeneral, busquedaPorLetra} from '../../../js/Language';


const styles = {
    TextFieldbus:{
      width:"95%"
    },
    contenedor:{
      alignItems:"center !important"
    },
    formularioBusqueda:{
        marginRight: "5px",
        marginLeft: "20px",
        marginTop: "28px"
    }
}

function BusquedaAbajo(props){
    const {classes}=props;
    const [insensitiveCase,setInsensitiveCase]=React.useState(false);

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
    
    const handleChangeBusquedaExpresiones = (event) => {
        if(props.state.checkedA == false){  
        var servicebe = "/referencias/busquedaExpresion/" + insensitiveCase
        webService(servicebe, "POST", {parametro:props.busqueda,case:insensitiveCase}, (data) => {
            var expresiones = data.data.response
            props.setExpresionesGlobales(fixReferencias(expresiones))
        })
        }else{
        props.expresiones.map(expresion=>{
            var expresionNombre=expresion.expresion +  expresion.traduccion +  expresion.id
            var expresionEncontrada= expresionNombre.indexOf(props.busqueda)
            document.getElementById("expresion"+expresion.id).classList.remove("hiddenE")
            if (expresionEncontrada == -1){
            document.getElementById("expresion"+expresion.id).className += " hiddenE";
            }
        })
        }
    }

    function handleInsensitiveCase(){
        setInsensitiveCase(!insensitiveCase)
    }

    const handleSwitch=name=>event=>{
        props.setState({...props.state, [name]:event.target.checked});
    }

    return(
        <form onSubmit={handleChangeBusquedaExpresiones} className={classes.formularioBusqueda}>
            <Grid container className={classes.contenedor}>
                <Grid item xs={10}>
                <FormControl className={classes.TextFieldbus}>
                    <InputLabel htmlFor="input-with-icon-adornment">{busquedas(props.lang)}</InputLabel>
                    <Input
                    onChange={event => props.setBusqueda(event.target.value)}
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
                        <SearchIcon/>
                        </IconButton>
                    </InputAdornment>
                    }
                    />
                </FormControl>  
                </Grid>
                <Grid item xs={2}>
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
            </Grid>
        </form>
    )
}

export default withStyles(styles)(BusquedaAbajo);