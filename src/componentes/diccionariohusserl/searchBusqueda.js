import React from 'react';
import SearchIcon from '@material-ui/icons/Search';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import { withStyles } from '@material-ui/styles';

const search={
    buscador:{
        margin:"30px 40px"
    }
}

function SearchBusqueda(props){
    const {classes}=props;
    
    return (
        <FormControl className={classes.buscador} fullWidth>
            <InputLabel htmlFor="input-with-icon-adornment">{"Busqueda general"}</InputLabel>
            <Input
            id="input-with-icon-adornment"
            startAdornment={
                <InputAdornment position="start">
                <SearchIcon />
                </InputAdornment>
            }
            // onChange={handleChangeBusquedaExpresionesDiccionario}
            />
        </FormControl>
    )
}

export default withStyles(search)(SearchBusqueda);