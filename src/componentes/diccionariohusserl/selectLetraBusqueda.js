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
import Typography from '@material-ui/core/Typography';

const letrasBusqueda={
    lista:{
        marginTop:"30px",
    }
}

const letras = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]

function SelectLetraBusqueda(props){
    const {classes}=props;

    const handleChangeLetraBuscada=(event)=>{
        props.setLetraBuscada(event.target.value)
    }

    return (
        <FormControl className={classes.lista} fullWidth>
            <InputLabel htmlFor="BusquedaDeLetras">Busqueda por letra</InputLabel>
            <Select
                value={props.letraBuscada}
                onChange={handleChangeLetraBuscada}
                // inputProps={{
                //     name: '',
                //     id: 'usuario-simple',
                // }}
            >
                {letras.map((letra,index)=>(
                    <MenuItem
                        key={letra+"-"+index}
                        value={letra}
                    >
                        {letra}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    )
}

export default withStyles(letrasBusqueda)(SelectLetraBusqueda);