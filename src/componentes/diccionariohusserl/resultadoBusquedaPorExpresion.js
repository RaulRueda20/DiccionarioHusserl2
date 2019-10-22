// React
import React from 'react';

//Components
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/styles';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

//Other req
import {webService} from '../../js/webServices';

const resultadoBusqueda={
    typosTitulos:{
        paddingTop:"15px !important",
        paddingBottom:"15px !important"
    },
    contenedorDeResultados:{
        maxWidth: "100%",
        maxHeight: "100%"
    }
}

const emptyPasajeB = {clave:"", epretty:"", expresion_original:"", expresion_traduccion:"", orden:"", pasaje_original: "", pasaje_traduccion:"",ref_original:"", ref_traduccion:"", refid:"", tpretty:""}

function ResultadoBusquedaExpresion(props){
    const {classes}=props;
    const [referencias, setReferencias] = React.useState([])
    const [referenciaSeleccionada, setReferenciaSeleccionada]=React.useState(emptyPasajeB);
    const [listaVerTambien,setListaVerTambien] = React.useState([]);
    const [hijos,setHijos] = React.useState([]);
    const [padres,setPadres] = React.useState([]);
    const [lang, setLang] = React.useState(true);

    React.useEffect(() => {
        console.log("idPasaje",props.idPasaje)

        if(props.idPasaje==""){
            var service = "/vertambien/" + props.expresionSeleccionada.term_id
            webService(service, "GET", {}, data => {
                setListaVerTambien(data.data.response)
                webService(("/expresiones/"+(lang ? "al" : "es")+"/hijosList/"+props.expresionSeleccionada.term_id),"GET", {}, (data) => {
                    console.log("hijos",data.data.response)
                    setHijos(data.data.response)
                })
                webService(("/expresiones/"+(lang ? "al" : "es")+"/abuelosList/"+props.expresionSeleccionada.term_id), "GET", {}, (data2) =>{
                    console.log("padres",data2.data.response)
                    setPadres(data2.data.response)
                })
            })
        }else{
            var service = "/vertambien/" + props.idPasaje
            webService(service, "GET", {}, data => {
                setListaVerTambien(data.data.response)
                webService(("/expresiones/"+(lang ? "al" : "es")+"/hijosList/"+props.idPasaje),"GET", {}, (data) => {
                    console.log("hijos",data.data.response)
                    setHijos(data.data.response)
                })
                webService(("/expresiones/"+(lang ? "al" : "es")+"/abuelosList/"+props.idPasaje), "GET", {}, (data2) =>{
                    setPadres(data2.data.response)
                    console.log("padres",data2.data.response)
                })
            })
        }
        
    }, [props.idPasaje, lang, props.expresionSeleccionada])



    function htmlPasajeOriginal(){
        return {__html:props.expresionSeleccionada.referencias[0].ref_def_de}
    }

    function htmlPasajeTraduccion(){
        return {__html:props.expresionSeleccionada.referencias[0].ref_def_es}
    }

    return(
        <Grid container className={classes.contenedorDeResultados}>
            <Grid item xs={12} className="pasajesRenderizadosBusqueda">
                <Typography variant="h4" className={classes.typosTitulos}>{props.expresionSeleccionada.term_de+"  /  "+props.expresionSeleccionada.term_es}</Typography>
                <div dangerouslySetInnerHTML={htmlPasajeOriginal()}></div>
                <div dangerouslySetInnerHTML={htmlPasajeTraduccion()}></div>
            </Grid> 
            <Grid item xs={5} className="jerarquiaBusquedaIzquierda">
                <Typography variant="h5">Jerarquia</Typography>
                <Typography variant="caption">Derivada de:</Typography>
                <ul className="ulDeBusqueda" key={padres.id}>
                {padres.map((padre, index)=>(
                    <li key={padre.id+"-"+index}>
                        <Typography variant="h6" className="consultaDePasajesB">{padre.expresion}</Typography>
                    </li>
                ))}
                </ul>
                <Typography variant="caption">Expresiones derivadas:</Typography>
                <ul className="ulDeBusqueda" key={hijos.id}>
                {hijos.map((hijo, index)=>(
                    <li key={hijo.id+"-"+index}>
                        <Typography variant="h6" className="consultaDePasajesB">{hijo.expresion}</Typography>
                    </li>
                ))}
                </ul>
            </Grid>
            <Grid item xs={5} className="jerarquiaBusquedaDerecha">
                <Typography variant="h5">Ver tambien</Typography>
                <ul className="ulDeBusquedaVerTambien" key={listaVerTambien.id}>
                {listaVerTambien.map((lista, index)=>(
                    <li key={lista.id+"-"+index}>
                        <Typography variant="h6" className="consultaDePasajesB">{lista.expresion + "  //  " + lista.traduccion  + "  //  " + lista.id}</Typography>
                    </li>
                ))}
                </ul>
            </Grid>
            <Grid item xs={2}>
                <FormControlLabel
                    value="al"
                    control={<Switch color="primary" checked={lang} onChange={event =>setLang(!lang)}/>}
                    label={lang ? "Aleman" : "Español"}
                    labelPlacement="end"
                />
            </Grid>
        </Grid>
    )
}

export default withStyles(resultadoBusqueda)(ResultadoBusquedaExpresion);