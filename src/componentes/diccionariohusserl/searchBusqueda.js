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

import {webService} from '../../js/webServices';

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
    const [busqueda, setBusqueda] = React.useState("")

    const handleChangeBusqueda=(event)=>{
        event.preventDefault()
        var expresionBuscada = busqueda;
        var service = "/expresiones/getAllList"
        webService(service, "GET", {}, (data) => {
            var expresionesEncontradas = []
            var expresiones = data.data.response
            for(var i in expresiones){
                var expresionNombre=expresiones[i].t_term_es +  expresiones[i].t_term_de +  expresiones[i].t_id;
                if(expresionNombre.indexOf(expresionBuscada) > -1) expresionesEncontradas.push(expresiones[i])
            }
            props.setExpresionesEncontradas(expresionesEncontradas)
            if(expresionesEncontradas.length > 0) props.setIdExpresionSeleccionada(expresionesEncontradas[0].t_id)
        })
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
        </form>
    )
}

export default withStyles(search)(SearchBusqueda);