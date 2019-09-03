import React from 'react';
import Grid from '@material-ui/core/Grid';

import {webService} from '../../../js/webServices';

import ListaLetras from './ListaLetras';
import LetraIndice from './LetraIndice';
import BanderaButon from './BanderaButon';
import MenuDerecho from './MenuDerecho';
import Expresiones from './Expresiones';
import Cintilla from './Cintilla';
import Busqueda from './Busqueda';

const emptyObj = {
    clave: "",
    epretty: "",
    expresion_original: "",
    expresion_traduccion: "",
    id: null,
    orden: null,
    ref_original: "",
    ref_traduccion: "",
    refid: "",
    tpretty: ""
}

function VistaExpresiones(props){
//   const [letraMain, setLetraMain] = React.useState('A');
//   const [language,setLanguage] = React.useState("al");
//   const [expresiones, setExpresiones] = React.useState([]);
//   const [vistaP, setVistaP]=React.useState("expresion")
const [open,setOpen]=React.useState(true);
const [expresion, setExpresion] = React.useState(emptyObj)

//   var language=props.language

//   React.useEffect(()=>{
//     var service = "/expresiones/" + language + "/" + props.letraMain
//     webService(service, "GET", {}, (data) => {
//       props.setExpresiones(fixReferencias(data.data.response))
//       props.setIdExpresion(data.data.response.length > 0 ? data.data.response[0].id : "")
//       console.log("expresiones", props.expresiones)
//       console.log("idExpresion", props.idExpresion)
//     })
//   }, [props.letraMain])

    return(
        <Grid container>
        <Grid item xs={12}>
            <ListaLetras letraMain={props.letraMain} setLetraMain={props.setLetraMain}/>
        </Grid>
        <Grid item xs={1} align="center" style={{borderRight:"1px rgb(240, 240, 240) solid"}}>
            <LetraIndice letraMain={props.letraMain}/>
            <BanderaButon language={props.language} setLanguage={props.setLanguage}/>
        </Grid>
        <Grid item xs={8} aling='center'>
            <Expresiones expresiones={props.expresiones} setExpresiones={props.setExpresiones} idExpresion={props.idExpresion} 
            setIdExpresion={props.setIdExpresion} language={props.language} letraMain={props.letraMain} vistaP={props.vistaP} setVistaP={props.setVistaP}
            />
        </Grid>
        <Grid item xs={3}>
            <Busqueda expresiones={props.expresiones} setExpresiones={props.setExpresiones}/>
            <MenuDerecho expresionSeleccionada={props.idExpresion} hijos={props.hijos} setHijos={props.setHijos}/>
        </Grid>
        <Grid item xs={12}>
            <Cintilla open={open} setOpen={setOpen}/>
        </Grid>
        </Grid>
    )
}

export default VistaExpresiones;