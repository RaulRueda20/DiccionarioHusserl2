//React
import React from 'react';

//Components
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

function ListaBusqueda(props){

    function clickCambioIdBuscado(event){
        // if(props.tipoBusqueda=="Referencia"){
            props.setIdPasaje(event.currentTarget.id.split("/")[0])
            props.setPosicionPasaje(parseInt(event.currentTarget.id.split("/")[1]))
        // }else{
        //     props.setIdPasaje(event.currentTarget.id)
        // }
    }

    return(
        <Grid container justify="center" alignItems="center">
            <Grid item xs={12}>
                <Typography variant="h3" className="tituloResultados"> Resultado de busqueda</Typography>
            </Grid>
            {props.tipoBusqueda=="Referencia" ?
                <Grid item xs={12} className="contenedorBusqueda">
                <ul className="ulBusqueda">
                    {props.expresionesEncontradas.map((expresionEncontradaporReferencia,index)=>(
                        <li id={"busqueda"+expresionEncontradaporReferencia.ref_id}
                            value={expresionEncontradaporReferencia.ref_id + "-" + index}
                            key={expresionEncontradaporReferencia.ref_id+"-"+index}
                            className="liBusqueda"
                        >
                            <Typography onClick={event => clickCambioIdBuscado(event)} id={expresionEncontradaporReferencia.ref_id+"/"+index}>
                            {expresionEncontradaporReferencia.ref_libro_de + "  /  " + expresionEncontradaporReferencia.ref_libro_es}
                            </Typography>
                        </li>
                    ))}
                </ul>
            </Grid>:
            <Grid container justify="center" alignItems="center">
                <Grid item xs={12} className="contenedorBusqueda">
                    <ul className="ulBusqueda">
                        {props.expresionesEncontradas.map((expresionEncontradaPorExpresion,index)=>(
                            <li
                                id={"busqueda"+expresionEncontradaPorExpresion.ref_id}
                                value={expresionEncontradaPorExpresion.ref_id+"-"+index}
                                key={expresionEncontradaPorExpresion.ref_id+"-"+index}
                                className="liBusqueda"
                            >
                                <Typography onClick={event => clickCambioIdBuscado(event)} id={expresionEncontradaPorExpresion.term_id+"/"+index}>
                                    {expresionEncontradaPorExpresion.term_de+"  /  "+expresionEncontradaPorExpresion.term_es}
                                </Typography>
                            </li>
                        ))}
                    </ul>
                </Grid>
            </Grid>
            }
        </Grid>
    )
}

export default ListaBusqueda;