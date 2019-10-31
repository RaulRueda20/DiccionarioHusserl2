// React
import React from 'react';

//Components
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/styles';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Tooltip from '@material-ui/core/Tooltip';

//Elements
import SearchBusqueda from './searchBusqueda';
import SelectorBusqueda from './selectorBusqueda';
import ListaBusqueda from './listaBusqueda';
import ResultadoBusquedaExpresion from './resultadoBusquedaPorExpresion';
import ResultadoBusquedaReferencia from './resultadoBusquedaPorReferencia';

const moduloBusqueda={
    gridSelectorBusqueda:{
        paddingRight:"30px !important",
    },
    gridSelectorLetras:{
        paddingRight:"30px !important"
    },
    botonLista:{
        textAlign:"center"
    }
}

function moduloBusquedas(props){
    const {classes}=props;
    const [expresionesEncontradas,setExpresionesEncontradas]=React.useState([]);
    const [tipoBusqueda,setTipoBusqueda]=React.useState("Expresion");
    const [tipoBusquedaRealizada,setTipoBusquedaRealizada]=React.useState("");
    const [posicionPasaje, setPosicionPasaje]=React.useState(0);
    const [idPasaje, setIdPasaje]=React.useState("");
    const [abierto,setAbierto]=React.useState(true);
    const [busqueda, setBusqueda] = React.useState("");

    function abrirLista(){
        setAbierto(!abierto)
    }

    return(
        <Grid container>
            <Grid item xs={12} sm={8}>
                <SearchBusqueda expresionesEncontradas={expresionesEncontradas} setExpresionesEncontradas={setExpresionesEncontradas} posicionPasaje={posicionPasaje} 
                setPosicionPasaje={setPosicionPasaje} tipoBusqueda={tipoBusqueda} setTipoBusquedaRealizada={setTipoBusquedaRealizada} busqueda={busqueda} setBusqueda={setBusqueda}/>
            </Grid>
            <Grid item xs={12} sm={4} className={classes.gridSelectorBusqueda}>
                <SelectorBusqueda tipoBusqueda={tipoBusqueda} setTipoBusqueda={setTipoBusqueda}/>
            </Grid>
            {
                expresionesEncontradas.length < 1 ? null :
                <Grid item xs={abierto ? 8 : 1} sm={abierto ? 6 : 1} md={abierto ? 4 : 1} className={classes.botonLista}>
                    { !abierto ? 
                    <Tooltip title="Abrir lista de busqueda">
                        <IconButton onClick={abrirLista}>
                            <MenuIcon/>
                        </IconButton>
                    </Tooltip> : 
                    <ListaBusqueda expresionesEncontradas={expresionesEncontradas} posicionPasaje={posicionPasaje} 
                        setPosicionPasaje={setPosicionPasaje} tipoBusqueda={tipoBusquedaRealizada} idPasaje={idPasaje} 
                        setIdPasaje={setIdPasaje} abrirLista={abrirLista} expresionSeleccionada={expresionesEncontradas[posicionPasaje]}
                    />}
                </Grid>
            }
            {
                expresionesEncontradas.length < 1 ? null :
                <Grid item xs={abierto ? false : 11} sm={abierto ? 6:11} md={abierto ? 8:11}>
                    {tipoBusquedaRealizada == "Referencia" ?
                        <ResultadoBusquedaReferencia pasajeSeleccionado={expresionesEncontradas[posicionPasaje]} idPasaje={idPasaje} busqueda={busqueda}/>
                    :
                        <ResultadoBusquedaExpresion expresionSeleccionada={expresionesEncontradas[posicionPasaje]} 
                        idPasaje={idPasaje} setIdPasaje={setIdPasaje} abierto={abierto} setAbierto={setAbierto} busqueda={busqueda}/>
                    }
                </Grid>
            }
        </Grid>
    )
}

export default withStyles(moduloBusqueda)(moduloBusquedas);