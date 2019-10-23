// React
import React from 'react';
import {Link} from 'react-router-dom';

//Components
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/styles';
import Button from '@material-ui/core/Button';

//Other req
import {webService} from '../../js/webServices';
import es from "../../Imagenes/spain.png";
import al from "../../Imagenes/germany.png";

const resultadoBusqueda={
    typosTitulos:{
        paddingTop:"15px !important",
        paddingBottom:"15px !important"
    },
    contenedorPrincipal:{
        paddingLeft: "30px !important",
        paddingRight: "5px !important",
    },
    contenedorDeResultados:{
        maxHeight: "60vh",
        overflow: "scroll",

    },
    divPasajes:{
        marginTop:"40px"
    }
}

function ResultadoBusquedaExpresion(props){
    const {classes}=props;
    const [listaVerTambien,setListaVerTambien] = React.useState([]);
    const [hijos,setHijos] = React.useState([]);
    const [padres,setPadres] = React.useState([]);
    const [lang, setLang] = React.useState("al");

    React.useEffect(() => { 
        if(props.idPasaje==""){
            var service = "/vertambien/" + props.expresionSeleccionada.term_id
            webService(service, "GET", {}, data => {
                setListaVerTambien(data.data.response)
                webService(("/expresiones/"+lang+"/hijosList/"+props.expresionSeleccionada.term_id),"GET", {}, (data) => {
                    setHijos(data.data.response)
                    console.log("hijos",data.data.response)
                })
                webService(("/expresiones/"+lang+"/abuelosList/"+props.expresionSeleccionada.term_id), "GET", {}, (data2) =>{
                    setPadres(data2.data.response)
                    console.log("padres",data2.data.response)
                })
            })
        }else{
            var service = "/vertambien/" + props.idPasaje
            webService(service, "GET", {}, data => {
                setListaVerTambien(data.data.response)
                webService(("/expresiones/"+lang+"/hijosList/"+props.idPasaje),"GET", {}, (data) => {
                    setHijos(data.data.response)
                })
                webService(("/expresiones/"+lang+"/abuelosList/"+props.idPasaje), "GET", {}, (data2) =>{
                    setPadres(data2.data.response)
                })
            })
        }
        console.log("expresion seleccionada",props.expresionSeleccionada)
    }, [props.idPasaje, lang, props.expresionSeleccionada])

    const clickChangeLangEsVB=()=>{
        setLang("es");
      }
    
      const clickChangeLanALVB=()=>{
        setLang("al");
      }

    function htmlPasajeOriginal(){
        return {__html:props.expresionSeleccionada.referencias[0].ref_def_de}
    }

    function htmlPasajeTraduccion(){
        return {__html:props.expresionSeleccionada.referencias[0].ref_def_es}
    }

    return(
        <div className={classes.contenedorPrincipal}>
            <Grid container alignItems="center" alignContent="center">
                <Grid item md={11} xs={8}>
                <Typography variant="h2" className={classes.typosTitulos}>{props.expresionSeleccionada.term_de+"  /  "+props.expresionSeleccionada.term_es}</Typography>
                </Grid>
            </Grid>
            <Grid container className={classes.contenedorDeResultados}>
                <Grid item xs={12}>
                    <div dangerouslySetInnerHTML={htmlPasajeOriginal()}></div>
                    <div className={classes.divPasajes} dangerouslySetInnerHTML={htmlPasajeTraduccion()}></div>
                </Grid>
                <Grid item xs={5} className="jerarquiaBusquedaIzquierda">
                    <Typography variant="h5">Jerarquia</Typography>
                    <Typography variant="caption">Derivada de:</Typography>
                    <ul className="ulDeBusqueda" key={padres.id}>
                    {padres.map((padre, index)=>(
                        <li key={padre.id+"-"+index}>
                            <Link to={`/husserl/pasaje/${padre.padre}`}>
                                <Typography variant="h6" className="consultaDePasajesB">{padre.expresion}</Typography>
                            </Link>
                        </li>
                    ))}
                    </ul>
                    <Typography variant="caption">Expresiones derivadas:</Typography>
                    <ul className="ulDeBusqueda" key={hijos.id}>
                    {hijos.map((hijo, index)=>(
                        <li key={hijo.id+"-"+index}>
                            <Link to={`/husserl/pasaje/${hijo.hijo}`}>
                                <Typography variant="h6" className="consultaDePasajesB">{hijo.expresion}</Typography>
                            </Link>
                        </li>
                    ))}
                    </ul>
                </Grid>
                <Grid item xs={5} className="jerarquiaBusquedaDerecha">
                    <Typography variant="h5">Ver tambien</Typography>
                    <ul className="ulDeBusquedaVerTambien" key={listaVerTambien.id}>
                    {listaVerTambien.map((lista, index)=>(
                        <li key={lista.id+"-"+index}>
                            <Typography variant="h6" className="consultaDePasajesB">{lista.expresion + "  //  " + lista.traduccion}</Typography>
                        </li>
                    ))}
                    </ul>
                </Grid>
                <Grid item xs={2}>
                    {lang== "es" ?
                        <Button className={classes.imagenesBandera} onClick={clickChangeLanALVB}><img className="banderaPasajes" src={al}/></Button>
                        : <Button className={classes.imagenesBandera} onClick={clickChangeLangEsVB}><img className="banderaPasajes" src={es}/></Button>
                    }
                </Grid>
            </Grid>
        </div>
    )
}

export default withStyles(resultadoBusqueda)(ResultadoBusquedaExpresion);