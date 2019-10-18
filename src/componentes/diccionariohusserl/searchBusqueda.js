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
    const [busqueda, setBusqueda] = React.useState("");
    const [loading, setLoading]=React.useState(false);

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
        console.log(referencias.length)
        while (i<referencias.length){
            if (expreActual != referencias[i].expresion){
                posicActual++
                expreActual = referencias[i].expresion
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
            var serviceb = "/expresiones/busqueda"
            webService(serviceb, "POST", {parametro:busqueda}, (data) => {
                var referencias = data.data.response
                props.setExpresionesEncontradas(fixPasajes(referencias))
             })
        }else{
            var servicebe = "/referencias/busquedaExpresion"
            webService(servicebe, "POST", {parametro:busqueda}, (data) => {
                var expresiones = data.data.response
                props.setExpresionesEncontradas(fixReferencias(expresiones))
            })
        }
        setLoading(false)
    }

    console.log("pasajes",props.expresionesEncontradas)

    return (
        <form onSubmit={handleChangeBusqueda}>
            <Grid container>
                <Grid item xs={9}>
                    <FormControl className={classes.buscador} >
                        <InputLabel htmlFor="input-with-icon-adornment">{"Busqueda general"}</InputLabel>
                        <Input
                        id="input-with-icon-adornment"
                        onChange={event => setBusqueda(event.target.value)}
                    />
                    </FormControl>
                </Grid>
                <Grid item xs={3}>
                    <IconButton className={classes.botonBuscador} type="submit">
                        <SearchIcon fontSize="large"/>
                    </IconButton>
                </Grid>
            </Grid>
            <LinearProgress className={classNames([{"hidden" : !loading}, "loadingBar"])}/>
        </form>
    )
}

export default withStyles(search)(SearchBusqueda);