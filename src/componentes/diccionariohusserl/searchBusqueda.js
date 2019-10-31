//React
import React from 'react';

//Components
import SearchIcon from '@material-ui/icons/Search';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import { withStyles } from '@material-ui/styles';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import LinearProgress from '@material-ui/core/LinearProgress';
import InputAdornment from '@material-ui/core/InputAdornment';
import Tooltip from '@material-ui/core/Tooltip';
import Icon from '@mdi/react';
import { mdiFormatLetterCase } from '@mdi/js';

//Other request
import {webService} from '../../js/webServices';
import classNames from 'classnames';

const search={
    buscador:{
        margin:"30px 40px",
        width: "93%"
    },
    botonBuscador:{
        marginTop:"35px"
    }
}

function SearchBusqueda(props){
    const {classes}=props;
    const [loading, setLoading]=React.useState(false);
    const [insensitiveCase,setInsensitiveCase]=React.useState(false)

    const fixPasajes = (pasajes) => {
        var pasajesArreglados = [];
        var posicionActual = -1;
        var pasajeActual = "";
        var i = 0;
        console.log("pasajes", pasajes.length)
        while(i < pasajes.length){
            if(pasajeActual != pasajes[i].ref_id){
                posicionActual++
                pasajeActual = pasajes[i].ref_id;
                pasajesArreglados.push({
                    ref_id: pasajes[i].ref_id,
                    ref_original: pasajes[i].ref_original,
                    ref_traduccion: pasajes[i].ref_traduccion,
                    ref_libro_de: pasajes[i].ref_libro_de,
                    ref_libro_es: pasajes[i].ref_libro_es,
                    expresiones: []
                })
                pasajesArreglados[posicionActual].expresiones.push({
                    orden: pasajes[i].orden,
                    expresion_original: pasajes[i].expresion_original,
                    expresion_traduccion: pasajes[i].expresion_traduccion,
                    t_id: pasajes[i].t_id
                })
                i ++
            }else{
                pasajesArreglados[posicionActual].expresiones.push({
                    orden: pasajes[i].orden,
                    expresion_original: pasajes[i].expresion_original,
                    expresion_traduccion: pasajes[i].expresion_traduccion,
                    t_id: pasajes[i].t_id
                })
                i ++
            }
        }
        return pasajesArreglados
    }
    
    const fixReferencias = (referencias) => {
        var expresiones=[]
        var posicActual = -1
        var expreActual = ""
        var i = 0
        while (i<referencias.length){
            if (expreActual != referencias[i].term_de){
                posicActual++
                expreActual = referencias[i].term_de
                expresiones.push({
                    term_de : referencias[i].term_de,
                    term_es : referencias[i].term_es,
                    index_de: referencias[i].index_de,
                    index_es: referencias[i].index_es,
                    term_id: referencias[i].term_id,
                    referencias : [],
                })
                expresiones[posicActual].referencias.push({
                    ref_def_de : referencias[i].ref_def_de,
                    ref_def_es : referencias[i].ref_def_es,
                    ref_id : referencias[i].ref_id,
                })
                i++
            }else{
                expresiones[posicActual].referencias.push({
                    ref_def_de : referencias[i].ref_def_de,
                    ref_def_es : referencias[i].ref_def_es,
                    ref_id : referencias[i].ref_id,
                })
            i++
            // expresiones
          }
        }
        return expresiones
    }

    const handleChangeBusqueda=(event)=>{
        event.preventDefault()
        setLoading(true)
        if(props.tipoBusqueda=="Referencia"){
            var servicebr = "/expresiones/busqueda/" + insensitiveCase
            webService(servicebr, "POST", {parametro:props.busqueda}, (data) => {
                var referencias = data.data.response
                props.setExpresionesEncontradas([])
                props.setTipoBusquedaRealizada("Referencia")
                props.setExpresionesEncontradas(fixPasajes(referencias))
                setLoading(false)
            })
        }else{
            var servicebe = "/referencias/busquedaExpresion/" + insensitiveCase
            webService(servicebe, "POST", {parametro:props.busqueda,case:insensitiveCase}, (data) => {
                var expresiones = data.data.response
                props.setExpresionesEncontradas([])
                props.setTipoBusquedaRealizada("Expresion")
                props.setExpresionesEncontradas(fixReferencias(expresiones))
                setLoading(false)
            })
        }
    }

    function handleInsensitiveCase(){
        setInsensitiveCase(!insensitiveCase)
    }

    return (
        <form onSubmit={handleChangeBusqueda}>
            <Grid container>
                <Grid item xs={10}>
                    <FormControl className={classes.buscador} >
                        <InputLabel htmlFor="input-with-icon-adornment">{"Busqueda general"}</InputLabel>
                        <Input
                        id="input-with-icon-adornment"
                        onChange={event => props.setBusqueda(event.target.value)}
                        startAdornment={
                            <InputAdornment position="end">
                                <Tooltip title="Distincion de mayúsculas/minúsculas">
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
                            <InputAdornment position="end">
                                <IconButton type="submit">
                                    <SearchIcon fontSize="small"/>
                                </IconButton>
                            </InputAdornment>
                        }
                    />
                    </FormControl>
                </Grid>
            </Grid>
            <LinearProgress className={classNames([{"hidden" : !loading}, "loadingBar"])}/>
        </form>
    )
}

export default withStyles(search)(SearchBusqueda);