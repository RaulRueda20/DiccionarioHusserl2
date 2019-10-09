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
        margin:"30px 40px"
    }
}

function SelectorBusqueda(props){
    const {classes}=props;
    const [tipoBusquedas,settipoBusquedas]=React.useState([]);

    // React.useEffect(() => {
    //     axios({
    //         method:'GET',
    //         url:prepaServer + "usuarios/all",
    //         responseType:'json',
    //         headers: {
    //             "Content-Type" : "application/json",
    //             "Authorization" : "Token " + store.getObject("token")
    //         }
    //     }).then(response => {
    //         setUsuarios(response.data)
    //     }).catch(err => {
    //         console.log("error", err)
    //     })
    // }, [true])


    return(
        <FormControl className={classes.selector} fullWidth>
            <InputLabel htmlFor="Busquedas">Tipo de busquedas</InputLabel>
            <Select
                fullWidth
                value={tipoBusquedas}
                // onChange={props.handleChange}
                // inputProps={{
                //     name: '',
                //     id: 'usuario-simple',
                // }}
            >
                <MenuItem value="">
                    <em>General</em>
                </MenuItem>
                <MenuItem value="Letra">
                    Por  letra
                </MenuItem>
                <MenuItem value="Titulo">
                    Por  titulo
                </MenuItem>
                <MenuItem value="Referencia">
                    Por  referencia
                </MenuItem>
                <MenuItem value="Pasajes">
                    Dentro de los pasajes
                </MenuItem>
            </Select>
        </FormControl>
    )
}

export default withStyles(seleccion)(SelectorBusqueda);