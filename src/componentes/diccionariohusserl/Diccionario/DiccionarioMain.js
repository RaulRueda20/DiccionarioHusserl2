import React from 'react';

import VistaExpresiones from './VistaExpresiones';
import VistaPasajes from './VistaPasajes';

function DiccionarioMain(props){
  const [letraMain, setLetraMain] = React.useState('A');
  const [language,setLanguage] = React.useState("al");
  const [languageP,setLanguageP] = React.useState("al");
  const [expresiones, setExpresiones] = React.useState([]);
  const [idExpresion, setIdExpresion] = React.useState([1]);
  const [vistaP, setVistaP]=React.useState("expresion")
  const [hijos, setHijos] = React.useState([]);
  const [padres, setPadres] = React.useState([]);
  // const [open,setOpen]=React.useState(true);

  // console.log("idExpresiones en DiccionarioMain", idExpresion)

  return(
    <div>
      {vistaP == "expresion" ? 
      <VistaExpresiones 
        expresiones={expresiones} setExpresiones={setExpresiones} vistaP={vistaP} 
        setVistaP={setVistaP} language={language} setLanguage={setLanguage} 
        letraMain={letraMain} setLetraMain={setLetraMain} idExpresion={idExpresion}
        setIdExpresion={setIdExpresion} hijos={hijos} setHijos={setHijos} padres={padres}
        setPadres={setPadres}
      /> : <VistaPasajes
        expresiones={expresiones} setExpresiones={setExpresiones} vistaP={vistaP} 
        setVistaP={setVistaP} language={language} setLanguage={setLanguage} 
        languageP={languageP} setLanguageP={setLanguageP}
        letraMain={letraMain} setLetraMain={setLetraMain} idExpresion={idExpresion}
        setIdExpresion={setIdExpresion} setHijos={setHijos} padres={padres}
        setPadres={setPadres}
      />
      }
    </div>
    )
}

export default DiccionarioMain;