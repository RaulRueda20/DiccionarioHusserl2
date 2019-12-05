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
import * as localStore from '../../js/localStore';
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
    const [pasajes, setPasajes] = React.useState({
        "original" : "",
        "traduccion" : ""
    })
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
                })
                webService(("/expresiones/"+lang+"/abuelosList/"+props.expresionSeleccionada.term_id), "GET", {}, (data2) =>{
                    setPadres(data2.data.response)
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
        setPasajes({
            original : resaltarBusqueda(props.expresionSeleccionada.referencias[0].ref_def_de, props.busqueda),
            traduccion : resaltarBusqueda(props.expresionSeleccionada.referencias[0].ref_def_es, props.busqueda)
        })
    }, [props.idPasaje, lang, props.expresionSeleccionada])

    function resaltarBusqueda(string,separador){
        var split = string.split(separador)
        var resultado = split.join("<span class='resaltador'>" + separador + "</span>")
        return resultado
    }

    const clickChangeLangEsVB=()=>{
        setLang("es");
      }
    
    const clickChangeLanALVB=()=>{
    setLang("al");
    }

    function htmlPasajeOriginal(){
        return {__html: pasajes.original}
    }

    function htmlPasajeTraduccion(){
        return {__html: pasajes.traduccion}
    }

    function fixReferenciasConsultadas(expresion){
        var referencia = {
            clave: expresion[0].clave,
            expresion: expresion[0].expresion_original,
            traduccion: expresion[0].expresion_traduccion,
            id: expresion[0].id,
            index_de: expresion[0].index_de,
            index_es: expresion[0].index_es,
            pretty_e: expresion[0].epretty,
            pretty_t: expresion[0].tpretty,
            referencias : []
        }
        referencia.referencias.push({
            referencia_original : expresion[0].ref_original,
            referencia_traduccion : expresion[0].ref_traduccion,
            refid : expresion[0].refid,
            orden: expresion[0].orden,
        })
        return referencia
    }

    function consultaDePasajes(){
        setTimeout(() => {
            if(document.getElementById("VP" + props.idExpresion) != null){
              document.getElementById("VP" + props.idExpresion).scrollIntoView()
            }
        }, 1000)
        var idExpresion = event.target.id.split("/")[0]
        var service = "/referencias/obtieneReferencias/" + idExpresion
        webService(service, "GET", {}, data => {
            var referencias = fixReferenciasConsultadas(data.data.response)
            console.log("referencias", referencias)
            if(localStore.getObjects("referenciasConsultadas")==false){
                var referenciasConsultadas = []
                referenciasConsultadas.push(referencias)
                localStore.setObjects("referenciasConsultadas",referenciasConsultadas)
            }else{
                var store = localStore.getObjects("referenciasConsultadas")
                store.push(referencias)
                localStore.setObjects("referenciasConsultadas",store)
            }
        })
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
                            <Link to={`/husserl/pasaje/${padre.padre}`} onClick={consultaDePasajes}>
                                <Typography variant="h6" className="consultaDePasajesB" id={padre.padre+"/"+index}>{padre.expresion}</Typography>
                            </Link>
                        </li>
                    ))}
                    </ul>
                    <Typography variant="caption">Expresiones derivadas:</Typography>
                    <ul className="ulDeBusqueda" key={hijos.id}>
                    {hijos.map((hijo, index)=>(
                        <li key={hijo.id+"-"+index}>
                            <Link to={`/husserl/pasaje/${hijo.hijo}`} onClick={consultaDePasajes}>
                                <Typography variant="h6" className="consultaDePasajesB" id={hijo.hijo+"/"+index}>{hijo.expresion}</Typography>
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
                            <Link to={`/husserl/pasaje/${lista.id}`}  onClick={consultaDePasajes}>
                                <Typography variant="h6" className="consultaDePasajesB" id={lista.id+"/"+index}>{lista.expresion + "  //  " + lista.traduccion}</Typography>
                            </Link>
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