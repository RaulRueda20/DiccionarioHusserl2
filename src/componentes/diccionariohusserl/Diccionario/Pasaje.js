import React from 'react';
import Grid from '@material-ui/core/Grid';
import ListaIzquierdaExpresion from './ListaIzquierdaExpresion';
import BusquedaVP from './BusquedaVP';
import ContenidoPasaje from './ContenidoPasaje';
import ListaLetras from './ListaLetras';
import MenuDerecho from './MenuDerecho';

function Pasaje(props){
  const [letraMain, setLetraMain] = React.useState('A');
  const [language,setLanguage] = React.useState("al");
  const [languageP,setLanguageP] = React.useState("al");
  const [expresiones, setExpresiones] = React.useState([]);
  const [idExpresion, setIdExpresion] = React.useState('');
  const [hijos, setHijos] = React.useState([]);
  const [padres, setPadres] = React.useState([]);
  // const [open,setOpen]=React.useState(true);}

  return(
    <div>
      <Grid container>
            <Grid item xs={12}>
                <ListaLetras letraMain={letraMain} setLetraMain={setLetraMain}/>
            </Grid>
            <Grid item xs={3}>
                <BusquedaVP language={language} setLanguage={setLanguage} expresiones={expresiones} setExpresiones={setExpresiones}/>
                <ListaIzquierdaExpresion expresiones={expresiones} setExpresiones={setExpresiones} idExpresion={idExpresion} 
                setIdExpresion={setIdExpresion} language={language}letraMain={letraMain}
                />
            </Grid>  
            <Grid item xs={6}>
                <ContenidoPasaje  idExpresion={idExpresion} setIdExpresion={setIdExpresion} languageP={languageP} setLanguageP={setLanguageP}/>
            </Grid>
            <Grid item xs={3}>
                <MenuDerecho expresionSeleccionada={idExpresion} hijos={hijos} setHijos={setHijos}/>
            </Grid>
        </Grid>
    </div>
    )
}

export default Pasaje;