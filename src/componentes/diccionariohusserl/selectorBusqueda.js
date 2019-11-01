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

//Language
import {tipoDeBusqueda, dentroExpresion, dentroReferencia} from '../../js/Language';

const seleccion={
    selector:{
        marginTop:"30px",
    }
}

function SelectorBusqueda(props){
    const {classes}=props;dentroExpresion

    function handleChange(event){
        props.setTipoBusqueda(event.target.value)
    }

    return(
        <FormControl className={classes.selector} fullWidth>
            <InputLabel htmlFor="Busquedas">{tipoDeBusqueda(props.lang)}</InputLabel>
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
                    {dentroExpresion(props.lang)}
                </MenuItem>
                <MenuItem value="Referencia">
                    {dentroReferencia(props.lang)}
                </MenuItem>
            </Select>
        </FormControl>
    )
}

export default withStyles(seleccion)(SelectorBusqueda);