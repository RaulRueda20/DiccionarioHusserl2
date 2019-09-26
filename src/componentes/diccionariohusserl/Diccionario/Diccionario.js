import React from 'react';


function Diccionario(props){
    // const [vista,setVista] = React.useState("");
    const {match} = props;

    return(
        <div>
            <HeaderMain lang={props.lang} setlang={props.setLang}/> 
            <Expresion match={match}/>
        </div>
    )
}

export default Diccionario;