//React
import React from 'react';

//Components
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

function ListaBusqueda(props){

    function clickCambioIdBuscado(event){
        if(props.tipoBusqueda=="Referencia"){
            props.setIdPasaje(event.currentTarget.id.split("/")[0])
            props.setPosicionPasaje(parseInt(event.currentTarget.id.split("/")[1]))
        }else{
            props.setIdPasaje(event.currentTarget.id.split("/")[0])
        }
    }

    return(
        <Grid container justify="center" alignItems="center">
            <Grid item xs={12}>
                <Typography variant="h3" className="tituloResultados"> Resultado de busqueda</Typography>
            </Grid>
            <Grid item xs={12} className="contenedorBusqueda">
                <ul className="ulBusqueda">
                    {props.expresionesEncontradas.map((expresionEncontrada,index)=>(
                        <li id={"busqueda"+expresionEncontrada.ref_id}
                            value={expresionEncontrada.ref_id + "-" + index}
                            key={expresionEncontrada.ref_id+"-"+index}
                            className="liBusqueda"
                        >
                            <Typography onClick={event => clickCambioIdBuscado(event)} id={expresionEncontrada.ref_id+"/"+index}>
                            {expresionEncontrada.ref_libro_de + "  /  " + expresionEncontrada.ref_libro_es}
                            </Typography>
                        </li>
                    ))}
                </ul>
            </Grid>
        </Grid>
    )
}

export default ListaBusqueda;