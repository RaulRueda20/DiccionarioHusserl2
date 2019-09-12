import React from 'react'

import {webService} from '../../js/webServices';

function Acercade(props){
    const [acercade, setAcercade] = React.useState("")

    React.useEffect(()=>{
        webService("/acerca_de/get", "GET", {}, (data) => {
           console.log(data)
           setAcercade(data.data.response[0]) 
        })
    }, [])

    var acercadeEs=acercade.contenido;

    function htmlAcercadeEs(){
        return {__html: acercadeEs}
    }

    return(
        <div dangerouslySetInnerHTML={htmlAcercadeEs()}></div>
    )
}

export default Acercade;