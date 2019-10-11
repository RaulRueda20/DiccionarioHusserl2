//React
import React from 'react';

//Components
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

function ResultadoBusqueda(props){

    return(
        <Grid container>
            <Grid item xs={12}>
                <Typography variant="h3" className="tituloResultados"> Resultado de busqueda</Typography>
            </Grid>
            <Grid item xs={12} className="contenedorBusqueda">
                <ul className="ulBusqueda">
                    {props.expresionesEncontradas.map((expresionEncontrada,index)=>(
                        <li id={"busqueda"+expresionEncontrada.t_id}
                            value={expresionEncontrada.t_id}
                            key={expresionEncontrada.t_id+"-"+index}
                            className="listaVistaBusqueda"
                        >
                            <Typography variant="h6">
                                {expresionEncontrada.t_term_de}
                            </Typography>
                        </li>
                    ))}
                </ul>
            </Grid>
        </Grid>
    )
}

export default ResultadoBusqueda;