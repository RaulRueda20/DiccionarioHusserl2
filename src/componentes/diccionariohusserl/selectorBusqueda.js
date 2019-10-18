//React
import React from 'react';

//Axios for HTTP Requests
// import axios from 'axios';

// Components
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import { withStyles } from '@material-ui/styles';

const seleccion={
    selector:{
        marginTop:"30px",
    }
}

function SelectorBusqueda(props){
    const {classes}=props;

    function handleChange(event){
        props.setTipoBusqueda(event.target.value)
    }

    return(
        <FormControl className={classes.selector} fullWidth>
            <InputLabel htmlFor="Busquedas">Tipo de busquedas</InputLabel>
            <Select
                fullWidth
                value={props.tipoBusqueda}
                onChange={handleChange}
                // inputProps={{
                //     name: '',
                //     id: 'usuario-simple',
                // }}
            >
                <MenuItem value="Expresion">
                    Dentro  expresion
                </MenuItem>
                <MenuItem value="Referencia">
                    Dentro  referencia
                </MenuItem>
            </Select>
        </FormControl>
    )
}

export default withStyles(seleccion)(SelectorBusqueda);