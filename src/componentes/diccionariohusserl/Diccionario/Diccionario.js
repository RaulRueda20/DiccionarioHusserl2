import React from 'react';


function Diccionario(props){
    // const [vista,setVista] = React.useState("");
    const {match} = props;

    return(
        <div>
            <HeaderMain/>
            <DiccionarioMain/>
        </div>
    )
}

export default Diccionario;