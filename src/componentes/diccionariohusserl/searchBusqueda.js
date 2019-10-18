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
    
    const handleChangeBusqueda=(event)=>{
        event.preventDefault()
        setLoading(true)
        var serviceb = "/expresiones/busqueda"
        webService(serviceb, "POST", {parametro:busqueda}, (data) => {
            var expresionesArregladas = []
            var expresiones = data.data.response
            props.setExpresionesEncontradas(fixPasajes(expresiones))
        })
        setLoading(false)
    }

    return (
        <form onSubmit={handleChangeBusqueda}>
            <Grid container>
                <Grid item xs={9}>
                    <FormControl className={classes.buscador} >
                        <InputLabel htmlFor="input-with-icon-adornment">{"Busqueda general"}</InputLabel>
                        <Input
                        id="input-with-icon-adornment"
                        // startAdornment={
                        //     <InputAdornment position="start">
                        //     <SearchIcon />
                        //     </InputAdornment>
                        // }
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